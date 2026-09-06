import { useEffect, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Link } from 'react-router-dom'

/*
|--------------------------------------------------------------------------
| Hero Slides
|--------------------------------------------------------------------------
| Keep all promotional banners inside this array.
| Every slide automatically receives the exact same responsive dimensions.
*/

const heroSlides = [
    {
        image: '/images/hero-images/vegetable-with-number1.png',
        // link: '/shop',
        alt: 'Fresh vegetables and grocery delivery',
    },
    {
        image: '/images/hero-images/633041802_KeryanaStore-HunzaJams.jpg',
        // link: '/category/rice-grains',
        alt: 'Hunza jams grocery promotion',
    },
    {
        image: '/images/hero-images/garmi-ka-tor.webp',
        // link: '/category/household-supplies',
        alt: 'Household supplies promotion',
    },
]

const AUTOPLAY_INTERVAL = 5000
const RESUME_AFTER_INTERACTION = 4000

const Hero = () => {
    const [activeIndex, setActiveIndex] = useState(0)
    const [isPaused, setIsPaused] = useState(false)

    /*
    |--------------------------------------------------------------------------
    | Change slide
    |--------------------------------------------------------------------------
    */
    const changeSlide = (index) => {
        setActiveIndex(
            (index + heroSlides.length) % heroSlides.length
        )
    }

    /*
    |--------------------------------------------------------------------------
    | Pause autoplay temporarily after manual interaction
    |--------------------------------------------------------------------------
    */
    const pauseAfterInteraction = () => {
        setIsPaused(true)

        window.setTimeout(() => {
            setIsPaused(false)
        }, RESUME_AFTER_INTERACTION)
    }

    /*
    |--------------------------------------------------------------------------
    | Automatic slideshow
    |--------------------------------------------------------------------------
    */
    useEffect(() => {
        if (isPaused) return

        const timer = window.setInterval(() => {
            setActiveIndex((current) => {
                return (current + 1) % heroSlides.length
            })
        }, AUTOPLAY_INTERVAL)

        return () => window.clearInterval(timer)
    }, [isPaused])

    /*
    |--------------------------------------------------------------------------
    | Keyboard navigation
    |--------------------------------------------------------------------------
    */
    useEffect(() => {
        const handleKeyboard = (event) => {
            if (event.key === 'ArrowLeft') {
                changeSlide(activeIndex - 1)
            }

            if (event.key === 'ArrowRight') {
                changeSlide(activeIndex + 1)
            }
        }

        window.addEventListener('keydown', handleKeyboard)

        return () => {
            window.removeEventListener('keydown', handleKeyboard)
        }
    }, [activeIndex])

    return (
        <section
            className="
                relative
                w-full
                mt-4
                overflow-hidden
                rounded-2xl
                bg-transparent
                isolation-isolate
            "
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
        >

            {/* =========================================================
                CAROUSEL VIEWPORT
                ========================================================= */}

            <div
                className="
                    relative
                    w-full
                    aspect-[16/9]
                    sm:aspect-[21/9]
                    lg:aspect-[3/1]
                    overflow-hidden
                    bg-transparent
                "
            >

                {/* =====================================================
                    SLIDE TRACK
                    ===================================================== */}

                <div
                    className="
                        absolute
                        inset-0
                        flex
                        w-full
                        h-full
                        transition-transform
                        duration-500
                        ease-out
                    "
                    style={{
                        transform: `translate3d(-${activeIndex * 100}%, 0, 0)`,
                    }}
                >

                    {heroSlides.map((slide, index) => (
                        <div
                            key={slide.image}
                            className="
                                relative
                                shrink-0
                                w-full
                                h-full
                                overflow-hidden
                                bg-transparent
                            "
                        >

                            {slide.link ? (
                                <Link
                                    to={slide.link}
                                    className="
                                        block
                                        w-full
                                        h-full
                                        cursor-pointer
                                    "
                                    aria-label={slide.alt}
                                >
                                    <img
                                        src={slide.image}
                                        alt={slide.alt}
                                        draggable="false"
                                        className="
                                            block
                                            w-full
                                            h-full
                                            object-fill
                                            select-none
                                        "
                                    />
                                </Link>
                            ) : (
                                <img
                                    src={slide.image}
                                    alt={slide.alt}
                                    draggable="false"
                                    className="
                                        block
                                        w-full
                                        h-full
                                        object-fill
                                        select-none
                                    "
                                />
                            )}

                        </div>
                    ))}

                </div>
            </div>

            {/* =========================================================
                PREVIOUS BUTTON
                ========================================================= */}

            <button
                type="button"
                aria-label="Previous slide"
                onClick={() => {
                    changeSlide(activeIndex - 1)
                    pauseAfterInteraction()
                }}
                className="
                    group
                    absolute
                    left-2
                    sm:left-3
                    top-1/2
                    z-20
                    flex
                    -translate-y-1/2
                    items-center
                    justify-center
                    rounded-full
                    p-1
                    sm:p-1.5
                    transition
                "
            >
                <ChevronLeft
                    className="
                        h-6
                        w-6
                        text-white
                        drop-shadow-[0_2px_4px_rgba(0,0,0,0.75)]
                        transition-transform
                        duration-200
                        group-hover:-translate-x-0.5
                        sm:h-7
                        sm:w-7
                    "
                    strokeWidth={2.5}
                />
            </button>

            {/* =========================================================
                NEXT BUTTON
                ========================================================= */}

            <button
                type="button"
                aria-label="Next slide"
                onClick={() => {
                    changeSlide(activeIndex + 1)
                    pauseAfterInteraction()
                }}
                className="
                    group
                    absolute
                    right-2
                    sm:right-3
                    top-1/2
                    z-20
                    flex
                    -translate-y-1/2
                    items-center
                    justify-center
                    rounded-full
                    p-1
                    sm:p-1.5
                    transition
                "
            >
                <ChevronRight
                    className="
                        h-6
                        w-6
                        text-white
                        drop-shadow-[0_2px_4px_rgba(0,0,0,0.75)]
                        transition-transform
                        duration-200
                        group-hover:translate-x-0.5
                        sm:h-7
                        sm:w-7
                    "
                    strokeWidth={2.5}
                />
            </button>

            {/* =========================================================
                SLIDE INDICATORS
                ========================================================= */}

            <div
                className="
                    absolute
                    bottom-3
                    left-1/2
                    z-20
                    flex
                    -translate-x-1/2
                    items-center
                    gap-2
                "
            >
                {heroSlides.map((_, index) => {
                    const isActive = index === activeIndex

                    return (
                        <button
                            key={index}
                            type="button"
                            aria-label={`Go to slide ${index + 1}`}
                            aria-current={isActive ? 'true' : undefined}
                            onClick={() => {
                                changeSlide(index)
                                pauseAfterInteraction()
                            }}
                            className={`
                                rounded-full
                                transition-all
                                duration-300
                                shadow-[0_1px_4px_rgba(0,0,0,0.55)]
                                ${
                                    isActive
                                        ? 'h-2 w-6 bg-white'
                                        : 'h-2 w-2 bg-white/70 hover:bg-white'
                                }
                            `}
                        />
                    )
                })}
            </div>

        </section>
    )
}

export default Hero

// import React from 'react'

// const Hero = () => {
//     return (
//         <section className="mt-4 rounded-2xl bg-gradient-to-br from-[#1F6F4A] to-[#154A32] overflow-hidden relative">
//             <div className="px-6 py-8 lg:px-12 lg:py-14 max-w-md">
//                 <span className="inline-block px-3 py-1 rounded-full bg-[#E8A33D] text-[#22281F] text-xs font-semibold mb-3">
//                     Taaza Stock, Har Roz
//                 </span>
//                 <h1 className="font-['Fraunces'] text-3xl lg:text-4xl font-semibold text-white leading-tight">
//                     Your kiryana, delivered today
//                 </h1>
//                 <p className="mt-2 text-white/80 text-sm lg:text-base">
//                     Rice, atta, masale aur roz-marra ka saaman — ghar baithe order karein.
//                 </p>
//                 <button type="button" className="mt-5 px-6 py-2.5 rounded-full bg-[#E8A33D] text-[#22281F] font-medium text-sm hover:brightness-95">
//                     Shop Now
//                 </button>
//             </div>
//         </section>
//     )
// }

// export default Hero