import express from "express"
import { getWishlist, addItemToWishlist, deleteItemFromWishlist } from "../controllers/wishlistController.js";
import requireAuth from "../middleware/authMiddleware.js";

const router = express.Router()

router.get("/", getWishlist)

router.post("/items/:id", addItemToWishlist)

router.delete("/items/:id", deleteItemFromWishlist)

export default router