import { useContext, useState } from 'react'
import { WishlistContext } from '../context/WishlistContext'
import { CartContext } from '../context/CartContext'
import ProductCard from '../components/ProductCard'
import { ShoppingCart, Trash2, Heart } from 'lucide-react'


const WishlistPage = () => {
    const { wishlistItems, wishlistItemsCount, removeItemFromWishlist } = useContext(WishlistContext)
    const { addItemToCart } = useContext(CartContext)

    const [disabled, setDisabled ] = useState(false)

    return (
        <main className="w-full px-4 sm:px-6 lg:px-8 py-6 max-w-[1400px] mx-auto">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-semibold text-[#1A1A1A]">My Wishlist</h1>
                    <p className="text-sm text-[#6B7280] mt-1">{wishlistItemsCount} items saved</p>
                </div>
            </div>

            {wishlistItemsCount > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
                    {wishlistItems.map(item => (
                        <ProductCard
                            key={item._id}
                            product={item}
                            page={"WishlistPage"}
                            footer={
                                <div className="flex items-center gap-2 mt-3">
                                    <button
                                        type="button"
                                        className="flex-1 flex items-center justify-center gap-1.5 bg-[#1F6F4A] text-white text-xs font-medium rounded-lg py-2 active:scale-[0.98] transition"
                                        disabled={disabled}
                                        onClick={async () => {
                                            try {
                                                setDisabled(true)
                                                await addItemToCart({
                                                    productId: product._id,
                                                    quantity: 1
                                                })
                                            }
                                            finally {
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
                                            }
                                            finally {
                                                setDisabled(false)
                                            }
                                        }}
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            }
                        />
                    ))}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center text-center py-20 px-4">
                    <Heart size={40} strokeWidth={1.5} className="text-[#D1D5DB]" />
                    <h2 className="text-base font-medium text-[#1A1A1A] mt-4">Your wishlist is empty</h2>
                    <p className="text-sm text-[#6B7280] mt-1 max-w-[280px]">
                        Tap the heart on any product to save it here for later.
                    </p>
                    <a href="/shop" className="mt-5 inline-block bg-[#1F6F4A] text-white text-sm font-medium rounded-lg px-5 py-2.5">
                        Browse Shop
                    </a>
                </div>
            )}
        </main>
    )
}

export default WishlistPage