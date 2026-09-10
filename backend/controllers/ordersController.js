import Order from "../models/Order.js";
import Cart from "../models/Cart.js"
import mongoose from "mongoose";
import Product from "../models/Product.js";

// @desc    Get user's orders
// @route   GET /api/orders/
// @access  Private
const getAllOrders = async (req, res) => {
    console.log(req.url)
    const limit = req.query.limit
    const page = req.query.page
    const paymentStatus = req.query.paymentStatus || null
    const orderStatus = req.query.orderStatus || null
    const sortValue = req.query.sort || null
    const minAmount = req.query.minAmount
    const maxAmount = req.query.maxAmount

    // build sorting creteria
    const sortOptions = {
        newest: {create_at: -1, _id: -1},
        oldest: {create_at: 1, _id: 1},
        highest: {totalAmount: -1, _id: -1},
        lowest: {totalAmount: 1, _id: 1},

    }

    const sortCriteria = sortOptions[sortValue] || sortOptions["newest"]

    // build filters
    const filters= {}
    if(orderStatus)
        filters.orderStatus = orderStatus

    if(paymentStatus)
        filters.paymentStatus = paymentStatus

    if(minAmount || maxAmount){
        filters.totalAmount = {}
        if(minAmount)
            filters.totalAmount.$gte = Number(minAmount)

        if(maxAmount)
            filters.totalAmount.$lte = Number(maxAmount)
    }

    // build query
    let query;

    // get  orders by filters
    query = Order.find(filters)

    // sort orders
    query = query.sort(sortCriteria)


    // if pagination applied then get paginated orders
    if(page && limit){
        query = query.skip((page - 1) * limit).limit(limit)
    }

    const orders = await query.populate("user")
    const totalOrders = await Order.countDocuments(filters)

    res.status(200).json({
        orders: orders,
        totalOrders
    })
}

// @desc    Get order by Id
// @route   GET /api/orders/:id
// @access  Private
const getOrderById = async (req, res) => {
    const user = req.user.id
    const id = req.params.id

    // get order by id
    let order = await Order.findById(id)

    if(!order){
        res.status(404)
        throw new Error("Order not Found")
    }

    // check for user
    if(order.user.toString() !== user){
        res.status(403)  // forbidden
        throw new Error("Your are not allowed to access this order")
    }
    
    res.status(200).json({ order: order})
}

// @desc    create order
// @route   POST /api/orders
// @access  Private
const createOrder = async (req, res) => {

    const user = req.user.id

    const { name, phone, address, city, paymentMethod } = req.body

    let order;
    // start session context
    const session = await mongoose.startSession()

    try {
        // start transaction
        await session.startTransaction()

        // read cart
        const cart = await Cart.findOne({ user }).populate("items.product").session(session)

        // check if cart exists
        if (!cart) {
            res.status(404)
            throw new Error("Cart was not found")
        }

        // check if cart is empty
        if (cart.items.length === 0) {
            res.status(404)
            throw new Error("Cart is empty")
        }

        // get order items from cart items
        const orderItems = cart.items.map(item => {
            return {
                product: item.product._id,
                price: item.price,
                quantity: item.quantity,
                name: item.product.name,
                subtotal: item.price * item.quantity
            }
        })

        const products = await Product.find()

        // check product existence and it's stock
        for(const item of orderItems){
            
            const product = (products.find(p => p._id.toString() === item.product.toString()))
            if(!product){
                res.status(404)
                throw new Error(`${item.name} does not exist in this shop`)
            }else if(product.stock < item.quantity){
                res.status(400)
                throw new Error(`Insufficient amount of ${product.name} is availabe`)
            }else if(product.stock === 0){
                res.status(400)
                throw new Error(`${product.name} is out of stock`)
            }
        }

        // create order
        order = new Order({
            user: user,
            items: orderItems,
            shippingAddress: {
                name: name,
                address: address,
                phone: phone,
                city: city
            },
            totalAmount: orderItems.reduce((total, item) => total + item.subtotal, 0),
            paymentMethod: paymentMethod.toLowerCase(),
            paymentStatus: "pending",
            orderStatus: paymentMethod.toLowerCase() === "cod" ? "confirmed" : "pending" 
        })

        // save order
        await order.save({ session })

        // decrease stock
        for(const item of orderItems){
            const product = (products.find(p => p._id.toString() === item.product.toString()))
            product.stock -= item.quantity
            await product.save({session})
        }


        // clear cart -> update to ensure same cart in not consumed twice
        const updatedCart = await Cart.findOneAndUpdate(
            { user: user,
              "items.0": {$exists: true}
            },
            {
                $set: {
                    items: []
                }
            },
            { 
                session,
                returnDocument: "after"
            }
        )

        if(!updatedCart){
            res.status(400)
            throw new Error("Cart is already consumed")
        }

        // commit changes permanently -> everything succeeded
        await session.commitTransaction()
    } catch (error) {
        // rollback changes -> something failed
        await session.abortTransaction()
        console.log(error)
        throw error
    } finally {
        // end the session
        session.endSession()
    }

    res.status(201).json({
        orderId: order._id,
    })
}

const getUserOrders = async (req, res) => {
    // get orders by user
    let orders = await Order.find({user: req.user.id})

    if(!orders){
        res.status(404)
        throw new Error("Orders not Found")
    }

    const totalOrders = await Order.countDocuments({user: req.user._id})
    res.status(200).json({ orders: orders,
        totalOrders
    })
}
export { getAllOrders, createOrder, getOrderById, getUserOrders}