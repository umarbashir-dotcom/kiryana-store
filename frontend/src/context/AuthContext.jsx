import { useState, useEffect, createContext, useReducer } from "react"
import authService from "../services/authService.js"
import AuthReducer from "../reducers/AuthReducer"

const initialState = {
    user: null,  // user's data if user is logged in - or  nul if user is logged out
    authStatus: "loading",
    loading: true,
    isAuthenticated: false,
}

const AuthContext = createContext(initialState)

const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AuthReducer, initialState)

    useEffect(() => {
        // get user

        getMe()

    }, [])

    // login
    const login = async (loginData) => {
        const data = await authService.login(loginData)
        dispatch({
            type: "LOGIN_USER",
            payload: data
        })

        return data
    }

    // logout
    const logout = () => {
        const data = authService.logout()

        dispatch({
            type: "LOGOUT_USER",
            payload: data
        })

    }

    const register = async (registerData) => {
        const data = await authService.register(registerData)

        dispatch({
            type: "REGISTER_USER",
            payload: data
        })

        return data
    }

    const getMe = async () => {
        try {
            const data = await authService.getMe()
            dispatch({
                type: "SET_ME",
                payload: data
            })
        }
        catch (err) {
            console.log(err)
            if(err.status === 401){
                // logout user
                logout()
            }
            else{
                dispatch({
                    type: "SET_LOADING",
                    payload: false
                })
                throw err
            }
        }
    }

    const requestOtp = async (email) => {

        const data = await authService.requestOtp(email)
        dispatch({
            type: "SET_ME",
            payload: data
        })

    }

    const verifyOtp = async (email, otp) => {

        const data = await authService.verifyOtp(email, otp)
        dispatch({
            type: "SET_ME",
            payload: data
        })

    }

    return (<AuthContext.Provider value={{
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        login,
        register,
        logout,
        getMe,
        requestOtp,
        verifyOtp
    }}>
        {children}
    </AuthContext.Provider>)

}

export { AuthContext, AuthProvider }