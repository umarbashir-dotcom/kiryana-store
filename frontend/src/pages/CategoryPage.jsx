import { useEffect, useMemo, useState, useContext } from 'react'
import {
    ChevronRight,
    ChevronLeft,
    SlidersHorizontal,
    PackageSearch,
    Home,
    X,
    Check,
} from 'lucide-react'
import { Link, useParams } from 'react-router-dom'

import ProductCard from '../components/ProductCard'
import CategoryChips from '../components/CategoryChips'
import { ProductsContext } from '../context/ProductsContext'
import { CategoriesContext } from '../context/CategoriesContext'


/*
|--------------------------------------------------------------------------
| CATEGORY IMAGES
|--------------------------------------------------------------------------
|
| Add your category images here later.
|
| Example:
|
| vegetables: '/images/category-images/vegetables.jpg'
| fruits: '/images/category-images/fruits.jpg'
| dairy: '/images/category-images/dairy.jpg'
|
| The key must match your category slug.
|
*/

const categoryImages = {
    vegetables: '/images/category-images/vegetables.jpg',
    fruits: '/images/category-images/fruits.jpg',
    dairy: '/images/category-images/dairy.jpg',
    'rice-grains': '/images/category-images/rice-grains.jpg',
    beverages: '/images/category-images/beverages.jpg',
    'snacks-biscuits': '/images/category-images/snacks-biscuits.jpg',
    'household-supplies': '/images/category-images/household-supplies.jpg',
}


/*
|--------------------------------------------------------------------------
| Category Page
|--------------------------------------------------------------------------
*/

