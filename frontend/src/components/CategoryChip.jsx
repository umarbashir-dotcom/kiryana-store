import { NavLink } from "react-router-dom"
import { categoryIcons } from "../utils/categoryIcons"

const CategoryChip = ({ category }) => {
    const Icon = categoryIcons[category.icon] || "Wheat" // fallback icon

    return (
        <NavLink
            to={`/${category.slug}`}
            className={({ isActive }) =>
                `snap-start shrink-0 flex items-center gap-2 pl-2 pr-4 py-2 rounded-full border transition-all duration-200 ${
                    isActive
                        ? "bg-[#1F6F4A] text-white border-[#1F6F4A] shadow-sm"
                        : "bg-white text-[#22281F] border-[#22281F]/10 hover:border-[#1F6F4A]"
                }`
            }
        >
            {({ isActive }) => (
                <>
                    <span
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-base ${
                            isActive ? "bg-white/15" : "bg-[#F6F8F4]"
                        }`}
                    >
                        <Icon className="w-4 h-4" />
                    </span>

                    <span className="text-sm font-medium">
                        {category.name}
                    </span>
                </>
            )}
        </NavLink>
    )
}

export default CategoryChip