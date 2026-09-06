import { useState } from 'react'

const PaymentMethods = () => {
    const [paymentOpen, setPaymentOpen] = useState(true)

    return (

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
                                className={`relative flex flex-col items-center gap-2 p-3 rounded-xl border-2 cursor-pointer transition-colors ${paymentMethod === "COD"
                                    ? "border-[#1F6F4A] bg-[#1F6F4A]/5"
                                    : "border-gray-100 hover:bg-gray-50"
                                    }`}
                            >
                                <input
                                    type="radio"
                                    name="paymentMethod"
                                    value="COD"
                                    checked={paymentMethod === "COD"}
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
                                className={`relative flex flex-col items-center gap-2 p-3 rounded-xl border-2 cursor-pointer transition-colors ${paymentMethod === "CARD"
                                    ? "border-[#1F6F4A] bg-[#1F6F4A]/5"
                                    : "border-gray-100 hover:bg-gray-50"
                                    }`}
                            >
                                <input
                                    type="radio"
                                    name="paymentMethod"
                                    value="CARD"
                                    checked={paymentMethod === "CARD"}
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
                                className={`relative flex flex-col items-center gap-2 p-3 rounded-xl border-2 cursor-pointer transition-colors ${paymentMethod === "BANK_TRANSFER"
                                    ? "border-[#1F6F4A] bg-[#1F6F4A]/5"
                                    : "border-gray-100 hover:bg-gray-50"
                                    }`}
                            >
                                <input
                                    type="radio"
                                    name="paymentMethod"
                                    value="BANK_TRANSFER"
                                    checked={paymentMethod === "BANK_TRANSFER"}
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
    )
}

export default PaymentMethods