import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware";
import { addProduct, getAllProducts } from "../controllers/product.controller";

const router = Router();

router.route("/add").post(verifyJWT, addProduct);
router.route("/").get(getAllProducts);

export default router;
