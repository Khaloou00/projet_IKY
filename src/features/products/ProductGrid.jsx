import { useSelector } from 'react-redux'
import { useGetProductsQuery } from '../../services/api/productsApi'
import Lottie from 'lottie-react'
import Aloading from '../../assets/animation/ALoading.json'
import NOFOUND from '../../assets/animation/NOFOUND.json'

const ProductGrid = ({ filters = {} }) => {
  const { selected: category } = useSelector((state) => state.category)

  // Extraire les sous-catégories (groupes) et sous-catégories niveau 2 (valeurs) sélectionnées
  const subCategory = []
  const subCategoryLevel2 = []

  Object.values(filters).forEach((filter) => {
    if (filter.group) {
      subCategory.push(filter.group)
    }
    if (filter.value) {
      subCategoryLevel2.push(filter.value)
    }
  })

  const queryParams = { category }
  if (subCategory.length > 0) {
    queryParams.subCategory = [...new Set(subCategory)]
  }
  if (subCategoryLevel2.length > 0) {
    queryParams.subCategoryLevel2 = subCategoryLevel2
  }

  const { data: products = [], isLoading } = useGetProductsQuery(queryParams)

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Lottie animationData={Aloading} loop className="w-24" />
      </div>
    )
  }

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <Lottie animationData={NOFOUND} loop className="w-40" />
        <p className="text-gray-500 mt-4">Aucun produit trouvé dans cette catégorie.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      {products.map((product) => (
        <div key={product._id} className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <img src={product.images?.[0]} alt={product.name} className="w-full h-40 object-cover rounded-t-xl" />
          <div className="p-3">
            <h3 className="font-semibold text-gray-800 text-sm capitalize line-clamp-2">{product.name}</h3>
            <p className="text-amber-600 font-bold mt-1">{product.price?.toLocaleString('fr-FR')} FCFA</p>
            <button className="w-full mt-2 bg-amber-500 hover:bg-amber-600 text-white text-xs font-medium py-1.5 rounded-lg transition-colors">
              Voir le produit
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default ProductGrid
