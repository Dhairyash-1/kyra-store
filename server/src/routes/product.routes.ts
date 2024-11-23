import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware";
import {
  addProduct,
  getAllProducts,
  getBestSellerProduct,
  getProductBySlug,
} from "../controllers/product.controller";

const router = Router();

router.route("/add").post(verifyJWT, addProduct);
router.route("/").get(getAllProducts);
router.route("/slug").get(getProductBySlug);
router.route("/bestseller").get(getBestSellerProduct);

export default router;
