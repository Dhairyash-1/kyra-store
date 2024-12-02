import express, { Request, Response } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import Stripe from "stripe";

const app = express();
const PORT = process.env.PORT || 5000;

const STRIPE_KEY = process.env.STRIPE_SECRET_KEY;

export const stripe = new Stripe(STRIPE_KEY as string);
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(cookieParser());

app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:5173",
    credentials: true,
  })
);

// middleware imports
import errorHandler from "./middlewares/error.middleware";

// routes
import userRouter from "./routes/user.routes";
import categoryRouter from "./routes/category.routes";
import productRouter from "./routes/product.routes";
import wishlistRouter from "./routes/wishlist.routes";
import orderRouter from "./routes/order.routes";

app.use("/api/v1/user", userRouter);
app.use("/api/v1/category", categoryRouter);
app.use("/api/v1/product", productRouter);
app.use("/api/v1/wishlist", wishlistRouter);
app.use("/api/v1/order", orderRouter);

// webhook
import { stripeWebhookHandler } from "./webhook/stripeWebhook";

app.post(
  "/webhook",
  express.json({ type: "application/json" }),
  stripeWebhookHandler
);

// middleware to format all error as json
app.use(errorHandler);

export const startServer = () => {
  app.listen(PORT, () => {
    console.log(`SERVER IS RUNNING ON PORT ${PORT}`);
  });
};
