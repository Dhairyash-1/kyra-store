import Stripe from "stripe";
import {
  handleOrderFulfillmentFallback,
  handleOrderFulfillment,
  handlePaymentFailure,
  handlePaymentSessionExpiry,
} from "./handler";

export const stripeWebhookHandler = async (request: any, response: any) => {
  const event = request.body;

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

  response.json({ received: true });
};
