import {
    ArrowUpRight,
    ArrowDownRight,
    ShoppingCart,
    Package,
    Users,
    Banknote,
    AlertTriangle,
    Clock3,
    ChevronRight,
} from "lucide-react";

const AdminDashboardPage = () => {
    
    return (
        <div className="space-y-6">
            {/* Page Introduction */}
            <section>
                <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
                    <div>
                        <p className="text-sm font-medium text-emerald-600">
                            Store overview
                        </p>

                        <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                            Good afternoon, Admin
                        </h1>

                        <p className="mt-1.5 text-sm text-slate-500">
                            Here's what's happening with your store today.
                        </p>
                    </div>

                    <div className="text-left sm:text-right">
                        <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                            Today
                        </p>

                        <p className="mt-1 text-sm font-semibold text-slate-700">
                            August 29, 2026
                        </p>
                    </div>
                </div>
            </section>

            {/* Statistics */}
            <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {/* Revenue */}
                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm shadow-slate-200/40">
                    <div className="flex items-start justify-between">
                        <div>
                            <p className="text-sm font-medium text-slate-500">
                                Today's Revenue
                            </p>

                            <p className="mt-2 text-2xl font-bold tracking-tight text-slate-900">
                                Rs. 48,250
                            </p>
                        </div>

                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                            <Banknote size={20} />
                        </div>
                    </div>

                    <div className="mt-4 flex items-center gap-1.5 text-xs font-semibold">
                        <span className="flex items-center gap-0.5 text-emerald-600">
                            <ArrowUpRight size={14} />
                            12.5%
                        </span>

                        <span className="font-medium text-slate-400">
                            vs yesterday
                        </span>
                    </div>
                </div>

                {/* Orders */}
                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm shadow-slate-200/40">
                    <div className="flex items-start justify-between">
                        <div>
                            <p className="text-sm font-medium text-slate-500">
                                Orders Today
                            </p>

                            <p className="mt-2 text-2xl font-bold tracking-tight text-slate-900">
                                86
                            </p>
                        </div>

                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                            <ShoppingCart size={20} />
                        </div>
                    </div>

                    <div className="mt-4 flex items-center gap-1.5 text-xs font-semibold">
                        <span className="flex items-center gap-0.5 text-emerald-600">
                            <ArrowUpRight size={14} />
                            8.2%
                        </span>

                        <span className="font-medium text-slate-400">
                            vs yesterday
                        </span>
                    </div>
                </div>

                {/* Products */}
                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm shadow-slate-200/40">
                    <div className="flex items-start justify-between">
                        <div>
                            <p className="text-sm font-medium text-slate-500">
                                Active Products
                            </p>

                            <p className="mt-2 text-2xl font-bold tracking-tight text-slate-900">
                                248
                            </p>
                        </div>

                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
                            <Package size={20} />
                        </div>
                    </div>

                    <div className="mt-4 flex items-center gap-1.5 text-xs font-medium text-slate-400">
                        <span className="font-semibold text-slate-600">
                            12
                        </span>

                        <span>added this month</span>
                    </div>
                </div>

                {/* Customers */}
                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm shadow-slate-200/40">
                    <div className="flex items-start justify-between">
                        <div>
                            <p className="text-sm font-medium text-slate-500">
                                Total Customers
                            </p>

                            <p className="mt-2 text-2xl font-bold tracking-tight text-slate-900">
                                1,284
                            </p>
                        </div>

                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
                            <Users size={20} />
                        </div>
                    </div>

                    <div className="mt-4 flex items-center gap-1.5 text-xs font-semibold">
                        <span className="flex items-center gap-0.5 text-emerald-600">
                            <ArrowUpRight size={14} />
                            5.4%
                        </span>

                        <span className="font-medium text-slate-400">
                            this month
                        </span>
                    </div>
                </div>
            </section>

            {/* Main Dashboard Grid */}
            <section className="grid grid-cols-1 gap-6 xl:grid-cols-3">
                {/* Recent Orders */}
                <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm shadow-slate-200/40 xl:col-span-2">
                    <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4 sm:px-6">
                        <div>
                            <h2 className="text-base font-bold text-slate-900">
                                Recent Orders
                            </h2>

                            <p className="mt-0.5 text-xs text-slate-500">
                                Latest customer orders
                            </p>
                        </div>

                        <a
                            href="#"
                            className="
                                flex items-center gap-1
                                text-xs font-semibold
                                text-emerald-600 transition
                                hover:text-emerald-700
                            "
                        >
                            View all
                            <ChevronRight size={14} />
                        </a>
                    </div>

                    {/* Desktop Table */}
                    <div className="hidden overflow-x-auto sm:block">
                        <table className="w-full min-w-[650px]">
                            <thead>
                                <tr className="border-b border-slate-100 bg-slate-50/60">
                                    <th className="px-6 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-slate-400">
                                        Order
                                    </th>

                                    <th className="px-6 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-slate-400">
                                        Customer
                                    </th>

                                    <th className="px-6 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-slate-400">
                                        Amount
                                    </th>

                                    <th className="px-6 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-slate-400">
                                        Status
                                    </th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-slate-100">
                                <tr className="transition hover:bg-slate-50/50">
                                    <td className="px-6 py-4 text-sm font-semibold text-slate-900">
                                        #ORD-10842
                                    </td>

                                    <td className="px-6 py-4">
                                        <p className="text-sm font-medium text-slate-800">
                                            Ali Hassan
                                        </p>
                                        <p className="text-xs text-slate-400">
                                            2 min ago
                                        </p>
                                    </td>

                                    <td className="px-6 py-4 text-sm font-semibold text-slate-800">
                                        Rs. 3,450
                                    </td>

                                    <td className="px-6 py-4">
                                        <span className="inline-flex rounded-full bg-amber-50 px-2.5 py-1 text-[11px] font-semibold text-amber-700">
                                            Processing
                                        </span>
                                    </td>
                                </tr>

                                <tr className="transition hover:bg-slate-50/50">
                                    <td className="px-6 py-4 text-sm font-semibold text-slate-900">
                                        #ORD-10841
                                    </td>

                                    <td className="px-6 py-4">
                                        <p className="text-sm font-medium text-slate-800">
                                            Sara Ahmed
                                        </p>
                                        <p className="text-xs text-slate-400">
                                            15 min ago
                                        </p>
                                    </td>

                                    <td className="px-6 py-4 text-sm font-semibold text-slate-800">
                                        Rs. 2,180
                                    </td>

                                    <td className="px-6 py-4">
                                        <span className="inline-flex rounded-full bg-blue-50 px-2.5 py-1 text-[11px] font-semibold text-blue-700">
                                            Confirmed
                                        </span>
                                    </td>
                                </tr>

                                <tr className="transition hover:bg-slate-50/50">
                                    <td className="px-6 py-4 text-sm font-semibold text-slate-900">
                                        #ORD-10840
                                    </td>

                                    <td className="px-6 py-4">
                                        <p className="text-sm font-medium text-slate-800">
                                            Hamza Ali
                                        </p>
                                        <p className="text-xs text-slate-400">
                                            28 min ago
                                        </p>
                                    </td>

                                    <td className="px-6 py-4 text-sm font-semibold text-slate-800">
                                        Rs. 5,720
                                    </td>

                                    <td className="px-6 py-4">
                                        <span className="inline-flex rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-semibold text-emerald-700">
                                            Delivered
                                        </span>
                                    </td>
                                </tr>

                                <tr className="transition hover:bg-slate-50/50">
                                    <td className="px-6 py-4 text-sm font-semibold text-slate-900">
                                        #ORD-10839
                                    </td>

                                    <td className="px-6 py-4">
                                        <p className="text-sm font-medium text-slate-800">
                                            Ayesha Khan
                                        </p>
                                        <p className="text-xs text-slate-400">
                                            42 min ago
                                        </p>
                                    </td>

                                    <td className="px-6 py-4 text-sm font-semibold text-slate-800">
                                        Rs. 1,950
                                    </td>

                                    <td className="px-6 py-4">
                                        <span className="inline-flex rounded-full bg-red-50 px-2.5 py-1 text-[11px] font-semibold text-red-600">
                                            Cancelled
                                        </span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    {/* Mobile Orders */}
                    <div className="divide-y divide-slate-100 sm:hidden">
                        <div className="flex items-center justify-between px-5 py-4">
                            <div>
                                <p className="text-sm font-semibold text-slate-900">
                                    #ORD-10842
                                </p>

                                <p className="mt-1 text-xs text-slate-500">
                                    Ali Hassan · 2 min ago
                                </p>
                            </div>

                            <div className="text-right">
                                <p className="text-sm font-semibold text-slate-800">
                                    Rs. 3,450
                                </p>

                                <span className="mt-1 inline-flex rounded-full bg-amber-50 px-2 py-0.5 text-[10px] font-semibold text-amber-700">
                                    Processing
                                </span>
                            </div>
                        </div>

                        <div className="flex items-center justify-between px-5 py-4">
                            <div>
                                <p className="text-sm font-semibold text-slate-900">
                                    #ORD-10841
                                </p>

                                <p className="mt-1 text-xs text-slate-500">
                                    Sara Ahmed · 15 min ago
                                </p>
                            </div>

                            <div className="text-right">
                                <p className="text-sm font-semibold text-slate-800">
                                    Rs. 2,180
                                </p>

                                <span className="mt-1 inline-flex rounded-full bg-blue-50 px-2 py-0.5 text-[10px] font-semibold text-blue-700">
                                    Confirmed
                                </span>
                            </div>
                        </div>

                        <div className="flex items-center justify-between px-5 py-4">
                            <div>
                                <p className="text-sm font-semibold text-slate-900">
                                    #ORD-10840
                                </p>

                                <p className="mt-1 text-xs text-slate-500">
                                    Hamza Ali · 28 min ago
                                </p>
                            </div>

                            <div className="text-right">
                                <p className="text-sm font-semibold text-slate-800">
                                    Rs. 5,720
                                </p>

                                <span className="mt-1 inline-flex rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-700">
                                    Delivered
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                    {/* Pending Orders */}
                    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm shadow-slate-200/40">
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="text-sm font-bold text-slate-900">
                                    Pending Orders
                                </p>

                                <p className="mt-1 text-xs text-slate-500">
                                    Require your attention
                                </p>
                            </div>

                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
                                <Clock3 size={20} />
                            </div>
                        </div>

                        <p className="mt-5 text-3xl font-bold tracking-tight text-slate-900">
                            12
                        </p>

                        <a
                            href="#"
                            className="
                                mt-4 flex items-center justify-between
                                rounded-xl bg-slate-50 px-3 py-2.5
                                text-xs font-semibold text-slate-600
                                transition hover:bg-slate-100
                            "
                        >
                            Review orders
                            <ChevronRight size={15} />
                        </a>
                    </div>

                    {/* Low Stock */}
                    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm shadow-slate-200/40">
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="text-sm font-bold text-slate-900">
                                    Low Stock
                                </p>

                                <p className="mt-1 text-xs text-slate-500">
                                    Products running low
                                </p>
                            </div>

                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-50 text-red-500">
                                <AlertTriangle size={20} />
                            </div>
                        </div>

                        <p className="mt-5 text-3xl font-bold tracking-tight text-slate-900">
                            7
                        </p>

                        <a
                            href="#"
                            className="
                                mt-4 flex items-center justify-between
                                rounded-xl bg-slate-50 px-3 py-2.5
                                text-xs font-semibold text-slate-600
                                transition hover:bg-slate-100
                            "
                        >
                            Manage inventory
                            <ChevronRight size={15} />
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AdminDashboardPage;