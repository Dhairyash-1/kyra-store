import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware";
import {
  createOrder,
  getAllOrders,
  getAllUserOrders,
  getOrderDetailsById,
} from "../controllers/order.controller";
import { verifyAdminRole } from "../middlewares/admin.middleware";

const router = Router();

router.use(verifyJWT);

router.route("/create-order").post(createOrder);
router.route("/").get(getAllUserOrders);
router.route("/details/:id").get(getOrderDetailsById);

// admin routes
router.route("/admin/orders").get(verifyAdminRole, getAllOrders);

export default router;
