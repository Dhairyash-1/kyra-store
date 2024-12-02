import Stripe from "stripe";
import prisma from "../prismaClient/prismaClient";
import { stripe } from "../app";

export async function handleOrderFulfillment(
  session: Stripe.Checkout.Session | Stripe.PaymentIntent
) {
  const orderId = session?.metadata?.orderId;

  if (!orderId) {
    throw new Error("Order ID is missing in the session metadata.");
  }

  const order = await prisma.order.findUnique({
    where: { id: Number(orderId) },
  });
  if (!order || order.paymentStatus === "COMPLETED") {
    console.log(`Order ${orderId} already confirmed`);
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

      for (const item of order.items) {
        const product = await prisma.product.findUnique({
          where: { id: item.productId },
        });

        if (!product?.stockQuantity || product.stockQuantity < item.quantity) {
          throw new Error(
            `Insufficient stock for product ID ${item.productId}.`
          );
        }

        await prisma.product.update({
          where: { id: item.productId },
          data: { stockQuantity: product.stockQuantity - item.quantity },
        });
      }

      // Update order status
      await prisma.order.update({
        where: { id: Number(orderId) },
        data: {
          orderStatus: "CONFIRMED",
          paymentStatus: "COMPLETED",
        },
      });
    });

    console.log("Order fulfillment completed successfully.");
  } catch (error: any) {
    console.error("Error fulfilling order:", error);
    throw new Error(`Order fulfillment failed: ${error.message}`);
  }
}

export async function handlePaymentSessionExpiry(session: any) {
  const orderId = session.metadata.orderId;

  await prisma.order.update({
    where: { id: Number(orderId) },
    data: {
      orderStatus: "FAILED",
      paymentStatus: "FAILED",
      failureReason: "Payment timeout",
    },
  });
}

export async function handleOrderFulfillmentFallback(
  paymentIntent: Stripe.PaymentIntent
) {
  const session = await stripe.checkout.sessions.list({
    payment_intent: paymentIntent.id,
    limit: 1,
  });
  console.log("session", session.data);

  const orderId = session.data[0].metadata?.orderId;

  if (!orderId) {
    console.error("Missing orderId in paymentIntent metadata");
    return;
  }

  const order = await prisma.order.findUnique({
    where: { id: Number(orderId) },
  });
  if (!order || order.paymentStatus === "COMPLETED") {
    console.log(`Order ${orderId} already confirmed`);
    return;
  }

  // Fulfill the order
  await handleOrderFulfillment(paymentIntent);
}
export async function handlePaymentFailure(
  paymentIntent: Stripe.PaymentIntent
) {
  const session = await stripe.checkout.sessions.list({
    payment_intent: paymentIntent.id,
    limit: 1,
  });

  const orderId = session.data[0].metadata?.orderId;

  if (!orderId) {
    console.error("Missing orderId in paymentIntent metadata");
    return;
  }
  console.log(orderId);

  const order = await prisma.order.update({
    where: { id: Number(orderId) },
    data: {
      orderStatus: "FAILED",
      paymentStatus: "FAILED",
    },
  });

  console.log(`Payment failed for Order ${orderId}`);
}
