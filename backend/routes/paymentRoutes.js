import express from "express"
import { create_checkout_session, handle_webhook } from "../controllers/paymentController.js"
import requireAuth from "../middleware/authMiddleware.js"

const router = express.Router()

router.post("/create-checkout-session", requireAuth, create_checkout_session)

router.post("/webhook", handle_webhook)

export default router