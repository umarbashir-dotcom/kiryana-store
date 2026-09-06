import safepay from "../config/safepay.js";
import Order from "../models/Order.js";
import Payment from "../models/Payment.js";

/*
|--------------------------------------------------------------------------
| CREATE PAYMENT SESSION
|--------------------------------------------------------------------------
*/

export const createPaymentSession = async (req, res) => {
    try {
        const { orderId } = req.body;

        if (!orderId) {
            return res.status(400).json({
                message: "Order ID is required",
            });
        }

        // --------------------------------------------------
        // Get user's order
        // --------------------------------------------------

        const order = await Order.findOne({
            _id: orderId,
            user: req.user._id,
        });

        if (!order) {
            return res.status(404).json({
                message: "Order not found",
            });
        }

        // --------------------------------------------------
        // Create payment session
        // --------------------------------------------------

        const sessionResponse =
            await safepay.payments.session.setup({
                merchant_api_key:
                    process.env.SAFEPAY_PUBLIC_API_KEY,

                intent: "CYBERSOURCE",

                mode: "payment",

                currency: "PKR",

                amount: order.totalAmount,
            });

        const trackerToken =
            sessionResponse.data.tracker.token;

        console.log(
            "SafePay tracker:",
            trackerToken
        );

        // --------------------------------------------------
        // Create Passport authentication token
        //
        // Use the SAME client that was created with the
        // secret key — no second client is needed.
        // --------------------------------------------------
        console.log(Object.keys(safepay))
        console.log(Object.keys(safepay.auth))
        console.log("safepay.client keys:", Object.keys(safepay.client));

        console.log("Webhook secret loaded:", process.env.SAFEPAY_WEBHOOK_SECRET);

        const passportResponse = await safepay.client.passport.create(
            {},
            { secret: process.env.SAFEPAY_SECRET_API_KEY }
        );
        console.log("Raw passport response:", JSON.stringify(passportResponse, null, 2));

        const authToken = passportResponse?.data;

        if (!authToken) {
            throw new Error("SafePay Passport did not return an auth token");
        }

        // --------------------------------------------------
        // Create your Payment record
        // --------------------------------------------------

        const payment = await Payment.create({
            user: req.user._id,
            order: order._id,
            amount: order.totalAmount,
            currency: "PKR",
            provider: "safepay",
            transactionId: trackerToken,
            method: "card",
            status: "pending",
        });

        // --------------------------------------------------
        // Send frontend-safe values
        // --------------------------------------------------

        return res.status(200).json({
            trackerToken,
            authToken,
            paymentId: payment._id,
        });

    } catch (error) {
        console.error(
            "SafePay session creation failed:",
            error
        );

        return res.status(500).json({
            message:
                "Could not start payment session",
        });
    }
};

/*
|--------------------------------------------------------------------------
| VERIFY PAYMENT STATUS
|--------------------------------------------------------------------------
*/

export const verifyPaymentStatus = async (
    req,
    res
) => {

    try {

        const { trackerToken } = req.body;


        if (!trackerToken) {
            return res.status(400).json({
                message:
                    "Tracker token is required",
            });
        }


        const response =
            await safepay.reporter.payments.fetch(
                trackerToken
            );


        const payment =
            await Payment.findOne({
                transactionId: trackerToken,
                user: req.user._id,
            });


        if (!payment) {
            return res.status(404).json({
                message: "Payment not found",
            });
        }


        if (
            response.state ===
            "TRACKER_AUTHORIZED"
        ) {

            payment.status = "succeeded";

            payment.paidAt = new Date();

        } else {

            payment.status = "failed";
        }


        await payment.save();


        return res.status(200).json({
            status: payment.status,
        });

    } catch (error) {

        console.error(
            "Tracker verification failed:",
            error
        );

        return res.status(500).json({
            message:
                "Could not verify payment",
        });
    }
};


/*
|--------------------------------------------------------------------------
| WEBHOOK
|--------------------------------------------------------------------------
*/

export const handleWebhook = async (
    req,
    res
) => {

    try {

        const event =
            safepay.verify.webhook(req);


        const trackerToken =
            event.data.tracker;


        const payment =
            await Payment.findOne({
                transactionId: trackerToken,
            });


        if (!payment) {
            return res.status(404).json({
                message:
                    "Payment record not found",
            });
        }


        if (
            event.type ===
            "payment.succeeded"
        ) {

            payment.status = "succeeded";

            payment.paidAt = new Date();


            await Order.findByIdAndUpdate(
                payment.order,
                {
                    paymentStatus: "paid",
                }
            );

        } else if (
            event.type ===
            "payment.failed"
        ) {

            payment.status = "failed";
        }


        await payment.save();


        return res.status(200).json({
            received: true,
        });

    } catch (error) {

        console.error(
            "Webhook verification failed:",
            error
        );

        return res.status(400).json({
            message:
                "Invalid webhook signature",
        });
    }
};


//  routes
import express from "express";
import requireAuth from "../middleware/authMiddleware.js";
import { createPaymentSession, handleWebhook } from "../controllers/paymentController.js";
import { rateLimit } from "express-rate-limit";

const router = express.Router();

// protect ensures only logged-in users can start a payment session
router.post("/create-session", requireAuth, rateLimit({
    limit: 100,
    windowMs: 15 * 60 * 1000,
    keyGenerator: (req) => `userId:${req.user.id}`
}), createPaymentSession);
// router.post("/create-auth-token",requireAuth,  createAuthToken);

router.post("/webhook", rateLimit({
    windowMs: 15 * 60 * 1000, // 15 min
    limit: 100,
    // by default keyGenerator considers IP as key
}), handleWebhook);


export default router;