import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware";
import {
  addColor,
  addProduct,
  addSize,
  getAdminProductById,
  getAllAdminProducts,
  getAllProductColors,
  getAllProducts,
  getAllProductSizes,
  getBestSellerProduct,
  getProductBySlug,
  getProductVariantId,
  updateProductBasicInfo,
  updateProductCategoryInfo,
  updateProductVariant,
} from "../controllers/product.controller";
import { verifyAdminRole } from "../middlewares/admin.middleware";

const router = Router();

// ADMIN ROUTES
router.route("/colors/add").post(verifyJWT, verifyAdminRole, addColor);
router.route("/size/add").post(verifyJWT, verifyAdminRole, addSize);
router.route("/add").post(verifyJWT, verifyAdminRole, addProduct);
router
  .route("/admin/products")
  .get(verifyJWT, verifyAdminRole, getAllAdminProducts);
router
  .route("/admin/product/:id")
  .get(verifyJWT, verifyAdminRole, getAdminProductById);

router
  .route("/admin/product/:id")
  .get(verifyJWT, verifyAdminRole, getAdminProductById);

// Update Product Routes for Admin
router
  .route("/admin/:id/basic")
  .patch(verifyJWT, verifyAdminRole, updateProductBasicInfo);
router
  .route("/admin/:id/category")
  .patch(verifyJWT, verifyAdminRole, updateProductCategoryInfo);
router
  .route("/admin/:id/variants")
  .patch(verifyJWT, verifyAdminRole, updateProductVariant);

// PUBLIC ROUTES
router.route("/").get(getAllProducts);
router.route("/slug").get(getProductBySlug);
router.route("/bestseller").get(getBestSellerProduct);
router.route("/colors/").get(getAllProductColors);
router.route("/sizes/").get(getAllProductSizes);

export default router;
