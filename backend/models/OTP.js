import mongoose from "mongoose";

const otpSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    otpHash: {
        type: String,
        required: true
    },
    attempts: {
        type: Number,
        default: 0
    },
    expiresAt: {
        type: Date,
        required: true
    },
})

otpSchema.index({expiresAt: 1}, { expireAfterSeconds: 0})  // automatically deletes expriesAt after its value enters past

const OTP = mongoose.model("OTP", otpSchema)

export default OTP
