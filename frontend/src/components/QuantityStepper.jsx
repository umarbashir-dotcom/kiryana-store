import { useContext, useState } from 'react'
import { Minus, Plus } from 'lucide-react'
import { CartContext } from '../context/CartContext'
import { OrderContext } from '../context/OrderContext'
import { toast } from 'sonner'

const QuantityStepper = ({
    cartItem,
    size = "md",
    className = "",
    page
}) => {
    const [disabled, setDisabled] = useState(false)
    const { setOrderItems, orderItems } = useContext(OrderContext)

    const { addItemToCart, updateCartItemQuantity, deleteItemFromCart } = useContext(CartContext)

    const handleDecrease = async () => {
        try {
            setDisabled(true)

            if(cartItem.quantity === 1){
                await deleteItemFromCart(cartItem.product._id)
            }else{
                await updateCartItemQuantity(cartItem.product._id, cartItem.quantity - 1)
            }
            
            toast.success("Item removed from cart")
            if(page === 'OrderPage'){
                const items = orderItems.map(item => {
                    if(item.product._id === cartItem.product._id){
                        item.quantity -= 1
                    }
                    return item
                })
                
                setOrderItems(items)
            }
        } catch(error){
            toast.error(error.message)
        }finally {
            setDisabled(false)
        }
    }

    const handleIncrease = async () => {
        try {
            setDisabled(true)

            // await addItemToCart({
            //     productId: cartItem.product._id,
            //     quantity: 1,
            // })
            await updateCartItemQuantity(cartItem.product._id, cartItem.quantity + 1)

            toast.success("Item added to cart")
            if(page === 'OrderPage'){
                const items = orderItems.map(item => {
                    if(item.product._id === cartItem.product._id){
                        item.quantity += 1
                    }
                    return item
                })
                
                setOrderItems(items)
            }
        }catch(error){
            toast.error(error.message)
        }finally {
            setDisabled(false)
        }
    }

    const sizes = {
        sm: {
            container: "h-8 rounded-md",
            button: "w-8",
            icon: "w-3.5 h-3.5",
            quantity: "min-w-8 px-1.5 text-xs",
        },

        md: {
            container: "h-9 rounded-lg",
            button: "w-9",
            icon: "w-4 h-4",
            quantity: "min-w-10 px-2 text-sm",
        },

        lg: {
            container: "h-10 rounded-lg",
            button: "w-10",
            icon: "w-4.5 h-4.5",
            quantity: "min-w-11 px-2.5 text-sm",
        },
    }

    const currentSize = sizes[size] || sizes.md

    return (
        <div
            className={`
                inline-flex
                items-center
                shrink-0
                overflow-hidden
                border
                border-[#1F6F4A]
                bg-white
                ${currentSize.container}
                ${disabled ? "opacity-60" : ""}
                ${className}
            `}
        >
            {/* Decrease */}
            <button
                type="button"
                disabled={disabled || cartItem.quantity === 0}
                onClick={handleDecrease}
                aria-label="Decrease quantity"
                className={`
                    ${currentSize.button}
                    h-full
                    shrink-0
                    flex
                    items-center
                    justify-center
                    bg-[#1F6F4A]
                    text-white
                    hover:bg-[#195A3B]
                    active:bg-[#12442C]
                    transition-colors
                    disabled:cursor-not-allowed
                `}
            >
                <Minus
                    className={currentSize.icon}
                    strokeWidth={2.5}
                />
            </button>

            {/* Quantity */}
            <span
                className={`
                    ${currentSize.quantity}
                    h-full
                    flex
                    items-center
                    justify-center
                    bg-white
                    text-[#22281F]
                    font-semibold
                    select-none
                `}
            >
                {cartItem.quantity}
            </span>

            {/* Increase */}
            <button
                type="button"
                disabled={disabled || cartItem.quantity === cartItem.product.stock}
                onClick={handleIncrease}
                aria-label="Increase quantity"
                className={`
                    ${currentSize.button}
                    h-full
                    shrink-0
                    flex
                    items-center
                    justify-center
                    bg-[#1F6F4A]
                    text-white
                    hover:bg-[#195A3B]
                    active:bg-[#12442C]
                    transition-colors
                    disabled:cursor-not-allowed
                `}
            >
                <Plus
                    className={currentSize.icon}
                    strokeWidth={2.5}
                />
            </button>
        </div>
    )
}

export default QuantityStepper