import {
    Plus,
    Search,
    SlidersHorizontal,
    Pencil,
    Trash2,
    Package,
} from "lucide-react";

import {toast} from "sonner";
import { useContext, useMemo, useState } from "react";
import { ProductsContext } from "../context/ProductsContext";
import EditProductModal from "../components/admin/EditProductModal";
import AddProductModal from "../components/admin/AddProductModal";
import { useEffect } from "react";
import PaginationButtons from "../components/PaginationButtons";

const AdminProductsPage = () => {

    const { products, deleteProduct, getProducts, totalProducts} = useContext(ProductsContext);
    const [searchTerm, setSearchTerm] = useState("");
    const [ currentPage, setCurrentPage ] = useState(1)
    const [ disabled, setDisabled ] = useState(false)

    const limit = 20
    const totalPages = Math.ceil(totalProducts / limit)
    const onNext = () => {
        setCurrentPage(currentPage + 1)
    }

    const onPrev = () => {
        setCurrentPage(currentPage - 1)
    }

    const moveToPage = (page) => {
        setCurrentPage(page)
    }

    const filteredProducts = useMemo(() => {
        const search = searchTerm.trim().toLowerCase();

        if (!search) {
            return products;
        }

        return products.filter((product) =>
            product.name?.toLowerCase().includes(search) ||
            product.sku?.toLowerCase().includes(search) ||
            product.category?.name?.toLowerCase().includes(search)
        );
    }, [products, searchTerm]);


    const getSellingPrice = (product) => {
        return product.price - (product.discount || 0);
    };

    const getDiscountPercentage = (product) => {
        if (!product.discount || !product.price) {
            return 0;
        }

        return Math.round(
            (product.discount / product.price) * 100
        );
    };

    // state hiding and showing ProductsEditModal
    const [isProductEditModal, setIsProductEditModal] = useState(false)
    const [selectedProduct, setSelectedProduct] = useState(null)
    // on close ProductsEditModal
    const onCloseEditModal = () => setIsProductEditModal(false)
    
    // handle Edit for product
    const handleEdit = (product) => {
        // open the edit modal
        setSelectedProduct(product)
        setIsProductEditModal(true)
    }
    
    // state for add product
    const [ isProductAddModal, setIsProductAddModal] = useState(false)
    // on close ProductAddModal
    const onCloseAddModal = () => setIsProductAddModal(false)

    // handle Edit for product
    const handleAdd = () => {
        // open the add modal
        setIsProductAddModal(true)
    }

    // delete product
    const handleDelete = async(id) => {
        try{
            setDisabled(true)
            await deleteProduct(id)
            await getProducts(currentPage, limit)
        }catch(error){
            toast.error(error.message)
        }finally{
            setDisabled(false)
        }
    }

    // get paginated products
    useEffect(() => {
        getProducts(currentPage, limit)
    }, [currentPage])
    return (
        <>
            <div className="space-y-6">

                {/* Page Header */}
                <section>
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">

                        <div>
                            <p className="text-sm font-medium text-emerald-600">
                                Store management
                            </p>

                            <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                                Products
                            </h1>

                            <p className="mt-1.5 text-sm text-slate-500">
                                Manage your products, prices and stock.
                            </p>
                        </div>


                        {/* Add Product */}
                        <button
                            type="button"
                            className="
                            inline-flex h-10 items-center justify-center
                            gap-2 rounded-xl
                            bg-emerald-600 px-4
                            text-sm font-semibold text-white
                            shadow-sm
                            transition
                            hover:bg-emerald-700
                            focus:outline-none
                            focus:ring-2
                            focus:ring-emerald-500/30
                            focus:ring-offset-2
                        "
                        onClick={handleAdd}
                        >
                            <Plus size={18} />
                            Add Product
                        </button>

                    </div>
                </section>


                {/* Products Card */}
                <section
                    className="
                    overflow-hidden
                    rounded-2xl
                    border border-slate-200
                    bg-white
                    shadow-sm
                    shadow-slate-200/40
                "
                >

                    {/* Toolbar */}
                    <div
                        className="
                        flex flex-col gap-3
                        border-b border-slate-100
                        p-4 sm:p-5
                        lg:flex-row lg:items-center lg:justify-between
                    "
                    >

                        {/* Search */}
                        <div className="relative w-full lg:max-w-sm">

                            <Search
                                size={17}
                                className="
                                pointer-events-none
                                absolute left-3
                                top-1/2
                                -translate-y-1/2
                                text-slate-400
                            "
                            />

                            <input
                                type="search"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder="Search products..."
                                className="
                                h-10 w-full
                                rounded-xl
                                border border-slate-200
                                bg-slate-50
                                pl-9 pr-3
                                text-sm text-slate-900
                                outline-none
                                transition
                                placeholder:text-slate-400
                                focus:border-emerald-500
                                focus:bg-white
                                focus:ring-2
                                focus:ring-emerald-500/10
                            "
                            />

                        </div>


                        {/* Filters */}
                        <button
                            type="button"
                            className="
                            inline-flex h-10
                            items-center justify-center
                            gap-2
                            rounded-xl
                            border border-slate-200
                            px-3.5
                            text-sm font-medium
                            text-slate-600
                            transition
                            hover:bg-slate-50
                            hover:text-slate-900
                        "
                        >
                            <SlidersHorizontal size={17} />
                            Filters
                        </button>

                    </div>


                    {/* Mobile Product Cards */}
                    <div className="divide-y divide-slate-100 md:hidden">

                        {filteredProducts.length === 0 ? (

                            <div className="px-4 py-12 text-center">
                                <Package
                                    size={28}
                                    className="mx-auto text-slate-300"
                                />

                                <p className="mt-3 text-sm font-medium text-slate-700">
                                    No products found
                                </p>

                                <p className="mt-1 text-xs text-slate-400">
                                    Try changing your search.
                                </p>
                            </div>

                        ) : (

                            filteredProducts.map((product) => {

                                const sellingPrice =
                                    getSellingPrice(product);

                                const discountPercentage =
                                    getDiscountPercentage(product);

                                return (
                                    <div
                                        key={product._id}
                                        className="p-4"
                                    >

                                        <div className="flex items-start gap-3">

                                            {/* Product Image */}
                                            <div
                                                className="
                                                h-12 w-12
                                                shrink-0
                                                overflow-hidden
                                                rounded-xl
                                                bg-slate-100
                                            "
                                            >

                                                {product.images?.[0] ? (

                                                    <img
                                                        src={product.images[0].url}
                                                        alt={product.name}
                                                        className="
                                                        h-full w-full
                                                        object-cover
                                                    "
                                                    />

                                                ) : (

                                                    <div
                                                        className="
                                                        flex h-full w-full
                                                        items-center
                                                        justify-center
                                                        text-slate-400
                                                    "
                                                    >
                                                        <Package size={20} />
                                                    </div>

                                                )}

                                            </div>


                                            {/* Product Information */}
                                            <div className="min-w-0 flex-1">

                                                <div className="flex items-start justify-between gap-3">

                                                    <div className="min-w-0">

                                                        <h3
                                                            className="
                                                            truncate
                                                            text-sm
                                                            font-semibold
                                                            text-slate-900
                                                        "
                                                        >
                                                            {product.name} {product.quantity}{product.unit}
                                                        </h3>

                                                        <p
                                                            className="
                                                            mt-0.5
                                                            truncate
                                                            text-xs
                                                            text-slate-400
                                                        "
                                                        >
                                                            {product.sku || "No SKU"}
                                                        </p>

                                                        <p
                                                            className="
                                                            mt-0.5
                                                            text-xs
                                                            text-slate-500
                                                        "
                                                        >
                                                            {product.category?.name ||
                                                                "Uncategorized"}
                                                        </p>

                                                    </div>

                                                </div>


                                                {/* Price + Stock */}
                                                <div className="mt-3 grid grid-cols-2 gap-4">

                                                    {/* Price */}
                                                    <div>

                                                        <p
                                                            className="
                                                            text-[10px]
                                                            font-semibold
                                                            uppercase
                                                            tracking-wide
                                                            text-slate-400
                                                        "
                                                        >
                                                            Price
                                                        </p>

                                                        <p
                                                            className="
                                                            mt-1
                                                            text-sm
                                                            font-bold
                                                            text-slate-900
                                                        "
                                                        >
                                                            Rs.{" "}
                                                            {sellingPrice.toLocaleString()}
                                                        </p>

                                                        {product.discount > 0 && (
                                                            <div className="mt-0.5 flex items-center gap-1.5">

                                                                <span
                                                                    className="
                                                                    text-xs
                                                                    text-slate-400
                                                                    line-through
                                                                "
                                                                >
                                                                    Rs.{" "}
                                                                    {product.price.toLocaleString()}
                                                                </span>

                                                                <span
                                                                    className="
                                                                    text-[10px]
                                                                    font-semibold
                                                                    text-emerald-600
                                                                "
                                                                >
                                                                    {discountPercentage}%
                                                                </span>

                                                            </div>
                                                        )}

                                                    </div>


                                                    {/* Stock */}
                                                    <div>

                                                        <p
                                                            className="
                                                            text-[10px]
                                                            font-semibold
                                                            uppercase
                                                            tracking-wide
                                                            text-slate-400
                                                        "
                                                        >
                                                            Stock
                                                        </p>

                                                        <p
                                                            className={`
                                                            mt-1
                                                            text-sm
                                                            font-semibold
                                                            ${product.stock === 0
                                                                    ? "text-red-600"
                                                                    : product.stock <= 5
                                                                        ? "text-amber-600"
                                                                        : "text-slate-800"
                                                                }
                                                        `}
                                                        >
                                                            {product.stock}{" "}
                                                            {product.stock === 1 ? "pack" : "packs"
                                                            }
                                                        </p>

                                                    </div>

                                                </div>


                                                {/* Bottom Row */}
                                                <div
                                                    className="
                                                    mt-3
                                                    flex items-center
                                                    justify-between
                                                "
                                                >

                                                    {/* Status */}
                                                    <span
                                                        className={`
                                                        inline-flex
                                                        rounded-full
                                                        px-2.5 py-1
                                                        text-[10px]
                                                        font-semibold
                                                        ${product.isActive
                                                                ? "bg-emerald-50 text-emerald-700"
                                                                : "bg-slate-100 text-slate-500"
                                                            }
                                                    `}
                                                    >
                                                        {product.isActive
                                                            ? "Active"
                                                            : "Inactive"}
                                                    </span>


                                                    {/* Actions */}
                                                    <div className="flex items-center gap-1">

                                                        <button
                                                            type="button"
                                                            className="
                                                            rounded-lg
                                                            p-2
                                                            text-slate-400
                                                            transition
                                                            hover:bg-slate-100
                                                            hover:text-slate-700
                                                        "
                                                            aria-label={`Edit ${product.name}`}
                                                            onClick={() => handleEdit(product)}
                                                        >
                                                            <Pencil size={15} />
                                                        </button>

                                                        <button
                                                            type="button"
                                                            className="
                                                            rounded-lg
                                                            p-2
                                                            text-slate-400
                                                            transition
                                                            hover:bg-red-50
                                                            hover:text-red-600
                                                        "
                                                            aria-label={`Delete ${product.name}`}
                                                            onClick={() => handleDelete(product._id)}
                                                            disabled={disabled}
                                                        >
                                                            <Trash2 size={15} />
                                                        </button>

                                                    </div>

                                                </div>

                                            </div>

                                        </div>

                                    </div>
                                );
                            })

                        )}

                    </div>


                    {/* Desktop Table */}
                    <div className="hidden overflow-x-auto md:block">

                        <table className="w-full min-w-[850px]">

                            <thead>

                                <tr
                                    className="
                                    border-b
                                    border-slate-100
                                    bg-slate-50/60
                                "
                                >

                                    <th
                                        className="
                                        px-6 py-3.5
                                        text-left
                                        text-[11px]
                                        font-bold
                                        uppercase
                                        tracking-wider
                                        text-slate-400
                                    "
                                    >
                                        Product
                                    </th>

                                    <th
                                        className="
                                        px-4 py-3.5
                                        text-left
                                        text-[11px]
                                        font-bold
                                        uppercase
                                        tracking-wider
                                        text-slate-400
                                    "
                                    >
                                        Category
                                    </th>

                                    <th
                                        className="
                                        px-4 py-3.5
                                        text-left
                                        text-[11px]
                                        font-bold
                                        uppercase
                                        tracking-wider
                                        text-slate-400
                                    "
                                    >
                                        Price
                                    </th>

                                    <th
                                        className="
                                        px-4 py-3.5
                                        text-left
                                        text-[11px]
                                        font-bold
                                        uppercase
                                        tracking-wider
                                        text-slate-400
                                    "
                                    >
                                        Stock
                                    </th>

                                    <th
                                        className="
                                        px-4 py-3.5
                                        text-left
                                        text-[11px]
                                        font-bold
                                        uppercase
                                        tracking-wider
                                        text-slate-400
                                    "
                                    >
                                        Status
                                    </th>

                                    <th
                                        className="
                                        px-6 py-3.5
                                        text-right
                                        text-[11px]
                                        font-bold
                                        uppercase
                                        tracking-wider
                                        text-slate-400
                                    "
                                    >
                                        Actions
                                    </th>

                                </tr>

                            </thead>


                            <tbody className="divide-y divide-slate-100">

                                {filteredProducts.length === 0 ? (

                                    <tr>

                                        <td
                                            colSpan="6"
                                            className="px-6 py-16 text-center"
                                        >

                                            <Package
                                                size={32}
                                                className="
                                                mx-auto
                                                text-slate-300
                                            "
                                            />

                                            <p
                                                className="
                                                mt-3
                                                text-sm
                                                font-medium
                                                text-slate-700
                                            "
                                            >
                                                No products found
                                            </p>

                                            <p
                                                className="
                                                mt-1
                                                text-xs
                                                text-slate-400
                                            "
                                            >
                                                Try changing your search.
                                            </p>

                                        </td>

                                    </tr>

                                ) : (

                                    filteredProducts.map((product) => {

                                        const sellingPrice =
                                            getSellingPrice(product);

                                        const discountPercentage =
                                            getDiscountPercentage(product);

                                        return (

                                            <tr
                                                key={product._id}
                                                className="
                                                transition
                                                hover:bg-slate-50/50
                                            "
                                            >

                                                {/* Product */}
                                                <td className="px-6 py-4">

                                                    <div className="flex items-center gap-3">

                                                        {/* Image */}
                                                        <div
                                                            className="
                                                            h-11 w-11
                                                            shrink-0
                                                            overflow-hidden
                                                            rounded-xl
                                                            bg-slate-100
                                                        "
                                                        >

                                                            {product.images?.[0] ? (

                                                                <img
                                                                    src={product.images[0].url}
                                                                    alt={product.name}
                                                                    className="
                                                                    h-full
                                                                    w-full
                                                                    object-cover
                                                                "
                                                                />

                                                            ) : (

                                                                <div
                                                                    className="
                                                                    flex
                                                                    h-full
                                                                    w-full
                                                                    items-center
                                                                    justify-center
                                                                    text-slate-400
                                                                "
                                                                >
                                                                    <Package size={18} />
                                                                </div>

                                                            )}

                                                        </div>


                                                        <div className="min-w-0">

                                                            <p
                                                                className="
                                                                truncate
                                                                text-sm
                                                                font-semibold
                                                                text-slate-900
                                                            "
                                                            >
                                                                {product.name} {product.quantity}{product.unit}
                                                            </p>

                                                            <p
                                                                className="
                                                                mt-0.5
                                                                text-xs
                                                                text-slate-400
                                                            "
                                                            >
                                                                {product.sku || "No SKU"}
                                                            </p>

                                                        </div>

                                                    </div>

                                                </td>


                                                {/* Category */}
                                                <td
                                                    className="
                                                    px-4 py-4
                                                    text-sm
                                                    text-slate-600
                                                "
                                                >
                                                    {product.category?.name ||
                                                        "Uncategorized"}
                                                </td>


                                                {/* Price */}
                                                <td className="px-4 py-4">

                                                    <div>

                                                        {/* Selling Price */}
                                                        <p
                                                            className="
                                                            text-sm
                                                            font-bold
                                                            text-slate-900
                                                        "
                                                        >
                                                            Rs.{" "}
                                                            {sellingPrice.toLocaleString()}
                                                        </p>


                                                        {/* Original Price + Discount */}
                                                        {product.discount > 0 && (

                                                            <div
                                                                className="
                                                                mt-0.5
                                                                flex
                                                                items-center
                                                                gap-2
                                                            "
                                                            >

                                                                <span
                                                                    className="
                                                                    text-xs
                                                                    text-slate-400
                                                                    line-through
                                                                "
                                                                >
                                                                    Rs.{" "}
                                                                    {product.price.toLocaleString()}
                                                                </span>

                                                                <span
                                                                    className="
                                                                    inline-flex
                                                                    rounded-full
                                                                    bg-emerald-50
                                                                    px-1.5
                                                                    py-0.5
                                                                    text-[10px]
                                                                    font-semibold
                                                                    text-emerald-700
                                                                "
                                                                >
                                                                    {discountPercentage}% OFF
                                                                </span>

                                                            </div>

                                                        )}

                                                    </div>

                                                </td>


                                                {/* Stock */}
                                                <td className="px-4 py-4">

                                                    <span
                                                        className={`
                                                        text-sm
                                                        font-semibold
                                                        ${product.stock === 0
                                                                ? "text-red-600"
                                                                : product.stock <= 5
                                                                    ? "text-amber-600"
                                                                    : "text-slate-700"
                                                            }
                                                    `}
                                                    >
                                                        {product.stock}{" "}
                                                       {product.stock === 1 ? "pack" : "packs"
                                                            }
                                                    </span>


                                                    {product.stock === 0 && (

                                                        <p
                                                            className="
                                                            mt-0.5
                                                            text-[10px]
                                                            font-medium
                                                            text-red-600
                                                        "
                                                        >
                                                            Out of stock
                                                        </p>

                                                    )}


                                                    {product.stock > 0 &&
                                                        product.stock <= 5 && (

                                                            <p
                                                                className="
                                                                mt-0.5
                                                                text-[10px]
                                                                font-medium
                                                                text-amber-600
                                                            "
                                                            >
                                                                Low stock
                                                            </p>

                                                        )}

                                                </td>


                                                {/* Status */}
                                                <td className="px-4 py-4">

                                                    <span
                                                        className={`
                                                        inline-flex
                                                        rounded-full
                                                        px-2.5 py-1
                                                        text-[11px]
                                                        font-semibold
                                                        ${product.isActive
                                                                ? "bg-emerald-50 text-emerald-700"
                                                                : "bg-slate-100 text-slate-500"
                                                            }
                                                    `}
                                                    >
                                                        {product.isActive
                                                            ? "Active"
                                                            : "Inactive"}
                                                    </span>

                                                </td>


                                                {/* Actions */}
                                                <td className="px-6 py-4">

                                                    <div
                                                        className="
                                                        flex
                                                        items-center
                                                        justify-end
                                                        gap-1
                                                    "
                                                    >

                                                        {/* Edit */}
                                                        <button
                                                            type="button"
                                                            className="
                                                            rounded-lg
                                                            p-2
                                                            text-slate-400
                                                            transition
                                                            hover:bg-slate-100
                                                            hover:text-slate-700
                                                        "
                                                            aria-label={`Edit ${product.name}`}
                                                            onClick={() => handleEdit(product)}
                                                        >
                                                            <Pencil size={16} />
                                                        </button>


                                                        {/* Delete */}
                                                        <button
                                                            type="button"
                                                            className="
                                                            rounded-lg
                                                            p-2
                                                            text-slate-400
                                                            transition
                                                            hover:bg-red-50
                                                            hover:text-red-600
                                                        "
                                                            aria-label={`Delete ${product.name}`}
                                                            onClick={() => handleDelete(product._id)}
                                                            disabled={disabled}
                                                        >
                                                            <Trash2 size={16} />
                                                        </button>

                                                    </div>

                                                </td>

                                            </tr>

                                        );

                                    })

                                )}

                            </tbody>

                        </table>

                    </div>


                    {/* Pagination */}
                    <div
                        className="
                        flex flex-col gap-3
                        border-t border-slate-100
                        px-4 py-4
                        sm:flex-row
                        sm:items-center
                        sm:justify-between
                        sm:px-6
                    "
                    >

                        <p className="text-xs text-slate-500">

                            Showing{" "}

                            <span className="font-semibold text-slate-700">
                                {((currentPage - 1) * limit) + 1} - {Math.min((currentPage * limit), totalProducts)}
                            </span>{" "}

                            of{" "}

                            <span className="font-semibold text-slate-700">
                                {totalProducts}
                            </span>{" "}

                            products

                        </p>

                        <PaginationButtons totalPages={totalPages} currentPage={currentPage} onNext={onNext} onPrev={onPrev} moveToPage={moveToPage}/>
                        
                    </div>

                </section>

            </div>
            {
                isProductEditModal && selectedProduct && 
                <EditProductModal product={selectedProduct} onClose={onCloseEditModal} />
            }
            {
                isProductAddModal && <AddProductModal onClose={onCloseAddModal} page={currentPage} limit={limit}/>
            }
        </>
    );
};

export default AdminProductsPage;