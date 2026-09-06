const API_URL = import.meta.env.VITE_API_URL

const productsService = {
    getProducts: async(page, limit) => {
        let url = API_URL
        if(page && limit){
            url = `${url}/?page=${page}&&limit=${limit}`
        }
        const res = await fetch(url,
            {
                headers: {
                    "authorization": "Bearer " + localStorage.getItem("token") || ""
                },
            }
        )
        const data = await res.json()

        if(!res.ok) throw new Error(data.error)

        return data
    },
    getCategoryProducts: async(categorySlug) => {
        const res = await fetch(`${API_URL}/${categorySlug}`)
        const data = await res.json()

        if(!res.ok) throw new Error(data.error)
        
        return data
    },
    getSearchedProducts: async(searchedText) => {
        const res = await fetch(`${API_URL}/?search=${searchedText}`)
        const data = await res.json()

        if(!res.ok) throw new Error(data.error)
        
        return data
    },
    addProduct: async(productData) => {
        const res = await fetch(`${API_URL}`,
            {
                method: "POST",
                headers: {
                    "authorization": "Bearer " + localStorage.getItem("token") || ""
                },
                body: productData
            }
        )

        const data = await res.json()

        if(!res.ok) throw new Error(data.error)

        return data
    },
    updateProduct: async(id, updatedData) => {
        const res = await fetch(`${API_URL}/${id}`,
            {
                method: "PUT",
                headers: {
                    "authorization": "Bearer " + localStorage.getItem("token") || ""
                },
                body: updatedData
            }
        )

        const data = await res.json()

        if(!res.ok) throw new Error(data.error)

        return data
    },
    deleteProduct: async(id) => {
        const res = await fetch(`${API_URL}/${id}`,
            {
                method: "DELETE",
                headers: {
                    "authorization": "Bearer " + localStorage.getItem("token") || ""
                },
            }
        )

        const data = await res.json()

        if(!res.ok) throw new Error(data.error)

        return data
    },
}

export default productsService