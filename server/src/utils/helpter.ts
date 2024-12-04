import Stripe from "stripe";

export const createSlug = (name: string) => {
  const randomSuffix = Math.random().toString(36).substring(2, 8); //
  return (
    name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "") + `-${randomSuffix}`
  );
};

export function isCheckoutSession(
  session: Stripe.Checkout.Session | Stripe.PaymentIntent
): session is Stripe.Checkout.Session {
  return (session as Stripe.Checkout.Session).payment_intent !== undefined;
}
