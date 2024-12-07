import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware";
import {
  addOrUpdateItemQuantity,
  clearCart,
  getUserCartItems,
  removeCartItem,
  syncCart,
} from "../controllers/cart.controller";

const router = Router();

router.use(verifyJWT);

router.route("/update").post(addOrUpdateItemQuantity);
router.route("/").get(getUserCartItems);
router.route("/remove/:productId").post(removeCartItem);
router.route("/clear").delete(clearCart);
router.route("/sync").post(syncCart);

export default router;
