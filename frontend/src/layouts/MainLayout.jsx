import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Sidebar from '../components/Sidebar'
import BottomNav from '../components/BottomNav'
import { Toaster } from "sonner"

const MainLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen">
      <Toaster
        position="bottom-right"
        richColors
        closeButton
        duration={4000}
        expand={false}
      />
      <Header onMenuClick={() => setIsSidebarOpen(prev => !prev)} />
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(prev => !prev)} />
      
        <Outlet />
      
      <Footer />
      <BottomNav />
    </div>
  )
}

export default MainLayout