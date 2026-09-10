import React, { useState, useRef, useEffect } from 'react'
import { Menu, Search, User, ChevronDown, UserCircle, Package, MapPin, Settings, LogOut } from 'lucide-react'
import { useNavigate, NavLink } from 'react-router-dom'
import Cart from './Cart'
import WishlistIcon from './WishlistIcon'
import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

const Header = ({ onMenuClick, user }) => {
    const { logout } = useContext(AuthContext)

    const [search, setSearch] = useState('')
    const [showMobileSearch, setShowMobileSearch] = useState(false)
    const navigate = useNavigate()
    const [accountOpen, setAccountOpen] = useState(false)
    const accountRef = useRef(null)

    // Close account dropdown when clicking outside 
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (accountRef.current && !accountRef.current.contains(event.target)) { setAccountOpen(false) }
        }
        document.addEventListener('mousedown', handleClickOutside)

        return () => { document.removeEventListener('mousedown', handleClickOutside) }
    }, [])
    const userName = user?.name || 'Account'
    const handleSearch = (e) => {
        e.preventDefault()

        const searchValue = search.trim()

        if (!searchValue) return

        navigate(`/search/product/?search=${encodeURIComponent(searchValue)}`)

        setSearch("")
        setShowMobileSearch(false)
    }

    // logout user
    const logoutUser = () => {
        try {
            logout()
            navigate("/login")
        } catch (err) {
            toast.error(err.message)
        } finally {

        }
    }
    return (
        <header className="sticky top-0 z-40 bg-white border-b border-[#22281F]/10">
            <div className="max-w-7xl mx-auto flex items-center gap-3 px-4 py-3 lg:px-8">

                {/* <!-- Hamburger — toggles Sidebar drawer --> */}
                <button type="button" aria-label="Open menu" onClick={onMenuClick}>
                    <Menu className="w-6 h-6" strokeWidth={2} />
                </button>

                {/* <!-- Brand --> */}
                <NavLink to="/" className="font-['Fraunces'] font-semibold text-lg text-[#1F6F4A] shrink-0">
                    Apna Kiryana
                </NavLink>

                {/* <!-- Search bar — visible inline on desktop, icon-only trigger on mobile --> */}
                <form
                    onSubmit={handleSearch}
                    className="hidden lg:flex flex-1 max-w-xl mx-auto"
                >
                    <label className="relative w-full">
                        <span className="sr-only">Search products</span>

                        <Search
                            className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-[#22281F]/40"
                        />

                        <input
                            type="search"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search"
                            className="w-full pl-10 pr-4 py-2.5 rounded-full bg-[#F6F8F4] border border-[#22281F]/10 text-sm placeholder:text-[#22281F]/40 focus:outline-none focus:ring-2 focus:ring-[#1F6F4A]"
                        />
                    </label>
                </form>

                <div className="flex-1 lg:hidden"></div>

                {/* <!-- Right-side icons --> */}
                <div className="flex items-center gap-1">
                    {/* Mobile Search */}
                    <button
                        type="button"
                        aria-label="Search"
                        className="lg:hidden p-2 rounded-lg hover:bg-[#F6F8F4]"
                        onClick={() => setShowMobileSearch((prev) => !prev)}
                    >
                        <Search className="w-6 h-6" strokeWidth={2} />
                    </button>

                    {/* <!-- Wishlist (desktop) --> */}
                    <WishlistIcon />

                    {/* <!-- Cart, with item-count badge --> */}
                    <Cart />

                    {/* <!-- Account (desktop) --> */}
                    {/* Account */}
                    <div ref={accountRef} className="relative hidden lg:block" >
                        <button type="button" aria-label="Account menu" aria-expanded={accountOpen} onClick={() => setAccountOpen((prev) => !prev)} className=" inline-flex items-center gap-1.5 p-2 rounded-lg transition hover:bg-[#F6F8F4] " >
                            <User className="w-5 h-5" strokeWidth={2} />
                            <span className="max-w-[110px] truncate text-sm font-medium text-[#22281F]"> {userName} </span>
                            <ChevronDown className={` w-4 h-4 text-[#22281F]/50 transition-transform ${accountOpen ? 'rotate-180' : ''} `} strokeWidth={2} />
                        </button>
                        {/* Account Dropdown */}
                        {accountOpen && (<div className=" absolute right-0 top-full mt-2 w-64 overflow-hidden rounded-2xl border border-[#22281F]/10 bg-white shadow-[0_12px_35px_rgba(0,0,0,0.12)] " >
                            {/* Account Header */}
                            <div className="px-4 py-4 border-b border-[#22281F]/10">
                                <p className="text-sm font-semibold text-[#22281F] truncate"> {userName} </p>
                                <p className="mt-0.5 text-xs text-[#22281F]/50"> My account </p>
                            </div>
                            {/* Account Links */}
                            <div className="p-2">
                                {/* Profile */}
                                <NavLink to="/account/profile" onClick={() => setAccountOpen(false)} className=" flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-[#22281F]/80 transition hover:bg-[#F6F8F4] hover:text-[#1F6F4A] " >
                                    <UserCircle className="w-4 h-4" />
                                    <span>Profile</span>
                                </NavLink>
                                {/* Orders */}
                                <NavLink to="/account/orders"
                                    onClick={() => setAccountOpen(false)} className=" flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-[#22281F]/80 transition hover:bg-[#F6F8F4] hover:text-[#1F6F4A] " > <Package className="w-4 h-4" />
                                    <span>My Orders</span>
                                </NavLink>
                                {/* Addresses */}
                                {/* <NavLink to="/account/addresses" onClick={() => setAccountOpen(false)} className=" flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-[#22281F]/80 transition hover:bg-[#F6F8F4] hover:text-[#1F6F4A] " >
                                    <MapPin className="w-4 h-4" />
                                    <span>Addresses</span>
                                </NavLink> */}
                                {/* Settings */}
                                {/* <NavLink to="/account/settings" onClick={() => setAccountOpen(false)} className=" flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-[#22281F]/80 transition hover:bg-[#F6F8F4] hover:text-[#1F6F4A] " >
                                    <Settings className="w-4 h-4" />
                                    <span>Settings</span>
                                </NavLink> */}
                                {user?.role === 'admin' && (
                                    <NavLink
                                        to="/admin"
                                        onClick={() => setAccountOpen(false)}
                                        className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-[#22281F]/80 transition hover:bg-[#F6F8F4] hover:text-[#1F6F4A]"
                                    >
                                        <Settings className="w-4 h-4" />
                                        <span>Admin Dashboard</span>
                                    </NavLink>
                                )}
                            </div>
                            {/* Logout */}
                            <div className="border-t border-[#22281F]/10 p-2">
                                <button type="button" className=" flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-[#C1502E] transition hover:bg-[#C1502E]/5 "
                                    onClick={logoutUser} >
                                    <LogOut className="w-4 h-4" />
                                    <span>Logout</span>
                                </button>
                            </div>
                        </div>)}
                    </div>
                </div>
            </div>

            {showMobileSearch && (
                <div className="lg:hidden px-4 pb-3">
                    <form onSubmit={handleSearch} className="flex items-center gap-2">
                        <label className="relative flex-1">
                            <span className="sr-only">Search products</span>
                            <button onClick={handleSearch}>
                                <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-[#22281F]/40" />
                            </button>
                            <input
                                type="search"
                                autoFocus
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search"
                                className="w-full pl-10 pr-4 py-2.5 rounded-full bg-[#F6F8F4] border border-[#22281F]/10 text-sm placeholder:text-[#22281F]/40 focus:outline-none focus:ring-2 focus:ring-[#1F6F4A]"
                            />
                        </label>
                        <button
                            type="button"
                            onClick={() => {
                                setShowMobileSearch(false)
                                setSearch("")
                            }}
                            className="text-sm text-[#22281F]/60 shrink-0"
                        >
                            Cancel
                        </button>
                    </form>
                </div>
            )}
        </header >
    )
}

export default Header

// {/* <!--
//   DESIGN TOKENS (for reference when you wire this into Tailwind config later)
//   Primary green   #1F6F4A   — trust / fresh produce
//   Deep green      #154A32   — hero gradient end, headers
//   Turmeric        #E8A33D   — CTAs, price accents, spice-market feel
//   Terracotta      #C1502E   — discount badges, "out of stock"
//   Cream bg        #F6F8F4
//   Charcoal text   #22281F
//   Display font: Fraunces (headings, brand)
//   Body font:    Inter (everything else)
// --> */}

// import React, { useState } from 'react'
// import { Menu, Search } from 'lucide-react'
// import { useNavigate } from 'react-router-dom'

// const Header = ({ onMenuClick }) => {
//     const [search, setSearch] = useState('')
//     const navigate = useNavigate()

//     const handleSearch = (e) => {
//         e.preventDefault()

//         const searchValue = search.trim()

//         if (!searchValue) return

//         navigate(`/search/product/?search=${encodeURIComponent(searchValue)}`)
//     }

//     return (
//         <header className="sticky top-0 z-40 bg-white border-b border-[#22281F]/10">
//             <div className="max-w-7xl mx-auto flex items-center gap-3 px-4 py-3 lg:px-8">

//                 {/* Hamburger */}
//                 <button
//                     type="button"
//                     aria-label="Open menu"
//                     onClick={onMenuClick}
//                 >
//                     <Menu className="w-6 h-6" strokeWidth={2} />
//                 </button>

//                 {/* Brand */}
//                 <NavLink
//                     href="#"
//                     className="font-['Fraunces'] font-semibold text-lg text-[#1F6F4A] shrink-0"
//                 >
//                     Apna Kiryana
//                 </NavLink>

//                 {/* Desktop Search */}
//                 <form
//                     onSubmit={handleSearch}
//                     className="hidden lg:flex flex-1 max-w-xl mx-auto"
//                 >
//                     <label className="relative w-full">
//                         <span className="sr-only">Search products</span>

//                         <Search
//                             className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-[#22281F]/40"
//                         />

//                         <input
//                             type="search"
//                             value={search}
//                             onChange={(e) => setSearch(e.target.value)}
//                             placeholder="Search"
//                             className="w-full pl-10 pr-4 py-2.5 rounded-full bg-[#F6F8F4] border border-[#22281F]/10 text-sm placeholder:text-[#22281F]/40 focus:outline-none focus:ring-2 focus:ring-[#1F6F4A]"
//                         />
//                     </label>
//                 </form>

//                 <div className="flex-1 lg:hidden"></div>

//                 {/* Right-side icons */}
//                 <div className="flex items-center gap-1">

//                     {/* Mobile Search */}
//                     <button
//                         type="button"
//                         aria-label="Search"
//                         className="lg:hidden p-2 rounded-lg hover:bg-[#F6F8F4]"
//                         onClick={() => navigate('/search')}
//                     >
//                         <Search className="w-6 h-6" strokeWidth={2} />
//                     </button>

//                     {/* Wishlist */}
//                     <NavLink
//                         href="#"
//                         aria-label="Wishlist"
//                         className="hidden lg:inline-flex p-2 rounded-lg hover:bg-[#F6F8F4]"
//                     >
//                         {/* Wishlist SVG */}
//                     </NavLink>

//                     {/* Cart */}
//                     <NavLink
//                         href="#"
//                         aria-label="Cart"
//                         className="relative p-2 rounded-lg hover:bg-[#F6F8F4]"
//                     >
//                         {/* Cart SVG */}
//                         <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 rounded-full bg-[#C1502E] text-white text-[10px] leading-[18px] text-center font-medium">
//                             3
//                         </span>
//                     </NavLink>

//                     {/* Account */}
//                     <NavLink
//                         href="#"
//                         aria-label="Account"
//                         className="hidden lg:inline-flex p-2 rounded-lg hover:bg-[#F6F8F4]"
//                     >
//                         {/* Account SVG */}
//                     </NavLink>

//                 </div>
//             </div>
//         </header>
//     )
// }

// export default Header