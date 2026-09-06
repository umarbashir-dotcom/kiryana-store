import {
    X,
    Upload,
    ImagePlus,
    Trash2,
    Save,
} from "lucide-react";
import { useState, useEffect, useContext } from "react";
import { CategoriesContext } from "../../context/CategoriesContext"
import { ProductsContext } from "../../context/ProductsContext";
import imageCompression from "browser-image-compression";
import { toast } from "sonner";

const EditProductModal = ({ product, onClose }) => {
    const { updateProduct } = useContext(ProductsContext)
    const [ disabled, setDisabled ] = useState(false)

    const [image, setImage] = useState(null)
    const [imagesPreview, setImagesPreview] = useState([])
    const [existingImages, setExistingImages] = useState(product.images)
    
    const { categories } = useContext(CategoriesContext)
    const [formData, setFormData] = useState({
        name: product.name, unit: product.unit, quantity: product.quantity, price: product.price, discount: product.discount, stock: product.stock, category: product.category._id,
        slug: product.slug, description: product.description, isActive: product.isActive
    })

    // handle toggle status
    const handleToggleStatus = () => setFormData(prev => ({ ...prev, isActive: !formData.isActive }))

    const handleChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    // handle image change/ selection
    const handleImageChange = async (e) => {
        console.log("handle image change of edit called")
        const selectedImage = e.target.files[0]
        console.log(selectedImage)
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
        setImagesPreview(prev => [...prev, URL.createObjectURL(selectedImage)])
    }

    // on delete existing image
    const onDeleteExistingImage = (deleteImg) => {
        setExistingImages(prev => prev.filter(img => img.url !== deleteImg.url))
    }

    // on delete  image preview
    const onDeleteImagePreview = (deleteImg) => {
        console.log(deleteImg)
        setImagesPreview(prev => prev.filter(img => img.name !== deleteImg.name))
    }

    // onSave 
    const handleSave = async () => {
        const data = new FormData()

        Object.entries(formData).forEach(([key, value]) => data.append(key, value))

        data.append("images", JSON.stringify(existingImages))

        if (image) {
            data.append("image", image)
        }

        try{
            setDisabled(true)
            await updateProduct(product._id, data)
            toast.success("Product updated successfully")
        } catch(err){
            toast.error("Failed to update product",
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
                            Edit Product
                        </h2>

                        <p className="mt-0.5 text-xs text-slate-500">
                            Update product information, pricing and inventory.
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
                <div className="overflow-y-auto">

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

                                    <label className="mb-1.5 block text-xs font-semibold text-slate-700">
                                        Product Name
                                        <span className="ml-1 text-emerald-600">
                                            *
                                        </span>
                                    </label>

                                    <input
                                        type="text"
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
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                    />

                                </div>

                                {/* Category */}
                                <div>

                                    <label className="mb-1.5 block text-xs font-semibold text-slate-700">
                                        Category
                                        <span className="ml-1 text-emerald-600">
                                            *
                                        </span>
                                    </label>

                                    <select
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
                                        name="category"
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

                                    <label className="mb-1.5 block text-xs font-semibold text-slate-700">
                                        Slug
                                    </label>

                                    <input
                                        type="text"
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
                                        name="slug"
                                        value={formData.slug}
                                        onChange={handleChange}
                                    />

                                    <p className="mt-1.5 text-[11px] text-slate-400">
                                        Used for the product's public URL.
                                    </p>

                                </div>


                                {/* Description */}
                                <div>

                                    <label className="mb-1.5 block text-xs font-semibold text-slate-700">
                                        Description
                                    </label>

                                    <textarea
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
                                        name="description"
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

                                    <label className="mb-1.5 block text-xs font-semibold text-slate-700">
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
                                            type="number"
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
                                            name="price"
                                            value={formData.price}
                                            onChange={handleChange}
                                        />

                                    </div>

                                </div>


                                {/* Discount */}
                                <div>

                                    <label className="mb-1.5 block text-xs font-semibold text-slate-700">
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
                                            type="number"
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
                                            name="discount"
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

                                    <label className="mb-1.5 block text-xs font-semibold text-slate-700">
                                        Stock
                                        <span className="ml-1 text-emerald-600">
                                            *
                                        </span>
                                    </label>

                                    <input
                                        type="number"
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
                                        name="stock"
                                        value={formData.stock}
                                        onChange={handleChange}
                                    />

                                </div>


                                {/* Quantity */}
                                <div>

                                    <label className="mb-1.5 block text-xs font-semibold text-slate-700">
                                        Quantity
                                        <span className="ml-1 text-emerald-600">
                                            *
                                        </span>
                                    </label>

                                    <input
                                        type="number"
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
                                        name="quantity"
                                        value={formData.quantity}
                                        onChange={handleChange}
                                    />

                                </div>


                                {/* Unit */}
                                <div>

                                    <label className="mb-1.5 block text-xs font-semibold text-slate-700">
                                        Unit
                                        <span className="ml-1 text-emerald-600">
                                            *
                                        </span>
                                    </label>

                                    <select
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
                                        name="unit"
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
                                    Manage the images displayed for this product.
                                </p>
                            </div>


                            {/* Existing Images */}
                            <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">

                                {/* Image 1 */}
                                {existingImages.map(img => (
                                    <div
                                        className="
                                        group relative
                                        aspect-square
                                        overflow-hidden
                                        rounded-xl
                                        border border-slate-200
                                        bg-slate-100
                                    "
                                        key={img.url}
                                    >

                                        <img
                                            src={img.url}
                                            alt="Product"
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
                                            onClick={() => onDeleteExistingImage(img)}
                                        >
                                            <Trash2 size={14} />
                                        </button>

                                    </div>
                                ))}

                                {/* Add Image */}

                                {imagesPreview.length > 0 && 
                                
                                imagesPreview.map(imagePreview => (
                                    <div
                                    className="
                                        group relative
                                        aspect-square
                                        overflow-hidden
                                        rounded-xl
                                        border border-slate-200
                                        bg-slate-100
                                    "
                                    key={imagePreview}
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
                                )) }
                                <input
                                    type="file"
                                    id="product-image"
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


                            {/* Upload Area */}
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
                                    <Upload size={19} />
                                </div>

                                <p className="mt-3 text-sm font-semibold text-slate-700">
                                    Upload new images
                                </p>

                                <p className="mt-1 text-xs text-slate-400">
                                    Drag and drop images here or browse from your device.
                                </p>

                                <button
                                    type="button"
                                    className="
                                        mt-3
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
                                </button>

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

                </div>


                {/* =====================================================
                    FOOTER
                ====================================================== */}
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
                        type="button"
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
                        onClick={handleSave}
                        disabled={disabled}
                    >
                        <Save size={16} />
                        { disabled ? "Saving Changes..." : "Save Changes" }
                    </button>

                </div>

            </div>

        </div>
    );
};

export default EditProductModal;

