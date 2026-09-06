import {useState} from 'react'
import { ShoppingCart, Trash2 } from 'lucide-react'
import { toast } from 'sonner'

const WishlistCardFooter = ({ item, addItemToCart, removeItemFromWishlist }) => {
    const [disabled, setDisabled] = useState(false)

    return (
        <div className="flex items-center gap-2 mt-3">
            <button
                type="button"
                className="flex-1 flex items-center justify-center gap-1.5 bg-[#1F6F4A] text-white text-xs font-medium rounded-lg py-2 active:scale-[0.98] transition"
                disabled={disabled}
                onClick={async () => {
                    try {
                        setDisabled(true)
                        await addItemToCart({ productId: item._id, quantity: 1 })
                        toast.success("Item added to cart successfully")
                    }catch(error){
                        toast.error(error.message)
                    } finally {
                        setDisabled(false)
                    }
                }}
            >
                <ShoppingCart size={14} />
                Move to Cart
            </button>
            <button
                type="button"
                aria-label="Remove from wishlist"
                className="flex items-center justify-center w-9 h-9 rounded-lg border border-[#E5E7EB] text-[#6B7280] active:scale-[0.98] transition"
                disabled={disabled}
                onClick={async () => {
                    try {
                        setDisabled(true)
                        await removeItemFromWishlist(item._id)
                        toast.success("Item removed from wishlist")
                    }catch(error){
                        toast.error(error.message)
                    } finally {
                        setDisabled(false)
                    }
                }}
            >
                <Trash2 size={16} />
            </button>
        </div>
    )
}

export default WishlistCardFooter