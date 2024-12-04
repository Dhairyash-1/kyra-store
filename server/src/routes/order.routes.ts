import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware";
import {
  createOrder,
  getAllUserOrders,
  getOrderDetailsById,
} from "../controllers/order.controller";

const router = Router();

router.use(verifyJWT);

router.route("/create-order").post(createOrder);
router.route("/").get(getAllUserOrders);
router.route("/details/:id").get(getOrderDetailsById);

export default router;
