import { useContext, useEffect } from 'react'
import { useSearchParams, Link, useNavigate } from 'react-router-dom'
import { Home, ChevronRight, Heart, Star } from 'lucide-react'
import CategoryChips from "../components/CategoryChips"
import { ProductsContext } from '../context/ProductsContext'
import ProductCard  from "../components/ProductCard"
import { CategoriesContext } from '../context/CategoriesContext'

const SearchResultsPage = () => {
    const { searchedProducts, getSearchedProducts, loading } = useContext(ProductsContext)
    const { categories } = useContext(CategoriesContext)
    const navigate = useNavigate()

    const [searchParams] = useSearchParams()
    const query = searchParams.get('search') || ''

    useEffect(() => {
        getSearchedProducts(query)
    }, [query])

    if(loading) return null
    
    // TODO: this should come from your real search results, not a hardcoded array
    const results = searchedProducts
    console.log(searchedProducts)
    const hasResults = results.length > 0
    const TOP_CATEGORIES = categories

    return (
        <div className="min-h-screen bg-white">

            {/* ===== Banner ===== */}
            <div className="relative bg-[#154A32] overflow-hidden">
                {/* Optional background texture image — swap for a real product/grain photo */}
                <div className="absolute inset-0 bg-[url('')] bg-cover bg-center opacity-30"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-[#0F3325]/80 to-[#154A32]/40"></div>

                <div className="relative max-w-7xl mx-auto px-4 lg:px-8 py-8 lg:py-10 flex items-center justify-between">
                    <h1 className="font-['Fraunces'] font-semibold text-2xl lg:text-3xl text-white uppercase tracking-wide">
                        {query || 'All Products'}
                    </h1>

                    <nav aria-label="Breadcrumb" className="sm:flex items-center gap-2 text-white/80 text-sm">
                        <Link to="/" className="hover:text-white transition-colors" aria-label="Go to homepage">
                            <Home className="w-4 h-4" strokeWidth={2} />
                        </Link>
                        <ChevronRight className="w-3.5 h-3.5" strokeWidth={2} />
                        <span className="lowercase">{query || 'search'}</span>
                    </nav>
                </div>
            </div>

            {/* ===== Body ===== */}
            <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8">
                <div className="flex gap-8">

                    {/* ===== Left — Top Categories ===== */}
                    <aside className="hidden lg:block w-56 shrink-0">
                        <h2 className="font-['Fraunces'] font-semibold text-xl text-[#22281F] mb-2">
                            Top Categories
                        </h2>
                        <div className="border-b border-[#22281F]/10 mb-4"></div>
                        <ul className="space-y-3">
                            {TOP_CATEGORIES.map((cat) => (
                                <li key={cat._id}>
                                    <button className="text-sm text-[#22281F]/50 hover:text-[#1F6F4A] text-left"
                                    onClick={() => {
                                        console.log(cat.slug)
                                        navigate("/" + cat.slug)}}>
                                        {cat.name}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </aside>

                    {/* ===== Right — Results ===== */}
                    <div className="flex-1 min-w-0">
                        {/* Divider line — full width on desktop, matches the reference's horizontal rule */}
                        <div className="hidden lg:block border-b border-[#22281F]/10 mb-4 h-[29px]"></div>

                        {/* Mobile categories — horizontal scroll since sidebar is hidden below lg */}
                        {/* <div className="lg:hidden flex gap-2 overflow-x-auto pb-3 mb-4 -mx-4 px-4">
                            {TOP_CATEGORIES.map((cat) => (
                                <button
                                    key={cat}
                                    className="shrink-0 px-4 py-1.5 rounded-full border border-[#22281F]/10 bg-[#F6F8F4] text-xs font-medium text-[#22281F]/70 whitespace-nowrap"
                                >
                                    {cat}
                                </button>
                            ))}
                        </div> */}
                        <CategoryChips className={"lg:hidden -mx-4 px-4 mt-0 mb-4"}/>

                        {!hasResults ? (
                            <p className="font-['Fraunces'] text-3xl text-[#22281F]">
                                No Item Found
                            </p>
                        ) : (
                            //vgrid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4
                            //PCard  grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4
                            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                                {results.map((product) => (
                                    <ProductCard key={product._id} product={product}/>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SearchResultsPage