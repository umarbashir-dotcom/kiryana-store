import { useContext } from 'react'
import { CartContext } from '../context/CartContext'
import { Check } from 'lucide-react'
import QuantityStepper from './QuantityStepper'
import { toast } from 'sonner'
import { useState } from 'react'

const CartItem = ({ cartItem, selected, onToggle, setSelectedItems }) => {
    const { deleteItemFromCart } = useContext(CartContext)
    const [ disabled, setDisabled] = useState(false)
    const isOutOfStock = cartItem.product.stock === 0
    const isInsufficient =
        cartItem.product.stock > 0 && cartItem.quantity > cartItem.product.stock
    const isCheckDisabled = isOutOfStock || isInsufficient

    const handleToggle = () => {
        if (isCheckDisabled) return
        onToggle(cartItem.product._id)
    }

    const handleCardClick = (e) => {
        // Ignore clicks that started on the quantity stepper or delete button
        if (e.target.closest('[data-no-toggle]')) return
        handleToggle()
    }

    return (
        <div
            onClick={handleCardClick}
            className={`flex gap-3 bg-white rounded-xl p-3 border transition-colors ${
                isOutOfStock
                    ? "border-gray-100 opacity-60"
                    : isInsufficient
                        ? "border-amber-200 bg-amber-50/30"
                        : selected
                            ? "border-[#1F6F4A]/30 bg-[#1F6F4A]/[0.03]"
                            : "border-gray-100"
            } ${!isCheckDisabled ? "cursor-pointer" : ""}`}
        >
            {/* Checkbox */}
            <div className="flex items-start pt-1 shrink-0" data-no-toggle onClick={handleToggle}>
                <button
                    type="button"
                    role="checkbox"
                    aria-checked={selected}
                    disabled={isCheckDisabled}
                    className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all
                        ${isCheckDisabled
                            ? "border-gray-200 bg-gray-50 cursor-not-allowed"
                            : selected
                                ? "border-[#1F6F4A] bg-[#1F6F4A]"
                                : "border-gray-300 bg-white hover:border-[#1F6F4A]/60"
                        }`}
                >
                    {selected && !isCheckDisabled && (
                        <Check size={13} strokeWidth={3} className="text-white" />
                    )}
                </button>
            </div>

            {/* Product Image */}
            <div className="relative shrink-0">
                <img
                    src={cartItem.product.images[0]?.url}
                    alt={cartItem.product.name}
                    className={`w-20 h-20 rounded-lg object-cover bg-gray-100 ${isOutOfStock ? "grayscale" : ""
                        }`}
                />

                {/* OUT OF STOCK */}
                {isOutOfStock && (
                    <div className="absolute inset-0 flex items-center justify-center">
                        <span className="bg-gray-900/80 text-white text-[10px] font-semibold px-2 py-1 rounded-md">
                            SOLD OUT
                        </span>
                    </div>
                )}
            </div>

            {/* Product Information */}
            <div className="flex-1 min-w-0">

                <div className="flex justify-between items-start gap-2">

                    <div className="min-w-0">

                        <h3 className="text-sm font-medium text-gray-900 truncate">
                            {cartItem.product.name}
                        </h3>

                        <p className="text-xs text-gray-500 mt-0.5">
                            {cartItem.product.quantity} {cartItem.product.unit}
                        </p>

                        {/* OUT OF STOCK MESSAGE */}
                        {isOutOfStock && (
                            <p className="text-xs font-medium text-red-500 mt-1">
                                This product is currently out of stock
                            </p>
                        )}

                        {/* INSUFFICIENT STOCK MESSAGE */}
                        {isInsufficient && (
                            <p className="text-xs font-medium text-amber-600 mt-1">
                                Only {cartItem.product.stock} available
                            </p>
                        )}
                    </div>

                    {/* Delete */}
                    <button
                        data-no-toggle
                        className="text-gray-400 hover:text-red-500 p-1 transition-colors shrink-0"
                        disabled={disabled}
                        onClick={async () =>{
                            try{
                                setDisabled(true)
                                await deleteItemFromCart(cartItem.product._id)
                                toast.success("Item removed from cart successfully")
                                setSelectedItems(prev => prev.filter(item => item !== cartItem.product._id))

                            }catch(error){
                                toast.error(error.message)
                            }finally{
                                setDisabled(false)
                            }
                        }
                        }
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                        >
                            <path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m3 0-1 14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
                        </svg>
                    </button>
                </div>

                <div className="flex justify-between items-end mt-2">

                    {/* OUT OF STOCK */}
                    {isOutOfStock ? (

                        <span className="text-xs font-medium text-gray-400">
                            Quantity unavailable
                        </span>

                    ) : (

                        /* AVAILABLE OR INSUFFICIENT STOCK */
                        <div data-no-toggle>
                            <QuantityStepper
                                cartItem={cartItem}
                                size="md"
                            />
                        </div>

                    )}

                    {/* Price */}
                    <span
                        className={`text-sm font-semibold ${isOutOfStock ? "text-gray-400" : "text-gray-900"
                            }`}
                    >
                        ₨ {cartItem.price.toLocaleString()}
                    </span>
                </div>

                {/* INSUFFICIENT STOCK EXTRA INFORMATION */}
                {isInsufficient && (
                    <div className="mt-2 flex items-center justify-between gap-2">
                        <span className="text-[11px] text-amber-600">
                            Reduce quantity to select this item
                        </span>

                        <span className="text-[11px] font-medium text-amber-700">
                            Available: {cartItem.product.stock}
                        </span>
                    </div>
                )}
            </div>
        </div>
    )
}

export default CartItem