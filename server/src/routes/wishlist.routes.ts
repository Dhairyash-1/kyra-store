import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware";
import {
  toggleProductWishlist,
  getAllUserWishlistProducts,
} from "../controllers/wishlist.controller";

const router = Router();

router.use(verifyJWT);

router.route("/toggle/:id").post(toggleProductWishlist);
router.route("/").get(getAllUserWishlistProducts);

export default router;
