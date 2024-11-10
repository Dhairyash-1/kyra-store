import { Router } from "express";
import {
  forgotPasswordRequest,
  loginUser,
  logOutUser,
  refreshAccessToken,
  registerUser,
  resetPassword,
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

export default router;
