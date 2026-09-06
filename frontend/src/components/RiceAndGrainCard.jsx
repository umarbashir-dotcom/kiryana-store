import React from 'react'

const RiceAndGrainCard = ({product}) => {
    return (
        <div className="snap-start shrink-0 w-40 bg-white rounded-xl border border-[#22281F]/10 overflow-hidden">
            <div className="aspect-square w-full overflow-hidden rounded-lg bg-gray-100">
                <img src={product.images[0].url} className="h-full w-full object-cover" />
            </div>
            <div className="p-2.5">
                <p className="text-xs font-medium leading-snug line-clamp-2">{ product.name }</p>
                <p className="text-xs font-semibold mt-1">Rs. {product.price}</p>
            </div>
        </div>
    )
}

export default RiceAndGrainCard