import crypto from "crypto"

// generate otp
const generateOtp = (identifier) => {
    return crypto.randomInt(100000, 999999).toString()
}

// hash otp
const hashOtp = (otp) => {
    return crypto.createHash("sha256").update(otp).digest("hex")
}

export { generateOtp, hashOtp}