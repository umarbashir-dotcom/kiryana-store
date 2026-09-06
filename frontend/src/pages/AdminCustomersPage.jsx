import {
    Search,
    SlidersHorizontal,
    Eye,
    Users,
    ChevronLeft,
    ChevronRight,
} from "lucide-react";

const AdminCustomersPage = () => {
    const customers = [
        {
            id: 1,
            name: "Ali Hassan",
            phone: "0300-1234567",
            email: "ali@example.com",
            orders: 14,
            spent: 28450,
            joined: "12 Aug, 2026",
            status: "Active",
        },
        {
            id: 2,
            name: "Sara Ahmed",
            phone: "0312-7654321",
            email: "sara@example.com",
            orders: 9,
            spent: 18750,
            joined: "28 Jul, 2026",
            status: "Active",
        },
        {
            id: 3,
            name: "Hamza Ali",
            phone: "0321-4567890",
            email: "hamza@example.com",
            orders: 21,
            spent: 42680,
            joined: "14 Jul, 2026",
            status: "Active",
        },
        {
            id: 4,
            name: "Ayesha Khan",
            phone: "0301-9876543",
            email: "ayesha@example.com",
            orders: 6,
            spent: 9200,
            joined: "30 Jun, 2026",
            status: "Active",
        },
        {
            id: 5,
            name: "Usman Tariq",
            phone: "0333-2345678",
            email: "usman@example.com",
            orders: 3,
            spent: 4150,
            joined: "21 Jun, 2026",
            status: "Inactive",
        },
        {
            id: 6,
            name: "Fatima Noor",
            phone: "0305-8765432",
            email: "fatima@example.com",
            orders: 11,
            spent: 21340,
            joined: "09 Jun, 2026",
            status: "Active",
        },
    ];

    return (
        <div className="space-y-6">

            {/* Page Header */}
            <section>
                <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                        <p className="text-sm font-medium text-emerald-600">
                            Store management
                        </p>

                        <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                            Customers
                        </h1>

                        <p className="mt-1.5 text-sm text-slate-500">
                            View your store customers and their activity.
                        </p>
                    </div>

                    {/* Customer Count */}
                    <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-2.5">
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
                            <Users size={18} />
                        </div>

                        <div>
                            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                                Customers
                            </p>

                            <p className="text-lg font-bold text-slate-900">
                                1,284
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Customers Card */}
            <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm shadow-slate-200/40">

                {/* Toolbar */}
                <div className="flex flex-col gap-3 border-b border-slate-100 p-4 sm:p-5 lg:flex-row lg:items-center lg:justify-between">

                    {/* Search */}
                    <div className="relative w-full lg:max-w-sm">
                        <Search
                            size={17}
                            className="
                                pointer-events-none
                                absolute left-3 top-1/2
                                -translate-y-1/2
                                text-slate-400
                            "
                        />

                        <input
                            type="search"
                            placeholder="Search customers..."
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

                    {/* Filters */}
                    <button
                        type="button"
                        className="
                            inline-flex h-10
                            items-center justify-center
                            gap-2 rounded-xl
                            border border-slate-200
                            px-3.5
                            text-sm font-medium
                            text-slate-600
                            transition
                            hover:bg-slate-50
                            hover:text-slate-900
                        "
                    >
                        <SlidersHorizontal size={17} />
                        Filters
                    </button>
                </div>

                {/* Mobile Customers */}
                <div className="divide-y divide-slate-100 md:hidden">
                    {customers.map((customer) => (
                        <div
                            key={customer.id}
                            className="p-4"
                        >
                            <div className="flex items-start gap-3">

                                {/* Avatar */}
                                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-sm font-bold text-emerald-700">
                                    {customer.name
                                        .split(" ")
                                        .map((name) => name[0])
                                        .join("")
                                        .slice(0, 2)}
                                </div>

                                <div className="min-w-0 flex-1">
                                    <div className="flex items-start justify-between gap-3">
                                        <div className="min-w-0">
                                            <h3 className="truncate text-sm font-semibold text-slate-900">
                                                {customer.name}
                                            </h3>

                                            <p className="mt-0.5 truncate text-xs text-slate-500">
                                                {customer.phone}
                                            </p>
                                        </div>

                                        <span
                                            className={`
                                                shrink-0 rounded-full
                                                px-2.5 py-1
                                                text-[10px] font-semibold
                                                ${
                                                    customer.status === "Active"
                                                        ? "bg-emerald-50 text-emerald-700"
                                                        : "bg-slate-100 text-slate-500"
                                                }
                                            `}
                                        >
                                            {customer.status}
                                        </span>
                                    </div>

                                    <div className="mt-3 grid grid-cols-2 gap-3">
                                        <div>
                                            <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                                                Orders
                                            </p>

                                            <p className="mt-1 text-sm font-semibold text-slate-800">
                                                {customer.orders}
                                            </p>
                                        </div>

                                        <div>
                                            <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                                                Total Spent
                                            </p>

                                            <p className="mt-1 text-sm font-semibold text-slate-800">
                                                Rs.{" "}
                                                {customer.spent.toLocaleString()}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-3">
                                        <p className="text-xs text-slate-400">
                                            Joined {customer.joined}
                                        </p>

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
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Desktop Table */}
                <div className="hidden overflow-x-auto md:block">
                    <table className="w-full min-w-[900px]">
                        <thead>
                            <tr className="border-b border-slate-100 bg-slate-50/60">
                                <th className="px-6 py-3.5 text-left text-[11px] font-bold uppercase tracking-wider text-slate-400">
                                    Customer
                                </th>

                                <th className="px-4 py-3.5 text-left text-[11px] font-bold uppercase tracking-wider text-slate-400">
                                    Orders
                                </th>

                                <th className="px-4 py-3.5 text-left text-[11px] font-bold uppercase tracking-wider text-slate-400">
                                    Total Spent
                                </th>

                                <th className="px-4 py-3.5 text-left text-[11px] font-bold uppercase tracking-wider text-slate-400">
                                    Joined
                                </th>

                                <th className="px-4 py-3.5 text-left text-[11px] font-bold uppercase tracking-wider text-slate-400">
                                    Status
                                </th>

                                <th className="px-6 py-3.5 text-right text-[11px] font-bold uppercase tracking-wider text-slate-400">
                                    Action
                                </th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-slate-100">
                            {customers.map((customer) => (
                                <tr
                                    key={customer.id}
                                    className="transition hover:bg-slate-50/50"
                                >
                                    {/* Customer */}
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-xs font-bold text-emerald-700">
                                                {customer.name
                                                    .split(" ")
                                                    .map((name) => name[0])
                                                    .join("")
                                                    .slice(0, 2)}
                                            </div>

                                            <div className="min-w-0">
                                                <p className="text-sm font-semibold text-slate-900">
                                                    {customer.name}
                                                </p>

                                                <p className="mt-0.5 text-xs text-slate-400">
                                                    {customer.phone}
                                                </p>
                                            </div>
                                        </div>
                                    </td>

                                    {/* Orders */}
                                    <td className="px-4 py-4">
                                        <span className="text-sm font-medium text-slate-700">
                                            {customer.orders}
                                        </span>
                                    </td>

                                    {/* Total Spent */}
                                    <td className="px-4 py-4">
                                        <span className="text-sm font-semibold text-slate-800">
                                            Rs.{" "}
                                            {customer.spent.toLocaleString()}
                                        </span>
                                    </td>

                                    {/* Joined */}
                                    <td className="px-4 py-4">
                                        <span className="text-xs font-medium text-slate-600">
                                            {customer.joined}
                                        </span>
                                    </td>

                                    {/* Status */}
                                    <td className="px-4 py-4">
                                        <span
                                            className={`
                                                inline-flex rounded-full
                                                px-2.5 py-1
                                                text-[11px] font-semibold
                                                ${
                                                    customer.status === "Active"
                                                        ? "bg-emerald-50 text-emerald-700"
                                                        : "bg-slate-100 text-slate-500"
                                                }
                                            `}
                                        >
                                            {customer.status}
                                        </span>
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
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="flex flex-col gap-3 border-t border-slate-100 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
                    <p className="text-xs text-slate-500">
                        Showing{" "}
                        <span className="font-semibold text-slate-700">
                            1–6
                        </span>{" "}
                        of{" "}
                        <span className="font-semibold text-slate-700">
                            1,284
                        </span>{" "}
                        customers
                    </p>

                    <div className="flex items-center gap-1">
                        <button
                            type="button"
                            className="
                                flex h-8 w-8 items-center justify-center
                                rounded-lg border border-slate-200
                                text-slate-400
                                transition hover:bg-slate-50
                            "
                            aria-label="Previous page"
                        >
                            <ChevronLeft size={16} />
                        </button>

                        <button
                            type="button"
                            className="
                                flex h-8 w-8 items-center justify-center
                                rounded-lg bg-emerald-600
                                text-xs font-semibold text-white
                            "
                        >
                            1
                        </button>

                        <button
                            type="button"
                            className="
                                flex h-8 w-8 items-center justify-center
                                rounded-lg text-xs font-medium
                                text-slate-600
                                transition hover:bg-slate-100
                            "
                        >
                            2
                        </button>

                        <button
                            type="button"
                            className="
                                flex h-8 w-8 items-center justify-center
                                rounded-lg text-xs font-medium
                                text-slate-600
                                transition hover:bg-slate-100
                            "
                        >
                            3
                        </button>

                        <button
                            type="button"
                            className="
                                flex h-8 w-8 items-center justify-center
                                rounded-lg border border-slate-200
                                text-slate-500
                                transition hover:bg-slate-50
                            "
                            aria-label="Next page"
                        >
                            <ChevronRight size={16} />
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AdminCustomersPage;