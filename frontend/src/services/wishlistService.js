const wishlistService = {
    getWishlist: async () => {
        const res = await fetch(`${import.meta.env.VITE_BASE_API}/wishlist`,
            {
                headers: {
                    authorization: "Bearer " + localStorage.getItem("token") || ""
                },
            })
            const data = await res.json()
            if (!res.ok) throw new Error(data.error)
                
            return data.wishlist.items
    },
    addItemToWishlist: async (id) => {
        const res = await fetch(`${import.meta.env.VITE_BASE_API}/wishlist/items/${id}`,
            {
                method: "POST",
                headers: {
                    authorization: "Bearer " + localStorage.getItem("token") || ""
                },
            })

        const data = await res.json()
        if (!res.ok) throw new Error(data.error)
        return data.wishlist.items
    },
    removeItemFromWishlist: async (id) => {
        const res = await fetch(`${import.meta.env.VITE_BASE_API}/wishlist/items/${id}`,
            {
                method: "DELETE",
                headers: {
                    authorization: "Bearer " + localStorage.getItem("token") || ""
                },
            })

        const data = await res.json()
        if (!res.ok) throw new Error(data.error)
        return data.wishlist.items
    }
}

export default wishlistService;