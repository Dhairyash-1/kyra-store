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

const router = Router();

router.route("/colors/add").post(verifyJWT, addColor);
router.route("/colors/").get(getAllProductColors);
router.route("/sizes/").get(getAllProductSizes);
router.route("/size/add").post(verifyJWT, addSize);

router.route("/add").post(verifyJWT, addProduct);
router.route("/").get(getAllProducts);
router.route("/slug").get(getProductBySlug);
router.route("/variantId/:productId/:colorId/:sizeId").get(getProductVariantId);
router.route("/bestseller").get(getBestSellerProduct);

export default router;
