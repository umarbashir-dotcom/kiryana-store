import jwt from "jsonwebtoken"
import User from "../models/User.js"

const requireAdmin = async (req, res, next) => {
    let token;

    try {
        if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
            token = req.headers.authorization.split(" ")[1]

            // verify token
            let decoded = jwt.verify(token, process.env.JWT_SECRET)

            // attaching user with req object
            req.user = await User.findById(decoded.id).select("-password")

            if(decoded.role !== "admin"){
                return res.status(403).json({ 
                    user: req.user,
                    isAuthenticated: false,
                    error: "You are not authorized to access this page"})
            }

            next()
        }
    } catch(error){
        console.log(error)
        res.status(401)  // Unauthorized
        throw new Error("Unauthorized user")
    }

    if(!token){
        res.status(401)  // Unauthorized
        throw new Error("Unauthorized user, no token")
    }
}

export default requireAdmin;