const CategoryPage = () => {
    const { slug } = useParams()
    const {
        categoryProducts,
        getCategoryProducts,
        loading,
        currentPage,
        totalPages,
        setPage,
    } = useContext(ProductsContext)

    const { categories } = useContext(CategoriesContext)



    /*
    |--------------------------------------------------------------------------
    | UI State
    |--------------------------------------------------------------------------
    */

    const [filtersOpen, setFiltersOpen] = useState(false)
    const [sortValue, setSortValue] = useState('popular')


    /*
    |--------------------------------------------------------------------------
    | Load category
    |--------------------------------------------------------------------------
    */

    useEffect(() => {
        if (!slug) return
        getCategoryProducts(slug)
        setSortValue("popular")
    }, [slug])


    const category = categories.find(cat => cat.slug === slug)

    /*
    |--------------------------------------------------------------------------
    | Category Image
    |--------------------------------------------------------------------------
    |
    | First preference:
    |     category.image
    |
    | Fallback:
    |     local categoryImages object
    |
    */

    const categoryImage =
        category?.image || categoryImages[slug]


    /*
    |--------------------------------------------------------------------------
    | Sorted Products
    |--------------------------------------------------------------------------
    |
    | This keeps the existing ProductsContext untouched.
    |
    */

    const sortedProducts = useMemo(() => {
        if (!categoryProducts) return []

        const products = [...categoryProducts]

        switch (sortValue) {
            case 'price_asc':
                return products.sort(
                    (a, b) => (a.price || 0) - (b.price || 0)
                )

            case 'price_desc':
                return products.sort(
                    (a, b) => (b.price || 0) - (a.price || 0)
                )

            case 'name_asc':
                return products.sort(
                    (a, b) =>
                        (a.name || '').localeCompare(b.name || '')
                )

            case 'newest':
                return products.sort(
                    (a, b) =>
                        new Date(b.createdAt || 0) -
                        new Date(a.createdAt || 0)
                )

            case 'popular':
            default:
                return products
        }
    }, [categoryProducts, sortValue])

    // let sortedProducts = [...categoryProducts]
    // if(sortValue === "price_asc")
    //     sortedProducts = sortedProducts.sort((a, b) => a.price - b.price)
    // if(sortValue === "price_desc")
    //     sortedProducts = sortedProducts.sort((a, b) => b.price - a.price)
    // if(sortValue === "name_asc")
    //     sortedProducts = sortedProducts.sort((a, b) => a.name.localeCompare(b.name))
    /*
    |--------------------------------------------------------------------------
    | Category Name
    |--------------------------------------------------------------------------
    */

    const categoryName = category?.name || 'Category'


    /*
    |--------------------------------------------------------------------------
    | Pagination
    |--------------------------------------------------------------------------
    */

    const goToPreviousPage = () => {
        if (currentPage > 1) {
            setPage(currentPage - 1)
        }
    }

    const goToNextPage = () => {
        if (currentPage < totalPages) {
            setPage(currentPage + 1)
        }
    }


    return (
        <main className="w-full min-h-screen bg-white">


            {/* ============================================================
                PAGE CONTAINER
            ============================================================ */}

            <div className="w-full max-w-[1600px] mx-auto">


                {/* ========================================================
                    BREADCRUMB
                ========================================================

                    Breadcrumb stays ABOVE the image.

                    This is better than putting it over the image because:
                    - image remains visually clean
                    - text remains readable
                    - mobile is easier to use
                    - category image feels like a proper page header
                ======================================================== */}

                {/* <nav
                    aria-label="Breadcrumb"
                    className="
                        px-4
                        sm:px-6
                        lg:px-8
                        pt-5
                        pb-3
                    "
                >
                    <div
                        className="
                            flex
                            items-center
                            gap-1.5
                            text-xs
                            sm:text-sm
                            text-[#22281F]/50
                        "
                    >
                        <Link
                            to="/"
                            className="
                                flex
                                items-center
                                gap-1
                                transition-colors
                                hover:text-[#1F6F4A]
                            "
                        >
                            <Home
                                className="w-3.5 h-3.5"
                                strokeWidth={2}
                            />

                            <span>Home</span>
                        </Link>

                        <ChevronRight
                            className="w-3.5 h-3.5"
                            strokeWidth={2}
                        />

                        <span
                            className="
                                font-medium
                                text-[#22281F]
                            "
                        >
                            {categoryName}
                        </span>
                    </div>
                </nav> */}


                <section
                    className="
                                relative
                                mx-4
                                sm:mx-6
                                lg:mx-8
                                overflow-hidden
                                rounded-2xl
                                sm:rounded-3xl
                                aspect-[8/3]
                                mt-5
                            "
                >
                    <img
                        src={categoryImage}
                        alt={`${categoryName} category`}
                        className="
            absolute
            inset-0
            w-full
            h-full
            object-cover
            object-center
            select-none
        "
                    />

                    {/* Dark gradient for readable text */}
                    <div
                        className="
            absolute
            inset-0
            bg-gradient-to-t
            from-black/60
            via-black/15
            to-transparent
            pointer-events-none
        "
                    />

                    {/* Category information */}
                    <div
                        className="
            absolute
            inset-x-0
            bottom-0
            p-5
            sm:p-7
            lg:p-10
            pointer-events-none
        "
                    >
                        <p
                            className="
                text-[10px]
                sm:text-xs
                uppercase
                tracking-[0.18em]
                font-semibold
                text-white/90
                mb-1
            "
                        >
                            Shop by category
                        </p>

                        <h1
                            className="
                text-2xl
                sm:text-3xl
                lg:text-4xl
                font-semibold
                leading-tight
                text-white
                drop-shadow-[0_2px_6px_rgba(0,0,0,0.5)]
            "
                        >
                            {categoryName}
                        </h1>

                        {typeof category?.productCount === 'number' && (
                            <p
                                className="
                    mt-1
                    text-xs
                    sm:text-sm
                    text-white/90
                "
                            >
                                {category.productCount}{' '}
                                {category.productCount === 1
                                    ? 'product'
                                    : 'products'}
                            </p>
                        )}
                    </div>
                </section>

                {/* ========================================================
                    CATEGORY NAVIGATION
                ======================================================== */}

                {/* <section
                    className="
                        px-4
                        sm:px-6
                        lg:px-8
                        pt-5
                        sm:pt-6
                    "
                > */}
                    {/* <CategoryChips activeSlug={slug} /> */}
                {/* </section> */}


                {/* ========================================================
                    PRODUCT TOOLBAR
                ======================================================== */}

                <section
                    className="
                        px-4
                        sm:px-6
                        lg:px-8
                        pt-5
                        sm:pt-7
                    "
                >

                    <div
                        className="
                            flex
                            flex-wrap
                            items-center
                            justify-between
                            gap-3
                            border-b
                            border-[#22281F]/10
                            pb-4
                        "
                    >

                        {/* LEFT SIDE */}

                        <div className="flex items-center gap-3">

                            {/* Mobile Filter */}

                            <button
                                type="button"
                                onClick={() => setFiltersOpen(true)}
                                className="
                                    md:hidden
                                    inline-flex
                                    items-center
                                    gap-2
                                    rounded-xl
                                    border
                                    border-[#22281F]/15
                                    bg-white
                                    px-3.5
                                    py-2
                                    text-sm
                                    font-medium
                                    text-[#22281F]
                                    transition
                                    hover:border-[#1F6F4A]
                                    hover:text-[#1F6F4A]
                                    active:scale-[0.98]
                                "
                            >
                                <SlidersHorizontal
                                    className="w-4 h-4"
                                    strokeWidth={2}
                                />

                                Filters
                            </button>


                            {/* Result Count */}

                            <p
                                className="
                                    text-xs
                                    sm:text-sm
                                    text-[#22281F]/55
                                "
                            >
                                {loading
                                    ? 'Loading products...'
                                    : `${categoryProducts?.length || 0} ${categoryProducts?.length === 1
                                        ? 'product'
                                        : 'products'
                                    }`}
                            </p>

                        </div>


                        {/* RIGHT SIDE */}

                        <div className="flex items-center gap-2">

                            <span
                                className="
                                    hidden
                                    sm:inline
                                    text-xs
                                    text-[#22281F]/45
                                "
                            >
                                Sort by
                            </span>

                            <select
                                value={sortValue}
                                onChange={(event) =>
                                    setSortValue(event.target.value)
                                }
                                className="
                                    appearance-none
                                    rounded-xl
                                    border
                                    border-[#22281F]/15
                                    bg-white
                                    px-3
                                    py-2
                                    pr-8
                                    text-xs
                                    sm:text-sm
                                    font-medium
                                    text-[#22281F]
                                    outline-none
                                    transition
                                    focus:border-[#1F6F4A]
                                    focus:ring-2
                                    focus:ring-[#1F6F4A]/15
                                "
                            >
                                <option value="popular">
                                    Most popular
                                </option>

                                <option value="newest">
                                    Newest
                                </option>

                                <option value="price_asc">
                                    Price: low to high
                                </option>

                                <option value="price_desc">
                                    Price: high to low
                                </option>

                                <option value="name_asc">
                                    Name: A–Z
                                </option>
                            </select>

                        </div>

                    </div>

                </section>


                {/* ========================================================
                    PRODUCTS
                ======================================================== */}

                <section
                    className="
                        px-4
                        sm:px-6
                        lg:px-8
                        py-5
                        sm:py-7
                    "
                >

                    <div
                        className="
                            grid
                            grid-cols-2
                            sm:grid-cols-3
                            md:grid-cols-4
                            lg:grid-cols-5
                            xl:grid-cols-6
                            gap-3
                            sm:gap-4
                            lg:gap-5
                        "
                    >

                        {/* =================================================
                            LOADING SKELETON
                        ================================================= */}

                        {loading &&
                            Array.from({ length: 12 }).map((_, index) => (
                                <div
                                    key={index}
                                    className="
                                        overflow-hidden
                                        rounded-2xl
                                        border
                                        border-[#22281F]/8
                                        bg-white
                                    "
                                >

                                    <div
                                        className="
                                            aspect-square
                                            w-full
                                            animate-pulse
                                            bg-[#F0F1EC]
                                        "
                                    />

                                    <div className="p-3 space-y-2">

                                        <div
                                            className="
                                                h-3
                                                w-4/5
                                                rounded
                                                bg-[#E7E9E2]
                                                animate-pulse
                                            "
                                        />

                                        <div
                                            className="
                                                h-3
                                                w-1/2
                                                rounded
                                                bg-[#E7E9E2]
                                                animate-pulse
                                            "
                                        />

                                        <div
                                            className="
                                                h-9
                                                w-full
                                                rounded-xl
                                                bg-[#E7E9E2]
                                                animate-pulse
                                            "
                                        />

                                    </div>

                                </div>
                            ))}


                        {/* =================================================
                            PRODUCTS
                        ================================================= */}

                        {!loading &&
                            sortedProducts.map((product) => (
                                <ProductCard
                                    key={product._id}
                                    product={product}
                                    page="CategoryPage"
                                />
                            ))}

                    </div>


                    {/* ====================================================
                        EMPTY STATE
                    ==================================================== */}

                    {!loading && sortedProducts.length === 0 && (
                        <div
                            className="
                                flex
                                min-h-[300px]
                                flex-col
                                items-center
                                justify-center
                                text-center
                                px-5
                            "
                        >

                            <div
                                className="
                                    flex
                                    h-16
                                    w-16
                                    items-center
                                    justify-center
                                    rounded-full
                                    bg-[#1F6F4A]/8
                                "
                            >
                                <PackageSearch
                                    className="
                                        h-8
                                        w-8
                                        text-[#1F6F4A]
                                    "
                                    strokeWidth={1.6}
                                />
                            </div>

                            <h2
                                className="
                                    mt-4
                                    text-base
                                    font-semibold
                                    text-[#22281F]
                                "
                            >
                                No products found
                            </h2>

                            <p
                                className="
                                    mt-1
                                    max-w-sm
                                    text-xs
                                    sm:text-sm
                                    text-[#22281F]/50
                                "
                            >
                                There are currently no products available
                                in this category.
                            </p>

                            <Link
                                to="/shop"
                                className="
                                    mt-5
                                    rounded-xl
                                    bg-[#1F6F4A]
                                    px-5
                                    py-2.5
                                    text-sm
                                    font-medium
                                    text-white
                                    transition
                                    hover:bg-[#18583A]
                                "
                            >
                                Browse all products
                            </Link>

                        </div>
                    )}


                    {/* ====================================================
                        PAGINATION
                    ==================================================== */}

                    {!loading &&
                        sortedProducts.length > 0 &&
                        totalPages > 1 && (

                            <nav
                                aria-label="Category pagination"
                                className="
                                    flex
                                    items-center
                                    justify-center
                                    gap-2
                                    pt-8
                                "
                            >

                                <button
                                    type="button"
                                    disabled={currentPage <= 1}
                                    onClick={goToPreviousPage}
                                    className="
                                        inline-flex
                                        items-center
                                        gap-1
                                        rounded-xl
                                        border
                                        border-[#22281F]/15
                                        px-3
                                        py-2
                                        text-xs
                                        sm:text-sm
                                        font-medium
                                        text-[#22281F]
                                        transition
                                        hover:border-[#1F6F4A]
                                        hover:text-[#1F6F4A]
                                        disabled:cursor-not-allowed
                                        disabled:opacity-35
                                    "
                                >
                                    <ChevronLeft
                                        className="w-4 h-4"
                                    />

                                    Previous
                                </button>


                                <span
                                    className="
                                        min-w-[90px]
                                        text-center
                                        text-xs
                                        sm:text-sm
                                        text-[#22281F]/55
                                    "
                                >
                                    Page {currentPage} of {totalPages}
                                </span>


                                <button
                                    type="button"
                                    disabled={
                                        currentPage >= totalPages
                                    }
                                    onClick={goToNextPage}
                                    className="
                                        inline-flex
                                        items-center
                                        gap-1
                                        rounded-xl
                                        border
                                        border-[#22281F]/15
                                        px-3
                                        py-2
                                        text-xs
                                        sm:text-sm
                                        font-medium
                                        text-[#22281F]
                                        transition
                                        hover:border-[#1F6F4A]
                                        hover:text-[#1F6F4A]
                                        disabled:cursor-not-allowed
                                        disabled:opacity-35
                                    "
                                >
                                    Next

                                    <ChevronRight
                                        className="w-4 h-4"
                                    />
                                </button>

                            </nav>
                        )}

                </section>

            </div>


            {/* ============================================================
                MOBILE FILTER DRAWER
            ============================================================ */}

            {filtersOpen && (
                <>

                    {/* Overlay */}

                    <button
                        type="button"
                        aria-label="Close filters"
                        onClick={() => setFiltersOpen(false)}
                        className="
                            fixed
                            inset-0
                            z-40
                            bg-black/35
                            backdrop-blur-[1px]
                            md:hidden
                        "
                    />


                    {/* Drawer */}

                    <aside
                        className="
                            fixed
                            inset-x-0
                            bottom-0
                            z-50
                            rounded-t-3xl
                            bg-white
                            p-5
                            shadow-[0_-10px_40px_rgba(0,0,0,0.15)]
                            md:hidden
                        "
                    >

                        <div
                            className="
                                flex
                                items-center
                                justify-between
                                pb-4
                                border-b
                                border-[#22281F]/10
                            "
                        >

                            <div>
                                <h2
                                    className="
                                        text-base
                                        font-semibold
                                        text-[#22281F]
                                    "
                                >
                                    Filters
                                </h2>

                                <p
                                    className="
                                        mt-0.5
                                        text-xs
                                        text-[#22281F]/45
                                    "
                                >
                                    Refine your products
                                </p>
                            </div>


                            <button
                                type="button"
                                onClick={() => setFiltersOpen(false)}
                                className="
                                    flex
                                    h-9
                                    w-9
                                    items-center
                                    justify-center
                                    rounded-full
                                    bg-[#22281F]/5
                                    text-[#22281F]
                                "
                            >
                                <X className="w-4 h-4" />
                            </button>

                        </div>


                        {/* Filter Options */}

                        <div className="py-5 space-y-3">

                            <button
                                type="button"
                                className="
                                    flex
                                    w-full
                                    items-center
                                    justify-between
                                    rounded-xl
                                    border
                                    border-[#1F6F4A]
                                    bg-[#1F6F4A]/5
                                    px-4
                                    py-3
                                    text-sm
                                    font-medium
                                    text-[#1F6F4A]
                                "
                            >
                                <span>All products</span>

                                <Check className="w-4 h-4" />
                            </button>


                            <button
                                type="button"
                                className="
                                    flex
                                    w-full
                                    items-center
                                    justify-between
                                    rounded-xl
                                    border
                                    border-[#22281F]/10
                                    px-4
                                    py-3
                                    text-sm
                                    text-[#22281F]/70
                                "
                            >
                                <span>In stock</span>
                            </button>


                            <button
                                type="button"
                                className="
                                    flex
                                    w-full
                                    items-center
                                    justify-between
                                    rounded-xl
                                    border
                                    border-[#22281F]/10
                                    px-4
                                    py-3
                                    text-sm
                                    text-[#22281F]/70
                                "
                            >
                                <span>On sale</span>
                            </button>

                        </div>


                        <button
                            type="button"
                            onClick={() => setFiltersOpen(false)}
                            className="
                                w-full
                                rounded-xl
                                bg-[#1F6F4A]
                                py-3
                                text-sm
                                font-semibold
                                text-white
                                transition
                                hover:bg-[#18583A]
                            "
                        >
                            Show products
                        </button>

                    </aside>

                </>
            )}

        </main>
    )
}

export default CategoryPage