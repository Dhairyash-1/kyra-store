import { Router } from "express";
import {
  addShippingAddress,
  deleteShippingAddress,
  forgotPasswordRequest,
  getAllUserShippingAddress,
  getCurrentUser,
  getShippingAddressById,
  loginUser,
  logOutUser,
  refreshAccessToken,
  registerUser,
  resetPassword,
  updateShippingAddress,
  updateUserProfile,
  verifyOTP,
} from "../controllers/user.controller";
import { verifyJWT } from "../middlewares/auth.middleware";

const router = Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/refresh-token").post(refreshAccessToken);
router.route("/forgot-password").post(forgotPasswordRequest);
router.route("/verify-otp").post(verifyOTP);
router.route("/reset-password").post(resetPassword);

// protected route
router.route("/logout").post(verifyJWT, logOutUser);
router.route("/me").get(verifyJWT, getCurrentUser);
router.route("/update-profile").patch(verifyJWT, updateUserProfile);
router.route("/add-address").post(verifyJWT, addShippingAddress);
router.route("/shipping-address").get(verifyJWT, getAllUserShippingAddress);
router.route("/update-address").patch(verifyJWT, updateShippingAddress);
router.route("/delete-address/:id").delete(verifyJWT, deleteShippingAddress);
router.route("/address/:id").get(verifyJWT, getShippingAddressById);

export default router;
