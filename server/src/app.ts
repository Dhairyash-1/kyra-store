import express, { Request, Response } from "express";
import cookieParser from "cookie-parser";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(cookieParser());

// middleware imports
import errorHandler from "./middlewares/error.middleware";

// routes
import userRouter from "./routes/user.routes";

app.use("/api/v1/user", userRouter);

// middleware to format all error as json
app.use(errorHandler);

export const startServer = () => {
  app.listen(PORT, () => {
    console.log(`SERVER IS RUNNING ON PORT ${PORT}`);
  });
};
