import mongoose from "mongoose";

const wishlistSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true  
    },
    items: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        unique: true
    }]
}, {
    timestamps: true
})

const Wishlist = mongoose.model("Wishlist", wishlistSchema)

export default Wishlist;