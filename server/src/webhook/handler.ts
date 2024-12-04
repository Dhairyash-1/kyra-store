import Stripe from "stripe";
import prisma from "../prismaClient/prismaClient";
import { stripe } from "../app";
import { Product } from "@prisma/client";
import { isCheckoutSession } from "../utils/helpter";

export async function handleOrderFulfillment(
  session: Stripe.Checkout.Session | Stripe.PaymentIntent,
  id?: string
) {
  let orderId = session?.metadata?.orderId;

  if (!orderId) {
    if (id) {
      orderId = id;
    } else {
      throw new Error("Order ID is missing in the session metadata.");
    }
  }

  console.log("orderId", orderId);

  const existingOrder = await prisma.order.findUnique({
    where: { id: Number(orderId) },
    select: { paymentStatus: true },
  });

  if (!existingOrder) {
    throw new Error(`Order with ID ${orderId} not found.`);
  }

  if (existingOrder.paymentStatus === "COMPLETED") {
    console.log(`Order ${orderId} has already been processed.`);
    return;
  }

  try {
    await prisma.$transaction(async (prisma) => {
      const order = await prisma.order.findUnique({
        where: { id: Number(orderId) },
        include: { items: true },
      });

      if (!order) {
        throw new Error(`Order with ID ${orderId} not found.`);
      }

      const productIds = order.items.map((item) => item.productId);
      console.log("productIds", productIds);
      // Fetch all products associated with the order and apply a lock
      const products =
        productIds.length === 1
          ? await prisma.$queryRawUnsafe<Product[]>(
              `SELECT * FROM "Product" WHERE id = $1 FOR UPDATE`,
              productIds[0]
            )
          : await prisma.$queryRawUnsafe<Product[]>(
              `SELECT * FROM "Product" WHERE id IN (${productIds
                .map((_, i) => `$${i + 1}`)
                .join(", ")}) FOR UPDATE`,
              ...productIds
            );

      const productMap = new Map(
        products.map((product) => [product.id, product])
      );

      const insufficientStockItems: {
        productId: number;
        available: number;
        required: number;
      }[] = [];

      for (const item of order.items) {
        const product = productMap.get(item.productId);

        if (!product) {
          throw new Error(`Product with ID ${item.productId} not found.`);
        }

        if (!product.stockQuantity || product.stockQuantity < item.quantity) {
          insufficientStockItems.push({
            productId: item.productId,
            available: product.stockQuantity || 0,
            required: item.quantity,
          });
        }
      }

      // If there are items with insufficient stock, handle appropriately
      if (insufficientStockItems.length > 0) {
        console.error("Insufficient stock detected:", insufficientStockItems);

        //  TRIGGER REFUND : AS ITEM IS OUT OF STOCK SO TRIGGER THE REFUND

        await handleOutOfStockRefund(session, orderId);

        throw new Error(
          `Order cannot be fulfilled due to insufficient stock: ${JSON.stringify(
            insufficientStockItems
          )}`
        );
      }

      const updatePromises = Array.from(productMap.values()).map((product) => {
        const orderItem = order.items.find(
          (item) => item.productId === product.id
        );
        if (orderItem && product.stockQuantity) {
          product.stockQuantity -= orderItem.quantity;
        }
        return prisma.product.update({
          where: { id: product.id },
          data: { stockQuantity: product.stockQuantity },
        });
      });

      await Promise.all(updatePromises);

      await prisma.order.update({
        where: { id: Number(orderId) },
        data: {
          orderStatus: "CONFIRMED",
          paymentStatus: "COMPLETED",
        },
      });

      let paymentIntent: Stripe.PaymentIntent | null = null;
      if (isCheckoutSession(session)) {
        if (typeof session.payment_intent === "string") {
          paymentIntent = await stripe.paymentIntents.retrieve(
            session.payment_intent
          );
        }
      } else {
        paymentIntent = session;
      }

      // update payment details for successfull order
      if (paymentIntent) {
        await prisma.paymentDetails.create({
          data: {
            amount: paymentIntent?.amount,
            currency: paymentIntent?.currency,
            stripePaymentIntentId: paymentIntent?.id,
            paymentMethod: paymentIntent?.payment_method_types[0],
            orderId: Number(orderId),
          },
        });
      }

      console.log(`Order ${orderId} has been successfully fulfilled.`);
    });
  } catch (error: any) {
    // NOTIFY : ADMIN ABOUT FAILURE IN ORDER
    console.error("Error fulfilling order:", error);
    throw new Error(`Order fulfillment failed: ${error.message}`);
  }
}

