import {  useContext, useEffect } from 'react'
import { CartContext } from '../context/CartContext'
import { Link } from "react-router-dom"
const Cart = () => {
    const { cartItemsCount } = useContext(CartContext)

    return (
        <Link to="/cart" aria-label="Cart" className="relative p-2 rounded-lg hover:bg-[#F6F8F4]">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l3-8H6.4M7 13L5.4 5M7 13l-2.3 4.6A1 1 0 005.6 19H17M17 13v6M9 21a1 1 0 100-2 1 1 0 000 2zM17 21a1 1 0 100-2 1 1 0 000 2z" />
            </svg>
            { cartItemsCount > 0 && <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 rounded-full bg-[#C1502E] text-white text-[10px] leading-[18px] text-center font-medium">
                    { cartItemsCount > 99 ? "99+" : cartItemsCount}
            </span> }
        </Link>
    )
}

export default Cart