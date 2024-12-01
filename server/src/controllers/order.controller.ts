import { stripe } from "../app";
import prisma from "../prismaClient/prismaClient";
import { CustomRequest } from "../types/customRequest";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import { asyncHandler } from "../utils/asyncHandler";

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
  totalPrice: number; // It seems like totalPrice might be redundant if you are calculating it in the backend
}

export const createOrder = asyncHandler(async (req: CustomRequest, res) => {
  const {
    addressId,
    cartItems,
    totalAmount,
  }: { addressId: number; cartItems: CartItem[]; totalAmount: number } =
    req.body;

  // Validate input
  if (!addressId || !totalAmount || !cartItems || !cartItems.length) {
    throw new ApiError(400, "All fields are required");
  }

  // 1. Fetch the shipping address
  const shippingAddress = await prisma.shippingAddress.findUnique({
    where: { id: addressId },
  });
  if (!shippingAddress) {
    throw new ApiError(404, "Address not found");
  }

  // 2. Fetch the products in the cart
  const productIds = cartItems.map((item) => item.id);
  const products = await prisma.product.findMany({
    where: {
      id: { in: productIds },
    },
  });

  if (products.length !== cartItems.length) {
    throw new ApiError(404, "One or more products not found");
  }

  // 3. Validate product stock and calculate total
  let calculatedTotal = 0;
  for (const item of cartItems) {
    const product = products.find((p) => p.id === item.id);

    if (
      !product ||
      !product.stockQuantity ||
      product.stockQuantity < item.quantity
    ) {
      throw new ApiError(
        400,
        `Product with ID ${item.id} is unavailable or has insufficient stock`
      );
    }
    // If the product has a sale price, use it
    const productPrice = product.salePrice || 0;
    calculatedTotal += productPrice * item.quantity;
  }

  // 4. Ensure the total amount matches the cart calculation
  if (calculatedTotal !== totalAmount) {
    throw new ApiError(
      400,
      "Total amount does not match the sum of cart items"
    );
  }

  // 5. Create an order in the database (with PENDING status)
  const unpaidOrder = await prisma.order.create({
    data: {
      userId: req?.user?.id as number,
      orderStatus: "PENDING",
      paymentStatus: "PENDING",
      shippingAddressId: shippingAddress.id,
      totalAmount,
      items: {
        create: cartItems.map((item) => ({
          productId: item.id,
          quantity: item.quantity,
          price: item.totalPrice,
        })),
      },
    },
  });

  // 6. Create a Stripe checkout session
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: cartItems.map((item) => ({
      price_data: {
        currency: "inr",
        product_data: {
          name: item.name,
          images: [item.image],
        },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    })),
    mode: "payment",
    metadata: {
      orderId: unpaidOrder.id,
    },
    success_url: `http://localhost:5000/`,
    cancel_url: `http://localhost:5000/cart`,
  });

  // 7. Update the order with Stripe checkout session ID
  await prisma.order.update({
    where: { id: unpaidOrder.id },
    data: {
      stripeCheckoutId: session.id,
    },
  });

  // 8. Return the session ID to the frontend
  return res
    .status(200)
    .json(
      new ApiResponse(200, { sessionId: session.id }, "Stripe session created")
    );
});
