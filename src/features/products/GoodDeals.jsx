import { useSelector } from 'react-redux'
import { useGetProductsQuery } from '../../services/api/productsApi'
import Lottie from 'lottie-react'
import Aloading from '../../assets/animation/ALoading.json'

const WhatsAppIcon = () => (
  <svg className="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24">
    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.73-1.45L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.625 1.451 5.403.002 9.794-4.382 9.797-9.778.001-2.614-1.012-5.07-2.855-6.915C16.37 2.067 13.91 1.055 11.3 1.055 5.899 1.055 1.506 5.44 1.503 10.835c-.001 1.545.413 3.053 1.2 4.405l-.995 3.63 3.734-.976zM17.47 15.17c-.318-.16-1.88-.93-2.17-1.038-.29-.108-.5-.16-.71.16-.21.32-.8 1.03-1.02 1.24-.22.22-.44.24-.76.08-.318-.16-1.34-.49-2.55-1.58-.95-.85-1.59-1.9-1.78-2.22-.19-.32-.02-.49.14-.65.15-.15.32-.34.48-.52.16-.18.21-.3.32-.51.11-.21.05-.4-.03-.56-.08-.16-.71-1.7-.97-2.33-.25-.61-.51-.53-.71-.54-.19-.01-.4-.01-.61-.01-.21 0-.55.08-.84.38-.29.3-1.1 1.08-1.1 2.63 0 1.55 1.13 3.05 1.28 3.25.16.2 2.22 3.39 5.39 4.75.75.32 1.34.52 1.8.66.76.24 1.45.21 2 .13.61-.09 1.88-.77 2.15-1.47.27-.7.27-1.3.19-1.42-.08-.12-.29-.19-.61-.35z" />
  </svg>
)

const CATEGORY_FALLBACKS = {
  bijoux: [
    { _id: 'b1', name: "Reine d'Or", shortDescription: 'Bijou en or 24 carats', price: 20000, images: ['https://images.pexels.com/photos/6625939/pexels-photo-6625939.jpeg'] },
    { _id: 'b2', name: 'Reine du Sahel', shortDescription: 'Inspiration sahélienne', price: 20000, images: ['https://images.pexels.com/photos/6626907/pexels-photo-6626907.jpeg'] },
    { _id: 'b3', name: "Cœur d'Or Ancien", shortDescription: 'Bijou vintage restauré', price: 20000, images: ['https://images.pexels.com/photos/6625914/pexels-photo-6625914.jpeg'] },
    { _id: 'b4', name: 'Yérédon Mansa', shortDescription: 'Symbolique ancestrale', price: 20000, images: ['https://images.pexels.com/photos/6625885/pexels-photo-6625885.jpeg'] },
    { _id: 'b5', name: 'Wórowya', shortDescription: 'Design africain moderne', price: 20000, images: ['https://images.pexels.com/photos/6625956/pexels-photo-6625956.jpeg'] },
  ],
  'soin & sante': [
    { _id: 's1', name: 'Cordycep militaris', shortDescription: 'Boisson de bien-être premium', price: 75000, images: ['https://images.pexels.com/photos/3683074/pexels-photo-3683074.jpeg'] },
    { _id: 's2', name: 'Senteur', shortDescription: 'Brume fraîche et sensuelle', price: 3100, images: ['https://images.pexels.com/photos/965989/pexels-photo-965989.jpeg'] },
    { _id: 's3', name: 'Protège', shortDescription: 'Serviettes ultra-confortables', price: 3500, images: ['https://images.pexels.com/photos/3985338/pexels-photo-3985338.jpeg'] },
    { _id: 's4', name: 'Café Cordycep', shortDescription: 'Boisson énergisante naturelle', price: 20000, images: ['https://images.pexels.com/photos/4109744/pexels-photo-4109744.jpeg'] },
    { _id: 's5', name: "Huile d'Olive", shortDescription: 'Huile pressée à froid multi-usages', price: 20000, images: ['https://images.pexels.com/photos/3375997/pexels-photo-3375997.jpeg'] },
  ],
  'outils informatiques': [
    { _id: 'i1', name: 'MacBook Pro 14', shortDescription: 'Puce M3, 16Go RAM, 512Go SSD', price: 1200000, images: ['https://images.pexels.com/photos/18105/pexels-photo.jpg'] },
    { _id: 'i2', name: 'iPhone 15 Pro Max', shortDescription: 'Écran Super Retina, Titanium', price: 850000, images: ['https://images.pexels.com/photos/1482061/pexels-photo-1482061.jpeg'] },
    { _id: 'i3', name: 'Casque Bose QC45', shortDescription: 'Casque audio sans fil ANC', price: 250000, images: ['https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg'] },
    { _id: 'i4', name: 'Souris Logitech MX Master', shortDescription: 'Précision extrême ergonomique', price: 60000, images: ['https://images.pexels.com/photos/2115256/pexels-photo-2115256.jpeg'] },
    { _id: 'i5', name: 'Clavier Mécanique RGB', shortDescription: 'Switches tactiles et rétroéclairage', price: 90000, images: ['https://images.pexels.com/photos/3825527/pexels-photo-3825527.jpeg'] },
  ]
}

