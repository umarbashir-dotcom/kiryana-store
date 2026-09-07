import stripe from "../config/stripe.js";
import Order from "../models/Order.js";
import Payment from "../models/Payment.js";

// @desc    handle webhook 
// @route   POST /api/payment/webhook
// @access  Public
const handle_webhook = async (req, res) => {
    const signature = req.headers["stripe-signature"]
    let event;

    try{
        event = stripe.webhooks.constructEvent(
            req.body,  // raw request body sent by stripe
            signature,
            process.env.STRIPE_WEBHOOK_SECRET
        )
    }catch(error){
        console.log("Webhook signature check failed: ", error.message)
        return res.status(400).send(`Webhook error: ${error.message}`)
    }

    if(event.type === 'checkout.session.completed'){
        const session = event.data.object
        const orderId = session.metadata.orderId   // this was attached in create_checkout_session

        const order = await Order.findById(orderId)

        if(order && order.paymentStatus !== "paid"){
            order.paymentStatus = "paid"
            await order.save()

            await Payment.create({
                user: order.user,
                order: order._id,
                currency: session.currency,
                amount: order.totalAmount,
                method: "card",
                provider: "stripe",
                transactionId: session.payment_intent,
                status: "succeeded",
                paidAt: new Date(),
            })
        }
    }

    res.status(200).json({"received": true})
}


// @desc    create checkout session for payment 
// @route   POST /api/payment/create-checkout-session
// @access  Private
const create_checkout_session = async (req, res) => {
    try{
        const user = req.user.id
        const { orderId } = req.body
        
        const order = await Order.findOne({
            _id:  orderId,
            user
        })

        if(!order){
            res.status(404)    
            throw new Error("Order not found")
        }

        if(order.paymentStatus === "paid"){
            res.status(400)
            throw new Error("This order is already paid")
        }

        const line_items = order.items.map(item => ({
            price_data: {
                currency: "pkr",
                product_data: {
                    name: item.name,
                },
                unit_amount: Math.round(item.price * 100)
            },
            quantity: item.quantity,
        }));
    
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items,
            mode: "payment",
            success_url: `https://kiryana-store-jet.vercel.app/order/checkout-success/${order._id}`,
            cancel_url: `https://kiryana-store-jet.vercel.app/order/checkout-cancel/${order._id}`,
            metadata: { 
                orderId: order._id.toString()
            }
        });
    
        res.status(200).json({url: session.url})
    } catch(error){
        console.log(error)
        res.status(500).json({message: "Something went wrong"})
    }
}


export { create_checkout_session, handle_webhook }