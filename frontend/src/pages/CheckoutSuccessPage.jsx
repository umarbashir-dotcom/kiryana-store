import React, { useState, useEffect, useRef } from 'react'
import { Link, useParams } from "react-router-dom"
import orderService from "../services/orderService"

const POLL_INTERVAL = 2000   // check every 2 seconds
const MAX_POLL_TIME = 15000  // give up after 15 seconds

const CheckoutSuccessPage = () => {
    const { orderId } = useParams()
    const [order, setOrder] = useState(null)
    const [status, setStatus] = useState("confirming") // "confirming" | "paid" | "still-processing" | "error"

    useEffect(() => {
        let intervalId
        let timeoutId

        const checkOrder = async () => {
            try {
                const data = await orderService.getOrder(orderId)
                setOrder(data)

                if (data.paymentStatus === "paid") {
                    setStatus("paid")
                    clearInterval(intervalId)
                    clearTimeout(timeoutId)
                }
            } catch (err) {
                setStatus("error")
                clearInterval(intervalId)
                clearTimeout(timeoutId)
            }
        }

        // check immediately once, then start polling
        checkOrder()
        intervalId = setInterval(checkOrder, POLL_INTERVAL)

        // stop polling after MAX_POLL_TIME, if still not paid
        timeoutId = setTimeout(() => {
            clearInterval(intervalId)
            setStatus((current) => (current === "paid" ? current : "still-processing"))
        }, MAX_POLL_TIME)

        // cleanup: runs if the user navigates away before polling finishes
        return () => {
            clearInterval(intervalId)
            clearTimeout(timeoutId)
        }
    }, [orderId])

    if (status === "error") {
        return (
            <div className="min-h-screen flex items-center justify-center px-4">
                <p className="text-gray-500 text-sm">Could not load your order. Please check "My Orders".</p>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-emerald-50 via-white to-white flex items-center justify-center px-4">
            <div className="max-w-md w-full bg-white rounded-3xl shadow-xl shadow-emerald-100/50 ring-1 ring-gray-100 p-10 text-center relative overflow-hidden">

                <div className="absolute -top-24 -right-24 w-56 h-56 bg-emerald-100 rounded-full blur-3xl opacity-60"></div>
                <div className="absolute -bottom-24 -left-24 w-56 h-56 bg-emerald-50 rounded-full blur-3xl opacity-60"></div>

                <div className="relative">
                    {status === "confirming" ? (
                        <div className="mx-auto w-20 h-20 rounded-full bg-amber-100 flex items-center justify-center ring-8 ring-amber-50">
                            <svg className="w-8 h-8 text-amber-600 animate-spin" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                            </svg>
                        </div>
                    ) : (
                        <div className="mx-auto w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center ring-8 ring-emerald-50 animate-[scale-in_0.4s_ease-out]">
                            <svg className="w-10 h-10 text-emerald-600" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                    )}

                    <h1 className="mt-6 text-2xl font-bold text-gray-900 tracking-tight">
                        {status === "confirming" && "Confirming Your Payment"}
                        {status === "paid" && "Payment Successful"}
                        {status === "still-processing" && "Almost There"}
                    </h1>

                    <p className="mt-2 text-sm text-gray-500 leading-relaxed">
                        {status === "confirming" && "Hang tight — we're verifying your payment."}
                        {status === "paid" && "Thank you — your order has been confirmed."}
                        {status === "still-processing" && "Your payment is taking a bit longer to confirm. We'll update your order shortly — no need to pay again."}
                    </p>

                    {order && (
                        <div className="mt-8 bg-gray-50 rounded-2xl p-5 text-left space-y-3 ring-1 ring-gray-100">
                            <div className="flex items-center justify-between">
                                <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Order ID</span>
                                <span className="text-sm font-semibold text-gray-900 font-mono">{order._id}</span>
                            </div>
                            <div className="h-px bg-gray-200"></div>
                            <div className="flex items-center justify-between">
                                <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Status</span>
                                <span className={`inline-flex items-center gap-1.5 text-sm font-semibold px-2.5 py-1 rounded-full ${
                                    status === "paid" ? "text-emerald-700 bg-emerald-100" : "text-amber-700 bg-amber-100"
                                }`}>
                                    <span className={`w-1.5 h-1.5 rounded-full ${status === "paid" ? "bg-emerald-500" : "bg-amber-500"}`}></span>
                                    {status === "paid" ? "Paid" : "Confirming..."}
                                </span>
                            </div>
                        </div>
                    )}

                    <div className="mt-8 flex flex-col gap-3">
                        <Link to="/orders"
                            className="w-full inline-flex items-center justify-center bg-gray-900 text-white text-sm font-semibold rounded-xl py-3.5 hover:bg-gray-800 active:scale-[0.98] transition-all duration-150">
                            View My Orders
                        </Link>
                        <Link to="/"
                            className="w-full inline-flex items-center justify-center text-gray-500 text-sm font-medium rounded-xl py-3 hover:text-gray-900 hover:bg-gray-50 transition-colors duration-150">
                            Continue Shopping
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CheckoutSuccessPage