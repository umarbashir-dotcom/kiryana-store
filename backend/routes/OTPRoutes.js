import express from "express";
import { generateOtpOnRequest, verifyOtpOnRequest } from "../controllers/otpController.js";
import requireAuth from "../middleware/authMiddleware.js";

const router = express.Router()

router.post('/request-otp', generateOtpOnRequest)

router.post("/verify-otp", verifyOtpOnRequest)

export default router