const GoodDeals = () => {
  const { selected: category } = useSelector((state) => state.category)
  const { data: products, isLoading } = useGetProductsQuery({ limit: 10, featured: true, category })

  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <Lottie animationData={Aloading} loop className="w-24" />
      </div>
    )
  }

  const currentCategory = category || 'bijoux'
  const backendProducts = Array.isArray(products) ? products : []
  const fallbackList = CATEGORY_FALLBACKS[currentCategory] || CATEGORY_FALLBACKS['bijoux']

  // Combine and deduplicate by name to guarantee at least 4-5 items in grid
  const combined = [...backendProducts]
  fallbackList.forEach((fb) => {
    if (!combined.some((item) => item.name.toLowerCase() === fb.name.toLowerCase())) {
      combined.push(fb)
    }
  })

  const displayProducts = combined.slice(0, 5)

  return (
    <section className="max-w-[95%] lg:max-w-6xl mx-auto py-10 px-4">
      {/* Premium Amber Strip Header */}
      <div className="bg-[#f0c14b] text-white py-3 px-5 rounded-t-2xl font-extrabold text-base md:text-lg flex items-center justify-between shadow-sm">
        <span className="uppercase tracking-wider">Meilleures Offres du Moment</span>
        <span className="bg-white/20 px-3 py-0.5 rounded-full text-xs font-semibold">Exclusif</span>
      </div>

      {/* Grid/Flex Layout: Horizontal scroll on mobile, grid on desktop */}
      <div className="bg-gray-50/50 p-4 border-x border-b border-gray-100 rounded-b-2xl shadow-inner">
        <div className="flex overflow-x-auto md:overflow-x-visible snap-x snap-mandatory md:snap-none no-scrollbar gap-4 md:grid md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 md:gap-3.5 pb-2 md:pb-0">
          {displayProducts.map((p) => (
            <div
              key={p._id}
              className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 border border-gray-100/90 flex flex-col justify-between h-[310px] p-2.5 relative group w-[185px] md:w-auto shrink-0 snap-start"
            >
              {/* Product Image */}
              <div className="h-36 overflow-hidden relative rounded-xl bg-gray-50/40 flex items-center justify-center p-2 mb-2">
                <img
                  src={p.images?.[0]}
                  alt={p.name}
                  className="max-h-full max-w-full object-contain transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute top-2 right-2 bg-amber-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm">
                  Offre
                </span>
              </div>

              {/* Product Info */}
              <div className="flex-grow flex flex-col justify-between px-1">
                <div>
                  <h3 className="font-bold text-gray-900 text-xs md:text-sm line-clamp-1 mb-0.5">{p.name}</h3>
                  <p className="text-gray-400 text-[10px] line-clamp-1 mb-1.5">{p.shortDescription}</p>
                </div>
                
                <div className="mb-2">
                  <p className="text-amber-600 font-extrabold text-xs md:text-sm">
                    {p.price?.toLocaleString('fr-FR')} FCFA
                  </p>
                </div>
              </div>

              {/* Dynamic WhatsApp CTA Button */}
              <button
                onClick={() => {
                  const message = encodeURIComponent(`Bonjour, je suis intéressé par le produit "${p.name}" au prix de ${p.price} FCFA. Pouvons-nous en discuter ?`)
                  window.open(`https://wa.me/2250000000000?text=${message}`, '_blank')
                }}
                className="w-full bg-[#25D366] hover:bg-[#20ba5a] active:scale-95 text-white text-[10px] md:text-xs font-extrabold py-2 px-2.5 rounded-xl flex items-center justify-center gap-1.5 shadow-sm transition-all duration-300 cursor-pointer"
              >
                <span>Discutez du prix</span>
                <WhatsAppIcon />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default GoodDeals
