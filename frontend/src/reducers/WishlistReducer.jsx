const WishlistReducer = (state, action) => {
    switch(action.type){
        case("SET_WISHLIST"):
            return {
                ...state,
                wishlistItems: action.payload,
                wishlistItemsCount: action.payload.length
            }
    }
}

export default WishlistReducer