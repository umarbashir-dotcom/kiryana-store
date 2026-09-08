import {useContext} from 'react'
import { Home, Search, Heart, ShoppingCart, User } from 'lucide-react'
import { CartContext } from '../context/CartContext'
import { NavLink } from "react-router-dom"
import { WishlistContext } from '../context/WishlistContext'

const BottomNav = () => {
  const { cartItemsCount } = useContext(CartContext)
  const { wishlistItemsCount } = useContext(WishlistContext)

  const getClassName = ({isActive}) => isActive ? "relative flex flex-col items-center justify-center gap-0.5 py-2.5 text-[#1F6F4A] font-medium"
          : "relative flex flex-col items-center justify-center gap-0.5 py-2.5 text-[#22281F]/50"

  return (
    <nav className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-white border-t border-[#22281F]/10">
        <div className="grid grid-cols-4">
          <NavLink to="/" className={getClassName}>
            <Home className="w-6 h-6" strokeWidth={2} />
            <span className="text-[11px]">Home</span>
          </NavLink>
          {/* <NavLink to="/ss" className={getClassName}>
            <Search className="w-6 h-6" strokeWidth={2} />
            <span className="text-[11px] font-medium">Search</span>
          </NavLink> */}
          <NavLink to="/wishlist" className={getClassName}>
            <Heart className="w-6 h-6" strokeWidth={2} />
            { wishlistItemsCount > 0 && 
            <span className="absolute top-1 right-[calc(50%-16px)] min-w-[16px] h-[16px] px-1 rounded-full bg-[#C1502E] text-white text-[9px] leading-[16px] text-center font-medium">  {wishlistItemsCount}
            </span> }
            <span className="text-[11px]">Wishlist</span>
          </NavLink>

          <NavLink to="/cart" className={getClassName}>
            <ShoppingCart className="w-6 h-6" strokeWidth={2} />
            { cartItemsCount > 0 && 
            <span className="absolute top-1 right-[calc(50%-16px)] min-w-[16px] h-[16px] px-1 rounded-full bg-[#C1502E] text-white text-[9px] leading-[16px] text-center font-medium">  {cartItemsCount}
            </span> }
            <span className="text-[11px]">Cart</span>
          </NavLink>
          <NavLink to="/account/profile" className={getClassName}>
            <User className="w-6 h-6" strokeWidth={2} />
            <span className="text-[11px]">Account</span>
          </NavLink>
        </div>
      </nav>
  )
}

export default BottomNav