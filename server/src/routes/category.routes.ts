import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware";
import {
  createProductCategory,
  deleteProductCategory,
  getAllProductCategory,
  getProductCategoryById,
  updateProductCategory,
} from "../controllers/category.controller";

const router = Router();

router.route("/create").post(verifyJWT, createProductCategory);
router.route("/update/:id").patch(verifyJWT, updateProductCategory);
router.route("/delete/:id").delete(verifyJWT, deleteProductCategory);
router.route("/").get(getAllProductCategory);
router.route("/:id").get(getProductCategoryById);

export default router;
