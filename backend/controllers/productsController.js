import Category from "../models/Category.js";
import Product from "../models/Product.js";
import uploadToCloudinary from "../utils/cloudinaryUploader.js";
import cloudinary from "../config/cloudinary.js";

// @desc    Get all products
// @route   GET /api/products
// @access  Public
const getProducts = async (req, res) => {

    const limit = req.query.limit || null
    const page = req.query.page || null
    const searchedText = req.query.search || null

    let query;
    let totalProducts;

    // search products by filter
    let filter = {}

    if (searchedText) {
        filter.$or = [
            { name: { $regex: searchedText, $options: "i" } },
            { description: { $regex: searchedText, $options: "i" } },
            { slug: { $regex: searchedText, $options: "i" } },
        ]
        query = Product.find(filter)
    } else {
        query = Product.find()
    }

    // sort the documents
    query = query.sort({_id: -1})

    // skip these products 
    if (page)
        query = query.skip((page - 1) * limit)

    // get limited products
    if (limit)
        query = query.limit(limit)

    // get products 
    const products = await query.populate("category")

    // get no. of total products
    if(searchedText){
        totalProducts= await Product.countDocuments(filter)
    } else{
        totalProducts= await Product.countDocuments()
    }
    
    res.status(200).json({
        products: products,
        success: true,
        totalProducts: totalProducts,
        limit: Number(limit) || null,
        page: Number(page) || null,
        totalPages: Math.ceil(totalProducts / (limit || 1))
    })

}

// @desc    Add new product
// @route   POST /api/products
// @access  Private
const addProduct = async (req, res, next) => {

    let { description, price, discount, quantity, unit, name, slug, images, isActive,
        category, stock
    } = req.body

    // Check for all fields
    if (!description || !price || !discount || !quantity || !unit || !stock || !name || !slug || !images || !isActive || !category) {
        res.status(400)
        throw new Error("Please add all fields")
    }

    images = JSON.parse(images)
    // upload  image to cloudinay
    if (req.file) {
        const result = await uploadToCloudinary(req.file.buffer)
        images.push({
            url: result.secure_url,
            public_id: result.public_id
        })
    }

    // create new product
    let product = await Product.create(
        {
            name,
            description,
            slug,
            category,
            unit,
            quantity: Number(quantity),
            price: Number(price),
            discount: Number(discount),
            stock: Number(stock),
            isActive: isActive === "true",
            images
        }
    )

    product = await product.populate("category")
    const totalProducts = await Product.countDocuments()
    res.status(201).json({
        product,
        totalProducts
    })
}

// @desc    Update product
// @route   PUT /api/products/:id
// @access  Private
const updateProduct = async (req, res, next) => {

    const id = req.params.id

    const { description, price, discount, quantity, unit, name, slug, images, isActive,
        category, stock
    } = req.body

    // Check for all fields
    if (!description || !price || !discount || !quantity || !unit || !stock || !name || !slug || !images || !isActive || !category) {
        res.status(400)
        throw new Error("Please add all fields")
    }

    const currentImages = JSON.parse(images)
    // get images from database
    let db_images = await Product.findById(id)
    db_images = db_images.images
    
    // compare current images with db images to get images to be deleted
    const imagesToDelete = db_images.filter(db_image => (
        !currentImages.some(curr_image => (
            curr_image.url === db_image.url
        ))
    ))

    // remove images from cloudiary
    for(const img of imagesToDelete){
        let d = await cloudinary.uploader.destroy(img.public_id)
        console.log(d)
    }

    // upload new image to cloudinay
    if (req.file) {
        const result = await uploadToCloudinary(req.file.buffer)
        currentImages.push({
            url: result.secure_url,
            public_id: result.public_id
        })
    }
    

    console.log(currentImages)

    let product = await Product.findByIdAndUpdate(id,
        {
            name,
            description,
            slug,
            category,
            unit,
            quantity: Number(quantity),
            price: Number(price),
            discount: Number(discount),
            stock: Number(stock),
            isActive: isActive === "true",
            images: currentImages
            
        },
        {returnDocument: "after"}
    )
    
    // if product not exists
    if (!product) {
        res.status(404)
        throw new Error("Product with this id not found")
    }

    product = await product.populate("category")
    const totalProducts = await Product.countDocuments()
    res.status(200).json({
        product,
        totalProducts
    })

}

// @desc    Delete product
// @route   DELETE /api/products/:id
// @access  Private
const deleteProduct = async (req, res) => {

    const id = req.params.id

    // Check if product exists
    const product = await Product.findById(id)

    if (!product) {
        res.status(404)
        throw new Error("Product not Found")
    }

    // delete images from cloudinary
    if (product.images.length > 0) {
        for (const img of product.images) {
            await cloudinary.uploader.destroy(img.public_id);            
        }
    }

    // delete product
    const deletedProduct = await Product.findByIdAndDelete(id)

    // get no. of total products
    const totalProducts = await Product.countDocuments()

    res.status(200).json({
        deletedId: deletedProduct._id,
        totalProducts
    })
}

// @desc    Get Rice and Grains products
// @route   GET /api/products/category?category=x
// @access  Public
const getRiceAndGrainsProducts = async (req, res, next) => {

    const limit = req.query.limit || null

    // get id of rice-and-grains category by slug
    const slug = req.query.category
    const category = await Category.findOne({ slug })

    if (!category) {
        res.status(404)
        throw new Error("Category not Found")
    }

    // get products by category id
    let query = Product.find({ category: category._id })

    if (limit)
        query = query.limit(limit)

    // get products 
    const products = await query

    // get no. of total products
    const total = await Product.countDocuments({ category: category._id })

    res.status(200).json({
        data: products,
        success: true,
        total: total
    })

}

// @desc    Get products by category
// @route   GET /api/products/:category
// @access  Private
const getProductsByCategory = async (req, res, next) => {

    // get id of rice-and-grains category by slug
    const slug = req.params.category
    const category = await Category.findOne({ slug })

    if (!category) {
        res.status(404)
        throw new Error("Category not Found")
    }

    // get products by category id
    let query = Product.find({ category: category._id })

    // get products 
    const products = await query

    // get no. of total products
    const total = await Product.countDocuments({ category: category._id })

    res.status(200).json({
        data: products,
        success: true,
        total: total
    })

}

export { getProducts, addProduct, updateProduct, deleteProduct, getRiceAndGrainsProducts, getProductsByCategory }