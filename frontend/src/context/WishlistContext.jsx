import { useContext, useEffect, createContext, useReducer } from "react"
import wishlistService from "../services/wishlistService.js"
import WishlistReducer from "../reducers/WishlistReducer"
import { AuthContext } from "./AuthContext.jsx"

const initialState = {
    wishlistItems: [],
    wishlistItemsCount: 0,
    success: false,
    loading: true,
}

const WishlistContext = createContext(initialState)

const WishlistProvider = ({children}) => {
    const { isAuthenticated, loading } = useContext(AuthContext)
    
    // get  wishlistItems
    useEffect(() => {
        if (loading) return   // wait until AuthProvider knows the auth state
        if (!isAuthenticated) return          // no logged-in user, nothing to fetch
        getWishlist()
    }, [loading, isAuthenticated])

    
    const [ state, dispatch ] = useReducer(WishlistReducer, initialState)
    
    // get all categories
    const getWishlist = async () => {
        try{
            const data = await wishlistService.getWishlist()
            dispatch({
                type: "SET_WISHLIST",
                payload: data
            })
    
            return data
        } catch (err){
            throw err
        }
    }
    
    // add item to wishlist
    const addItemToWishlist = async (id) => {
        const data = await wishlistService.addItemToWishlist(id)
            dispatch({
                type: "SET_WISHLIST",
                payload: data
            })
    }

   
    // remove Item from wishlist
    const removeItemFromWishlist = async (id) => {
        const data = await wishlistService.removeItemFromWishlist(id)
            dispatch({
                type: "SET_WISHLIST",
                payload: data
            })
    }

    return (<WishlistContext.Provider value={{
        wishlistItems: state.wishlistItems,
        wishlistItemsCount: state.wishlistItemsCount,
        getWishlist,
        addItemToWishlist,
        removeItemFromWishlist,
    }}>
        {children}
    </WishlistContext.Provider>)

}

export { WishlistContext, WishlistProvider}