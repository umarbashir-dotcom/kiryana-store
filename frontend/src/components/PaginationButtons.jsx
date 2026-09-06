import { ChevronLeft, ChevronRight} from "lucide-react"

const PaginationButtons = ({totalPages, currentPage, onNext, onPrev, moveToPage, }) => {
    
    let page = 1
    let pages = []
    while (page <= totalPages){
        pages.push(page)
        page += 1
    }
    console.log("pagination pages rendered when products loaded")

    return (
        <div className="flex items-center gap-1">

            <button
                type="button"
                className="
                        flex h-8 w-8
                        items-center justify-center
                        rounded-lg
                        border border-slate-200
                        text-slate-400
                        transition
                        hover:bg-slate-50
                    "
                aria-label="Previous page"
                disabled={currentPage === 1}
                onClick={onPrev}
            >
                <ChevronLeft size={16} />
            </button>

            {pages.map(page => (
                <button
                type="button"
                className={page === currentPage ? 
                    "flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-600 text-xs font-semibold text-white"
                    : "flex h-8 w-8 items-center justify-center rounded-lg text-xs font-medium text-slate-600 transition hover:bg-slate-100"
                }
                onClick={() => moveToPage(page)} 
                key={page}
                >
                {page}
            </button>
            ))}

            <button
                type="button"
                className="
                        flex h-8 w-8
                        items-center justify-center
                        rounded-lg
                        border border-slate-200
                        text-slate-500
                        transition
                        hover:bg-slate-50
                    "
                aria-label="Next page"
                disabled={currentPage === totalPages}
                onClick={onNext}
            >
                <ChevronRight size={16} />
            </button>

        </div>

    )
}

export default PaginationButtons