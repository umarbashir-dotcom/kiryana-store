import { Link } from 'react-router-dom'
import { categoryIcons } from "../utils/categoryIcons"


const CategoryLink = ({ category }) => {
  const Icon = categoryIcons[category.icon] || "Wheat" // fallback icon
  return (
    <Link to={category.slug} className="flex items-center gap-3 px-5 py-3 hover:bg-[#F6F8F4] text-sm font-medium">
      <Icon className="w-4 h-4" />
      {category.name}
    </Link>
  )
}

export default CategoryLink