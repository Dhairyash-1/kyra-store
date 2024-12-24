import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware";
import {
  createProductCategory,
  deleteProductCategory,
  getAllProductCategory,
  getAllProductFilterCategory,
  getProductCategoryById,
  getTrendingCategories,
  updateProductCategory,
} from "../controllers/category.controller";
import { verifyAdminRole } from "../middlewares/admin.middleware";

const router = Router();

router.route("/create").post(verifyJWT, verifyAdminRole, createProductCategory);
router
  .route("/update/:id")
  .patch(verifyJWT, verifyAdminRole, updateProductCategory);
router
  .route("/delete/:id")
  .delete(verifyJWT, verifyAdminRole, deleteProductCategory);
router.route("/").get(getAllProductCategory);
router.route("/filter").get(getAllProductFilterCategory);
router.route("/:id").get(getProductCategoryById);
router.route("/get/trending").get(getTrendingCategories);

export default router;
