import express from "express"
import {
    getCategories,
    addCategory,
    
} from "../controllers/categoriesController.js"

const router = express.Router()

router.get("/", getCategories)

router.post("/", addCategory)

// router.put("/:id", updateProduct)

// router.delete("/:id", deleteProduct)

export default router