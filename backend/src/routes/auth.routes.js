import express from "express";
import auth from "../middleware/auth.js";
import { register, verifyOtp, login, forgotPassword, resetPassword, me } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/register", register);
router.post("/verify-otp", verifyOtp);
router.post("/login", login);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);
router.get("/me", auth, me);

export default router; 