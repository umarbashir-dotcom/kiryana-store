import { X, ImagePlus, Save, Trash2 } from "lucide-react";
import { useState, useEffect, useContext } from "react";
import { CategoriesContext } from "../../context/CategoriesContext"
import { ProductsContext } from "../../context/ProductsContext";
import imageCompression from "browser-image-compression";
import { toast } from "sonner";

const AddProductModal = ({ onClose, page, limit }) => {
    const { addProduct, getProducts } = useContext(ProductsContext)
    const [ disabled, setDisabled] = useState(false)
    const [image, setImage] = useState(null)
    const [imagePreview, setImagePreview] = useState(null)

    const { categories } = useContext(CategoriesContext)
    const [formData, setFormData] = useState({
        name: "", unit: "", quantity: 0, price: 0, discount: 0, stock: 0, category: "",
        slug: "", description: "", isActive: true, images: JSON.stringify([])
    })

    // handle toggle status
    const handleToggleStatus = () => setFormData(prev => ({ ...prev, isActive: !formData.isActive }))

    const handleChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    // handle image change/ selection
    const handleImageChange = async (e) => {
        const selectedImage = e.target.files[0]
        if (!selectedImage) return

        const options = {
            maxSizeMB: 2,
            maxWidthOrHeight: 1200,
            useWebWorker: true
        };

        const compressedImage = await imageCompression(
            selectedImage,
            options
        );

        setImage(compressedImage)
        setImagePreview(URL.createObjectURL(selectedImage))
    }

    // on delete  image preview
    const onDeleteImagePreview = (deleteImg) => {
        console.log(deleteImg)
        setImagePreview(null)
    }

    // onSave 
    const handleSubmit = async (e) => {
        e.preventDefault()
        const data = new FormData()

        Object.entries(formData).forEach(([key, value]) => data.append(key, value))

        if (image) {
            data.append("image", image)
        }
        try{
            setDisabled(true)
            await addProduct(data)
            await getProducts(page, limit)
            toast.success("Product added successfully")
        } catch(err){
            toast.error("Failed to add product",
                {description: "Try again"}
            )
        }finally{
            setDisabled(false)
        }

        // close model
        onClose()
    }
    

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 p-4">

            <div
                className="
                    flex w-full max-w-3xl
                    max-h-[92vh]
                    flex-col
                    overflow-hidden
                    rounded-2xl
                    border border-slate-200
                    bg-white
                    shadow-2xl
                "
            >

                {/* =====================================================
                    HEADER
                ====================================================== */}

                <div
                    className="
                        flex shrink-0 items-center justify-between
                        border-b border-slate-100
                        px-5 py-4
                        sm:px-6
                    "
                >

                    <div>
                        <h2 className="text-lg font-bold text-slate-900">
                            Add Product
                        </h2>

                        <p className="mt-0.5 text-xs text-slate-500">
                            Add a new product with pricing and inventory details.
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        className="
                            rounded-lg p-2
                            text-slate-400
                            transition
                            hover:bg-slate-100
                            hover:text-slate-700
                        "
                        aria-label="Close"
                    >
                        <X size={19} />
                    </button>

                </div>


                {/* =====================================================
                    FORM CONTENT
                ====================================================== */}

                <form onSubmit={handleSubmit}
                    className="overflow-y-auto">

                    <div className="space-y-8 p-5 sm:p-6">


                        {/* =================================================
                            PRODUCT INFORMATION
                        ================================================== */}

                        <section>

                            <div className="mb-4">

                                <h3 className="text-sm font-bold text-slate-900">
                                    Product Information
                                </h3>

                                <p className="mt-1 text-xs text-slate-400">
                                    Basic information about this product.
                                </p>

                            </div>


                            <div className="space-y-4">

                                {/* Product Name */}

                                <div>

                                    <label
                                        htmlFor="product-name"
                                        className="mb-1.5 block text-xs font-semibold text-slate-700"
                                    >
                                        Product Name

                                        <span className="ml-1 text-emerald-600">
                                            *
                                        </span>
                                    </label>

                                    <input
                                        id="product-name"
                                        type="text"
                                        name="name"
                                        placeholder="Enter product name"
                                        className="
                                            h-10 w-full
                                            rounded-xl
                                            border border-slate-200
                                            bg-white
                                            px-3
                                            text-sm text-slate-900
                                            outline-none
                                            transition
                                            placeholder:text-slate-400
                                            focus:border-emerald-500
                                            focus:ring-2
                                            focus:ring-emerald-500/10
                                        "
                                        required
                                        value={formData.name}
                                        onChange={handleChange}
                                    />

                                </div>


                                {/* Category */}

                                <div>

                                    <label
                                        htmlFor="product-category"
                                        className="mb-1.5 block text-xs font-semibold text-slate-700"
                                    >
                                        Category

                                        <span className="ml-1 text-emerald-600">
                                            *
                                        </span>
                                    </label>

                                    <select
                                        id="product-category"
                                        name="category"
                                        className="
                                            h-10 w-full
                                            rounded-xl
                                            border border-slate-200
                                            bg-white
                                            px-3
                                            text-sm text-slate-700
                                            outline-none
                                            transition
                                            focus:border-emerald-500
                                            focus:ring-2
                                            focus:ring-emerald-500/10
                                        "
                                        required
                                        value={formData.category}
                                        onChange={handleChange}
                                    >

                                        <option value="" disabled>
                                            Select category
                                        </option>

                                        {
                                            categories.map(cat => {
                                                return <option key={cat._id} value={cat._id}>
                                                    {cat.name}
                                                </option>
                                            }
                                            )
                                        }

                                    </select>

                                </div>


                                {/* Slug */}

                                <div>

                                    <label
                                        htmlFor="product-slug"
                                        className="mb-1.5 block text-xs font-semibold text-slate-700"
                                    >
                                        Slug
                                    </label>

                                    <input
                                        id="product-slug"
                                        type="text"
                                        name="slug"
                                        placeholder="product-slug"
                                        className="
                                            h-10 w-full
                                            rounded-xl
                                            border border-slate-200
                                            bg-slate-50
                                            px-3
                                            text-sm text-slate-600
                                            outline-none
                                            transition
                                            focus:border-emerald-500
                                            focus:bg-white
                                            focus:ring-2
                                            focus:ring-emerald-500/10
                                        "
                                        required
                                        value={formData.slug}
                                        onChange={handleChange}
                                    />

                                    <p className="mt-1.5 text-[11px] text-slate-400">
                                        Used for the product's public URL.
                                    </p>

                                </div>


                                {/* Description */}

                                <div>

                                    <label
                                        htmlFor="product-description"
                                        className="mb-1.5 block text-xs font-semibold text-slate-700"
                                    >
                                        Description
                                    </label>

                                    <textarea
                                        id="product-description"
                                        name="description"
                                        rows={4}
                                        placeholder="Write a short description about this product..."
                                        className="
                                            w-full
                                            resize-none
                                            rounded-xl
                                            border border-slate-200
                                            bg-white
                                            px-3 py-2.5
                                            text-sm text-slate-900
                                            outline-none
                                            transition
                                            placeholder:text-slate-400
                                            focus:border-emerald-500
                                            focus:ring-2
                                            focus:ring-emerald-500/10
                                        "
                                        required
                                        value={formData.description}
                                        onChange={handleChange}
                                    />

                                </div>

                            </div>

                        </section>


                        {/* =================================================
                            PRICING
                        ================================================== */}

                        <section>

                            <div className="mb-4">

                                <h3 className="text-sm font-bold text-slate-900">
                                    Pricing
                                </h3>

                                <p className="mt-1 text-xs text-slate-400">
                                    Set the regular price and optional discount.
                                </p>

                            </div>


                            <div className="grid gap-4 sm:grid-cols-2">

                                {/* Regular Price */}

                                <div>

                                    <label
                                        htmlFor="product-price"
                                        className="mb-1.5 block text-xs font-semibold text-slate-700"
                                    >
                                        Regular Price

                                        <span className="ml-1 text-emerald-600">
                                            *
                                        </span>
                                    </label>

                                    <div className="relative">

                                        <span
                                            className="
                                                pointer-events-none
                                                absolute left-3
                                                top-1/2
                                                -translate-y-1/2
                                                text-xs
                                                font-medium
                                                text-slate-400
                                            "
                                        >
                                            Rs.
                                        </span>

                                        <input
                                            id="product-price"
                                            type="number"
                                            name="price"
                                            min="0"
                                            placeholder="0"
                                            className="
                                                h-10 w-full
                                                rounded-xl
                                                border border-slate-200
                                                bg-white
                                                pl-9 pr-3
                                                text-sm text-slate-900
                                                outline-none
                                                transition
                                                focus:border-emerald-500
                                                focus:ring-2
                                                focus:ring-emerald-500/10
                                            "
                                            required
                                            value={formData.price}
                                            onChange={handleChange}
                                        />

                                    </div>

                                </div>


                                {/* Discount */}

                                <div>

                                    <label
                                        htmlFor="product-discount"
                                        className="mb-1.5 block text-xs font-semibold text-slate-700"
                                    >
                                        Discount
                                    </label>

                                    <div className="relative">

                                        <span
                                            className="
                                                pointer-events-none
                                                absolute left-3
                                                top-1/2
                                                -translate-y-1/2
                                                text-xs
                                                font-medium
                                                text-slate-400
                                            "
                                        >
                                            Rs.
                                        </span>

                                        <input
                                            id="product-discount"
                                            type="number"
                                            name="discount"
                                            min="0"
                                            placeholder="0"
                                            className="
                                                h-10 w-full
                                                rounded-xl
                                                border border-slate-200
                                                bg-white
                                                pl-9 pr-3
                                                text-sm text-slate-900
                                                outline-none
                                                transition
                                                focus:border-emerald-500
                                                focus:ring-2
                                                focus:ring-emerald-500/10
                                            "
                                            value={formData.discount}
                                            onChange={handleChange}
                                        />

                                    </div>

                                </div>

                            </div>


                            {/* Selling Price Preview */}

                            <div
                                className="
                                    mt-4
                                    rounded-xl
                                    border border-emerald-100
                                    bg-emerald-50/50
                                    p-4
                                "
                            >

                                <div className="flex items-center justify-between">

                                    <div>

                                        <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                                            Selling Price
                                        </p>

                                        <p className="mt-1 text-lg font-bold text-slate-900">
                                            Rs. {formData.price - formData.discount}
                                        </p>

                                    </div>

                                    <span
                                        className="
                                            rounded-full
                                            bg-emerald-100
                                            px-2.5 py-1
                                            text-[10px]
                                            font-bold
                                            text-emerald-700
                                        "
                                    >
                                        {Math.round((formData.discount / formData.price) * 100)}% OFF
                                    </span>

                                </div>

                                <p className="mt-1 text-xs text-slate-400">
                                    Regular price:{" "}
                                    <span className="line-through">
                                        Rs. {formData.price}
                                    </span>
                                </p>

                            </div>

                        </section>


                        {/* =================================================
                            INVENTORY
                        ================================================== */}

                        <section>

                            <div className="mb-4">

                                <h3 className="text-sm font-bold text-slate-900">
                                    Inventory
                                </h3>

                                <p className="mt-1 text-xs text-slate-400">
                                    Manage available stock and product quantity.
                                </p>

                            </div>


                            <div className="grid gap-4 sm:grid-cols-3">

                                {/* Stock */}

                                <div>

                                    <label
                                        htmlFor="product-stock"
                                        className="mb-1.5 block text-xs font-semibold text-slate-700"
                                    >
                                        Stock

                                        <span className="ml-1 text-emerald-600">
                                            *
                                        </span>
                                    </label>

                                    <input
                                        id="product-stock"
                                        type="number"
                                        name="stock"
                                        min="0"
                                        placeholder="0"
                                        className="
                                            h-10 w-full
                                            rounded-xl
                                            border border-slate-200
                                            bg-white
                                            px-3
                                            text-sm text-slate-900
                                            outline-none
                                            transition
                                            focus:border-emerald-500
                                            focus:ring-2
                                            focus:ring-emerald-500/10
                                        "
                                        required
                                        value={formData.stock}
                                        onChange={handleChange}
                                    />

                                </div>


                                {/* Quantity */}

                                <div>

                                    <label
                                        htmlFor="product-quantity"
                                        className="mb-1.5 block text-xs font-semibold text-slate-700"
                                    >
                                        Quantity

                                        <span className="ml-1 text-emerald-600">
                                            *
                                        </span>
                                    </label>

                                    <input
                                        id="product-quantity"
                                        type="number"
                                        name="quantity"
                                        min="0"
                                        placeholder="0"
                                        className="
                                            h-10 w-full
                                            rounded-xl
                                            border border-slate-200
                                            bg-white
                                            px-3
                                            text-sm text-slate-900
                                            outline-none
                                            transition
                                            focus:border-emerald-500
                                            focus:ring-2
                                            focus:ring-emerald-500/10
                                        "
                                        required
                                        value={formData.quantity}
                                        onChange={handleChange}
                                    />

                                </div>


                                {/* Unit */}

                                <div>

                                    <label
                                        htmlFor="product-unit"
                                        className="mb-1.5 block text-xs font-semibold text-slate-700"
                                    >
                                        Unit

                                        <span className="ml-1 text-emerald-600">
                                            *
                                        </span>
                                    </label>

                                    <select
                                        id="product-unit"
                                        name="unit"
                                        className="
                                            h-10 w-full
                                            rounded-xl
                                            border border-slate-200
                                            bg-white
                                            px-3
                                            text-sm text-slate-700
                                            outline-none
                                            transition
                                            focus:border-emerald-500
                                            focus:ring-2
                                            focus:ring-emerald-500/10
                                        "
                                        required
                                        value={formData.unit}
                                        onChange={handleChange}
                                    >

                                        <option value="" disabled>
                                            Select unit
                                        </option>

                                        <option value="kg">
                                            kg
                                        </option>

                                        <option value="g">
                                            g
                                        </option>

                                        <option value="l">
                                            l
                                        </option>

                                        <option value="ml">
                                            ml
                                        </option>

                                        <option value="pack">
                                            pack
                                        </option>

                                        <option value="piece">
                                            piece
                                        </option>

                                    </select>

                                </div>

                            </div>

                        </section>


                        {/* =================================================
                            IMAGES
                        ================================================== */}

                        <section>

                            <div className="mb-4">

                                <h3 className="text-sm font-bold text-slate-900">
                                    Product Images
                                </h3>

                                <p className="mt-1 text-xs text-slate-400">
                                    Add images that will be displayed for this product.
                                </p>

                            </div>


                            {/* Image Grid */}

                            <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">

                                {imagePreview &&

                                    <div
                                        className="
                                        group relative
                                        aspect-square
                                        overflow-hidden
                                        rounded-xl
                                        border border-slate-200
                                        bg-slate-100
                                    "
                                    >

                                        <img
                                            src={imagePreview}
                                            alt="Preview Image"
                                            className="h-full w-full object-cover"
                                        />

                                        <button
                                            type="button"
                                            className="
                                            absolute right-2 top-2
                                            rounded-lg
                                            bg-white/95
                                            p-1.5
                                            text-slate-500
                                            shadow-sm
                                            opacity-0
                                            transition
                                            group-hover:opacity-100
                                            hover:bg-red-50
                                            hover:text-red-600
                                        "
                                            aria-label="Remove image"
                                            onClick={() => onDeleteImagePreview(imagePreview)}
                                        >
                                            <Trash2 size={14} />
                                        </button>

                                    </div>
                                }

                                {/* Add Image */}

                                <input
                                    type="file"
                                    id="product-image"
                                    name="image"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={handleImageChange}
                                />

                                <label
                                    htmlFor="product-image"
                                    className="
                                        flex aspect-square
                                        cursor-pointer
                                        flex-col
                                        items-center
                                        justify-center
                                        gap-2
                                        rounded-xl
                                        border border-dashed
                                        border-slate-300
                                        bg-slate-50
                                        text-slate-400
                                        transition
                                        hover:border-emerald-400
                                        hover:bg-emerald-50/50
                                        hover:text-emerald-600
                                    "
                                >

                                    <ImagePlus size={21} />

                                    <span className="text-[11px] font-semibold">
                                        Add Image
                                    </span>

                                </label>

                            </div>


                            {/* Browse Images */}

                            <div
                                className="
                                    mt-4
                                    flex flex-col
                                    items-center justify-center
                                    rounded-xl
                                    border border-dashed
                                    border-slate-300
                                    bg-slate-50
                                    px-5 py-7
                                    text-center
                                    transition
                                    hover:border-emerald-400
                                    hover:bg-emerald-50/30
                                "
                            >

                                <div
                                    className="
                                        flex h-10 w-10
                                        items-center justify-center
                                        rounded-xl
                                        bg-white
                                        text-slate-400
                                        shadow-sm
                                    "
                                >
                                    <ImagePlus size={19} />
                                </div>

                                <p className="mt-3 text-sm font-semibold text-slate-700">
                                    Add product images
                                </p>

                                <p className="mt-1 text-xs text-slate-400">
                                    Select images from your device.
                                </p>

                                <label
                                    htmlFor="product-image"
                                    className="
                                        mt-3
                                        cursor-pointer
                                        rounded-lg
                                        border border-slate-200
                                        bg-white
                                        px-3 py-1.5
                                        text-xs font-semibold
                                        text-slate-600
                                        shadow-sm
                                        transition
                                        hover:bg-slate-50
                                    "
                                >
                                    Browse Files
                                </label>

                            </div>

                        </section>


                        {/* =================================================
                            STATUS
                        ================================================== */}

                        <section>

                            <div className="mb-4">

                                <h3 className="text-sm font-bold text-slate-900">
                                    Status
                                </h3>

                                <p className="mt-1 text-xs text-slate-400">
                                    Control whether customers can see this product.
                                </p>

                            </div>

                            <div
                                className="
                                    flex items-center
                                    justify-between
                                    rounded-xl
                                    border border-slate-200
                                    bg-slate-50/50
                                    p-4
                                "
                            >

                                <div>

                                    <p className="text-sm font-semibold text-slate-800">
                                        {formData.isActive ? "Active Product" : "Inactive Product"}
                                    </p>

                                    <p className="mt-0.5 text-xs text-slate-400">
                                        {formData.isActive
                                            ? "Customers can view and purchase this product."
                                            : "Customers cannot view or purchase this product."
                                        }
                                    </p>

                                </div>


                                {/* Toggle placeholder */}
                                <button
                                    type="button"
                                    onClick={handleToggleStatus}
                                    className={`
                                                relative
                                                h-6 w-11
                                                shrink-0
                                                rounded-full
                                                transition
                                                ${formData.isActive ? "bg-emerald-600" : "bg-slate-300"}
                                            `}
                                    aria-label="Toggle product status"
                                >
                                    <span
                                        className={`
                                                    absolute
                                                    top-1
                                                    h-4 w-4
                                                    rounded-full
                                                    bg-white
                                                    shadow-sm
                                                    transition-all
                                                    ${formData.isActive ? "right-1" : "left-1"}
                                                `}
                                    />
                                </button>

                            </div>

                        </section>

                    </div>

                    <div
                        className="
                                flex shrink-0
                                items-center justify-end
                                gap-2
                                border-t border-slate-100
                                bg-white
                                px-5 py-4
                                sm:px-6
                            "
                    >

                        <button
                            type="button"
                            onClick={onClose}
                            className="
                                    inline-flex h-10
                                    items-center justify-center
                                    rounded-xl
                                    border border-slate-200
                                    bg-white
                                    px-4
                                    text-sm font-semibold
                                    text-slate-600
                                    transition
                                    hover:bg-slate-50
                                    hover:text-slate-800
                                "
                        >
                            Cancel
                        </button>


                        <button
                            type="submit"
                            className="
                                    inline-flex h-10
                                    items-center justify-center
                                    gap-2
                                    rounded-xl
                                    bg-emerald-600
                                    px-4
                                    text-sm font-semibold
                                    text-white
                                    shadow-sm
                                    transition
                                    hover:bg-emerald-700
                                    focus:outline-none
                                    focus:ring-2
                                    focus:ring-emerald-500/30
                                    focus:ring-offset-2
                                "
                                disabled={disabled}
                        >
                            <Save size={16} />
                            {disabled ? "Adding..." : "Add Product" }
                        </button>

                    </div>

                </form>


                {/* =====================================================
                    FOOTER
                ====================================================== */}

            </div>

        </div>
    );
};

export default AddProductModal;
