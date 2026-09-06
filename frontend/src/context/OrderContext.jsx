import { useState, useEffect, createContext, useReducer } from "react"
import orderService from "../services/orderService.js"
import OrderReducer from "../reducers/OrderReducer"

const initialState = {
    orderItems: [],
    orders: [],
    ordersLoading: true,
    totalOrders: 0,
    orderItemsCount: 0,
    success: false,
    loading: true,
}

const OrderContext = createContext(initialState)

const OrderProvider = ({children}) => {
    // useEffect(() => {
    //     getOrder()
    // },[])
    const [ state, dispatch ] = useReducer(OrderReducer, initialState)
    
    // get all orders
    const getAllOrders = async (query) => {
        dispatch({
            type: "SET_ORDERS_LOADING",
            payload: true
        })

        const orders = await orderService.getAllOrders(query)

        dispatch({
            type: "SET_ORDERS",
            payload: orders
        })

        return orders
    }
    // setOrder items
    const setOrderItems = async (items) => {
        dispatch({
                type: "SET_ORDER_ITEMS",
                payload: items
            })
    
    }
    
    // get all order items
    const getOrder = async () => {
        try{
            const data = await orderService.getOrder()
            dispatch({
                type: "SET_ORDER",
                payload: data
            })
    
            return data
        } catch (err){
            throw err
        }
    }
    
    // place order
    const placeOrder = async (orderData) => {
        const data = await orderService.placeOrder(orderData)
            dispatch({
                type: "SET_ORDER",
                payload: data.orderId
            })
        return data
    }

    // decrease order item's quantity
    const updateOrderItemQuantity = async (id) => {
        const data = await orderService.updateOrderItem(id)
            dispatch({
                type: "SET_ORDER",
                payload: data
            })
    }

    // remove Item from order
    const deleteItemFromOrder = async (id) => {
        const data = await orderService.deleteItemFromOrder(id)
            dispatch({
                type: "SET_ORDER",
                payload: data
            })
    }

    return (<OrderContext.Provider value={{
        orderItems: state.orderItems,
        orders: state.orders,
        totalOrders: state.totalOrders,
        ordersLoading: state.ordersLoading,
        setOrderItems,
        getOrder,
        placeOrder,
        deleteItemFromOrder,
        updateOrderItemQuantity,
        getAllOrders
    }}>
        {children}
    </OrderContext.Provider>)

}

export { OrderContext, OrderProvider}