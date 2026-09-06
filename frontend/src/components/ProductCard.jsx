import { useContext, useState } from 'react'
import { Heart } from 'lucide-react'
import { CartContext } from "../context/CartContext"
import { WishlistContext } from "../context/WishlistContext"
import WishlistCardFooter from './WishlistCardFooter'
import { toast } from 'sonner'
import QuantityStepper from './QuantityStepper'

const ProductCard = ({ product, page }) => {
    const { addItemToCart, cartItems } = useContext(CartContext)
    const { addItemToWishlist, removeItemFromWishlist, wishlistItems } = useContext(WishlistContext)
    const [disabled, setDisabled] = useState(false)

    const discountPercentage = Math.ceil((product.discount / product.price) * 100)
    const isWishlisted = wishlistItems.some(item => item._id === product._id)
    const itemInCart = cartItems.find(item => item.product._id === product._id)
    const isOutOfStock = product.stock === 0


    const handleAddToCart = async () => {
        try {
            setDisabled(true)

            const addToCartPromise = addItemToCart({
                productId: product._id,
                quantity: 1,
            })

            toast.promise(addToCartPromise, {
                loading: "Adding to cart...",
                success: {
                    message: "Added to cart",
                    description: `${product.name} has been added to your cart.`,
                },
                error: {
                    message: "Couldn't add to cart",
                    description: "Please try again.",
                },
            })

            await addToCartPromise
        } finally {
            setDisabled(false)
        }
    }

    return (
        <div className="
            group
            relative
            bg-white
            rounded-xl
            border
            border-[#22281F]/10
            overflow-hidden
            hover:shadow-md
            transition-shadow
            flex
            flex-col
            h-full
        ">
            {discountPercentage > 0 && (
                <span className="
                    absolute
                    top-2
                    left-2
                    z-10
                    px-2
                    py-0.5
                    rounded-full
                    bg-[#C1502E]
                    text-white
                    text-[11px]
                    font-semibold
                ">
                    {discountPercentage} %
                </span>
            )}

            <button
                type="button"
                aria-label="Add to wishlist"
                className="
                    absolute
                    top-2
                    right-2
                    z-10
                    p-1.5
                    rounded-full
                    bg-white/90
                    hover:bg-white
                "
                onClick={() => {
                    isWishlisted
                        ? removeItemFromWishlist(product._id)
                        : addItemToWishlist(product._id)
                }}
            >
                <Heart
                    className="w-4 h-4"
                    strokeWidth={2}
                    fill={isWishlisted ? "#C1502E" : "none"}
                    stroke={isWishlisted ? "#C1502E" : "currentColor"}
                />
            </button>

            <div className="
                aspect-square
                w-full
                overflow-hidden
                rounded-lg
                bg-gray-100
                shrink-0
            ">
                <img
                    src={product.images[0]?.url}
                    alt={product.name}
                    className="h-full w-full object-cover"
                />
            </div>

            <div className="
                p-3
                flex
                flex-col
                flex-1
            ">
                <p className="text-sm font-medium leading-snug line-clamp-2">
                    {product.name}
                </p>

                <p className="text-xs text-[#22281F]/50 mt-0.5">
                    {product.quantity} {product.unit}
                </p>

                <div className="flex items-center gap-2 mt-2">
                    <span className="text-sm font-semibold text-[#22281F]">
                        {(product.price - product.discount).toLocaleString()}
                    </span>

                    <span className="text-xs text-[#22281F]/40 line-through">
                        {product.price.toLocaleString()}
                    </span>
                </div>

                {/* ACTION AREA */}
                <div className="mt-auto pt-2">
                    {page === "WishlistPage"
                        ? (
                            <WishlistCardFooter
                                item={product}
                                addItemToCart={addItemToCart}
                                removeItemFromWishlist={removeItemFromWishlist}
                            />
                        )
                        : isOutOfStock
                            ? (
                                <button
                                    type="button"
                                    disabled
                                    className="
                                        w-full
                                        h-9
                                        rounded-lg
                                        bg-[#22281F]/10
                                        text-[#22281F]/40
                                        text-sm
                                        font-medium
                                        cursor-not-allowed
                                    "
                                >
                                    Out of Stock
                                </button>
                            )
                            : itemInCart
                                ? (
                                    <div className="flex justify-center">
                                        <QuantityStepper
                                            cartItem={itemInCart}
                                            size="md"
                                        />
                                    </div>
                                )
                                : (
                                    <button
                                        type="button"
                                        onClick={handleAddToCart}
                                        disabled={disabled}
                                        className="
                                            w-full
                                            h-9
                                            rounded-lg
                                            bg-[#1F6F4A]
                                            text-white
                                            text-sm
                                            font-medium
                                            hover:bg-[#195A3B]
                                            active:bg-[#12442C]
                                            active:scale-[0.98]
                                            transition-all
                                            disabled:opacity-60
                                            disabled:cursor-not-allowed
                                        "
                                    >
                                        {disabled ? "Adding..." : "Add to Cart"}
                                    </button>
                                )
                    }
                </div>
            </div>
        </div>
    )
}

export default ProductCard