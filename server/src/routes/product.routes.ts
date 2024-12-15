import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware";
import {
  addColor,
  addProduct,
  addSize,
  getAllProductColors,
  getAllProducts,
  getAllProductSizes,
  getBestSellerProduct,
  getProductBySlug,
  getProductVariantId,
} from "../controllers/product.controller";
import { verifyAdminRole } from "../middlewares/admin.middleware";

const router = Router();

// ADMIN ROUTES
router.route("/colors/add").post(verifyJWT, verifyAdminRole, addColor);
router.route("/size/add").post(verifyJWT, verifyAdminRole, addSize);
router.route("/add").post(verifyJWT, verifyAdminRole, addProduct);

// PUBLIC ROUTES
router.route("/").get(getAllProducts);
router.route("/slug").get(getProductBySlug);
router.route("/bestseller").get(getBestSellerProduct);
router.route("/colors/").get(getAllProductColors);
router.route("/sizes/").get(getAllProductSizes);

export default router;
