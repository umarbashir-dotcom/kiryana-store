import {
    Plus,
    Search,
    Pencil,
    Trash2,
    MoreHorizontal,
    ChevronLeft,
    ChevronRight,
    FolderOpen,
} from "lucide-react";

const AdminCategoriesPage = () => {
    const categories = [
        {
            id: 1,
            name: "Rice & Grains",
            description: "Rice, flour and other grains",
            products: 32,
            status: "Active",
        },
        {
            id: 2,
            name: "Cooking Oil",
            description: "Cooking oils and ghee",
            products: 18,
            status: "Active",
        },
        {
            id: 3,
            name: "Tea & Beverages",
            description: "Tea, coffee and beverages",
            products: 27,
            status: "Active",
        },
        {
            id: 4,
            name: "Spices",
            description: "Spices and seasoning products",
            products: 41,
            status: "Active",
        },
        {
            id: 5,
            name: "Cleaning",
            description: "Household cleaning products",
            products: 24,
            status: "Active",
        },
        {
            id: 6,
            name: "Dairy",
            description: "Milk and dairy products",
            products: 16,
            status: "Inactive",
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
                            Categories
                        </h1>

                        <p className="mt-1.5 text-sm text-slate-500">
                            Organize your products into categories.
                        </p>
                    </div>

                    {/* Add Category */}
                    <button
                        type="button"
                        className="
                            inline-flex h-10 items-center
                            justify-center gap-2
                            rounded-xl bg-emerald-600
                            px-4
                            text-sm font-semibold text-white
                            shadow-sm
                            transition
                            hover:bg-emerald-700
                            focus:outline-none
                            focus:ring-2
                            focus:ring-emerald-500/30
                            focus:ring-offset-2
                        "
                    >
                        <Plus size={18} />
                        Add Category
                    </button>
                </div>
            </section>

            {/* Categories Card */}
            <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm shadow-slate-200/40">

                {/* Toolbar */}
                <div className="flex flex-col gap-3 border-b border-slate-100 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">

                    {/* Search */}
                    <div className="relative w-full sm:max-w-sm">
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
                            placeholder="Search categories..."
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
                </div>

                {/* Mobile Categories */}
                <div className="divide-y divide-slate-100 md:hidden">
                    {categories.map((category) => (
                        <div
                            key={category.id}
                            className="p-4"
                        >
                            <div className="flex items-start gap-3">

                                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                                    <FolderOpen size={20} />
                                </div>

                                <div className="min-w-0 flex-1">
                                    <div className="flex items-start justify-between gap-3">
                                        <div className="min-w-0">
                                            <h3 className="truncate text-sm font-semibold text-slate-900">
                                                {category.name}
                                            </h3>

                                            <p className="mt-0.5 truncate text-xs text-slate-500">
                                                {category.description}
                                            </p>
                                        </div>

                                        <button
                                            type="button"
                                            className="
                                                shrink-0 rounded-lg p-1.5
                                                text-slate-400
                                                hover:bg-slate-100
                                                hover:text-slate-700
                                            "
                                            aria-label={`More actions for ${category.name}`}
                                        >
                                            <MoreHorizontal size={18} />
                                        </button>
                                    </div>

                                    <div className="mt-3 flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <span className="text-xs font-medium text-slate-500">
                                                {category.products} products
                                            </span>

                                            <span
                                                className={`
                                                    inline-flex rounded-full
                                                    px-2.5 py-1
                                                    text-[10px] font-semibold
                                                    ${
                                                        category.status === "Active"
                                                            ? "bg-emerald-50 text-emerald-700"
                                                            : "bg-slate-100 text-slate-500"
                                                    }
                                                `}
                                            >
                                                {category.status}
                                            </span>
                                        </div>

                                        <div className="flex items-center gap-1">
                                            <button
                                                type="button"
                                                className="
                                                    rounded-lg p-2
                                                    text-slate-400
                                                    transition
                                                    hover:bg-slate-100
                                                    hover:text-slate-700
                                                "
                                                aria-label={`Edit ${category.name}`}
                                            >
                                                <Pencil size={15} />
                                            </button>

                                            <button
                                                type="button"
                                                className="
                                                    rounded-lg p-2
                                                    text-slate-400
                                                    transition
                                                    hover:bg-red-50
                                                    hover:text-red-600
                                                "
                                                aria-label={`Delete ${category.name}`}
                                            >
                                                <Trash2 size={15} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Desktop Table */}
                <div className="hidden overflow-x-auto md:block">
                    <table className="w-full min-w-[700px]">
                        <thead>
                            <tr className="border-b border-slate-100 bg-slate-50/60">
                                <th className="px-6 py-3.5 text-left text-[11px] font-bold uppercase tracking-wider text-slate-400">
                                    Category
                                </th>

                                <th className="px-4 py-3.5 text-left text-[11px] font-bold uppercase tracking-wider text-slate-400">
                                    Products
                                </th>

                                <th className="px-4 py-3.5 text-left text-[11px] font-bold uppercase tracking-wider text-slate-400">
                                    Status
                                </th>

                                <th className="px-6 py-3.5 text-right text-[11px] font-bold uppercase tracking-wider text-slate-400">
                                    Actions
                                </th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-slate-100">
                            {categories.map((category) => (
                                <tr
                                    key={category.id}
                                    className="transition hover:bg-slate-50/50"
                                >
                                    {/* Category */}
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                                                <FolderOpen size={18} />
                                            </div>

                                            <div className="min-w-0">
                                                <p className="text-sm font-semibold text-slate-900">
                                                    {category.name}
                                                </p>

                                                <p className="mt-0.5 text-xs text-slate-400">
                                                    {category.description}
                                                </p>
                                            </div>
                                        </div>
                                    </td>

                                    {/* Products */}
                                    <td className="px-4 py-4">
                                        <span className="text-sm font-medium text-slate-700">
                                            {category.products}
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
                                                    category.status === "Active"
                                                        ? "bg-emerald-50 text-emerald-700"
                                                        : "bg-slate-100 text-slate-500"
                                                }
                                            `}
                                        >
                                            {category.status}
                                        </span>
                                    </td>

                                    {/* Actions */}
                                    <td className="px-6 py-4">
                                        <div className="flex items-center justify-end gap-1">
                                            <button
                                                type="button"
                                                className="
                                                    rounded-lg p-2
                                                    text-slate-400
                                                    transition
                                                    hover:bg-slate-100
                                                    hover:text-slate-700
                                                "
                                                aria-label={`Edit ${category.name}`}
                                            >
                                                <Pencil size={16} />
                                            </button>

                                            <button
                                                type="button"
                                                className="
                                                    rounded-lg p-2
                                                    text-slate-400
                                                    transition
                                                    hover:bg-red-50
                                                    hover:text-red-600
                                                "
                                                aria-label={`Delete ${category.name}`}
                                            >
                                                <Trash2 size={16} />
                                            </button>

                                            <button
                                                type="button"
                                                className="
                                                    rounded-lg p-2
                                                    text-slate-400
                                                    transition
                                                    hover:bg-slate-100
                                                    hover:text-slate-700
                                                "
                                                aria-label={`More actions for ${category.name}`}
                                            >
                                                <MoreHorizontal size={16} />
                                            </button>
                                        </div>
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
                            12
                        </span>{" "}
                        categories
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

export default AdminCategoriesPage;