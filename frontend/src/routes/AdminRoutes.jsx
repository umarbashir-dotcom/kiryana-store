import { useContext } from 'react'
import { Navigate, Outlet } from "react-router-dom"
import { AuthContext } from '../context/AuthContext'
import AuthLoading from '../components/AuthLoading'

const AdminRoutes = () => {
    const { loading, isAuthenticated, user } = useContext(AuthContext)

    // show spinner while authenticating user
    if(loading) return <AuthLoading />

    // redirect to login page if user is not already logged in
    if(!isAuthenticated)
        return <Navigate to="/login" replace/>

    // redirect customers to home page
    if(user.role !== "admin")
        return <Navigate to="/" replace/>

    return <Outlet />
}

export default AdminRoutes