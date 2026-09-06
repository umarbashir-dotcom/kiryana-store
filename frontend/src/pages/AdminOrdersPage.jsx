import {
    Search,
    SlidersHorizontal,
    Eye,
    ChevronLeft,
    ChevronRight,
    ShoppingCart,
    X,
    ArrowUpDown,
} from "lucide-react";

import { useContext, useEffect, useState } from "react";
import { OrderContext } from "../context/OrderContext";
import getFirstLetterCapitalizedWord from "../utils/CapitalizeLetter";
import PaginationButtons from "../components/PaginationButtons";

const AdminOrdersPage = () => {
    const { orders, getAllOrders, totalOrders, ordersLoading } =
        useContext(OrderContext);

    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

    const [orderQuery, setOrderQuery] = useState({
        orderStatus: "",
        paymentStatus: "",
        minAmount: "",
        maxAmount: "",
        page: 1,
        limit: 20,
        sort: "newest",
    });

    // Draft values are changed locally and only applied when Apply is clicked.
    const [filterDraft, setFilterDraft] = useState({
        orderStatus: "",
        paymentStatus: "",
        minAmount: "",
        maxAmount: "",
        sort: "newest",
    });

    const [amountFilterOpen, setAmountFilterOpen] = useState(false);

    const totalPages = Math.ceil(totalOrders / orderQuery.limit);

    const onNext = () => {
        setOrderQuery((prev) => ({
            ...prev,
            page: prev.page + 1,
        }));
    };

    const onPrev = () => {
        setOrderQuery((prev) => ({
            ...prev,
            page: prev.page - 1,
        }));
    };

    const moveToPage = (page) => {
        setOrderQuery((prev) => ({
            ...prev,
            page,
        }));
    };

    useEffect(() => {
        getAllOrders(orderQuery);
    }, [orderQuery]);

    let ordId_1 = 10843;
    let ordId_2 = 10843;

    const getStatusClasses = (status) => {
        switch (status) {
            case "Delivered":
                return "bg-emerald-50 text-emerald-700";

            case "Confirmed":
            case "Out for Delivery":
                return "bg-blue-50 text-blue-700";

            case "Processing":
            case "Pending":
                return "bg-amber-50 text-amber-700";

            case "Cancelled":
                return "bg-red-50 text-red-600";

            default:
                return "bg-slate-100 text-slate-600";
        }
    };

    const getPaymentClasses = (payment) => {
        switch (payment) {
            case "Paid":
                return "text-emerald-600";

            case "Pending":
                return "text-amber-600";

            case "Refunded":
                return "text-red-600";

            default:
                return "text-slate-600";
        }
    };

    const applyAmountFilter = () => {
        setOrderQuery((prev) => ({
            ...prev,
            minAmount: filterDraft.minAmount,
            maxAmount: filterDraft.maxAmount,
            page: 1,
        }));

        setAmountFilterOpen(false);
    };

    const clearAmountFilter = () => {
        setFilterDraft((prev) => ({
            ...prev,
            minAmount: "",
            maxAmount: "",
        }));

        setOrderQuery((prev) => ({
            ...prev,
            minAmount: "",
            maxAmount: "",
            page: 1,
        }));

        setAmountFilterOpen(false);
    };

    return (
        <div className="space-y-6">
            {/* =========================================================
                PAGE HEADER
            ========================================================== */}
            <section>
                <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                        <p className="text-sm font-medium text-emerald-600">
                            Store management
                        </p>

                        <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                            Orders
                        </h1>

                        <p className="mt-1.5 text-sm text-slate-500">
                            View and manage customer orders.
                        </p>
                    </div>

                    <div className="w-fit rounded-xl border border-slate-200 bg-white px-4 py-2.5">
                        <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                            Total Orders
                        </p>

                        <p className="mt-0.5 text-lg font-bold text-slate-900">
                            {totalOrders}
                        </p>
                    </div>
                </div>
            </section>

            {/* =========================================================
                ORDERS CARD
            ========================================================== */}
            <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm shadow-slate-200/40">

                {/* =====================================================
                    DESKTOP / TABLET TOOLBAR
                ====================================================== */}
                <div className="border-b border-slate-100 p-4 sm:p-5">
                    <div className="flex flex-col gap-3">

                        {/* Search + Desktop Controls */}
                        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">

                            {/* Search */}
                            <div className="relative w-full lg:max-w-sm">
                                <Search
                                    size={17}
                                    className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                                />

                                <input
                                    type="search"
                                    placeholder="Search order or customer..."
                                    className="
                                        h-10 w-full rounded-xl
                                        border border-slate-200
                                        bg-slate-50
                                        pl-9 pr-3
                                        text-sm text-slate-900
                                        outline-none
                                        transition
                                        placeholder:text-slate-400
                                        focus:border-emerald-500
                                        focus:bg-white
                                        focus:ring-2
                                        focus:ring-emerald-500/10
                                    "
                                />
                            </div>

                            {/* =================================================
                                DESKTOP FILTERS
                            ================================================== */}
                            <div className="hidden items-center gap-2 md:flex">

                                {/* Order Status */}
                                <select
                                    className="
                                        h-10 min-w-[145px]
                                        rounded-xl
                                        border border-slate-200
                                        bg-white
                                        px-3
                                        text-sm font-medium
                                        text-slate-600
                                        outline-none
                                        transition
                                        focus:border-emerald-500
                                        focus:ring-2
                                        focus:ring-emerald-500/10
                                    "
                                    value={orderQuery.orderStatus}
                                    onChange={(e) =>
                                        setOrderQuery((prev) => ({
                                            ...prev,
                                            orderStatus: e.target.value,
                                            page: 1,
                                        }))
                                    }
                                >
                                    <option value="">
                                        All Status
                                    </option>

                                    <option value="pending">
                                        Pending
                                    </option>

                                    <option value="confirmed">
                                        Confirmed
                                    </option>

                                    <option value="processing">
                                        Processing
                                    </option>

                                    <option value="out_for_delivery">
                                        Out for Delivery
                                    </option>

                                    <option value="delivered">
                                        Delivered
                                    </option>

                                    <option value="cancelled">
                                        Cancelled
                                    </option>
                                </select>

                                {/* Payment Status */}
                                <select
                                    className="
                                        h-10 min-w-[145px]
                                        rounded-xl
                                        border border-slate-200
                                        bg-white
                                        px-3
                                        text-sm font-medium
                                        text-slate-600
                                        outline-none
                                        transition
                                        focus:border-emerald-500
                                        focus:ring-2
                                        focus:ring-emerald-500/10
                                    "
                                    value={orderQuery.paymentStatus}
                                    onChange={(e) =>
                                        setOrderQuery((prev) => ({
                                            ...prev,
                                            paymentStatus: e.target.value,
                                            page: 1,
                                        }))
                                    }
                                >
                                    <option value="">
                                        All Payments
                                    </option>

                                    <option value="pending">
                                        Pending
                                    </option>

                                    <option value="paid">
                                        Paid
                                    </option>

                                    <option value="refunded">
                                        Refunded
                                    </option>

                                    <option value="failed">
                                        Failed
                                    </option>
                                </select>

                                {/* =================================================
                                    AMOUNT FILTER
                                ================================================== */}
                                <div className="relative">

                                    {/* Amount Button */}
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setAmountFilterOpen(
                                                (prev) => !prev
                                            )
                                        }
                                        className="
                                            flex h-10 min-w-[125px]
                                            items-center justify-between
                                            gap-2
                                            rounded-xl
                                            border border-slate-200
                                            bg-white
                                            px-3
                                            text-sm font-medium
                                            text-slate-600
                                            outline-none
                                            transition
                                            hover:bg-slate-50
                                            hover:text-slate-900
                                            focus:border-emerald-500
                                            focus:ring-2
                                            focus:ring-emerald-500/10
                                        "
                                    >
                                        <span>Amount</span>

                                        <ChevronRight
                                            size={15}
                                            className={`
                                                transition-transform
                                                ${
                                                    amountFilterOpen
                                                        ? "rotate-90"
                                                        : "rotate-0"
                                                }
                                            `}
                                        />
                                    </button>

                                    {/* Amount Popup */}
                                    {amountFilterOpen && (
                                        <div
                                            className="
                                                absolute right-0 top-12 z-30
                                                w-72
                                                rounded-xl
                                                border border-slate-200
                                                bg-white
                                                p-4
                                                shadow-lg
                                            "
                                        >
                                            <div className="mb-4">
                                                <p className="text-sm font-semibold text-slate-700">
                                                    Order Amount
                                                </p>

                                                <p className="mt-1 text-xs text-slate-400">
                                                    Set the minimum and maximum
                                                    amount.
                                                </p>
                                            </div>

                                            {/* Amount Inputs */}
                                            <div className="grid grid-cols-2 gap-3">

                                                {/* Minimum */}
                                                <div>
                                                    <label
                                                        className="
                                                            mb-1.5 block
                                                            text-[11px]
                                                            font-semibold
                                                            uppercase
                                                            tracking-wide
                                                            text-slate-400
                                                        "
                                                    >
                                                        Minimum
                                                    </label>

                                                    <input
                                                        type="number"
                                                        min="0"
                                                        placeholder="Rs. 0"
                                                        value={
                                                            filterDraft.minAmount
                                                        }
                                                        onChange={(e) =>
                                                            setFilterDraft(
                                                                (prev) => ({
                                                                    ...prev,
                                                                    minAmount:
                                                                        e.target
                                                                            .value,
                                                                })
                                                            )
                                                        }
                                                        className="
                                                            h-10 w-full
                                                            rounded-lg
                                                            border
                                                            border-slate-200
                                                            bg-slate-50
                                                            px-3
                                                            text-sm
                                                            text-slate-800
                                                            outline-none
                                                            transition
                                                            placeholder:text-slate-400
                                                            focus:border-emerald-500
                                                            focus:bg-white
                                                            focus:ring-2
                                                            focus:ring-emerald-500/10
                                                        "
                                                    />
                                                </div>

                                                {/* Maximum */}
                                                <div>
                                                    <label
                                                        className="
                                                            mb-1.5 block
                                                            text-[11px]
                                                            font-semibold
                                                            uppercase
                                                            tracking-wide
                                                            text-slate-400
                                                        "
                                                    >
                                                        Maximum
                                                    </label>

                                                    <input
                                                        type="number"
                                                        min="0"
                                                        placeholder="Rs. 10,000"
                                                        value={
                                                            filterDraft.maxAmount
                                                        }
                                                        onChange={(e) =>
                                                            setFilterDraft(
                                                                (prev) => ({
                                                                    ...prev,
                                                                    maxAmount:
                                                                        e.target
                                                                            .value,
                                                                })
                                                            )
                                                        }
                                                        className="
                                                            h-10 w-full
                                                            rounded-lg
                                                            border
                                                            border-slate-200
                                                            bg-slate-50
                                                            px-3
                                                            text-sm
                                                            text-slate-800
                                                            outline-none
                                                            transition
                                                            placeholder:text-slate-400
                                                            focus:border-emerald-500
                                                            focus:bg-white
                                                            focus:ring-2
                                                            focus:ring-emerald-500/10
                                                        "
                                                    />
                                                </div>
                                            </div>

                                            {/* Actions */}
                                            <div className="mt-4 flex gap-2 border-t border-slate-100 pt-4">

                                                <button
                                                    type="button"
                                                    onClick={clearAmountFilter}
                                                    className="
                                                        h-10 flex-1
                                                        rounded-lg
                                                        border
                                                        border-slate-200
                                                        bg-white
                                                        px-3
                                                        text-sm
                                                        font-semibold
                                                        text-slate-600
                                                        transition
                                                        hover:bg-slate-50
                                                        hover:text-slate-900
                                                    "
                                                >
                                                    Clear
                                                </button>

                                                <button
                                                    type="button"
                                                    onClick={applyAmountFilter}
                                                    className="
                                                        h-10 flex-1
                                                        rounded-lg
                                                        bg-emerald-600
                                                        px-3
                                                        text-sm
                                                        font-semibold
                                                        text-white
                                                        shadow-sm
                                                        transition
                                                        hover:bg-emerald-700
                                                        focus:outline-none
                                                        focus:ring-2
                                                        focus:ring-emerald-500/20
                                                    "
                                                >
                                                    Apply
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Sort */}
                                <div className="relative">
                                    <div className="pointer-events-none absolute left-3 top-1/2 z-10 -translate-y-1/2">
                                        <ArrowUpDown
                                            size={15}
                                            className="text-slate-400"
                                        />
                                    </div>

                                    <select
                                        className="
                                            h-10 min-w-[155px]
                                            appearance-none
                                            rounded-xl
                                            border border-slate-200
                                            bg-white
                                            pl-9 pr-8
                                            text-sm font-medium
                                            text-slate-600
                                            outline-none
                                            transition
                                            focus:border-emerald-500
                                            focus:ring-2
                                            focus:ring-emerald-500/10
                                        "
                                        value={orderQuery.sort}
                                        onChange={(e) =>
                                            setOrderQuery((prev) => ({
                                                ...prev,
                                                sort: e.target.value,
                                                page: 1,
                                            }))
                                        }
                                    >
                                        <option value="newest">
                                            Newest
                                        </option>

                                        <option value="oldest">
                                            Oldest
                                        </option>

                                        <option value="highest">
                                            Highest Amount
                                        </option>

                                        <option value="lowest">
                                            Lowest Amount
                                        </option>
                                    </select>

                                    <ChevronRight
                                        size={14}
                                        className="
                                            pointer-events-none
                                            absolute right-3 top-1/2
                                            -translate-y-1/2 rotate-90
                                            text-slate-400
                                        "
                                    />
                                </div>
                            </div>

                            {/* =================================================
                                MOBILE FILTER BUTTON
                            ================================================== */}
                            <button
                                type="button"
                                onClick={() =>
                                    setMobileFiltersOpen(
                                        !mobileFiltersOpen
                                    )
                                }
                                className="
                                    inline-flex h-10 w-full
                                    items-center justify-center
                                    gap-2 rounded-xl
                                    border border-slate-200
                                    bg-white
                                    px-3.5
                                    text-sm font-semibold
                                    text-slate-600
                                    transition
                                    hover:bg-slate-50
                                    hover:text-slate-900
                                    md:hidden
                                "
                            >
                                <SlidersHorizontal size={17} />

                                Filters

                                <span className="ml-0.5 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-700">
                                    3
                                </span>
                            </button>
                        </div>

                        {/* =====================================================
                            MOBILE FILTER PANEL
                        ====================================================== */}
                        {mobileFiltersOpen && (
                            <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-4 md:hidden">

                                {/* Mobile Filter Header */}
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h3 className="text-sm font-bold text-slate-800">
                                            Filter Orders
                                        </h3>

                                        <p className="mt-0.5 text-xs text-slate-400">
                                            Narrow down the order list.
                                        </p>
                                    </div>

                                    <button
                                        type="button"
                                        onClick={() =>
                                            setMobileFiltersOpen(false)
                                        }
                                        className="
                                            flex h-8 w-8 items-center
                                            justify-center rounded-lg
                                            text-slate-400
                                            transition
                                            hover:bg-white
                                            hover:text-slate-700
                                        "
                                    >
                                        <X size={17} />
                                    </button>
                                </div>

                                <div className="mt-4 space-y-4">

                                    {/* Order Status */}
                                    <div>
                                        <label className="mb-1.5 block text-xs font-semibold text-slate-600">
                                            Order Status
                                        </label>

                                        <select
                                            className="
                                                h-10 w-full rounded-xl
                                                border border-slate-200
                                                bg-white px-3
                                                text-sm font-medium
                                                text-slate-600
                                                outline-none
                                                focus:border-emerald-500
                                                focus:ring-2
                                                focus:ring-emerald-500/10
                                            "
                                            value={filterDraft.orderStatus}
                                            onChange={(e) =>
                                                setFilterDraft((prev) => ({
                                                    ...prev,
                                                    orderStatus:
                                                        e.target.value,
                                                }))
                                            }
                                        >
                                            <option value="">
                                                All Status
                                            </option>

                                            <option value="pending">
                                                Pending
                                            </option>

                                            <option value="confirmed">
                                                Confirmed
                                            </option>

                                            <option value="processing">
                                                Processing
                                            </option>

                                            <option value="out_for_delivery">
                                                Out for Delivery
                                            </option>

                                            <option value="delivered">
                                                Delivered
                                            </option>

                                            <option value="cancelled">
                                                Cancelled
                                            </option>
                                        </select>
                                    </div>

                                    {/* Payment Status */}
                                    <div>
                                        <label className="mb-1.5 block text-xs font-semibold text-slate-600">
                                            Payment Status
                                        </label>

                                        <select
                                            className="
                                                h-10 w-full rounded-xl
                                                border border-slate-200
                                                bg-white px-3
                                                text-sm font-medium
                                                text-slate-600
                                                outline-none
                                                focus:border-emerald-500
                                                focus:ring-2
                                                focus:ring-emerald-500/10
                                            "
                                            value={
                                                filterDraft.paymentStatus
                                            }
                                            onChange={(e) =>
                                                setFilterDraft((prev) => ({
                                                    ...prev,
                                                    paymentStatus:
                                                        e.target.value,
                                                }))
                                            }
                                        >
                                            <option value="">
                                                All Payments
                                            </option>

                                            <option value="pending">
                                                Pending
                                            </option>

                                            <option value="paid">
                                                Paid
                                            </option>

                                            <option value="refunded">
                                                Refunded
                                            </option>

                                            <option value="failed">
                                                Failed
                                            </option>
                                        </select>
                                    </div>

                                    {/* Amount Range */}
                                    <div>
                                        <label className="mb-1.5 block text-xs font-semibold text-slate-600">
                                            Order Amount
                                        </label>

                                        <div className="grid grid-cols-2 gap-2">
                                            <input
                                                type="number"
                                                placeholder="Min amount"
                                                min="0"
                                                className="
                                                    h-10 w-full rounded-xl
                                                    border border-slate-200
                                                    bg-white px-3
                                                    text-sm text-slate-800
                                                    outline-none
                                                    placeholder:text-slate-400
                                                    focus:border-emerald-500
                                                    focus:ring-2
                                                    focus:ring-emerald-500/10
                                                "
                                                value={
                                                    filterDraft.minAmount
                                                }
                                                onChange={(e) =>
                                                    setFilterDraft((prev) => ({
                                                        ...prev,
                                                        minAmount:
                                                            e.target.value,
                                                    }))
                                                }
                                            />

                                            <input
                                                type="number"
                                                min="0"
                                                placeholder="Max amount"
                                                className="
                                                    h-10 w-full rounded-xl
                                                    border border-slate-200
                                                    bg-white px-3
                                                    text-sm text-slate-800
                                                    outline-none
                                                    placeholder:text-slate-400
                                                    focus:border-emerald-500
                                                    focus:ring-2
                                                    focus:ring-emerald-500/10
                                                "
                                                value={
                                                    filterDraft.maxAmount
                                                }
                                                onChange={(e) =>
                                                    setFilterDraft((prev) => ({
                                                        ...prev,
                                                        maxAmount:
                                                            e.target.value,
                                                    }))
                                                }
                                            />
                                        </div>
                                    </div>

                                    {/* Sort */}
                                    <div>
                                        <label className="mb-1.5 block text-xs font-semibold text-slate-600">
                                            Sort By
                                        </label>

                                        <select
                                            className="
                                                h-10 w-full rounded-xl
                                                border border-slate-200
                                                bg-white px-3
                                                text-sm font-medium
                                                text-slate-600
                                                outline-none
                                                focus:border-emerald-500
                                                focus:ring-2
                                                focus:ring-emerald-500/10
                                            "
                                            value={filterDraft.sort}
                                            onChange={(e) =>
                                                setFilterDraft((prev) => ({
                                                    ...prev,
                                                    sort: e.target.value,
                                                }))
                                            }
                                        >
                                            <option value="newest">
                                                Newest
                                            </option>

                                            <option value="oldest">
                                                Oldest
                                            </option>

                                            <option value="highest">
                                                Highest Amount
                                            </option>

                                            <option value="lowest">
                                                Lowest Amount
                                            </option>
                                        </select>
                                    </div>

                                    {/* Filter Actions */}
                                    <div className="flex gap-2 border-t border-slate-200 pt-4">
                                        <button
                                            type="button"
                                            className="
                                                h-10 flex-1 rounded-xl
                                                border border-slate-200
                                                bg-white px-4
                                                text-sm font-semibold
                                                text-slate-600
                                                transition
                                                hover:bg-slate-50
                                            "
                                            onClick={() => {
                                                setFilterDraft({
                                                    orderStatus: "",
                                                    paymentStatus: "",
                                                    minAmount: "",
                                                    maxAmount: "",
                                                    sort: "newest",
                                                });

                                                setOrderQuery((prev) => ({
                                                    ...prev,
                                                    orderStatus: "",
                                                    paymentStatus: "",
                                                    minAmount: "",
                                                    maxAmount: "",
                                                    sort: "newest",
                                                    page: 1,
                                                }));

                                                setMobileFiltersOpen(false);
                                            }}
                                        >
                                            Clear
                                        </button>

                                        <button
                                            type="button"
                                            className="
                                                h-10 flex-1 rounded-xl
                                                bg-emerald-600 px-4
                                                text-sm font-semibold
                                                text-white
                                                shadow-sm
                                                transition
                                                hover:bg-emerald-700
                                            "
                                            onClick={() => {
                                                setOrderQuery((prev) => ({
                                                    ...prev,
                                                    orderStatus:
                                                        filterDraft.orderStatus,
                                                    paymentStatus:
                                                        filterDraft.paymentStatus,
                                                    minAmount:
                                                        filterDraft.minAmount,
                                                    maxAmount:
                                                        filterDraft.maxAmount,
                                                    sort: filterDraft.sort,
                                                    page: 1,
                                                }));

                                                setMobileFiltersOpen(false);
                                            }}
                                        >
                                            Apply Filters
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* =========================================================
                    MOBILE ORDERS
                ========================================================== */}
                <div className="divide-y divide-slate-100 md:hidden">
                    {orders.map((order) => {
                        ordId_1 -= 1;

                        return (
                            <div
                                key={order._id}
                                className="p-4"
                            >
                                <div className="flex items-start justify-between gap-3">
                                    <div className="flex min-w-0 items-center gap-3">
                                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                                            <ShoppingCart size={18} />
                                        </div>

                                        <div className="min-w-0">
                                            <p className="text-sm font-bold text-slate-900">
                                                {`#ORD-${ordId_1}`}
                                            </p>

                                            <p className="mt-0.5 truncate text-xs text-slate-500">
                                                {order.user.name}
                                            </p>
                                        </div>
                                    </div>

                                    <span
                                        className={`
                                            shrink-0 rounded-full
                                            px-2.5 py-1
                                            text-[10px] font-semibold
                                            ${getStatusClasses(
                                                getFirstLetterCapitalizedWord(
                                                    order.orderStatus
                                                )
                                            )}
                                        `}
                                    >
                                        {getFirstLetterCapitalizedWord(
                                            order.orderStatus
                                        )}
                                    </span>
                                </div>

                                <div className="mt-4 grid grid-cols-3 gap-3">
                                    <div>
                                        <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                                            Items
                                        </p>

                                        <p className="mt-1 text-sm font-semibold text-slate-800">
                                            {order.items.length}
                                        </p>
                                    </div>

                                    <div>
                                        <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                                            Amount
                                        </p>

                                        <p className="mt-1 text-sm font-semibold text-slate-800">
                                            Rs.{" "}
                                            {order.totalAmount.toLocaleString()}
                                        </p>
                                    </div>

                                    <div>
                                        <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                                            Payment
                                        </p>

                                        <p
                                            className={`mt-1 text-sm font-semibold ${getPaymentClasses(
                                                getFirstLetterCapitalizedWord(
                                                    order.paymentStatus
                                                )
                                            )}`}
                                        >
                                            {getFirstLetterCapitalizedWord(
                                                order.paymentStatus
                                            )}
                                        </p>
                                    </div>
                                </div>

                                <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3">
                                    <div>
                                        <p className="text-xs text-slate-500">
                                            {new Date(
                                                order.createdAt
                                            ).toLocaleDateString("en-US", {
                                                year: "numeric",
                                                month: "short",
                                                day: "numeric",
                                            })}
                                        </p>

                                        <p className="mt-0.5 text-[10px] text-slate-400">
                                            {new Date(
                                                order.createdAt
                                            ).toLocaleTimeString("en-US", {
                                                hour: "2-digit",
                                                minute: "2-digit",
                                            })}
                                        </p>
                                    </div>

                                    <button
                                        type="button"
                                        className="
                                            inline-flex items-center gap-1.5
                                            rounded-lg
                                            border border-slate-200
                                            px-3 py-2
                                            text-xs font-semibold
                                            text-slate-600
                                            transition
                                            hover:bg-slate-50
                                            hover:text-slate-900
                                        "
                                    >
                                        <Eye size={14} />
                                        View
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* =========================================================
                    DESKTOP TABLE
                ========================================================== */}
                <div className="hidden overflow-x-auto md:block">
                    <table className="w-full min-w-[1000px]">
                        <thead>
                            <tr className="border-b border-slate-100 bg-slate-50/60">
                                <th className="px-6 py-3.5 text-left text-[11px] font-bold uppercase tracking-wider text-slate-400">
                                    Order
                                </th>

                                <th className="px-4 py-3.5 text-left text-[11px] font-bold uppercase tracking-wider text-slate-400">
                                    Customer
                                </th>

                                <th className="px-4 py-3.5 text-left text-[11px] font-bold uppercase tracking-wider text-slate-400">
                                    Items
                                </th>

                                <th className="px-4 py-3.5 text-left text-[11px] font-bold uppercase tracking-wider text-slate-400">
                                    Amount
                                </th>

                                <th className="px-4 py-3.5 text-left text-[11px] font-bold uppercase tracking-wider text-slate-400">
                                    Payment
                                </th>

                                <th className="px-4 py-3.5 text-left text-[11px] font-bold uppercase tracking-wider text-slate-400">
                                    Status
                                </th>

                                <th className="px-4 py-3.5 text-left text-[11px] font-bold uppercase tracking-wider text-slate-400">
                                    Date
                                </th>

                                <th className="px-6 py-3.5 text-right text-[11px] font-bold uppercase tracking-wider text-slate-400">
                                    Action
                                </th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-slate-100">
                            {orders.map((order) => {
                                ordId_2 -= 1;

                                return (
                                    <tr
                                        key={order._id}
                                        className="transition hover:bg-slate-50/50"
                                    >
                                        {/* Order */}
                                        <td className="px-6 py-4">
                                            <p className="text-sm font-bold text-slate-900">
                                                {`#ORD-${ordId_2}`}
                                            </p>

                                            <p className="mt-0.5 text-[11px] text-slate-400">
                                                {new Date(
                                                    order.createdAt
                                                ).toLocaleTimeString("en-US", {
                                                    hour: "2-digit",
                                                    minute: "2-digit",
                                                })}
                                            </p>
                                        </td>

                                        {/* Customer */}
                                        <td className="px-4 py-4">
                                            <p className="text-sm font-medium text-slate-800">
                                                {order.user.name}
                                            </p>

                                            <p className="mt-0.5 text-xs text-slate-400">
                                                {order.user.phone}
                                            </p>
                                        </td>

                                        {/* Items */}
                                        <td className="px-4 py-4 text-sm text-slate-600">
                                            {order.items.length} items
                                        </td>

                                        {/* Amount */}
                                        <td className="px-4 py-4">
                                            <p className="text-sm font-semibold text-slate-800">
                                                Rs.{" "}
                                                {order.totalAmount.toLocaleString()}
                                            </p>
                                        </td>

                                        {/* Payment */}
                                        <td className="px-4 py-4">
                                            <span
                                                className={`text-xs font-semibold ${getPaymentClasses(
                                                    getFirstLetterCapitalizedWord(
                                                        order.paymentStatus
                                                    )
                                                )}`}
                                            >
                                                {getFirstLetterCapitalizedWord(
                                                    order.paymentStatus
                                                )}
                                            </span>
                                        </td>

                                        {/* Status */}
                                        <td className="px-4 py-4">
                                            <span
                                                className={`
                                                    inline-flex rounded-full
                                                    px-2.5 py-1
                                                    text-[11px] font-semibold
                                                    ${getStatusClasses(
                                                        getFirstLetterCapitalizedWord(
                                                            order.orderStatus
                                                        )
                                                    )}
                                                `}
                                            >
                                                {getFirstLetterCapitalizedWord(
                                                    order.orderStatus
                                                )}
                                            </span>
                                        </td>

                                        {/* Date */}
                                        <td className="px-4 py-4">
                                            <p className="text-xs font-medium text-slate-600">
                                                {new Date(
                                                    order.createdAt
                                                ).toLocaleDateString("en-US", {
                                                    year: "numeric",
                                                    month: "short",
                                                    day: "numeric",
                                                })}
                                            </p>
                                        </td>

                                        {/* Action */}
                                        <td className="px-6 py-4 text-right">
                                            <button
                                                type="button"
                                                className="
                                                    inline-flex items-center
                                                    gap-1.5 rounded-lg
                                                    border border-slate-200
                                                    px-3 py-2
                                                    text-xs font-semibold
                                                    text-slate-600
                                                    transition
                                                    hover:bg-slate-50
                                                    hover:text-slate-900
                                                "
                                            >
                                                <Eye size={14} />
                                                View
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>

                {/* =========================================================
                    PAGINATION
                ========================================================== */}
                <div className="flex flex-col gap-3 border-t border-slate-100 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
                    <p className="text-xs text-slate-500">
                        Showing{" "}
                        <span className="font-semibold text-slate-700">
                            {((orderQuery.page - 1) * orderQuery.limit) + totalOrders === 0 ? 0 : 1} - {" "}
                            {Math.min(
                                orderQuery.page * orderQuery.limit,
                                totalOrders
                            )}
                        </span>{" "}
                        of{" "}
                        <span className="font-semibold text-slate-700">
                            {totalOrders}
                        </span>{" "}
                        orders
                    </p>

                    {totalOrders > orderQuery.limit && (
                        <PaginationButtons
                            totalPages={totalPages}
                            onNext={onNext}
                            onPrev={onPrev}
                            moveToPage={moveToPage}
                            currentPage={orderQuery.page}
                        />
                    )}
                </div>
            </section>
        </div>
    );
};

export default AdminOrdersPage;