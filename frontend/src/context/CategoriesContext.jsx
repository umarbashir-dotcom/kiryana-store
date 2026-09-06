import { useState, useEffect, createContext, useReducer } from "react"
import categoriesService from "../services/categoriesService.js"
import CategoriesReducer from "../reducers/CategoriesReducer"

const initialState = {
    categories: [],
    success: false,
    loading: true,
}

const CategoriesContext = createContext(initialState)

const CategoriesProvider = ({children}) => {

    // get Categories
    useEffect(() => {
        getCategories()
    }, [])

    const [ state, dispatch ] = useReducer(CategoriesReducer, initialState)
    
    // get all categories
    const getCategories = async () => {
        try{
            const data = await categoriesService.getCategories()
            dispatch({
                type: "SET_CATEGORIES",
                payload: data
            })
    
            return data
        } catch (err){
            // throw err
        }
    }
    
    return (<CategoriesContext.Provider value={{
        categories: state.categories,
        getCategories
    }}>
        {children}
    </CategoriesContext.Provider>)

}

export { CategoriesContext, CategoriesProvider}