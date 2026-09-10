import React, { useState, useContext, useEffect } from 'react'
import {
    Package,
    Truck,
    CheckCircle2,
    Clock,
    XCircle,
    ChevronDown,
    MapPin,
    Wallet,
    Receipt,
    ShoppingBag,
    RotateCcw
} from 'lucide-react'
import { OrderContext } from '../context/OrderContext'

// Status configuration: icon, label, and colors per order status.
// Swap this out or drive it from your backend's orderStatus enum.
const STATUS_CONFIG = {
    pending: {
        label: 'Pending',
        icon: Clock,
        text: 'text-[#8A6D1D]',
        bg: 'bg-[#F5EBC9]',
    },

    confirmed: {
        label: 'Confirmed',
        icon: CheckCircle2,
        text: 'text-[#256D85]',
        bg: 'bg-[#D9EEF3]',
    },

    processing: {
        label: 'Processing',
        icon: Package,
        text: 'text-[#1D5C8A]',
        bg: 'bg-[#D9EAF5]',
    },

    shipped: {
        label: 'Shipped',
        icon: Truck,
        text: 'text-[#5B3D9C]',
        bg: 'bg-[#E7DEF5]',
    },

    delivered: {
        label: 'Delivered',
        icon: CheckCircle2,
        text: 'text-[#1F6F4A]',
        bg: 'bg-[#1F6F4A]/10',
    },

    cancelled: {
        label: 'Cancelled',
        icon: XCircle,
        text: 'text-[#B23A3A]',
        bg: 'bg-[#F5D9D9]',
    },
};

const FILTERS = ['all', 'pending', 'processing', 'shipped', 'delivered', 'cancelled']

// Placeholder data shaped like the Order model (items, totalAmount,
// shippingAddress, paymentMethod, paymentStatus, orderStatus).
// Replace with the array you get back from GET /api/userOrders.
const MOCK_ORDERS = [
    {
        _id: 'ORD-10482',
        createdAt: '2026-09-05',
        orderStatus: 'shipped',
        paymentMethod: 'Cash on Delivery',
        paymentStatus: 'unpaid',
        shippingAddress: 'House 12, Street 4, Model Town, Faisalabad',
        totalAmount: 2450,
        items: [
            { name: 'Basmati Rice 5kg', quantity: 1, price: 1250, subtotal: 1250 },
            { name: 'Sunflower Cooking Oil 1L', quantity: 2, price: 450, subtotal: 900 },
            { name: 'Sugar 2kg', quantity: 1, price: 300, subtotal: 300 },
        ],
    },
    {
        _id: 'ORD-10471',
        createdAt: '2026-09-01',
        orderStatus: 'delivered',
        paymentMethod: 'Debit Card',
        paymentStatus: 'paid',
        shippingAddress: 'House 12, Street 4, Model Town, Faisalabad',
        totalAmount: 980,
        items: [
            { name: 'Tea Whitener 400g', quantity: 1, price: 380, subtotal: 380 },
            { name: 'Biscuits Family Pack', quantity: 2, price: 300, subtotal: 600 },
        ],
    },
    {
        _id: 'ORD-10459',
        createdAt: '2026-08-27',
        orderStatus: 'pending',
        paymentMethod: 'Bank Transfer',
        paymentStatus: 'unpaid',
        shippingAddress: 'House 12, Street 4, Model Town, Faisalabad',
        totalAmount: 1620,
        items: [
            { name: 'Red Lentils (Masoor) 1kg', quantity: 2, price: 260, subtotal: 520 },
            { name: 'Wheat Flour (Atta) 10kg', quantity: 1, price: 1100, subtotal: 1100 },
        ],
    },
    {
        _id: 'ORD-10440',
        createdAt: '2026-08-19',
        orderStatus: 'cancelled',
        paymentMethod: 'Cash on Delivery',
        paymentStatus: 'unpaid',
        shippingAddress: 'House 12, Street 4, Model Town, Faisalabad',
        totalAmount: 540,
        items: [
            { name: 'Fresh Tomatoes 1kg', quantity: 2, price: 120, subtotal: 240 },
            { name: 'Onions 2kg', quantity: 1, price: 300, subtotal: 300 },
        ],
    },
]

const formatPKR = (amount) => `Rs. ${amount.toLocaleString('en-PK')}`

const formatDate = (dateStr) =>
    new Date(dateStr).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
    })

