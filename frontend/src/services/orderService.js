const orderService = {
    getAllOrders: async (query) => {

        const params = new URLSearchParams()
        if (query.page){
            params.set("page", query.page)
        }
        
        if(query.limit){
            params.set("limit", query.limit)
        }

        if(query.paymentStatus){
            params.set("paymentStatus", query.paymentStatus)
        }

        if(query.orderStatus){
            params.set("orderStatus", query.orderStatus)
        }

        if(query.sort){
            params.set("sort", query.sort)
        }

        if(query.minAmount){
            params.set("minAmount", query.minAmount)
        }

        if(query.maxAmount){
            params.set("maxAmount", query.maxAmount)
        }

        let url = `${import.meta.env.VITE_BASE_API}/orders?${params.toString()}`

        const res = await fetch(url,
            {
                headers: {
                    authorization: "Bearer " + localStorage.getItem("token") || ""
                },
            })
        const data = await res.json()
        if (!res.ok) throw new Error(data.error)

        return data
    },
    placeOrder: async (orderData) => {
        const res = await fetch(`${import.meta.env.VITE_BASE_API}/orders`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    authorization: "Bearer " + localStorage.getItem("token") || ""
                },
                body: JSON.stringify(orderData)
            })

        const data = await res.json()
        if (!res.ok) throw new Error(data.error)
        return data
    },
    
    updateOrderItem: async (id) => {
        const res = await fetch(`${import.meta.env.VITE_BASE_API}/order/items/${id}`,
            {
                method: "PUT",
                headers: {
                    authorization: "Bearer " + localStorage.getItem("token") || ""
                },
            })

        const data = await res.json()
        if (!res.ok) throw new Error(data.error)
        return data.order.items
    },
    deleteItemFromOrder: async (id) => {
        const res = await fetch(`${import.meta.env.VITE_BASE_API}/order/items/${id}`,
            {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    authorization: "Bearer " + localStorage.getItem("token") || ""
                },
            })

        const data = await res.json()
        if (!res.ok) throw new Error(data.error)
        return data.order.items
    },
    createCheckoutSession: async (orderId) => {
        const res = await fetch(`${import.meta.env.VITE_BASE_API}/payment/create-checkout-session`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    authorization: "Bearer " + localStorage.getItem("token") || ""
                },
                body: JSON.stringify({orderId})
            })

        const data = await res.json()
        if (!res.ok) throw new Error(data.error)
        return data.url
    },
    getOrder: async(orderId) => {
        const res = await fetch(`${import.meta.env.VITE_BASE_API}/orders/${orderId}`,
            {
                headers: {
                    authorization: "Bearer " + localStorage.getItem("token") || ""
                },
            })

        const data = await res.json()
        if (!res.ok) throw new Error(data.error)
        return data.order
    }
}

export default orderService;