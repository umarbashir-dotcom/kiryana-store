import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { toast } from "sonner"
import orderService from "../services/orderService"

const BankTransferPage = () => {
    const { orderId } = useParams()
    const navigate = useNavigate()

    const [order, setOrder] = useState(null)
    const [loading, setLoading] = useState(true)

    // Dummy bank information for this project
    const bankDetails = {
        bankName: "Bank of Punjab",
        accountTitle: "Apna Karyana Store",
        accountNumber: "123456789012",
        iban: "PK00BOPU0000123456789012",
    }

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const data = await orderService.getOrder(orderId)

                setOrder(data)
            } catch (error) {
                toast.error(
                    error?.response?.data?.message ||
                    "Unable to load order details."
                )
            } finally {
                setLoading(false)
            }
        }

        fetchOrder()
    }, [orderId])

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="flex items-center gap-3 text-gray-600">
                    <div className="w-5 h-5 border-2 border-gray-300 border-t-[#1F6F4A] rounded-full animate-spin" />
                    <span>Loading payment details...</span>
                </div>
            </div>
        )
    }

    if (!order) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
                <div className="text-center">
                    <h1 className="text-xl font-semibold text-gray-800">
                        Order not found
                    </h1>

                    <p className="mt-2 text-sm text-gray-500">
                        We couldn't find the order you're looking for.
                    </p>

                    <button
                        onClick={() => navigate("/")}
                        className="mt-6 px-5 py-2.5 rounded-lg bg-[#1F6F4A] text-white hover:bg-[#195a3b] transition"
                    >
                        Back to Store
                    </button>
                </div>
            </div>
        )
    }

    const totalAmount =
        order.totalAmount ??
        order.total ??
        order.amount ??
        0

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6">

            <div className="max-w-2xl mx-auto">

                {/* Header */}
                <div className="text-center mb-8">

                    <div className="mx-auto w-14 h-14 rounded-full bg-[#E8F3ED] flex items-center justify-center">
                        <svg
                            className="w-7 h-7 text-[#1F6F4A]"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M3 10h18M5 6h14a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2z"
                            />
                        </svg>
                    </div>

                    <h1 className="mt-4 text-2xl sm:text-3xl font-bold text-gray-900">
                        Bank Transfer
                    </h1>

                    <p className="mt-2 text-sm sm:text-base text-gray-600">
                        Your order has been created. Please complete the
                        payment using the bank details below.
                    </p>
                </div>

                {/* Order Status */}
                <div className="bg-white border border-gray-200 rounded-2xl p-5 mb-5">

                    <div className="flex items-center justify-between gap-4">

                        <div>
                            <p className="text-xs text-gray-500 uppercase tracking-wide">
                                Order ID
                            </p>

                            <p className="mt-1 text-sm font-medium text-gray-900 break-all">
                                {order._id || orderId}
                            </p>
                        </div>

                        <div className="shrink-0">
                            <span className="inline-flex items-center px-3 py-1.5 rounded-full bg-[#FFF4D6] text-[#8A6D1D] text-xs font-semibold">
                                Payment Pending
                            </span>
                        </div>

                    </div>

                    <div className="mt-5 pt-5 border-t border-gray-100">

                        <p className="text-sm text-gray-500">
                            Amount to transfer
                        </p>

                        <p className="mt-1 text-2xl font-bold text-[#1F6F4A]">
                            Rs. {Number(totalAmount).toLocaleString()}
                        </p>

                    </div>
                </div>

                {/* Bank Details */}
                <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">

                    <div className="px-5 py-4 border-b border-gray-100">
                        <h2 className="text-lg font-semibold text-gray-900">
                            Bank Account Details
                        </h2>

                        <p className="mt-1 text-sm text-gray-500">
                            Transfer the exact amount to the account below.
                        </p>
                    </div>

                    <div className="p-5 space-y-4">

                        {/* Bank */}
                        <div className="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-4">
                            <span className="text-sm text-gray-500">
                                Bank
                            </span>

                            <span className="text-sm font-medium text-gray-900 sm:text-right">
                                {bankDetails.bankName}
                            </span>
                        </div>

                        {/* Account Title */}
                        <div className="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-4">
                            <span className="text-sm text-gray-500">
                                Account Title
                            </span>

                            <span className="text-sm font-medium text-gray-900 sm:text-right">
                                {bankDetails.accountTitle}
                            </span>
                        </div>

                        {/* Account Number */}
                        <div className="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-4">
                            <span className="text-sm text-gray-500">
                                Account Number
                            </span>

                            <span className="text-sm font-semibold text-gray-900 sm:text-right tracking-wide">
                                {bankDetails.accountNumber}
                            </span>
                        </div>

                        {/* IBAN */}
                        <div className="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-4">
                            <span className="text-sm text-gray-500">
                                IBAN
                            </span>

                            <span className="text-sm font-medium text-gray-900 sm:text-right break-all">
                                {bankDetails.iban}
                            </span>
                        </div>

                    </div>
                </div>

                {/* Payment Reference */}
                <div className="mt-5 bg-[#F7FAF8] border border-[#DCEBE2] rounded-2xl p-5">

                    <h2 className="text-base font-semibold text-gray-900">
                        Payment Reference
                    </h2>

                    <p className="mt-1 text-sm text-gray-600">
                        Use this reference when making your bank transfer.
                    </p>

                    <div className="mt-4 bg-white border border-gray-200 rounded-lg px-4 py-3 text-center">

                        <p className="text-sm font-bold text-[#1F6F4A] break-all">
                            KARYANA-{orderId}
                        </p>

                    </div>

                </div>

                {/* Instructions */}
                <div className="mt-5 bg-white border border-gray-200 rounded-2xl p-5">

                    <h2 className="text-base font-semibold text-gray-900">
                        How to complete your payment
                    </h2>

                    <ol className="mt-4 space-y-3 text-sm text-gray-600">

                        <li className="flex gap-3">
                            <span className="shrink-0 w-6 h-6 rounded-full bg-[#E8F3ED] text-[#1F6F4A] flex items-center justify-center text-xs font-semibold">
                                1
                            </span>

                            <span>
                                Open your banking app or internet banking.
                            </span>
                        </li>

                        <li className="flex gap-3">
                            <span className="shrink-0 w-6 h-6 rounded-full bg-[#E8F3ED] text-[#1F6F4A] flex items-center justify-center text-xs font-semibold">
                                2
                            </span>

                            <span>
                                Transfer the exact order amount to the bank
                                account shown above.
                            </span>
                        </li>

                        <li className="flex gap-3">
                            <span className="shrink-0 w-6 h-6 rounded-full bg-[#E8F3ED] text-[#1F6F4A] flex items-center justify-center text-xs font-semibold">
                                3
                            </span>

                            <span>
                                Use the payment reference provided above.
                            </span>
                        </li>

                        <li className="flex gap-3">
                            <span className="shrink-0 w-6 h-6 rounded-full bg-[#E8F3ED] text-[#1F6F4A] flex items-center justify-center text-xs font-semibold">
                                4
                            </span>

                            <span>
                                We will verify your payment and confirm your
                                order.
                            </span>
                        </li>

                    </ol>

                </div>

                {/* Notice */}
                <div className="mt-5 flex gap-3 bg-[#FFF8E7] border border-[#F1E2B5] rounded-xl p-4">

                    <svg
                        className="w-5 h-5 text-[#8A6D1D] shrink-0 mt-0.5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M13 16h-1v-4h-1m1-4h.01M12 22a10 10 0 100-20 10 10 0 000 20z"
                        />
                    </svg>

                    <p className="text-sm text-[#6F5A1B]">
                        Your order will remain pending until the bank
                        transfer is received and verified.
                    </p>

                </div>

                {/* Buttons */}
                <div className="mt-6 flex flex-col sm:flex-row gap-3">

                    <button
                        type="button"
                        onClick={() => navigate("/")}
                        className="flex-1 px-4 py-3 rounded-lg border border-gray-300 bg-white text-gray-700 text-sm font-medium hover:bg-gray-50 transition"
                    >
                        Continue Shopping
                    </button>

                    <button
                        type="button"
                        onClick={() =>
                            navigate(`/account/orders`)
                        }
                        className="flex-1 px-4 py-3 rounded-lg bg-[#1F6F4A] text-white text-sm font-medium hover:bg-[#195a3b] transition"
                    >
                        View Order
                    </button>

                </div>

            </div>
        </div>
    )
}

export default BankTransferPage
