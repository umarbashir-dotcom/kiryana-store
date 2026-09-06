import express from "express"
import { getCart, addItemToCart, updateCartItemQuantity, removeCartItem, deleteCart, deleteManyCartItems} from "../controllers/cartController.js"

const router = express.Router()

router.get("/", getCart)

router.post("/items", addItemToCart)

router.put("/items/:id", updateCartItemQuantity)

router.delete("/items/:id", removeCartItem)

router.delete("/", deleteCart)

router.delete("/items", deleteManyCartItems)

export default router