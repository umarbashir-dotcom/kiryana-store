import {useContext, useEffect} from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import { Toaster } from 'sonner'
import AuthLoading from '../components/AuthLoading'

const PublicRoutes = () => {
    const { loading, isAuthenticated } = useContext(AuthContext)

    
    if(loading) return <AuthLoading  />
    
    // redirect to homepage if user is already logged in
    if(isAuthenticated){
        return <Navigate to="/" replace />
    }

    return <>
    <Toaster
        position="bottom-right"
        richColors
        closeButton
        duration={4000}
        expand={false}
      />
      <Outlet />
    </>
}

export default PublicRoutes