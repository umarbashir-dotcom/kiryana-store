import Cart from "../models/Cart.js";
import Product from "../models/Product.js"

// @desc    Get cart of user
// @route   GET /api/cart/
// @access  private 
const getCart = async (req, res) => {

    const cart = await Cart.findOne({ user: req.user.id }).populate("items.product")
    if (!cart) {
        res.status(404)
        throw new Error("Cart was not found")
    }
    res.status(200).json({
        cart: cart
    })
}

// @desc    Add item to cart
// @route   POST /api/cart/items
// @access  private 
const addItemToCart = async (req, res) => {
    const { productId, quantity } = req.body

    if (!productId || !quantity) {
        res.status(400)
        throw new Error("Please add all fields")
    }

    // find cart
    let cart = await Cart.findOne({ user: req.user.id })
    if (!cart) {
        // create cart
        cart = await Cart.create({
            user: req.user.id,
            items: []
        })
    }

    // check for product
    const product = await Product.findById(productId)

    if (!product) {
        res.status(404)
        throw new Error("Product with this productId was not found")
    }

    // check if item already exists, in cart
    const itemExists = cart.items.find(item => item.product.toString() === productId)
    if (itemExists) {
        itemExists.quantity += quantity
    } else {
        // add new item to cart
        cart.items.push({
            product: productId,
            quantity: quantity,
            price: product.price - product.discount
        })
    }

    await cart.save()

    // again get updated cart
    cart = await Cart.findOne({ user: req.user.id }).populate("items.product")

    res.status(201).json({
        cart: cart
    })
}

// @desc    Update item's quantity 
// @route   PUT /api/cart/items/:id
// @access  private 
const updateCartItemQuantity = async (req, res) => {
    const productId = req.params.id
    const { quantity } = req.body

    // find cart
    let cart = await Cart.findOne({ user: req.user.id }).populate("items.product")

    // check if item already exists, in cart
    const itemExists = cart.items.find(item => item.product._id.toString() === productId)
    if (quantity >= 0) {
        itemExists.quantity = quantity
        await cart.save()
    }

    res.status(200).json({
        cart: cart
    })
}

// @desc    Remove item from cart
// @route   DELETE /api/cart/items/:id
// @access  private 
const removeCartItem = async (req, res) => {
    const productId = req.params.id

    // find cart
    const cart = await Cart.findOne({ user: req.user.id }).populate("items.product")

    if (!cart) {
        res.status(404)
        throw new Error("Your cart does not exist")
    }

    // find index of item to remove
    const index = cart.items.findIndex(item => {
        return item.product.id === productId
    })

    if (index !== -1) {
        cart.items.splice(index, 1)
    } else {
        res.status(404)
        throw new Error("This product was not found in your cart")
    }

    await cart.save()

    res.status(200).json({
        cart: cart
    })
}

// @desc    Delete cart
// @route   DELETE /api/cart
// @access  private 
const deleteCart = async (req, res) => {
    // delete cart
    const deletedCart = await Cart.findOneAndDelete({ user: req.user.id })

    if (!deletedCart) {
        res.status(404)
        throw new Error("Cart not Found")
    }

    res.status(204).send() // no content
}


// @desc    Delete many items from cart
// @route   DELETE /api/cart/items
// @access  private 
const deleteManyCartItems = async (req, res) => {
    const { productIds } = req.body

    if (!productIds || productIds.length === 0) {
        return res.status(400).json({
            message: "No product IDs provided"
        })
    }

    const updatedCart = await Cart.findOneAndUpdate(
        { user: req.user.id },
        {
            $pull: {
                items: {
                    product: {
                        $in: productIds
                    }
                }
            }
        },
        { returnDocument: "after" }
    ).populate("items.product")

    console.log(updatedCart)

    res.status(200).json({
        cart: updatedCart
    })
}

export { getCart, addItemToCart, updateCartItemQuantity, removeCartItem, deleteCart, deleteManyCartItems }
