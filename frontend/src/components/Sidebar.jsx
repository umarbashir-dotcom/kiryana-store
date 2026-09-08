import React from 'react'
import { X } from 'lucide-react'
import { useEffect, useState, useContext } from 'react'
import { CategoriesContext } from '../context/CategoriesContext'
import CategoryLink from './CategoryLink'
import { AuthContext } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

// On lg screens this is the SAME component, just wider — no separate desktop sidebar needed.
const Sidebar = ({ isOpen, onClose }) => {
  const { categories } = useContext(CategoriesContext)
  const { logout } = useContext(AuthContext)
  const navigate = useNavigate()

  // logout user
    const logoutUser = () => {
        try {
            logout()
            navigate("/login")
        } catch (err) {
            toast.error(err.message)
        } finally {

        }
    }
  return (
    <div
      className={`fixed inset-0 z-50 ${isOpen ? '' : 'pointer-events-none'}`}
      id="sidebar-root"
      aria-hidden={!isOpen}
    >
      {/* Backdrop */}
      <div
        className={`absolute inset-0 bg-black/40 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={onClose}
      ></div>

      {/* Panel */}
      <nav
        className={`relative w-72 lg:w-80 h-full bg-white shadow-xl flex flex-col transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#22281F]/10">
          <span className="font-['Fraunces'] font-semibold text-lg text-[#1F6F4A]">Menu</span>
          <button type="button" aria-label="Close menu" className="p-2 rounded-lg hover:bg-[#F6F8F4]" onClick={onClose}>
            <X className="w-5 h-5" strokeWidth={2} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-2">
          <p className="px-5 pt-3 pb-1 text-xs font-medium uppercase tracking-wide text-[#22281F]/40">Categories</p>
          { categories.map(category => <CategoryLink key={category._id} category={category}/>)}
         
          <p className="px-5 pt-4 pb-1 text-xs font-medium uppercase tracking-wide text-[#22281F]/40">Account</p>
          <a href="#" className="flex items-center gap-3 px-5 py-3 hover:bg-[#F6F8F4] text-sm font-medium">My Orders</a>
          <a href="#" className="flex items-center gap-3 px-5 py-3 hover:bg-[#F6F8F4] text-sm font-medium">Account Settings</a>
          <a href="#" className="flex items-center gap-3 px-5 py-3 hover:bg-[#F6F8F4] text-sm font-medium">Help</a>
        </div>

        <div className="px-5 py-4 border-t border-[#22281F]/10">
          <button type="button" className="w-full py-2.5 rounded-lg border border-[#C1502E] text-[#C1502E] text-sm font-medium hover:bg-[#C1502E] hover:text-white transition-colors"
          onClick={logoutUser}>
            Log Out
          </button>
        </div>
      </nav>
    </div>
  )
}

export default Sidebar