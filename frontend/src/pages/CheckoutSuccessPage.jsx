import React, { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import orderService from "../services/orderService"

const POLL_INTERVAL = 2000
const MAX_POLL_TIME = 15000

const CheckoutSuccessPage = () => {
    const { orderId } = useParams()

    const [order, setOrder] = useState(null)
    const [status, setStatus] = useState("loading")
    // "loading" | "confirming" | "confirmed" | "processing" | "error"

    useEffect(() => {
        let intervalId = null
        let timeoutId = null
        let stopped = false

        const stopPolling = () => {
            if (intervalId) {
                clearInterval(intervalId)
                intervalId = null
            }

            if (timeoutId) {
                clearTimeout(timeoutId)
                timeoutId = null
            }
        }

        const checkOrder = async () => {
            try {
                const data = await orderService.getOrder(orderId)

                if (stopped) return

                setOrder(data)

                /*
                 * COD:
                 * The order is already confirmed when it is created.
                 * There is no Stripe webhook to wait for.
                 */
                if (data.paymentMethod === "cod") {
                    setStatus("confirmed")
                    stopPolling()
                    return
                }

                /*
                 * CARD:
                 * The Stripe webhook changes paymentStatus to "paid".
                 */
                if (data.paymentStatus === "paid") {
                    setStatus("confirmed")
                    stopPolling()
                    return
                }

                /*
                 * Card payment is still waiting for webhook confirmation.
                 */
                setStatus("confirming")
            } catch (error) {
                if (stopped) return

                setStatus("error")
                stopPolling()
            }
        }

        const start = async () => {
            /*
             * First request happens immediately.
             */
            await checkOrder()

            if (stopped) return

            /*
             * We only need polling for card payments.
             *
             * The first response tells us whether this is COD
             * or card. For COD, checkOrder() already stopped everything.
             */
            intervalId = setInterval(checkOrder, POLL_INTERVAL)

            /*
             * Don't wait forever if the webhook is delayed.
             */
            timeoutId = setTimeout(() => {
                if (intervalId) {
                    clearInterval(intervalId)
                    intervalId = null
                }

                if (!stopped) {
                    setStatus((current) => {
                        if (current === "confirmed") {
                            return current
                        }

                        return "processing"
                    })
                }
            }, MAX_POLL_TIME)
        }

        start()

        return () => {
            stopped = true
            stopPolling()
        }
    }, [orderId])

    /*
     * Error state
     */
    if (status === "error") {
        return (
            <div className="min-h-screen bg-gradient-to-b from-emerald-50 via-white to-white flex items-center justify-center px-4">
                <div className="w-full max-w-md bg-white rounded-3xl shadow-xl ring-1 ring-gray-100 p-8 sm:p-10 text-center">

                    <div className="mx-auto w-20 h-20 rounded-full bg-red-100 flex items-center justify-center">
                        <svg
                            className="w-10 h-10 text-red-500"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </div>

                    <h1 className="mt-6 text-2xl font-bold text-gray-900">
                        Unable to Load Order
                    </h1>

                    <p className="mt-2 text-sm text-gray-500 leading-relaxed">
                        We couldn't load your order details right now.
                        Please check your orders or try again later.
                    </p>

                    <div className="mt-8 flex flex-col gap-3">
                        <Link
                            to="/orders"
                            className="w-full inline-flex items-center justify-center bg-gray-900 text-white text-sm font-semibold rounded-xl py-3.5 hover:bg-gray-800 active:scale-[0.98] transition-all duration-150"
                        >
                            View My Orders
                        </Link>

                        <Link
                            to="/"
                            className="w-full inline-flex items-center justify-center text-gray-500 text-sm font-medium rounded-xl py-3 hover:text-gray-900 hover:bg-gray-50 transition-colors"
                        >
                            Continue Shopping
                        </Link>
                    </div>
                </div>
            </div>
        )
    }

    const isCod = order?.paymentMethod === "cod"
    const isConfirmed = status === "confirmed"
    const isProcessing = status === "processing"

    return (
        <div className="min-h-screen bg-gradient-to-b from-emerald-50 via-white to-white flex items-center justify-center px-4 py-10">

            <div className="w-full max-w-lg">

                <div className="bg-white rounded-3xl shadow-xl shadow-emerald-100/50 ring-1 ring-gray-100 overflow-hidden">

                    {/* Top section */}
                    <div className="px-6 sm:px-10 pt-10 pb-8 text-center relative overflow-hidden">

                        {/* Decorative background */}
                        <div className="absolute -top-24 -right-24 w-56 h-56 bg-emerald-100 rounded-full blur-3xl opacity-60 pointer-events-none" />
                        <div className="absolute -bottom-24 -left-24 w-56 h-56 bg-emerald-50 rounded-full blur-3xl opacity-60 pointer-events-none" />

                        <div className="relative">

                            {/* Icon */}
                            {!isConfirmed ? (
                                <div className="mx-auto w-20 h-20 rounded-full bg-amber-100 flex items-center justify-center ring-8 ring-amber-50">

                                    <svg
                                        className="w-9 h-9 text-amber-600 animate-spin"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <circle
                                            className="opacity-25"
                                            cx="12"
                                            cy="12"
                                            r="9"
                                            stroke="currentColor"
                                            strokeWidth="3"
                                        />

                                        <path
                                            className="opacity-90"
                                            fill="currentColor"
                                            d="M12 3a9 9 0 018.49 6H17.3A6 6 0 0012 6V3z"
                                        />
                                    </svg>

                                </div>
                            ) : (
                                <div className="mx-auto w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center ring-8 ring-emerald-50">

                                    <svg
                                        className="w-10 h-10 text-emerald-600"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2.5"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M5 13l4 4L19 7"
                                        />
                                    </svg>

                                </div>
                            )}

                            {/* Heading */}
                            <h1 className="mt-7 text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">

                                {isCod && (
                                    "Order Confirmed"
                                )}

                                {!isCod && status === "confirming" && (
                                    "Confirming Your Payment"
                                )}

                                {!isCod && status === "processing" && (
                                    "Payment Processing"
                                )}

                                {!isCod && isConfirmed && (
                                    "Payment Successful"
                                )}

                            </h1>

                            {/* Description */}
                            <p className="mt-3 text-sm sm:text-base text-gray-500 leading-relaxed max-w-md mx-auto">

                                {isCod && (
                                    "Thank you for your order. Your order has been confirmed and will be prepared for delivery."
                                )}

                                {!isCod && status === "confirming" && (
                                    "We're verifying your payment. Please wait a moment while we confirm your order."
                                )}

                                {!isCod && status === "processing" && (
                                    "Your payment is taking a little longer to confirm. You don't need to pay again. We'll update your order shortly."
                                )}

                                {!isCod && isConfirmed && (
                                    "Your payment has been successfully verified and your order is confirmed."
                                )}

                            </p>

                        </div>
                    </div>

                    {/* Order details */}
                    {order && (
                        <div className="px-6 sm:px-10 pb-8">

                            <div className="rounded-2xl bg-gray-50 ring-1 ring-gray-100 overflow-hidden">

                                {/* Order ID */}
                                <div className="px-5 py-4">

                                    <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                        Order ID
                                    </div>

                                    <div
                                        className="mt-1 text-sm sm:text-base font-semibold text-gray-900 break-all leading-relaxed"
                                        title={order._id}
                                    >
                                        {order._id}
                                    </div>

                                </div>

                                <div className="h-px bg-gray-200" />

                                {/* Payment method */}
                                <div className="px-5 py-4 flex items-start justify-between gap-4">

                                    <div>
                                        <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                            Payment Method
                                        </div>

                                        <div className="mt-1 text-sm font-medium text-gray-900">
                                            {isCod
                                                ? "Cash on Delivery"
                                                : "Debit / Credit Card"
                                            }
                                        </div>
                                    </div>

                                    {/* Payment status */}
                                    <div className="text-right shrink-0">

                                        <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                            Payment
                                        </div>

                                        <div className="mt-1">

                                            {isCod ? (
                                                <span className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-amber-700 bg-amber-100 px-2.5 py-1 rounded-full">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                                                    Pending
                                                </span>
                                            ) : isConfirmed ? (
                                                <span className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded-full">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                                                    Paid
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-amber-700 bg-amber-100 px-2.5 py-1 rounded-full">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                                                    Confirming
                                                </span>
                                            )}

                                        </div>
                                    </div>

                                </div>

                                <div className="h-px bg-gray-200" />

                                {/* Order status */}
                                <div className="px-5 py-4 flex items-center justify-between gap-4">

                                    <div>
                                        <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                            Order Status
                                        </div>

                                        <div className="mt-1 text-sm font-medium text-gray-900">
                                            {isCod || isConfirmed
                                                ? "Confirmed"
                                                : "Pending"
                                            }
                                        </div>
                                    </div>

                                    <div
                                        className={`inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold px-2.5 py-1 rounded-full ${
                                            isCod || isConfirmed
                                                ? "text-emerald-700 bg-emerald-100"
                                                : "text-amber-700 bg-amber-100"
                                        }`}
                                    >
                                        <span
                                            className={`w-1.5 h-1.5 rounded-full ${
                                                isCod || isConfirmed
                                                    ? "bg-emerald-500"
                                                    : "bg-amber-500"
                                            }`}
                                        />

                                        {isCod || isConfirmed
                                            ? "Confirmed"
                                            : "Pending"
                                        }
                                    </div>

                                </div>

                                {/* COD explanation */}
                                {isCod && (
                                    <>
                                        <div className="h-px bg-gray-200" />

                                        <div className="px-5 py-4">

                                            <div className="flex items-start gap-3">

                                                <div className="mt-0.5 shrink-0">
                                                    <svg
                                                        className="w-5 h-5 text-amber-600"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        strokeWidth="2"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            d="M12 9v3m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"
                                                        />
                                                    </svg>
                                                </div>

                                                <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
                                                    Payment will be collected when your order is delivered.
                                                </p>

                                            </div>

                                        </div>
                                    </>
                                )}

                            </div>

                            {/* Actions */}
                            <div className="mt-8 flex flex-col gap-3">

                                <Link
                                    to="/account/orders"
                                    className="w-full inline-flex items-center justify-center gap-2 bg-gray-900 text-white text-sm font-semibold rounded-xl py-3.5 px-4 hover:bg-gray-800 active:scale-[0.98] transition-all duration-150"
                                >
                                    View My Orders

                                    <svg
                                        className="w-4 h-4"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M9 5l7 7-7 7"
                                        />
                                    </svg>
                                </Link>

                                <Link
                                    to="/"
                                    className="w-full inline-flex items-center justify-center text-gray-500 text-sm font-medium rounded-xl py-3 hover:text-gray-900 hover:bg-gray-50 transition-colors"
                                >
                                    Continue Shopping
                                </Link>

                            </div>

                        </div>
                    )}

                </div>

                {/* Small reassurance underneath */}
                <p className="mt-5 text-center text-xs text-gray-400">
                    You can view your order status anytime from My Orders.
                </p>

            </div>
        </div>
    )
}

export default CheckoutSuccessPage