const ProductsReducer = (state, action) => {
    switch(action.type){
        case("SET_PRODUCTS"):
            return {
                ...state,
                products: action.payload.products,
                totalProducts: action.payload.totalProducts,
                loading:false
            }
        case("ADD_PRODUCT"):
            return {
                ...state,
                products: [action.payload.product, ...state.products],
                totalProducts: action.payload.totalProducts,
                loading:false
            }
        case("UPDATE_PRODUCT"):
            return {
                ...state,
                products: state.products.map(p => p._id === action.payload.product._id ? action.payload.product : p),
                totalProducts: action.payload.totalProducts,
                loading:false
            }
        case("DELETE_PRODUCT"):
            return {
                ...state,
                products: state.products.filter(p => p._id !== action.payload.deletedId),
                totalProducts: action.payload.totalProducts,
                loading:false
            }
        case("SET_BESTPRODUCTS"):
            return {
                ...state,
                riceAndGrainsProducts: action.payload,
                loading:false
            }
        case("SET_CATEGORYPRODUCTS"):
            return {
                ...state,
                categoryProducts: action.payload.data,
                loading:false
            }
        case("SET_SEARCHEDPRODUCTS"):
            return {
                ...state,
                searchedProducts: action.payload.products,
                totalProducts: action.payload.totalProducts,
                loading:false
            }
        case("SET_LOADING"):
            return {
                ...state,
                loading:action.payload 
            }
    }
}

export default ProductsReducer