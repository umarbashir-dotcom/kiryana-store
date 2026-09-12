import path from "path"
import url from "url"
import express from "express"
import cors from "cors"
import connectDB from "./config/db.js"
import logger from "./middleware/logger.js"
import errorHandler from "./middleware/errorHandler.js"
import productRoutes from "./routes/productRoutes.js"
import categoriesRoute from "./routes/categoriesRoute.js"
import cartRoutes from "./routes/cartRoutes.js"
import wishlistRoutes from "./routes/wishlistRoutes.js"
import orderRoutes from "./routes/orderRoutes.js"
import userRoutes from "./routes/userRoutes.js"
import paymentRoutes from "./routes/paymentRoutes.js"
import requireAuth from "./middleware/authMiddleware.js"
import OTPRoutes from "./routes/OTPRoutes.js"
import { rateLimit } from "express-rate-limit"
// import rateLimiter from "./middleware/rateLimiter.js"

const filename = url.fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)
const port = process.env.PORT
const app = express()

// connecting DB
await connectDB()

// cors middleware
app.use(cors())


// Production deployment is behind Render's reverse proxy
app.set("trust proxy", 1);

app.use("/api/payment/webhook", express.raw({ type: "application/json" }));

// json middleware
app.use(express.json())

// body parser middleware
app.use(express.urlencoded({extended: false}))

// logger middleware
app.use(logger)

// health endpoint for monitoring this site and keepint it up
app.get("/health", (req, res) => {
    res.status(200).send("OK");
});
app.use("/auth", OTPRoutes)

// static file server
app.use("/images/products/", rateLimit({
    limit: 300,
    windowMs: 10 * 60 * 1000,
}),express.static(path.join(dirname, "public/images/products")))

// route Mounting for user
app.use("/api/users", userRoutes)

// route Mounting for products
app.use("/api/products",rateLimit({
    limit: 200,
    windowMs: 10 * 60 * 1000,
}), productRoutes)

// route Mounting for categories
app.use("/api/categories",rateLimit({
    limit: 20,
    windowMs: 15 * 60 * 1000}), categoriesRoute)

// route Mounting for cart
app.use("/api/cart", requireAuth, rateLimit({
    limit: 80,
    windowMs: 15 * 60 * 1000,
    keyGenerator: (req) => `userId:${req.user.id}`
}), cartRoutes)

// route Mounting for wishlist
app.use("/api/wishlist",rateLimit({
    limit: 100,
    windowMs: 15 * 60 * 1000}), requireAuth, wishlistRoutes)

// route Mounting for orders
app.use("/api/orders",rateLimit({
    limit: 100,
    windowMs: 20 * 60 * 1000}), requireAuth, orderRoutes)

// route Mounting for payment
app.use("/api/payment", paymentRoutes)

// global error handler
app.use(errorHandler)

// starting server
app.listen(port, () => console.log(`Server running on port: ${port}`))