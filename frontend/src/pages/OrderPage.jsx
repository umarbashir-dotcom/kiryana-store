import React, { useState, useContext } from 'react'
import { Navigate, useNavigate } from "react-router-dom"
import { CartContext } from '../context/CartContext'
import { OrderContext } from "../context/OrderContext"
import QuantityStepper from '../components/QuantityStepper'
import orderService from '../services/orderService'
import { toast } from 'sonner'

const OrderPage = () => {
    const { cartItems, getCart } = useContext(CartContext)
    const { placeOrder,orderItems, setOrderItems } = useContext(OrderContext)
    const navigate = useNavigate()

    const totalAmount = orderItems.reduce((total, item) =>
        total + (item.quantity * item.price), 0)

    const [shippingFormData, setShippingFormData] = useState({
        name: "",
        phone: "",
        address: "",
        city: ""
    })
    const [shippingErrors, setShippingErrors] = useState({})

    const [paymentMethod, setPaymentMethod] = useState("cod")

    // Independent states for each collapsible section
    const [shippingOpen, setShippingOpen] = useState(false)
    const [paymentOpen, setPaymentOpen] = useState(true)

    const [disabled, setDisabled] = useState(false)

    // valid shipping 
    const validateShipping = () => {
        const errors = {}

        if (!shippingFormData.name.trim()) {
            errors.name = "Full name is required"
        }
        if (!shippingFormData.phone.trim()) {
            errors.phone = "Phone number is required"
        }
        if (!shippingFormData.address.trim()) {
            errors.address = "Address is required"
        }

        return errors
    }

    // input field change handler
    const handleChange = (e) => {
        setShippingFormData(prev => {
            return {
                ...prev,
                [e.target.name]: e.target.value
            }
        })
    }

    // submitForm handler
    const submitOrder = async (e) => {
        e.preventDefault()

        const errors = validateShipping()
        // check if shipping details are empty
        if (Object.keys(errors).length > 0) {
            setShippingErrors(errors)

            if (!shippingOpen)
                setShippingOpen(true)

            // scroll to shipping section
            setTimeout(() => {
                document.getElementById("shipping-section")?.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                })
            }, 0)

            return
        }

        try {
            setDisabled(true)
            const orderPromise = placeOrder({ ...shippingFormData, paymentMethod: paymentMethod })
            toast.promise(orderPromise, {
                loading: "Placing your order...",
                success: {
                    message: "Order placed successfully",
                    description: "Your order has been confirmed.",
                },
                // error: "Couldn't place your order",
            })
            const orderData = await orderPromise

            setOrderItems([])
            await getCart()
            setShippingFormData({
                name: "",
                phone: "",
                address: "",
                city: ""
            })
            if(paymentMethod === "card"){
                const checkoutUrl = await orderService.createCheckoutSession(orderData.orderId)
                window.location.href = checkoutUrl
                return
            }
            return navigate(`/checkout/${orderId}`)
            
        } catch (error) {
            console.log(error)
            toast.error(error.message,
                { description: "Couldn't place your order" }
            )
        } finally {
            setDisabled(false)
            setShippingErrors({})
        }
    }

    const goBack = () => {
        window.history.back()
    }

    const continueShopping = () => {
        navigate("/")
        // return <Navigate to="/" replace/>
    }

    return (
        // <!-- CheckoutPage -->
        <div className="min-h-screen bg-[#FAFAF8]">

            {/* <!-- CheckoutHeader --> */}
            <header className="sticky top-0 z-10 bg-white border-b border-gray-200 px-4 py-4 flex items-center gap-3">

                <button
                    type="button"
                    onClick={goBack}
                    className="p-1 -ml-1 text-gray-500 hover:text-gray-900 hover:bg-gray-100 active:bg-gray-200 rounded-lg transition-colors"
                    aria-label="Go back"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="22"
                        height="22"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="m15 18-6-6 6-6" />
                    </svg>
                </button>

                <h1 className="text-lg font-semibold text-gray-900">
                    Checkout
                </h1>

            </header>


            {/* Container is normal block flow below lg,
                and becomes a row with a sticky right sidebar at lg */}
            <div className="px-4 py-4 max-w-5xl mx-auto lg:flex lg:gap-8 lg:items-start">


                {/* <!-- CheckoutForm --> */}
                <div className="lg:flex-1 space-y-3">


                    {/* =====================================================
                        SHIPPING DETAILS
                    ====================================================== */}

                    <div id="shipping-section" className="bg-white rounded-xl border border-gray-100 overflow-hidden">

                        {/* Shipping Details Header */}
                        <button
                            type="button"
                            onClick={() => setShippingOpen(!shippingOpen)}
                            className="w-full flex items-center justify-between px-4 py-3.5 hover:bg-gray-50 active:bg-gray-100 transition-colors"
                            aria-expanded={shippingOpen}
                        >

                            <span className="text-sm font-semibold text-gray-900">
                                Shipping Details
                            </span>

                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="18"
                                height="18"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                className={`text-gray-400 transition-transform duration-200 ${shippingOpen ? "rotate-180" : ""
                                    }`}
                            >
                                <path d="m6 9 6 6 6-6" />
                            </svg>

                        </button>


                        {/* Shipping Details Content */}
                        {shippingOpen && (
                            <form className="px-4 pb-4 space-y-3 border-t border-gray-100 pt-3">

                                <div>

                                    <label
                                        htmlFor="name"
                                        className="block text-xs font-medium text-gray-500 mb-1"
                                    >
                                        Full Name
                                    </label>

                                    <input
                                        id="name"
                                        name="name"
                                        type="text"
                                        placeholder="Enter your full name"
                                        className="w-full px-3 py-2.5 text-sm rounded-lg border border-gray-200 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1F6F4A]/30 focus:border-[#1F6F4A]"
                                        value={shippingFormData.name}
                                        onChange={handleChange}
                                    />
                                    {shippingErrors.name && (
                                        <p className="mt-1 text-xs text-red-500">
                                            {shippingErrors.name}
                                        </p>
                                    )}
                                </div>


                                <div>

                                    <label
                                        htmlFor="phone"
                                        className="block text-xs font-medium text-gray-500 mb-1"
                                    >
                                        Phone Number
                                    </label>

                                    <input
                                        id="phone"
                                        name="phone"
                                        type="tel"
                                        placeholder="03XX-XXXXXXX"
                                        className="w-full px-3 py-2.5 text-sm rounded-lg border border-gray-200 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1F6F4A]/30 focus:border-[#1F6F4A]"
                                        value={shippingFormData.phone}
                                        onChange={handleChange}
                                    />

                                    {shippingErrors.phone && (
                                        <p className="mt-1 text-xs text-red-500">
                                            {shippingErrors.phone}
                                        </p>
                                    )}
                                </div>


                                <div>

                                    <label
                                        htmlFor="address"
                                        className="block text-xs font-medium text-gray-500 mb-1"
                                    >
                                        Address
                                    </label>

                                    <textarea
                                        id="address"
                                        name="address"
                                        rows="2"
                                        placeholder="House #, Street, Area"
                                        className="w-full px-3 py-2.5 text-sm rounded-lg border border-gray-200 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1F6F4A]/30 focus:border-[#1F6F4A] resize-none"
                                        value={shippingFormData.address}
                                        onChange={handleChange}
                                    ></textarea>

                                    {shippingErrors.address && (
                                        <p className="mt-1 text-xs text-red-500">
                                            {shippingErrors.address}
                                        </p>
                                    )}
                                </div>


                                <div>

                                    <label
                                        htmlFor="city"
                                        className="block text-xs font-medium text-gray-500 mb-1"
                                    >
                                        City
                                    </label>

                                    <input
                                        id="city"
                                        name="city"
                                        type="text"
                                        placeholder="e.g. Faisalabad"
                                        className="w-full px-3 py-2.5 text-sm rounded-lg border border-gray-200 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1F6F4A]/30 focus:border-[#1F6F4A]"
                                        value={shippingFormData.city}
                                        onChange={handleChange}
                                    />

                                </div>

                            </form>
                        )}

                    </div>



                    {/* =====================================================
    PAYMENT METHOD
====================================================== */}

                    <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">

                        {/* Payment Method Header */}
                        <button
                            type="button"
                            onClick={() => setPaymentOpen(!paymentOpen)}
                            className="w-full flex items-center justify-between px-4 py-3.5 hover:bg-gray-50 active:bg-gray-100 transition-colors"
                            aria-expanded={paymentOpen}
                        >
                            <span className="text-sm font-semibold text-gray-900">
                                Select Payment Mode
                            </span>

                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="18"
                                height="18"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                className={`text-gray-400 transition-transform duration-200 ${paymentOpen ? "rotate-180" : ""
                                    }`}
                            >
                                <path d="m6 9 6 6 6-6" />
                            </svg>
                        </button>


                        {/* Payment Method Content */}
                        {paymentOpen && (
                            <div className="px-4 pb-4 border-t border-gray-100 pt-4">

                                <fieldset>

                                    <legend className="sr-only">
                                        Select Payment Method
                                    </legend>

                                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">

                                        {/* Cash on Delivery */}
                                        <label
                                            className={`relative flex flex-col items-center gap-2 p-3 rounded-xl border-2 cursor-pointer transition-colors ${paymentMethod === "cod"
                                                ? "border-[#1F6F4A] bg-[#1F6F4A]/5"
                                                : "border-gray-100 hover:bg-gray-50"
                                                }`}
                                        >
                                            <input
                                                type="radio"
                                                name="paymentMethod"
                                                value="cod"
                                                checked={paymentMethod === "cod"}
                                                onChange={(e) => setPaymentMethod(e.target.value)}
                                                className="sr-only"
                                            />

                                            <div className="w-12 h-12 rounded-full bg-[#E8F5EE] flex items-center justify-center">

                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="26"
                                                    height="26"
                                                    viewBox="0 0 48 48"
                                                >
                                                    <rect
                                                        x="4"
                                                        y="14"
                                                        width="40"
                                                        height="24"
                                                        rx="4"
                                                        fill="#4CAF7D"
                                                    />

                                                    <rect
                                                        x="4"
                                                        y="14"
                                                        width="40"
                                                        height="24"
                                                        rx="4"
                                                        fill="none"
                                                        stroke="#2E8B57"
                                                        strokeWidth="1.5"
                                                    />

                                                    <circle
                                                        cx="24"
                                                        cy="26"
                                                        r="7"
                                                        fill="#FFF6D9"
                                                    />

                                                    <text
                                                        x="24"
                                                        y="30"
                                                        fontSize="10"
                                                        fontWeight="700"
                                                        textAnchor="middle"
                                                        fill="#E0A800"
                                                    >
                                                        ₨
                                                    </text>

                                                    <circle
                                                        cx="10"
                                                        cy="18"
                                                        r="2"
                                                        fill="#2E8B57"
                                                    />

                                                    <circle
                                                        cx="38"
                                                        cy="34"
                                                        r="2"
                                                        fill="#2E8B57"
                                                    />
                                                </svg>

                                            </div>

                                            <span className="text-xs font-medium text-gray-900 text-center">
                                                Cash on Delivery
                                            </span>

                                        </label>


                                        {/* Debit / Credit Card */}
                                        <label
                                            className={`relative flex flex-col items-center gap-2 p-3 rounded-xl border-2 cursor-pointer transition-colors ${paymentMethod === "card"
                                                ? "border-[#1F6F4A] bg-[#1F6F4A]/5"
                                                : "border-gray-100 hover:bg-gray-50"
                                                }`}
                                        >
                                            <input
                                                type="radio"
                                                name="paymentMethod"
                                                value="card"
                                                checked={paymentMethod === "card"}
                                                onChange={(e) => setPaymentMethod(e.target.value)}
                                                className="sr-only"
                                            />

                                            <div className="w-12 h-12 rounded-full bg-[#FFEEEE] flex items-center justify-center">

                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="26"
                                                    height="26"
                                                    viewBox="0 0 48 48"
                                                >
                                                    <rect
                                                        x="5"
                                                        y="10"
                                                        width="38"
                                                        height="26"
                                                        rx="4"
                                                        fill="#FF8A65"
                                                    />

                                                    <rect
                                                        x="5"
                                                        y="16"
                                                        width="38"
                                                        height="6"
                                                        fill="#5C2E1E"
                                                    />

                                                    <rect
                                                        x="9"
                                                        y="28"
                                                        width="12"
                                                        height="4"
                                                        rx="1"
                                                        fill="#FFE0D2"
                                                    />

                                                    <circle
                                                        cx="34"
                                                        cy="30"
                                                        r="4"
                                                        fill="#FFD54F"
                                                    />

                                                    <circle
                                                        cx="38"
                                                        cy="30"
                                                        r="4"
                                                        fill="#F44336"
                                                        opacity="0.85"
                                                    />
                                                </svg>

                                            </div>

                                            <span className="text-xs font-medium text-gray-900 text-center">
                                                Debit / Credit Card
                                            </span>

                                        </label>


                                        {/* Bank Transfer */}
                                        <label
                                            className={`relative flex flex-col items-center gap-2 p-3 rounded-xl border-2 cursor-pointer transition-colors ${paymentMethod === "bank_transfer"
                                                ? "border-[#1F6F4A] bg-[#1F6F4A]/5"
                                                : "border-gray-100 hover:bg-gray-50"
                                                }`}
                                        >
                                            <input
                                                type="radio"
                                                name="paymentMethod"
                                                value="bank_transfer"
                                                checked={paymentMethod === "bank_transfer"}
                                                onChange={(e) => setPaymentMethod(e.target.value)}
                                                className="sr-only"
                                            />

                                            <div className="w-12 h-12 rounded-full bg-[#F1EEFE] flex items-center justify-center">

                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="26"
                                                    height="26"
                                                    viewBox="0 0 48 48"
                                                >
                                                    <path
                                                        d="M24 6 44 16H4z"
                                                        fill="#9575CD"
                                                    />

                                                    <rect
                                                        x="8"
                                                        y="18"
                                                        width="4"
                                                        height="16"
                                                        fill="#7E57C2"
                                                    />

                                                    <rect
                                                        x="16"
                                                        y="18"
                                                        width="4"
                                                        height="16"
                                                        fill="#7E57C2"
                                                    />

                                                    <rect
                                                        x="24"
                                                        y="18"
                                                        width="4"
                                                        height="16"
                                                        fill="#7E57C2"
                                                    />

                                                    <rect
                                                        x="32"
                                                        y="18"
                                                        width="4"
                                                        height="16"
                                                        fill="#7E57C2"
                                                    />

                                                    <rect
                                                        x="5"
                                                        y="36"
                                                        width="38"
                                                        height="4"
                                                        rx="1"
                                                        fill="#5E35B1"
                                                    />
                                                </svg>

                                            </div>

                                            <span className="text-xs font-medium text-gray-900 text-center">
                                                Bank Transfer
                                            </span>

                                        </label>

                                    </div>

                                </fieldset>

                            </div>
                        )}

                    </div>


                    {/* =====================================================
                        ORDER REVIEW — NOT COLLAPSIBLE
                    ====================================================== */}

                    <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">

                        {/* Normal heading — NOT a button */}
                        <div className="px-4 py-3.5">

                            <span className="text-sm font-semibold text-gray-900">
                                Order Review
                            </span>

                        </div>


                        {/* Order Review Content */}
                        <div className="border-t border-gray-100">

                            <table className="w-full text-sm hidden sm:table">

                                <thead>

                                    <tr className="border-b border-gray-100">

                                        <th className="text-left font-medium text-gray-500 px-4 py-2.5">
                                            Product
                                        </th>

                                        <th className="text-left font-medium text-gray-500 px-4 py-2.5">
                                            Name
                                        </th>

                                        <th className="text-center font-medium text-gray-500 px-4 py-2.5">
                                            Qty
                                        </th>

                                        <th className="text-right font-medium text-gray-500 px-4 py-2.5">
                                            Unit Price
                                        </th>

                                        <th className="text-right font-medium text-gray-500 px-4 py-2.5">
                                            Total
                                        </th>

                                    </tr>

                                </thead>


                                <tbody>

                                    {/* repeat per cart item */}

                                    {orderItems.map(item =>
                                    (<tr className="border-b border-gray-50 last:border-0" key={item.product._id}>

                                        <td className="px-4 py-2.5">

                                            <img
                                                src={item.product.images[0].url}
                                                alt={item.product.name}
                                                className="w-10 h-10 rounded-lg object-cover bg-gray-100"
                                            />

                                        </td>

                                        <td className="px-4 py-2.5 text-gray-900">
                                            {item.product.name} {item.product.quantity}{item.product.unit}
                                        </td>

                                        <td className="px-4 py-2.5 text-center">
                                            <QuantityStepper
                                                cartItem={item}
                                                size="sm"
                                                page="OrderPage"
                                            />
                                        </td>

                                        <td className="px-4 py-2.5 text-right text-gray-600">
                                            ₨ {item.price.toLocaleString()}
                                        </td>

                                        <td className="px-4 py-2.5 text-right font-medium text-gray-900">
                                            ₨ {(item.price * item.quantity).toLocaleString()}
                                        </td>

                                    </tr>)
                                    )}

                                </tbody>

                            </table>

                            {/* Mobile stacked rows */}
                            <div className="sm:hidden divide-y divide-gray-50">
                                {orderItems.map(item => (
                                    <div
                                        className="flex items-center gap-3 px-4 py-3"
                                        key={item.product._id}
                                    >
                                        <img
                                            src={item.product.images[0].url}
                                            alt={item.product.name}
                                            className="w-12 h-12 rounded-lg object-cover bg-gray-100 shrink-0"
                                        />

                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm text-gray-900 truncate">
                                                {item.product.name} {item.product.quantity}{item.product.unit}
                                            </p>

                                            <p className="text-xs text-gray-500 mt-0.5">
                                                ₨ {item.price.toLocaleString()} each
                                            </p>

                                            <div className="flex items-center justify-between gap-3 mt-2">
                                                <QuantityStepper
                                                    cartItem={item}
                                                    size="sm"
                                                    page="OrderPage"
                                                />

                                                <span className="text-sm font-semibold text-gray-900">
                                                    ₨ {(item.quantity * item.price).toLocaleString()}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                        </div>
                    </div>
                </div>

                {/* =====================================================
                    ORDER SUMMARY
                ====================================================== */}

                <div className="mt-3 lg:mt-0 lg:w-80">

                    <div className="bg-white rounded-xl border border-gray-100 p-4 lg:sticky lg:top-20">

                        <h2 className="text-sm font-semibold text-gray-900 mb-3">
                            Amount Summary
                        </h2>


                        <div className="space-y-2 text-sm">

                            <div className="flex justify-between text-gray-600">

                                <span>
                                    Total Quantity
                                </span>

                                <span>
                                    {orderItems.reduce((total, item) => total + item.quantity, 0)}
                                </span>

                            </div>


                            <div className="flex justify-between text-gray-600">

                                <span>
                                    Amount (MRP)
                                </span>

                                <span>
                                    ₨ {totalAmount.toLocaleString()}
                                </span>

                            </div>


                            <div className="flex justify-between text-gray-600">

                                <span>
                                    Delivery Charges
                                </span>

                                <span>
                                    ₨ 100
                                </span>

                            </div>

                        </div>


                        <div className="border-t border-gray-100 mt-3 pt-3 flex justify-between items-center">

                            <span className="text-sm font-semibold text-gray-900">
                                Net Payable
                            </span>

                            <span className="text-lg font-bold text-[#1F6F4A]">
                                ₨ {(totalAmount + 100).toLocaleString()}
                            </span>

                        </div>


                        {/* Order Summary Buttons */}
                        <div className="mt-4 flex gap-2">

                            {/* Continue Shopping */}
                            <button
                                type="button"
                                onClick={continueShopping}
                                className="flex-1 border border-gray-200 bg-white text-gray-600 text-sm font-medium py-3 rounded-lg hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800 active:bg-gray-100 transition-colors"
                            >
                                Continue Shopping
                            </button>


                            {/* Place Order */}
                            <button
                                type="button"
                                className="flex-1 bg-[#1F6F4A] text-white text-sm font-medium py-3 rounded-lg hover:bg-[#195a3b] active:bg-[#12442c] active:scale-[0.98] transition-all"
                                disabled={disabled}
                                onClick={submitOrder}
                            >
                                Place Order
                            </button>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    )
}

export default OrderPage