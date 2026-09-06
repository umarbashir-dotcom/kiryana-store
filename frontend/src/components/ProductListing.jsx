import ProductCard from './ProductCard'
import { useContext, useEffect, useState } from 'react'
import { ProductsContext } from '../context/ProductsContext'
import PaginationButtons from './PaginationButtons'

const ProductListing = () => {
    const { products, getProducts, totalProducts, } = useContext(ProductsContext)
    const limit = 30

    const [currentPage, setCurrentPage] = useState(1)

    const totalPages = Math.ceil(totalProducts / limit);

    const onNext = () => {
        setCurrentPage(currentPage + 1);
    };

    const onPrev = () => {
        setCurrentPage(currentPage - 1);
    };

    const moveToPage = (page) => {
        setCurrentPage(page);
    };

    useEffect(() => {
        getProducts(currentPage, limit)
    }, [currentPage])

    return (
        <section className="mt-8 mb-8">
            {/* Section Header */}
            <div className="flex items-center justify-between mb-4">
                <h2 className="font-['Fraunces'] text-xl font-semibold">
                    Aaj Ke Deals
                </h2>
            </div>

            {/* Products */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                {products.map(product => (
                    <ProductCard
                        key={product._id}
                        product={product}
                    />
                ))}
            </div>

            {/* Pagination */}
            {totalProducts > limit && (
                <div className="flex justify-end mt-6">
                    <PaginationButtons
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onNext={onNext}
                        onPrev={onPrev}
                        moveToPage={moveToPage}
                    />
                </div>
            )}
        </section>
    );
}

export default ProductListing