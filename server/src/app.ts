import express, { Request, Response } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 5000;

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

app.use("/api/v1/user", userRouter);
app.use("/api/v1/category", categoryRouter);
app.use("/api/v1/product", productRouter);

// middleware to format all error as json
app.use(errorHandler);

export const startServer = () => {
  app.listen(PORT, () => {
    console.log(`SERVER IS RUNNING ON PORT ${PORT}`);
  });
};
