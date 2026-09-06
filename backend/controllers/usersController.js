import User from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

// @desc    Register new user
// @route   POST /api/users
// @access  Public
const register = async (req, res) => {
    const { name, email, phone, password } = req.body
    // check for empyt input fields
    if (!name || !email || !phone || !password) {
        res.status(400)
        throw new Error("Please add all fields")
    }

    // check for user
    const userExists = await User.findOne({ email })

    if (userExists) {
        res.status(400)
        throw new Error("User with this email already exists")
    }

    // hash the password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // create user
    const user = await User.create({
        name,
        email,
        phone,
        password: hashedPassword
    })

    // return user
    if (user) {
        return res.status(201).json({
            user: {
                    name,
                    email,
                    phone,
                    token: genToken(user.id)
                },
            isAuthenticated: true
        })
    }
}

// @desc    Login user
// @route   POST /api/users/login
// @access  Public
const login = async (req, res) => {
    const { email, password } = req.body

    // check for input fields
    if (!email || !password) {
        res.json(400)
        throw new Error("Please add all fields")
    }

    // find user by email
    const user = await User.findOne({ email })

    if (user && await bcrypt.compare(password, user.password)) {
        return res.status(200).json({
            user: {
                    name: user.name,
                    email: user.email,
                },
            token: jwt.sign({id: user._id, state: "otp-pending"}, process.env.JWT_SECRET,{expiresIn: "5m"}),
            isAuthenticated: false
            
        })
    } else {
        res.status(400)  // bad request
        throw new Error("Invalid username or password")
    }
}

// @desc    Get user info
// @route   GET /api/users/getMe
// @access  Private
const getMe = (req, res) => {
    return res.status(200).json({
        user: req.user,
        isAuthenticated: true,
    })
}

const genToken = (id) => {
    return jwt.sign({id, state: "verified"}, process.env.JWT_SECRET, { expiresIn: "1d"})
}

export { register, login, getMe}