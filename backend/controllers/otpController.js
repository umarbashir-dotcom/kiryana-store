import OTP from "../models/OTP.js";
import User from "../models/User.js"
import jwt from "jsonwebtoken"
import { generateOtp, hashOtp } from "../utils/otpUtils.js"
import sendOtpEmail from "../utils/mailer.js";

const generateOtpOnRequest = async (req, res, next) => {
    const { email } = req.body

    const otp = generateOtp()
    const otpHash = hashOtp(otp)

    // delete previous otps and create new one
    await OTP.findOneAndUpdate(
        { email },
        {
            email,
            otpHash,
            expiresAt: new Date(Date.now() + 5 * 60 * 1000) // five minutes
        },
        {
            upsert: true,  // if already not exists create new one
        }
    )

    await sendOtpEmail(email, otp)

    res.status(201).json({
        otp: otp,
        message: 'If this account exists, an OTP has been sent.'
    })
} 

const verifyOtpOnRequest = async (req, res, next) => {
    const { email, otp } = req.body

    const record = await OTP.findOne({email})

    if(!record){
        return res.status(400).json({ error: 'Invalid or expired OTP' })
    }

    if(record.attempts >= 5){
        await record.deleteOne()
        return res.status(429).json({error: "Too many requests"})
    }

    if(record.otpHash !== hashOtp(otp)){
        record.attempts += 1
        await record.save()
        return res.status(400).json({ error: "Invalid OTP"})
    }

    await record.deleteOne()

    const user = await User.findOne({email}).select("-password")

    const token = jwt.sign({id: user.id, role: user.role, state: "verified"}, process.env.JWT_SECRET, {expiresIn: "1d"})

    res.status(200).json({
        isAuthenticated: true,
        token: token,
        user: user
    })
}

export { generateOtpOnRequest, verifyOtpOnRequest}