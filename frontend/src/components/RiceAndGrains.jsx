import { useContext } from 'react'
import { ProductsContext } from '../context/ProductsContext'
import { useEffect } from 'react'
import RiceAndGrainCard from './RiceAndGrainCard'
const RiceAndGrains = () => {

  const { riceAndGrainsProducts } = useContext(ProductsContext)
  
  return (
    <section className="mt-4">

      <div className="flex items-center justify-between mb-3">
        <h2 className="font-['Fraunces'] text-xl font-semibold">Rice &amp; Grains</h2>
        <a href="#" className="text-sm font-medium text-[#1F6F4A] hover:underline">See all</a>
      </div>
      <div className="flex gap-4 overflow-x-auto pb-2 snap-x snap-mandatory scrollbar-hide">
        {riceAndGrainsProducts.map(product => <RiceAndGrainCard key={product._id} product={product} />)}
      </div>
    </section>
  )
}

export default RiceAndGrains