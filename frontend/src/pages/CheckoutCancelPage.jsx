import { Link, useParams } from "react-router-dom"

const CheckoutCancelPage = () => {
    const { orderId } = useParams()

    return (
        <div className="min-h-screen bg-gradient-to-b from-rose-50 via-white to-white flex items-center justify-center px-4">
            <div className="max-w-md w-full bg-white rounded-3xl shadow-xl shadow-rose-100/50 ring-1 ring-gray-100 p-10 text-center relative overflow-hidden">

                <div className="absolute -top-24 -left-24 w-56 h-56 bg-rose-100 rounded-full blur-3xl opacity-50"></div>

                <div className="relative">
                    <div className="mx-auto w-20 h-20 rounded-full bg-rose-100 flex items-center justify-center ring-8 ring-rose-50">
                        <svg className="w-10 h-10 text-rose-600" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </div>

                    <h1 className="mt-6 text-2xl font-bold text-gray-900 tracking-tight">
                        Payment Not Completed
                    </h1>
                    <p className="mt-2 text-sm text-gray-500 leading-relaxed">
                        Your payment was cancelled. No amount has been charged, and your order is still saved.
                    </p>

                    {orderId && (
                        <div className="mt-8 bg-gray-50 rounded-2xl p-5 text-left ring-1 ring-gray-100">
                            <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Order ID</span>
                            <p className="mt-1 text-sm font-semibold text-gray-900 font-mono">{orderId}</p>
                        </div>
                    )}

                    <div className="mt-8 flex flex-col gap-3">
                        <Link to={`/checkout/${orderId}`}
                            className="w-full inline-flex items-center justify-center bg-gray-900 text-white text-sm font-semibold rounded-xl py-3.5 hover:bg-gray-800 active:scale-[0.98] transition-all duration-150">
                            Try Payment Again
                        </Link>
                        <Link to="/orders"
                            className="w-full inline-flex items-center justify-center text-gray-500 text-sm font-medium rounded-xl py-3 hover:text-gray-900 hover:bg-gray-50 transition-colors duration-150">
                            View My Orders
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CheckoutCancelPage