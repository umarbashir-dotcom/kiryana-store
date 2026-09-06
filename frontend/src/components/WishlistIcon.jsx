import { useContext, useEffect } from 'react'
import { WishlistContext } from '../context/WishlistContext'
import { NavLink } from 'react-router-dom'

const WishlistIcon = () => {
    const { wishlistItemsCount, getWishlist } = useContext(WishlistContext)
    

    return (
        <NavLink to="/wishlist" aria-label="Wishlist" className="relative hidden lg:inline-flex p-2 rounded-lg hover:bg-[#F6F8F4]">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 116.364 6.364L12 20.364l-7.682-7.682a4.5 4.5 0 010-6.364z" />
            </svg>
            {wishlistItemsCount > 0 && <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 rounded-full bg-[#C1502E] text-white text-[10px] leading-[18px] text-center font-medium">
                {wishlistItemsCount > 99 ? "99+" : wishlistItemsCount}
            </span>}
        </NavLink>
    )
}

export default WishlistIcon