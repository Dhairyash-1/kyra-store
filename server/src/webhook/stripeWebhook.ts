import Stripe from "stripe";
import {
  handleOrderFulfillmentFallback,
  handleOrderFulfillment,
  handlePaymentFailure,
  handlePaymentSessionExpiry,
} from "./handler";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export const stripeWebhookHandler = async (request: any, response: any) => {
  const signature = request.headers["stripe-signature"];
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      request.body,
      signature,
      endpointSecret!
    );
  } catch (err: any) {
    console.error("Webhook signature verification failed.", err);
    return response.status(400).send(`Webhook Error: ${err.message}`);
  }

  try {
    switch (event.type) {
      case "checkout.session.completed":
        const session = event.data.object as Stripe.Checkout.Session;
        console.log("completed", session);
        await handleOrderFulfillment(session);
        break;

      case "checkout.session.expired":
        const expiredSession = event.data.object as Stripe.Checkout.Session;
        await handlePaymentSessionExpiry(expiredSession);
        break;

      case "payment_intent.succeeded":
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        console.log("Payment intent succeeded", paymentIntent.id);
        await handleOrderFulfillmentFallback(paymentIntent);
        break;

      case "payment_intent.payment_failed":
        const failedPaymentIntent = event.data.object as Stripe.PaymentIntent;
        console.log("Payment intent failed", failedPaymentIntent.id);
        await handlePaymentFailure(failedPaymentIntent);
        break;

      default:
        console.log(`Unhandled event type ${event.type}`);
    }
  } catch (err) {
    console.error("Error processing webhook event:", err);
  }

  response.status(200).send({ received: true });
};
