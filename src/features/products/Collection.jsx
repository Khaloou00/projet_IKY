import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router'
import { setCategory } from './categorySlice'
import { HiArrowRight } from 'react-icons/hi'

const DYNAMIC_COLLECTIONS = {
  bijoux: [
    {
      id: 'b_col1',
      text: "Découvrez notre collection complète de bracelets, boucles d'oreilles et bagues - un univers où l'élégance rencontre l'héritage. ✨",
      image: "https://images.pexels.com/photos/6625920/pexels-photo-6625920.jpeg",
      title: "Élégance & Héritage"
    },
    {
      id: 'b_col2',
      text: "Plongez dans l'art du bijou avec nos créations inspirées - bracelets, bagues, boucles d'oreilles : un éclat de tradition, une touche de modernité. 🌍💛",
      image: "https://images.pexels.com/photos/6625914/pexels-photo-6625914.jpeg",
      title: "Tradition & Modernité"
    },
    {
      id: 'b_col3',
      text: "Chaque bracelet est une histoire. D'inspiration africaine, forgés pour transmettre force, beauté et mémoire.",
      image: "https://res.cloudinary.com/db0kizjvf/image/upload/v1778878549/superbienv/xbcrfsvaqake97jipenh.jpg",
      title: "Force & Mémoire"
    }
  ],
  'soin & sante': [
    {
      id: 's_col1',
      text: "Boissons et compléments alimentaires naturels à base de plantes pour revitaliser votre corps.",
      image: "https://images.pexels.com/photos/3683074/pexels-photo-3683074.jpeg",
      title: "Vitalité Naturelle"
    },
    {
      id: 's_col2',
      text: "Plongez dans l'art des huiles essentielles et des parfums pour éveiller vos sens au quotidien.",
      image: "https://images.pexels.com/photos/965989/pexels-photo-965989.jpeg",
      title: "Éveil des Sens"
    },
    {
      id: 's_col3',
      text: "Crèmes de protection et de soin corporel pour une peau souple, hydratée et éclatante.",
      image: "https://images.pexels.com/photos/3985338/pexels-photo-3985338.jpeg",
      title: "Soin Protecteur"
    }
  ],
  'outils informatiques': [
    {
      id: 'i_col1',
      text: "Laptops ultra-performants de dernière génération pour propulser votre productivité au sommet.",
      image: "https://images.pexels.com/photos/18105/pexels-photo.jpg",
      title: "Haute Performance"
    },
    {
      id: 'i_col2',
      text: "Smartphones haut de gamme et écrans fluides pour rester connecté avec vos proches avec style.",
      image: "https://images.pexels.com/photos/1482061/pexels-photo-1482061.jpeg",
      title: "Connectivité Fluide"
    },
    {
      id: 'i_col3',
      text: "Accessoires audio de pointe et souris ergonomiques pour un confort acoustique et de travail absolu.",
      image: "https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg",
      title: "Confort & Précision"
    }
  ]
}

const Collection = () => {
  const { selected: category } = useSelector((state) => state.category)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const currentCategory = category || 'bijoux'
  const collectionsList = DYNAMIC_COLLECTIONS[currentCategory] || DYNAMIC_COLLECTIONS['bijoux']

  const handleDiscover = () => {
    navigate('/boutique')
  }

  // Category specific styles for premium glassmorphism
  const getCategoryStyles = () => {
    switch (currentCategory) {
      case 'soin & sante':
        return {
          cardBg: 'bg-zinc-950/90 backdrop-blur-md border-emerald-500/25 hover:border-emerald-400/50 hover:bg-zinc-950/95',
          labelColor: 'text-emerald-400',
          btnColor: 'text-emerald-400',
          labelText: 'Soin & Santé',
          glowColor: 'bg-emerald-500/40'
        }
      case 'outils informatiques':
        return {
          cardBg: 'bg-zinc-950/90 backdrop-blur-md border-blue-500/25 hover:border-blue-400/50 hover:bg-zinc-950/95',
          labelColor: 'text-blue-400',
          btnColor: 'text-blue-400',
          labelText: 'High Tech',
          glowColor: 'bg-blue-500/40'
        }
      case 'bijoux':
      default:
        return {
          cardBg: 'bg-zinc-950/90 backdrop-blur-md border-amber-500/25 hover:border-amber-400/50 hover:bg-zinc-950/95',
          labelColor: 'text-amber-400',
          btnColor: 'text-amber-400',
          labelText: 'Joaillerie',
          glowColor: 'bg-amber-500/40'
        }
    }
  }

  const styles = getCategoryStyles()

  return (
    <section className="max-w-[95%] lg:max-w-6xl mx-auto py-12 px-4">
      {/* Title */}
      <h2 className="text-center text-2xl md:text-4xl font-extrabold text-gray-900 mb-2 tracking-tight">
        Nos Collections
      </h2>
      <p className="text-center text-gray-500 text-sm md:text-base max-w-md mx-auto mb-10">
        Découvrez nos sélections thématiques conçues pour inspirer votre style de vie.
      </p>

      {/* Dynamic 3D Pop-out Transparent Grid: Horizontal scroll on mobile, grid on desktop */}
      <div className="flex overflow-x-auto md:overflow-x-visible snap-x snap-mandatory md:snap-none no-scrollbar gap-4 md:grid md:grid-cols-3 md:gap-6 pb-2 md:pb-0">
        {collectionsList.map((c) => (
          <div
            key={c.id}
            onClick={handleDiscover}
            className={`relative h-64 md:h-72 border rounded-3xl p-6 overflow-hidden flex flex-col justify-between group shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 cursor-pointer w-[280px] md:w-auto shrink-0 snap-start ${styles.cardBg}`}
          >
            {/* Top Light Accent */}
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />

            {/* Background Texture Card Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-40 group-hover:opacity-75 transition-opacity duration-300" />

            {/* Left Content (Text) */}
            <div className="z-10 flex flex-col justify-between h-full w-[62%]">
              <div>
                <span className={`text-[10px] md:text-xs font-extrabold uppercase tracking-wider block mb-2 ${styles.labelColor}`}>
                  Collection {styles.labelText}
                </span>
                <p className="text-white text-xs md:text-sm leading-relaxed font-semibold font-sans line-clamp-6">
                  {c.text}
                </p>
              </div>

              <div className={`flex items-center gap-1.5 font-bold text-xs uppercase tracking-wider group/btn mt-4 ${styles.btnColor}`}>
                Découvrir
                <HiArrowRight className="text-sm transition-transform duration-300 group-hover/btn:translate-x-1" />
              </div>
            </div>

            {/* Soft Themed Blurry Glow behind the image frame (matching the header's aesthetic) */}
            <div className={`absolute -right-8 -bottom-8 w-40 h-40 ${styles.glowColor} rounded-full blur-3xl pointer-events-none z-0`} />

            {/* Right Glassmorphic Framed Product Image */}
            <div className="absolute -right-3 -bottom-3 w-32 h-32 md:w-40 md:h-40 p-1.5 rounded-3xl bg-white/5 backdrop-blur-md border border-white/10 shadow-2xl transition-all duration-500 group-hover:scale-105 group-hover:rotate-3 overflow-hidden z-10 select-none pointer-events-none">
              <div className={`absolute inset-0 ${styles.glowColor} opacity-40 blur-md z-0`} />
              <img
                src={c.image}
                alt={c.title}
                className="w-full h-full object-cover rounded-2xl z-10 relative"
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Collection
