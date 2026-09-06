const API_URL = import.meta.env.VITE_CATEGORY_URL

const categoriesService = {
    getCategories: async() => {
        const res = await fetch(`${API_URL}`)
        const data = await res.json()

        if(!res.ok) throw new Error(data.error)

        return data.data
    }  
}

export default categoriesService