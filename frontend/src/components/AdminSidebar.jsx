import {
    LayoutDashboard,
    Package,
    ShoppingCart,
    Users,
    Tags,
    Store,
    LogOut,
    X,
    ChevronRight,
} from "lucide-react";
import { NavLink } from "react-router-dom";

const AdminSidebar = ({ isOpen, onClose }) => {
    const getClassName = ({isActive}) => isActive ? 
                            "flex items-center gap-3 rounded-xl bg-emerald-50 px-3 py-2.5 text-sm font-semibold text-emerald-700"
                            : "group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50 hover:text-slate-900"
    return (
        <>
            {/* Mobile Overlay */}
            <div
                onClick={onClose}
                className={`
                    fixed inset-0 z-40
                    bg-slate-950/40
                    backdrop-blur-[2px]
                    transition-opacity duration-300
                    lg:hidden
                    ${
                        isOpen
                            ? "pointer-events-auto opacity-100"
                            : "pointer-events-none opacity-0"
                    }
                `}
                aria-hidden="true"
            />

            {/* Sidebar */}
            <aside
                className={`
                    fixed inset-y-0 left-0 z-50
                    flex w-[280px] flex-col
                    border-r border-slate-200
                    bg-white
                    shadow-xl shadow-slate-900/10

                    transform
                    transition-transform
                    duration-300
                    ease-in-out

                    lg:w-72
                    lg:translate-x-0
                    lg:shadow-none

                    ${
                        isOpen
                            ? "translate-x-0"
                            : "-translate-x-full"
                    }
                `}
                aria-label="Admin sidebar"
            >
                {/* Brand */}
                <div className="flex h-[76px] shrink-0 items-center justify-between border-b border-slate-200 px-5 sm:px-6">
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-600 text-white shadow-sm">
                            <Store
                                size={21}
                                strokeWidth={2.2}
                            />
                        </div>

                        <div className="leading-tight">
                            <h1 className="text-[15px] font-bold tracking-tight text-slate-900">
                                Apna Kiryana
                            </h1>

                            <p className="mt-0.5 text-xs font-medium text-slate-400">
                                Administration
                            </p>
                        </div>
                    </div>

                    {/* Mobile Close Button */}
                    <button
                        type="button"
                        onClick={onClose}
                        className="
                            flex h-9 w-9
                            items-center justify-center
                            rounded-lg
                            text-slate-400
                            transition
                            hover:bg-slate-100
                            hover:text-slate-700
                            lg:hidden
                        "
                        aria-label="Close admin navigation"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Admin Profile */}
                <div className="shrink-0 px-4 pt-5">
                    <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-3 py-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-sm font-bold text-emerald-700">
                            AB
                        </div>

                        <div className="min-w-0 flex-1">
                            <p className="truncate text-sm font-semibold text-slate-900">
                                Admin
                            </p>

                            <p className="truncate text-xs text-slate-500">
                                Store Administrator
                            </p>
                        </div>

                        <button
                            type="button"
                            className="
                                rounded-lg p-1.5
                                text-slate-400
                                transition
                                hover:bg-white
                                hover:text-slate-700
                            "
                            aria-label="Open admin profile"
                        >
                            <ChevronRight size={17} />
                        </button>
                    </div>
                </div>

                {/* Navigation */}
                <nav className="mt-6 flex-1 overflow-y-auto px-4 pb-5">

                    {/* Overview */}
                    <div>
                        <p className="mb-2 px-3 text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400">
                            Overview
                        </p>

                        <NavLink
                            to="/admin"
                            end
                            onClick={onClose}
                            className={getClassName}
                        >
                            <LayoutDashboard
                                size={19}
                                strokeWidth={2}
                                className="text-emerald-600"
                            />

                            <span>Dashboard</span>
                        </NavLink>
                    </div>

                    {/* Store Management */}
                    <div className="mt-7">
                        <p className="mb-2 px-3 text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400">
                            Store Management
                        </p>

                        <div className="space-y-1">

                            {/* Products */}
                            <NavLink
                                to="/admin/products"
                                onClick={onClose}
                                className={getClassName}
                            >
                                <Package
                                    size={19}
                                    strokeWidth={1.9}
                                />

                                <span>Products</span>
                            </NavLink>

                            {/* Categories */}
                            <NavLink
                                to="/admin/categories"
                                onClick={onClose}
                                className={getClassName}
                            >
                                <Tags
                                    size={19}
                                    strokeWidth={1.9}
                                />

                                <span>Categories</span>
                            </NavLink>

                            {/* Orders */}
                            <NavLink
                                to="/admin/orders"
                                onClick={onClose}
                                className={getClassName}
                            >
                                <ShoppingCart
                                    size={19}
                                    strokeWidth={1.9}
                                />

                                <span>Orders</span>

                                <span className="ml-auto flex h-5 min-w-5 items-center justify-center rounded-full bg-amber-100 px-1.5 text-[10px] font-bold text-amber-700">
                                    8
                                </span>
                            </NavLink>

                            {/* Customers */}
                            <NavLink
                                to="/admin/customers"
                                onClick={onClose}
                                className={getClassName}
                            >
                                <Users
                                    size={19}
                                    strokeWidth={1.9}
                                />

                                <span>Customers</span>
                            </NavLink>
                        </div>
                    </div>
                </nav>

                {/* Bottom Actions */}
                <div className="shrink-0 border-t border-slate-200 p-4">

                    {/* Customer Website */}
                    <NavLink
                        to="/"
                        onClick={onClose}
                        className="
                            mb-1 flex items-center gap-3
                            rounded-xl px-3 py-2.5
                            text-sm font-medium
                            text-slate-600
                            transition
                            hover:bg-slate-50
                            hover:text-slate-900
                        "
                    >
                        <Store
                            size={19}
                            strokeWidth={1.9}
                        />

                        <span>View Store</span>
                    </NavLink>

                    {/* Logout */}
                    <button
                        type="button"
                        className="
                            flex w-full items-center gap-3
                            rounded-xl px-3 py-2.5
                            text-sm font-medium
                            text-slate-500
                            transition
                            hover:bg-red-50
                            hover:text-red-600
                        "
                    >
                        <LogOut
                            size={19}
                            strokeWidth={1.9}
                        />

                        <span>Sign Out</span>
                    </button>
                </div>
            </aside>
        </>
    );
};

export default AdminSidebar;