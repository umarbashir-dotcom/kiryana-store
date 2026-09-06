import { useContext } from "react"
import { CategoriesContext } from "../context/CategoriesContext"
import CategoryChip from "./CategoryChip"

const CategoryChips = ({ className = "" }) => {
    const { categories } = useContext(CategoriesContext)

    return (
        <section className={`mt-6 ${className}`}>
            <div className="flex gap-3 overflow-x-auto pb-2 snap-x snap-mandatory scrollbar-hide">
                {categories.map(category => (
                    <CategoryChip
                        key={category._id}
                        category={category}
                    />
                ))}
            </div>
        </section>
    )
}

export default CategoryChips