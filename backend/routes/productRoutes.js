import express from "express"
import {
    getProducts,
    addProduct,
    updateProduct,
    deleteProduct,
    getRiceAndGrainsProducts,
    getProductsByCategory
} from "../controllers/productsController.js"
import upload from "../middleware/multerMiddleware.js"
import requireAdmin from "../middleware/adminAuthMiddleware.js"
import requireAuth from "../middleware/authMiddleware.js"

const router = express.Router()

router.get("/",  getProducts)

router.get("/category", getRiceAndGrainsProducts)
router.get("/:category", getProductsByCategory)


router.post("", requireAdmin, upload.single("image"), addProduct)

router.put("/:id", requireAdmin, upload.single("image"), updateProduct)

router.delete("/:id", requireAdmin, deleteProduct)

export default router