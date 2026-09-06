import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    items: [
        {
            product: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "Product"
            },
            name: {
                type: String,
                required: true,
            },
            price: {
                type: Number,
                required: true,
            },
            quantity: {
                type: Number,
                required: true,
                min: 1
            },
            subtotal: {
                type: Number,
                required: true,
            },
        },
    ],
    totalAmount: {
        type: Number,
        required: true,
    },
    shippingAddress: {
        name: {
            type: String,
            required: true,
        },
        phone: {
            type: String,
            required: true,
        },
        address: {
            type: String,
            required: true,
        },
        city: {
            type: String,
            required: true,
        },
    },
    paymentMethod: {
        type: String,
        required: true,
    },
    paymentStatus: {
        type: String,
        required: true,
        enum: [ "pending", "paid", "failed", "refunded"]
    },
    orderStatus: {
        type: String,
        required: true,
        enum: [ "pending", "confirmed", "processing", "shipped", "delivered", "cancelled",]
    },
},{
    timestamps: true
})

const Order = mongoose.model("Order", orderSchema)

export default Order;