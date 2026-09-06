import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Category"
    },
    price: {
        type: Number,
        required: true,
    },
    discount: {
        type: Number,
    },
    quantity: {
        type: Number,
        required: true,
    },
    unit: {
        type: String,
        required: true,
    },
    stock: {
        type: Number,
        required: true,
        min: 0,
        default: 0,
    },
    images:[
        {
            url: {
                type: String,
                // required: true
            },
            public_id: {
                type: String,
                // required: true
            }
        }
    ],
    isActive: {
        type: Boolean,
        required: true,
        default: true
    },
    created_at: {
        type: Date,
        default: Date.now,
    },
})

const Product = mongoose.model("Product", productSchema)

export default Product;