export async function handlePaymentSessionExpiry(
  session: Stripe.Checkout.Session
) {
  const orderId = session.metadata?.orderId;

  if (!orderId) {
    console.error("Session metadata missing order ID.");
    return;
  }

  try {
    await prisma.order.update({
      where: { id: Number(orderId) },
      data: {
        orderStatus: "FAILED",
        paymentStatus: "FAILED",
      },
    });

    const paymentIntentId = session.payment_intent as string;

    let paymentIntent: Stripe.PaymentIntent | null = null;

    if (paymentIntentId) {
      paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
    }

    if (paymentIntent) {
      await prisma.paymentDetails.create({
        data: {
          stripePaymentIntentId: paymentIntent.id,
          currency: paymentIntent.currency,
          amount: paymentIntent.amount,
          paymentMethod: paymentIntent.payment_method_types[0],
          orderId: Number(orderId),
          paymentFailureDetails: {
            create: {
              failureMessage:
                paymentIntent.last_payment_error?.message ||
                `Payment session expired`,
              failureCode: paymentIntent.last_payment_error?.decline_code,
              status: paymentIntent.status,
            },
          },
        },
      });
    }

    // SEND EMAIL : CAN NOTIFY USER ABOUT PAYMENT TIMEOUT
  } catch (error) {
    console.error(
      `Failed to update order ${orderId} on session expiry:`,
      error
    );
  }
}

export async function handlePaymentFailure(
  paymentIntent: Stripe.PaymentIntent
) {
  try {
    const session = await stripe.checkout.sessions.list({
      payment_intent: paymentIntent.id,
      limit: 1,
    });

    if (!session.data.length) {
      console.error("No session found for payment intent.");
      return;
    }

    const orderId = session.data[0].metadata?.orderId;

    if (!orderId) {
      console.error("Missing orderId in paymentIntent metadata");
      return;
    }

    await prisma.order.update({
      where: { id: Number(orderId) },
      data: {
        orderStatus: "FAILED",
        paymentStatus: "FAILED",
      },
    });

    await prisma.paymentDetails.create({
      data: {
        stripePaymentIntentId: paymentIntent.id,
        amount: paymentIntent.amount,
        currency: paymentIntent.currency,
        paymentMethod: paymentIntent.payment_method_types[0],
        orderId: Number(orderId),
        paymentFailureDetails: {
          create: {
            failureCode: paymentIntent.last_payment_error?.decline_code,
            failureMessage: paymentIntent.last_payment_error?.message,
            status: paymentIntent.status,
          },
        },
      },
    });

    // SEND EMAIL TO USER : ABOUT PAYMENT FAILURE

    console.log(`Payment failed for Order ${orderId}`);
  } catch (error) {
    console.error(`Failed to update order  on payment failure:`, error);
  }
}

export async function handleOrderFulfillmentFallback(
  paymentIntent: Stripe.PaymentIntent
) {
  const session = await stripe.checkout.sessions.list({
    payment_intent: paymentIntent.id,
    limit: 1,
  });

  if (!session.data.length) {
    console.error("No session found for payment intent.");
    return;
  }

  const orderId = session.data[0].metadata?.orderId;

  if (!orderId) {
    console.error("Missing orderId in paymentIntent metadata");
    return;
  }

  const order = await prisma.order.findUnique({
    where: { id: Number(orderId) },
  });

  if (!order) {
    console.log(`No order found with OrderId ${orderId}`);
    return;
  }

  if (order.paymentStatus === "COMPLETED") {
    console.log(`Order ${orderId} already processed`);
    return;
  }

  try {
    await handleOrderFulfillment(paymentIntent, orderId);
  } catch (error) {
    console.error(`Failed to fulfill order ${orderId}:`, error);
  }
}

export async function handleOutOfStockRefund(
  session: Stripe.Checkout.Session | Stripe.PaymentIntent,
  orderId: string
) {
  let paymentIntentId: string;

  if (isCheckoutSession(session)) {
    paymentIntentId = session.payment_intent as string;
  } else {
    paymentIntentId = session.id;
  }

  if (!paymentIntentId) {
    throw new Error("Payment intent ID is missing.");
  }

  try {
    const refund = await stripe.refunds.create({
      payment_intent: paymentIntentId,
      reason: "requested_by_customer",
    });
    console.log(`Refund successful for Order ${orderId}:`, refund);

    await prisma.$transaction(async (prisma) => {
      await prisma.order.update({
        where: { id: Number(orderId) },
        data: {
          orderStatus: "FAILED",
          paymentStatus: "REFUNDED",
          failureReason: "Out of stock",
        },
      });

      console.log(`Order ${orderId} updated to FAILED due to out-of-stock.`);
    });
  } catch (error: any) {
    console.error(`Failed to process refund for Order ${orderId}:`, error);
    if (error instanceof Stripe.errors.StripeError) {
      console.error("Stripe error details:", error.raw);
    }
    throw new Error(`Refund failed: ${error.message}`);
  }
}
