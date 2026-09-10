import { useContext, useState } from 'react'
import { CartContext } from '../context/CartContext'
import CartItem from '../components/CartItem'
import { useNavigate } from 'react-router-dom'
import { Check, Trash2 } from 'lucide-react'
import { OrderContext } from "../context/OrderContext"
import { toast } from 'sonner'

const CartPage = () => {
  const { cartItems, cartItemsCount, deleteManyItemsFromCart } = useContext(CartContext)
  const { setOrderItems } = useContext(OrderContext)
  const [ disabled, setDisabled] = useState(false)
  const navigate = useNavigate()

  const [selectedItems, setSelectedItems] = useState([])

  const validItems = cartItems.filter(item => 
        item.product.stock > 0 && item.product.stock >= item.quantity
      ) 
  
  const allSelected = validItems.length > 0 &&
          validItems.every(item => selectedItems.includes(item.product._id))

  const onToggle = (productId) => {
    setSelectedItems(prev => {
      return selectedItems.includes(productId)
        ? selectedItems.filter(id => id !== productId)
        : [...prev, productId]
    })

  }

  const subTotal = validItems.reduce((acc, item) => {
    if (selectedItems.includes(item.product._id))
      return acc + (item.quantity * item.price)
    else
      return acc
  }, 0)

  return (
    // <!-- CartPage -->
    <div className="min-h-screen bg-[#FAFAF8]">

      {/* <!-- CartHeader --> */}
      <header className="sticky top-0 z-10 bg-white border-b border-gray-200 px-4 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-lg font-semibold text-gray-900">Your Cart</h1>
            <p className="text-sm text-gray-500 mt-0.5">{cartItemsCount} items</p>
          </div>
        </div>

        {/* <!-- SelectAll / DeleteAll row --> */}
        {/* You wire up the logic for these two — just placeholders below.
            "allSelected" here is a dummy false just so the design has something
            to render — swap it for your real derived/selected state. */}
        <div className="flex items-center justify-between mt-3">
          <button
            type="button"
            role="checkbox"
            aria-checked={allSelected}
            onClick={() => { 
              if (allSelected){
                setSelectedItems([])

                // de select all items
                // setAllSelelected(false)
              } else {
                // select all items
                setSelectedItems(validItems.map(item => item.product._id))
                  
                // setAllSelelected(true)
              }
             }}
            className="flex items-center gap-2 group"
          >
            <span
              className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all
                ${allSelected
                  ? "border-[#1F6F4A] bg-[#1F6F4A]"
                  : "border-gray-300 bg-white group-hover:border-[#1F6F4A]/60"
                }`}
            >
              {allSelected && (
                <Check size={13} strokeWidth={3} className="text-white" />
              )}
            </span>
            <span className="text-sm font-medium text-gray-700 group-hover:text-[#1F6F4A] transition-colors">
              Select All
            </span>
          </button>

          <button
            type="button"
            disabled={selectedItems.length === 0 || disabled }
            className={`flex items-center gap-1.5 text-sm font-medium transition-colors
              ${selectedItems.length === 0
                ? "text-gray-300 cursor-not-allowed"
                : "text-red-500 hover:text-red-600"
              }`}
              onClick={async () => { 
                try{
                  setDisabled(true)
                  await deleteManyItemsFromCart(selectedItems)
                  setSelectedItems([])
                }catch(error){
                  toast.error(error.message)
                }finally{
                  setDisabled(false)
                }
              }}
          >
            <Trash2 size={15} strokeWidth={2} />
            Delete{selectedItems.length > 0 ? ` (${selectedItems.length})` : ""}
          </button>
        </div>
      </header>

      <div className="px-4 py-4 max-w-5xl mx-auto lg:flex lg:gap-8">

        {/* <!-- CartItemList --> */}
        <div className="lg:flex-1 space-y-3">

          {cartItems.map(item =>
            <CartItem
              key={item.product._id}
              cartItem={item}
              selected={selectedItems.includes(item.product._id)}
              onToggle={onToggle}
              setSelectedItems={setSelectedItems}
            />)}

        </div>

        {/* <!-- CartSummary --> */}
        <div className="mt-4 lg:mt-0 lg:w-80">
          <div className="bg-white rounded-xl border border-gray-100 p-4 lg:sticky lg:top-20">
            <h2 className="text-sm font-semibold text-gray-900 mb-3">Order Summary</h2>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>₨ {subTotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Delivery Fee</span>
                <span>₨ 100</span>
              </div>
            </div>

            <div className="border-t border-gray-100 mt-3 pt-3 flex justify-between">
              <span className="text-sm font-semibold text-gray-900">Total</span>
              <span className="text-base font-bold text-[#1F6F4A]">₨ {(subTotal + 100).toLocaleString()}</span>
            </div>

            <button className="w-full mt-4 bg-[#1F6F4A] text-white text-sm font-medium py-3 rounded-lg hover:bg-[#195a3b] transition-colors"
              onClick={() => { 
                setOrderItems(validItems.filter(item => selectedItems.includes(item.product._id) && item.quantity !== 0))
                navigate("/checkout") }}>
              Proceed to Checkout
            </button>
          </div>
        </div>

      </div>

      {/* <!-- EmptyCartState (shown instead of the list above when cart is empty) -->
  <!--
  <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" className="text-gray-300 mb-3"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
    <p className="text-gray-900 font-medium">Your cart is empty</p>
    <p className="text-sm text-gray-500 mt-1">Add items to get started</p>
    <a href="/" className="mt-4 bg-[#1F6F4A] text-white text-sm font-medium px-6 py-2.5 rounded-lg">Browse Shop</a>
  </div>
  --> */}

    </div>
  )
}

export default CartPage