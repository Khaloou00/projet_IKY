import { useParams } from 'react-router'
import { useGetProductByIdQuery } from '../services/api/productsApi'
import Lottie from 'lottie-react'
import Aloading from '../assets/animation/ALoading.json'

const Product = () => {
  const { id } = useParams()
  const { data: product, isLoading } = useGetProductByIdQuery(id)

  if (isLoading) return <div className="flex justify-center py-20"><Lottie animationData={Aloading} loop className="w-24" /></div>

  return (
    <div className="min-h-screen max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-4 capitalize">{product?.name}</h1>
      <p className="text-gray-500">Détail produit — à implémenter (Phase 2)</p>
    </div>
  )
}

export default Product
