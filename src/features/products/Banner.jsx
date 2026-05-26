import { useDispatch, useSelector } from 'react-redux'
import { setCategory } from './categorySlice'

const BANNER_IMAGES = [
  { category: 'bijoux', image: 'https://images.pexels.com/photos/6387695/pexels-photo-6387695.jpeg' },
  { category: 'soin & sante', image: 'https://images.pexels.com/photos/6560252/pexels-photo-6560252.jpeg' },
  { category: 'outils informatiques', image: 'https://images.pexels.com/photos/27742571/pexels-photo-27742571.jpeg' },
]

const Banner = () => {
  const dispatch = useDispatch()
  const { selected: category } = useSelector((state) => state.category)
  const currentBanner = BANNER_IMAGES.find((item) => item.category === category)

  return (
    <div
      className="h-[340px] md:h-[500px] w-full relative before:absolute before:inset-0 before:bg-black/45 transition-all duration-500"
      style={{ backgroundImage: `url(${currentBanner?.image})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}
    >
      {/* Premium Content Overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 pt-[104px] lg:pt-[72px] pb-16">
        <h1 className="text-white text-3xl md:text-5xl font-extrabold tracking-tight mb-2 uppercase drop-shadow-md transition-all duration-300">
          {category === 'bijoux' ? 'Élégance Royale' : category === 'soin & sante' ? 'Soin & Bien-être' : 'Technologie Innovante'}
        </h1>
        <p className="text-white/90 text-sm md:text-base max-w-md drop-shadow-sm font-medium transition-all duration-300">
          Découvrez notre collection exclusive sélectionnée avec le plus grand soin.
        </p>
      </div>

      {/* Category Pills Navigation (Bottom Sticky) */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center w-full">
        <div className="flex items-center gap-3 px-4 max-w-full overflow-x-auto no-scrollbar pb-1">
          {BANNER_IMAGES.map((item) => (
            <button
              key={item.category}
              onClick={() => dispatch(setCategory(item.category))}
              className={`whitespace-nowrap px-5 py-2.5 rounded-full border text-xs md:text-sm font-semibold transition-all duration-300 cursor-pointer ${
                category === item.category
                  ? 'bg-amber-500 border-amber-500 text-white scale-105 shadow-lg shadow-amber-500/20'
                  : 'bg-black/40 border-white/20 text-white backdrop-blur-sm hover:bg-black/60'
              }`}
            >
              {item.category}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Banner
