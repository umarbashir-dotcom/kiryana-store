import {
    Menu,
    Search,
    Bell,
    ExternalLink,
    ChevronDown,
    User,
} from "lucide-react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const AdminTopBar = ({ onMenuClick }) => {
    const { user } = useContext(AuthContext)

    const navigate = useNavigate()
    return (
        <header className="sticky top-0 z-30 h-[76px] border-b border-slate-200 bg-white/95 backdrop-blur">
            <div className="flex h-full items-center justify-between px-4 sm:px-6 lg:px-8">

                {/* Left */}
                <div className="flex min-w-0 items-center gap-3">

                    {/* Mobile Hamburger */}
                    <button
                        type="button"
                        onClick={onMenuClick}
                        className="
                            flex h-10 w-10 shrink-0
                            items-center justify-center
                            rounded-xl border border-slate-200
                            text-slate-600
                            transition
                            hover:bg-slate-50
                            hover:text-slate-900
                            focus:outline-none
                            focus:ring-2
                            focus:ring-emerald-500/20
                            lg:hidden
                        "
                        aria-label="Open admin navigation"
                    >
                        <Menu size={21} />
                    </button>

                    {/* Page Heading */}
                    <div className="min-w-0">
                        <div className="hidden items-center gap-2 text-xs text-slate-400 sm:flex">
                            <span>Admin</span>
                            <span>/</span>
                            <span className="text-slate-500">
                                Dashboard
                            </span>
                        </div>

                        <h2 className="truncate text-base font-bold text-slate-900 sm:mt-0.5 sm:text-lg">
                            Dashboard
                        </h2>
                    </div>
                </div>

                {/* Right */}
                <div className="flex items-center gap-2 sm:gap-3">

                    {/* Search */}
                    <div className="relative hidden md:block">
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
                            placeholder="Search..."
                            className="
                                h-10 w-52 rounded-xl
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
                                lg:w-64
                            "
                        />
                    </div>

                    {/* View Store */}
                    <button
                        type="button"
                        className="
                            hidden h-10 items-center gap-2
                            rounded-xl border border-slate-200
                            px-3
                            text-sm font-medium text-slate-600
                            transition
                            hover:bg-slate-50
                            hover:text-slate-900
                            sm:flex
                        "
                        onClick={() => { navigate("/")}}
                    >
                        <span>View Store</span>
                        <ExternalLink size={15} />
                    </button>

                    {/* Notifications */}
                    <button
                        type="button"
                        aria-label="Notifications"
                        className="
                            relative flex h-10 w-10
                            items-center justify-center
                            rounded-xl border border-slate-200
                            text-slate-500
                            transition
                            hover:bg-slate-50
                            hover:text-slate-900
                        "
                    >
                        <Bell size={19} />

                        <span
                            className="
                                absolute right-2 top-2
                                h-2 w-2 rounded-full
                                bg-red-500
                                ring-2 ring-white
                            "
                        />
                    </button>

                    {/* Profile */}
                    <button
                        type="button"
                        aria-label="Open profile menu"
                        className="
                            flex h-10 items-center gap-2
                            rounded-xl border border-slate-200
                            px-2
                            transition
                            hover:bg-slate-50
                        "
                    >
                        <div
                            className="
                                flex h-7 w-7
                                items-center justify-center
                                rounded-lg
                                bg-emerald-100
                                text-[10px] font-bold
                                text-emerald-700
                            "
                        >
                            {user.name.charAt(0).toUpperCase() + user.name.split(" ")[1].charAt(0).toUpperCase()}
                        </div>

                        <span className="hidden text-sm font-semibold text-slate-700 lg:block">
                            {user.name}
                        </span>

                        {/* <ChevronDown
                            size={15}
                            className="hidden text-slate-400 lg:block"
                        /> */}
                    </button>
                </div>
            </div>
        </header>
    );
};

export default AdminTopBar;