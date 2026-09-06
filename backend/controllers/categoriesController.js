import Category from "../models/Category.js";

// @desc    Get all categories
// @route   GET /api/categories
// @access  Private
const getCategories = async (req, res, next) => {
    const categories = await Category.find()
    return res.status(200).json({
        data: categories,
        success: true,
    })

}

// @desc    Add category
// @route   POST /api/categories
// @access  Private
const addCategory = async (req, res, next) => {
    const { name, slug, image } = req.body
    if (!name || !slug || !image) {
        res.status(400)
        throw new Error("Please add all fields")
    }

    const category = await Category.create({
        name,
        slug,
        image
    })

    if (category) {
        res.status(201).json({
            data: category,
            success: true
        })
    }
}

export { getCategories, addCategory }