import express from "express"
import { register, login, getMe, update, updateEmail } from "../controllers/usersController.js";
import requireAuth from "../middleware/authMiddleware.js";
import rateLimit from "express-rate-limit";

const router = express.Router()

router.post("/register",rateLimit({
    limit: 10,
    windowMs: 10 * 60 * 1000}), register)

router.post("/login",rateLimit({
    limit: 10,
    windowMs: 10 * 60 * 1000}), login)

router.get("/me",rateLimit({
    limit: 200,
    windowMs: 10 * 60 * 1000}), requireAuth, getMe)

router.put("",rateLimit({
    limit: 10,
    windowMs: 10 * 60 * 1000}), requireAuth, update)

router.put("/update/email",rateLimit({
    limit: 10,
    windowMs: 10 * 60 * 1000}), updateEmail)

export default router