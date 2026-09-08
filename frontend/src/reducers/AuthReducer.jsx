const AuthReducer = (state, action) => {
    switch(action.type){
        case "LOGIN_USER":
            return {
                ...state,
                ...action.payload,
                loading:false,
            }
        case "LOGOUT_USER":
            return {
                ...state,
                ...action.payload,
            }
        case "REGISTER_USER":
            return {
                ...state,
                ...action.payload,
                loading:false,
            }
        case "SET_ME":
            return {
                ...state,
                ...action.payload,
                loading: false
            }
        case "SET_LOADING":
            return {
                ...state,
                loading: action.payload
            }
        case "UPDATE_USER":
            return {
                ...state,
                user: action.payload.user,
                loading: false
            }
        case "UPDATE_EMAIL":
            return {
                ...state,
                user: action.payload.user,
                loading: false
            }
        default:
            return {...state}
    }
}

export default AuthReducer