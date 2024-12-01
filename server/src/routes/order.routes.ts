import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware";
import { createOrder } from "../controllers/order.controller";

const router = Router();

router.use(verifyJWT);

router.route("/create-order").post(createOrder);

export default router;
