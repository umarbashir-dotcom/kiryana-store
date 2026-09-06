import express from "express"
import { getAllOrders, createOrder, getOrderById} from "../controllers/ordersController.js"
import requireAdmin from "../middleware/adminAuthMiddleware.js"

const router = express.Router()

router.get("/", requireAdmin, getAllOrders)

router.get("/:id", getOrderById)

router.post("/", createOrder)

export default router