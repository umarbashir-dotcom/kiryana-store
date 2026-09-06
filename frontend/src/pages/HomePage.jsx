import { X, Heart, Home, Search, ShoppingCart, User } from 'lucide-react'
import Hero from '../components/Hero'
import CategoryChips from '../components/CategoryChips'
import ProductListing from '../components/ProductListing'
import RiceAndGrains from '../components/RiceAndGrains'

const HomePage = () => {
    
  return (
    <>
      <main className="max-w-7xl mx-auto px-4 lg:px-8">
       
        <Hero />
        <CategoryChips />
        <ProductListing />
        {/* <RiceAndGrains />         */}
        
      </main>

      

      {/* <style>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style> */}

    </>
  )
}

export default HomePage