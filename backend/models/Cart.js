import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    items:[{
        product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
        },
        quantity: {
            type: Number,
            required: true
        },
        price:{
            type: Number,
        }
    }],
},
{
    timestamps: true
})

const Cart = mongoose.model("Cart", cartSchema)

export default Cart;