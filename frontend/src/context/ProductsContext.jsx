import { useEffect, createContext, useReducer } from "react"
import productsService from "../services/productsService.js"
import ProductsReducer from "../reducers/ProductsReducer"

const initialState = {
    products: [],
    totalProducts: 0,
    riceAndGrainsProducts: [],
    categoryProducts: [],
    searchedProducts: [],
    success: false,
    loading: true,
}

const ProductsContext = createContext(initialState)

const ProductsProvider = ({children}) => {
   
    const [ state, dispatch ] = useReducer(ProductsReducer, initialState)
    
    const setLoading = (flag) => {
        dispatch({
            type: "SET_LOADING",
            payload: flag
        })
    }

    // get all products
    const getProducts = async (page, limit) => {
        setLoading(true)
        try{
            
            const data = await productsService.getProducts(page, limit)
            
            dispatch({
                type: "SET_PRODUCTS",
                payload: data
            })
    
            return data
        } catch (err){
            setLoading(false)
            throw err
        }
    }

    // get searched products
    const getSearchedProducts = async (searchedText) => {
        setLoading(true)
        try{
            const data = await productsService.getSearchedProducts(searchedText)
            dispatch({
                type: "SET_SEARCHEDPRODUCTS",
                payload: data
            })
    
            return data
        } catch (err){
            setLoading(false)
            throw err     
        }
    }

    // get rice and grains products
    const getRiceAndGrainsProducts = async () => {
        setLoading(true)
        try{
            const data = await productsService.getCategoryProducts('rice-and-grains')
            dispatch({
                type: "SET_BESTPRODUCTS",
                payload: data
            })
    
            return data
        } catch (err){
            setLoading(false)
            throw err
        }
    }

      // get category products
    const getCategoryProducts = async (categorySlug) => {
        setLoading(true)
        try{
            const data = await productsService.getCategoryProducts(categorySlug)
            dispatch({
                type: "SET_CATEGORYPRODUCTS",
                payload: data
            })
    
            return data
        } catch (err){
            setLoading(false)
            throw err
        }
    }

     // add product
    const addProduct = async (productData) => {
        setLoading(true)
        try{
            console.log("state before add Product: ", state)
            const data = await productsService.addProduct(productData)
            console.log(data)
            dispatch({
                type: "ADD_PRODUCT",
                payload: data
            })
            
            return data
        } catch (err){
            setLoading(false)
            console.log("state after: ", state)
            throw err
        }
    }

    // update product
    const updateProduct = async (id, updatedData) => {
        setLoading(true)
        try{
            const data = await productsService.updateProduct(id, updatedData)
            dispatch({
                type: "UPDATE_PRODUCT",
                payload: data
            })
    
            return data
        } catch (err){
            setLoading(false)
            throw err
        }
    }

    // update product
    const deleteProduct = async (id) => {
        setLoading(true)
        try{
            const data = await productsService.deleteProduct(id)
            dispatch({
                type: "DELETE_PRODUCT",
                payload: data
            })
    
            return data
        } catch (err){
            setLoading(false)
            throw err
        }
    }
    
    console.log("Overall state: ", state)

    return (<ProductsContext.Provider value={{
        products: state.products,
        totalProducts: state.totalProducts,
        loading: state.loading,
        categoryProducts: state.categoryProducts,
        riceAndGrainsProducts: state.riceAndGrainsProducts,
        searchedProducts: state.searchedProducts,
        getProducts,
        getRiceAndGrainsProducts,
        getCategoryProducts,
        getSearchedProducts,
        updateProduct,
        addProduct,
        deleteProduct
    }}>
        {children}
    </ProductsContext.Provider>)

}

export { ProductsContext, ProductsProvider}