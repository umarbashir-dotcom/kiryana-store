const CategoriesReducer = (state, action) => {
    switch(action.type){
        case("SET_CATEGORIES"):
            return {
                ...state,
                categories: action.payload
            }
    }
}

export default CategoriesReducer