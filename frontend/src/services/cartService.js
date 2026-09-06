const cartService = {
    getCart: async () => {
        const res = await fetch(`${import.meta.env.VITE_BASE_API}/cart`,
            {
                headers: {
                    authorization: "Bearer " + localStorage.getItem("token") || ""
                },
            })
        const data = await res.json()
        if (!res.ok) throw new Error(data.error)

        return data.cart.items
    },
    addItemToCart: async (productData) => {
        const res = await fetch(`${import.meta.env.VITE_BASE_API}/cart/items`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    authorization: "Bearer " + localStorage.getItem("token") || ""
                },
                body: JSON.stringify(productData)
            })

        const data = await res.json()
        if (!res.ok) throw new Error(data.error)
        return data.cart.items
    },
    
    updateCartItem: async (id, quantity) => {
        const res = await fetch(`${import.meta.env.VITE_BASE_API}/cart/items/${id}`,
            {
                method: "PUT",
                headers: {
                    authorization: "Bearer " + localStorage.getItem("token") || "",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({quantity: quantity})
            })

        const data = await res.json()
        if (!res.ok) throw new Error(data.error)
        return data.cart.items
    },
    deleteItemFromCart: async (id) => {
        const res = await fetch(`${import.meta.env.VITE_BASE_API}/cart/items/${id}`,
            {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    authorization: "Bearer " + localStorage.getItem("token") || ""
                },
            })

        const data = await res.json()
        if (!res.ok) throw new Error(data.error)
      
        return data.cart.items
    },
    deleteManyItemsFromCart: async (productIds) => {
        const res = await fetch(`${import.meta.env.VITE_BASE_API}/cart/items`,
            {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    authorization: "Bearer " + localStorage.getItem("token") || ""
                },
                body: JSON.stringify({productIds: productIds})
            })

        const data = await res.json()
        if (!res.ok) throw new Error(data.error)
      
        return data.cart.items
    },
}

export default cartService;