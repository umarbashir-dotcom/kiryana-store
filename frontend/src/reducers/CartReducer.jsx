const CartReducer = (state, action) => {
    switch(action.type){
        case("SET_CART"):
            return {
                ...state,
                cartItems: action.payload,
                cartItemsCount: action.payload.reduce((acc, item) => acc + item.quantity, 0)
            }
    }
}

export default CartReducer