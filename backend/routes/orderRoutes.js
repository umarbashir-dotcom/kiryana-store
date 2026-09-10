import express from "express"
import { getAllOrders, createOrder, getOrderById, getUserOrders} from "../controllers/ordersController.js"
import requireAdmin from "../middleware/adminAuthMiddleware.js"
import requireAuth from "../middleware/authMiddleware.js"

const router = express.Router()

router.get("/", requireAdmin, getAllOrders)

router.get("/user", requireAuth, getUserOrders)

router.get("/:id", requireAuth, getOrderById)

router.post("/", requireAuth, createOrder)

export default router