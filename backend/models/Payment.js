import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    order: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Order"
    },
    amount: {
        type: Number,
        required: true,
    },
    currency: {
        type: String,
        required: true,
    },
    provider: {
        type: String,
        required: true,
    },
    transactionId: {
        type: String,
    },
    method: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
        enum: [
            "pending",
            "processing",
            "succeeded",
            "failed",
            "cancelled"
        ],
        default: "pending"
    },
    paidAt: {
        type: Date,
    }
}, {
    timestamps: true
})

const Payment = mongoose.model("payment", paymentSchema)

export default Payment;