const OrdersPage = () => {

    const { userOrders, getOrders } = useContext(OrderContext)

    useEffect(() => {
        getOrders()
    }, [])

    // Swap MOCK_ORDERS for state fed by your userOrders API/service call.
    // const [orders] = useState(MOCK_ORDERS)
    const [activeFilter, setActiveFilter] = useState('all')
    const [expandedId, setExpandedId] = useState(null)

    const filteredOrders =
        activeFilter === 'all'
            ? userOrders
            : userOrders.filter((order) => order.orderStatus === activeFilter)

    console.log("filtered orders: ", filteredOrders)
    const toggleExpanded = (id) => {
        setExpandedId((prev) => (prev === id ? null : id))
    }

    return (
        <main className="w-full min-h-screen bg-[#F6F8F4]">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">

                {/* Page Header */}
                <div className="mb-8">
                    <h1 className="font-['Fraunces'] text-3xl sm:text-4xl font-semibold text-[#154A32]">
                        My Orders
                    </h1>

                    <p className="mt-2 text-sm sm:text-base text-[#22281F]/60">
                        Track your orders and review past purchases.
                    </p>
                </div>

                {/* Status Filter Tabs */}
                {/* == Component boundary: OrderFilterTabs (activeFilter, setActiveFilter) == */}
                <div className="mb-6 -mx-4 px-4 sm:mx-0 sm:px-0 overflow-x-auto">
                    <div className="flex items-center gap-2 w-max sm:w-auto">
                        {FILTERS.map((filter) => {
                            const isActive = activeFilter === filter
                            const label =
                                filter === 'all' ? 'All Orders' : STATUS_CONFIG[filter].label

                            return (
                                <button
                                    key={filter}
                                    type="button"
                                    onClick={() => setActiveFilter(filter)}
                                    className={`
                                        shrink-0
                                        px-4 py-2
                                        rounded-xl
                                        text-sm font-medium
                                        border
                                        transition-colors
                                        focus:outline-none
                                        focus:ring-2
                                        focus:ring-[#1F6F4A]/20
                                        ${
                                            isActive
                                                ? 'bg-[#1F6F4A] border-[#1F6F4A] text-white'
                                                : 'bg-white border-[#22281F]/10 text-[#22281F]/65 hover:bg-[#22281F]/5'
                                        }
                                    `}
                                >
                                    {label}
                                </button>
                            )
                        })}
                    </div>
                </div>

                {/* Orders List */}
                {/* == Component boundary: OrderList (Orders, expandedId, onToggle) == */}
                {filteredOrders.length > 0 ? (
                    <div className="flex flex-col gap-4">
                        {filteredOrders.map((order) => {
                            const status = STATUS_CONFIG[order.orderStatus]
                            const StatusIcon = status.icon
                            const isExpanded = expandedId === order._id
                            const previewItems = order.items.slice(0, 2)
                            const extraCount = order.items.length - previewItems.length

                            return (
                                // == Component boundary: OrderCard (order, isExpanded, onToggle) ==
                                <section
                                    key={order._id}
                                    className="bg-white rounded-2xl border border-[#22281F]/10 overflow-hidden"
                                >
                                    {/* Card Header — always visible summary */}
                                    <button
                                        type="button"
                                        onClick={() => toggleExpanded(order._id)}
                                        className="
                                            w-full text-left
                                            px-5 sm:px-8 py-5 sm:py-6
                                            flex flex-col sm:flex-row sm:items-center sm:justify-between
                                            gap-4
                                            focus:outline-none
                                        "
                                    >
                                        <div className="flex items-start gap-4">
                                            <div className="
                                                w-11 h-11
                                                rounded-xl
                                                bg-[#1F6F4A]/10
                                                flex items-center justify-center
                                                shrink-0
                                            ">
                                                <ShoppingBag className="w-5 h-5 text-[#1F6F4A]" strokeWidth={1.8} />
                                            </div>

                                            <div>
                                                <div className="flex items-center gap-2 flex-wrap">
                                                    <p className="text-sm font-semibold text-[#22281F]">
                                                        {order._id}
                                                    </p>

                                                    <span
                                                        className={`
                                                            inline-flex items-center gap-1.5
                                                            px-2.5 py-1
                                                            rounded-full
                                                            text-xs font-medium
                                                            ${status.bg} ${status.text}
                                                        `}
                                                    >
                                                        <StatusIcon className="w-3.5 h-3.5" />
                                                        {status.label}
                                                    </span>
                                                </div>

                                                <p className="mt-1 text-xs text-[#22281F]/50">
                                                    Placed on {formatDate(order.createdAt)}
                                                </p>

                                                <p className="mt-2 text-sm text-[#22281F]/70">
                                                    {previewItems.map((item) => item.name).join(', ')}
                                                    {extraCount > 0 && ` +${extraCount} more`}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between sm:flex-col sm:items-end gap-2 pl-15 sm:pl-0">
                                            <p className="text-base font-semibold text-[#22281F]">
                                                {formatPKR(order.totalAmount)}
                                            </p>

                                            <div className="flex items-center gap-1.5 text-sm font-medium text-[#1F6F4A]">
                                                Details
                                                <ChevronDown
                                                    className={`
                                                        w-4 h-4 transition-transform
                                                        ${isExpanded ? 'rotate-180' : ''}
                                                    `}
                                                />
                                            </div>
                                        </div>
                                    </button>

                                    {/* Expanded Details */}
                                    {isExpanded && (
                                        // == Component boundary: OrderDetails (order) ==
                                        <div className="px-5 sm:px-8 pb-6 sm:pb-7 border-t border-[#22281F]/10 pt-5">

                                            {/* Line Items */}
                                            <div className="flex flex-col gap-3">
                                                {order.items.map((item) => (
                                                    <div
                                                        key={item._id}
                                                        className="flex items-center justify-between text-sm"
                                                    >
                                                        <p className="text-[#22281F]/80">
                                                            {item.name}
                                                            <span className="text-[#22281F]/45"> × {item.quantity}</span>
                                                        </p>
                                                        <p className="font-medium text-[#22281F]">
                                                            {formatPKR(item.subtotal)}
                                                        </p>
                                                    </div>
                                                ))}
                                            </div>

                                            <div className="mt-4 pt-4 border-t border-dashed border-[#22281F]/10 flex items-center justify-between">
                                                <p className="text-sm font-semibold text-[#22281F]">Total</p>
                                                <p className="text-sm font-semibold text-[#22281F]">
                                                    {formatPKR(order.totalAmount)}
                                                </p>
                                            </div>

                                            {/* Delivery + Payment info */}
                                            <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                <div className="flex items-start gap-2.5">
                                                    <MapPin className="w-4 h-4 text-[#1F6F4A] mt-0.5 shrink-0" />
                                                    <div>
                                                        <p className="text-xs font-medium uppercase tracking-wide text-[#22281F]/50">
                                                            Delivery Address
                                                        </p>
                                                        <p className="mt-1 text-sm text-[#22281F]/75">
                                                            {order.shippingAddress.address}
                                                        </p>
                                                    </div>
                                                </div>

                                                <div className="flex items-start gap-2.5">
                                                    <Wallet className="w-4 h-4 text-[#1F6F4A] mt-0.5 shrink-0" />
                                                    <div>
                                                        <p className="text-xs font-medium uppercase tracking-wide text-[#22281F]/50">
                                                            Payment
                                                        </p>
                                                        <p className="mt-1 text-sm text-[#22281F]/75">
                                                            {order.paymentMethod} ·{' '}
                                                            {order.paymentStatus === 'paid' ? 'Paid' : 'Unpaid'}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Actions */}
                                            <div className="mt-6 flex flex-col-reverse sm:flex-row sm:justify-end gap-3">
                                                <button
                                                    type="button"
                                                    className="
                                                        inline-flex items-center justify-center gap-2
                                                        px-5 py-2.5
                                                        rounded-xl
                                                        border border-[#22281F]/15
                                                        text-[#22281F]/70
                                                        text-sm font-medium
                                                        hover:bg-[#F6F8F4]
                                                        transition-colors
                                                        focus:outline-none
                                                        focus:ring-2
                                                        focus:ring-[#22281F]/10
                                                    "
                                                >
                                                    <Receipt className="w-4 h-4" />
                                                    View Invoice
                                                </button>

                                                {order.orderStatus === 'confirmed' && (
                                                    <button
                                                        type="button"
                                                        className="
                                                            inline-flex items-center justify-center gap-2
                                                            px-5 py-2.5
                                                            rounded-xl
                                                            bg-[#1F6F4A]
                                                            text-white
                                                            text-sm font-medium
                                                            hover:bg-[#154A32]
                                                            transition-colors
                                                            focus:outline-none
                                                            focus:ring-2
                                                            focus:ring-[#1F6F4A]/30
                                                        "
                                                    >
                                                        <RotateCcw className="w-4 h-4" />
                                                        Reorder
                                                    </button>
                                                )}

                                                {order.orderStatus === 'pending' && (
                                                    <button
                                                        type="button"
                                                        className="
                                                            inline-flex items-center justify-center gap-2
                                                            px-5 py-2.5
                                                            rounded-xl
                                                            bg-[#B23A3A]
                                                            text-white
                                                            text-sm font-medium
                                                            hover:bg-[#96302F]
                                                            transition-colors
                                                            focus:outline-none
                                                            focus:ring-2
                                                            focus:ring-[#B23A3A]/30
                                                        "
                                                    >
                                                        <XCircle className="w-4 h-4" />
                                                        Cancel Order
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </section>
                            )
                        })}
                    </div>
                ) : (
                    /* Empty State */
                    // == Component boundary: OrdersEmptyState ==
                    <div className="
                        bg-white rounded-2xl border border-[#22281F]/10
                        flex flex-col items-center justify-center
                        text-center
                        px-6 py-16
                    ">
                        <div className="
                            w-14 h-14
                            rounded-full
                            bg-[#1F6F4A]/10
                            flex items-center justify-center
                            mb-4
                        ">
                            <Package className="w-7 h-7 text-[#1F6F4A]" strokeWidth={1.8} />
                        </div>

                        <h3 className="text-lg font-semibold text-[#22281F]">
                            No orders here yet
                        </h3>

                        <p className="mt-1.5 text-sm text-[#22281F]/55 max-w-xs">
                            {activeFilter === 'all'
                                ? "You haven't placed any orders yet. Start shopping to see them here."
                                : `You don't have any ${STATUS_CONFIG[activeFilter].label.toLowerCase()} orders right now.`}
                        </p>
                    </div>
                )}

            </div>
        </main>
    )
}

export default OrdersPage