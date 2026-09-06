import { useContext, useEffect, createContext, useReducer } from "react"
import cartService from "../services/cartService.js"
import CartReducer from "../reducers/CartReducer"
import { AuthContext } from "./AuthContext"

const initialState = {
    cartItems: [],
    cartItemsCount: 0,
    success: false,
    loading: true,
}

const CartContext = createContext(initialState)

const CartProvider = ({ children }) => {
    const { isAuthenticated, loading } = useContext(AuthContext)

    useEffect(() => {
        if (loading) return   // wait until AuthProvider knows the auth state
        if (!isAuthenticated) return          // no logged-in user, nothing to fetch
        getCart()
    }, [loading, isAuthenticated])

    const [state, dispatch] = useReducer(CartReducer, initialState)

    // get all categories
    const getCart = async () => {
        try {
            const data = await cartService.getCart()
            dispatch({
                type: "SET_CART",
                payload: data
            })

            return data
        } catch (err) {
            // throw err
        }
    }

    // add item to cart
    const addItemToCart = async (productData) => {
        const data = await cartService.addItemToCart(productData)
        dispatch({
            type: "SET_CART",
            payload: data
        })
        return data
    }

    // decrease cart item's quantity
    const updateCartItemQuantity = async (id, quantity) => {
        const data = await cartService.updateCartItem(id, quantity)
        dispatch({
            type: "SET_CART",
            payload: data
        })
    }

    // delete Item from cart
    const deleteItemFromCart = async (id) => {
        const data = await cartService.deleteItemFromCart(id)
        dispatch({
            type: "SET_CART",
            payload: data
        })
    }

    // delete Items from carts
    const deleteManyItemsFromCart = async (productIds) => {
        const data = await cartService.deleteManyItemsFromCart(productIds)
        dispatch({
            type: "SET_CART",
            payload: data
        })
    }
    return (<CartContext.Provider value={{
        cartItems: state.cartItems,
        cartItemsCount: state.cartItemsCount,
        getCart,
        addItemToCart,
        deleteItemFromCart,
        updateCartItemQuantity,
        deleteManyItemsFromCart
    }}>
        {children}
    </CartContext.Provider>)

}

export { CartContext, CartProvider }