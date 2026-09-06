const OrderReducer = (state, action) => {
    switch(action.type){
        case("SET_ORDERS"):
            return {
                ...state,
                orders: action.payload.orders,
                totalOrders: action.payload.totalOrders,
                ordersLoading: false
            }
        case("SET_ORDER"):
            return {
                ...state,
                orderId: action.payload
                // orderItemsCount: action.payload.reduce((acc, item) => acc + item.quantity, 0)
            }
        case("SET_ORDER_ITEMS"):
            return {
                ...state,
                orderItems: action.payload
            }
        case("SET_ORDERS_LOADING"):
            return {
                ...state,
                ordersLoading: action.payload
            }
    }
}

export default OrderReducer