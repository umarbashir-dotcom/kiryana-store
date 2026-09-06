import Wishlist from "../models/Wishlist.js";
import Product from "../models/Product.js";

// @desc    Get wishlist
// @route   GET /api/wishlist
// @access  Private
const getWishlist = async (req, res) => {
    const wishlist = await Wishlist.findOne({ user: req.user.id }).populate("items")

    if (!wishlist) {
        res.status(404)
        throw new Error("Wishlist not found")
    }

    res.status(200).json({
        wishlist: wishlist
    })
}

// @desc    Add product to wishlist
// @route   POST /api/wishlist/items/:id
// @access  Private
const addItemToWishlist = async (req, res) => {
    const productId = req.params.id

    if (!productId) {
        res.status(400)
        throw new Error("There is no product Id in your request")
    }

    // check for product
    const product = await Product.findById(productId)
    if (!product) {
        res.status(404)
        throw new Error("Product not Found")
    }

    // find user's wishlist and add product in wishlist's items if it does not exist already.
    const wishlist = await Wishlist.findOneAndUpdate(
        { user: req.user.id },
        {
            // $addToSet -> Product doesn't exist → add it
            // Product already exists → do nothing
            $addToSet: {
                items: productId
            }
        },
        {
            returnDocument: "after",
            upsert: true   // Wishlist exists → update it
            //    Wishlist doesn't exist → create it and add the product
        }
    ).populate("items")

    res.status(201).json({
        wishlist
    })

}

// @desc    Delete product from wishlist
// @route   DELETE /api/wishlist/items/:id
// @access  Private
const deleteItemFromWishlist = async (req, res) => {
    const productId = req.params.id

    if (!productId) {
        res.status(400)
        throw new Error("There is no product Id in your request")
    }

    // find user's wishlist and remove product from wishlist's items if that item exists in array.
    let wishlist = await Wishlist.findOneAndUpdate(
        { user: req.user.id },
        {
            // $pull operator removes element from array if it exists
            // if not exists -> do nothing
            $pull: {
                items: productId
            }
        },
        {
            returnDocument: "after",
        }
    ).populate("items")

    if (!wishlist) {
        res.status(404)
        throw new Error("Wishlist not found")
    }

    res.status(200).json({
        wishlist
    })

}

export { getWishlist, addItemToWishlist, deleteItemFromWishlist }