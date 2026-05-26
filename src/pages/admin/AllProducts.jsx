import { useEffect, useState } from 'react'
import { useNavigate, useOutletContext } from 'react-router'
import Lottie from 'lottie-react'
import Aloading from '../../assets/animation/ALoading.json'
import Pagination from 'rc-pagination'
import 'rc-pagination/assets/index.css'
import toast from 'react-hot-toast'
import { FiSearch, FiRefreshCw, FiEdit, FiTrash2, FiPackage } from 'react-icons/fi'
import Swal from 'sweetalert2'
import {
  useGetProductsQuery,
  useDeleteProductMutation,
  useDeleteProductImageMutation,
} from '../../services/api/productsApi'

const AllProducts = () => {
  const navigate = useNavigate()
  const [isCollapsed] = useOutletContext()
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const pageSize = 20

  const { data: allProducts = [], isLoading, error } = useGetProductsQuery()
  const [deleteProduct] = useDeleteProductMutation()
  const [deleteProductImage] = useDeleteProductImageMutation()

  const normalizeString = (str) =>
    (str || '').normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase()

  const filteredProducts = searchTerm
    ? allProducts.filter((p) => normalizeString(p.name).includes(normalizeString(searchTerm)))
    : allProducts

  const startIdx = (currentPage - 1) * pageSize
  const currentItems = filteredProducts.slice(startIdx, startIdx + pageSize)

  useEffect(() => {
    const totalPages = Math.max(1, Math.ceil(filteredProducts.length / pageSize))
    if (currentPage > totalPages) setCurrentPage(totalPages)
  }, [filteredProducts.length, currentPage, pageSize])

  const handleEdit = (product) => {
    navigate(`/admin/edit-product/${product._id}`, { state: { product } })
  }

  const handleDelete = (product) => {
    Swal.fire({
      title: 'Voulez-vous supprimer ce produit?',
      text: 'Pas de chemin arrière après!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, je le supprime!',
      cancelButtonText: "J'annule",
    }).then(async (result) => {
      if (!result.isConfirmed) return
      const toastId = toast.loading('Suppression en cours...')
      try {
        // Delete images from Cloudinary via backend
        if (product.images?.length) {
          await Promise.allSettled(
            product.images.map((url) => deleteProductImage({ url }).unwrap())
          )
        }
        await deleteProduct(product._id).unwrap()
        toast.dismiss(toastId)
        toast.success('Produit supprimé avec succès 😊')
      } catch (err) {
        toast.dismiss(toastId)
        toast.error(err?.data?.message || 'Erreur lors de la suppression.')
      }
    })
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-amber-600">Erreur lors du chargement des produits</p>
      </div>
    )
  }

  return (
    <div className="h-full flex flex-col bg-gray-50">
      <div className="mb-4">
        <h1 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">Gestion des Produits</h1>
        <p className="text-gray-600">{filteredProducts.length} produits au total</p>
        <div className="w-12 h-0.5 bg-blue-600 rounded-full mt-2"></div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-3 md:p-6 mb-6">
        <div className={`flex flex-col ${isCollapsed ? 'sm:flex-row' : 'sm:flex-col lg:flex-row'} gap-2 md:gap-4`}>
          <div className="flex-1 relative">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Rechercher un produit..."
              className="w-full pl-10 pr-4 py-2 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="flex gap-2 md:gap-3">
            <button
              onClick={() => setCurrentPage(1)}
              className="bg-blue-600 flex-1 text-white px-1 md:px-6 py-2 md:py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <FiSearch className="text-lg" /> Rechercher
            </button>
            <button
              onClick={() => { setSearchTerm(''); setCurrentPage(1) }}
              className="border border-gray-300 flex-1 text-gray-700 px-1 md:px-6 py-2 md:py-3 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-1 md:gap-2 cursor-pointer"
            >
              <FiRefreshCw className="text-lg" />
              <span className="hidden lg:inline">Réinitialiser</span>
              <span className="inline lg:hidden">Réinit.</span>
            </button>
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center h-64">
          <Lottie animationData={Aloading} loop className="w-32" />
        </div>
      ) : currentItems.length > 0 ? (
        <div className={`grid grid-cols-2 ${isCollapsed ? 'sm:grid-cols-4' : 'sm:grid-cols-3'} lg:grid-cols-5 xl:grid-cols-6 gap-3 lg:gap-6 mb-8`}>
          {currentItems.map((product) => (
            <ProductCard key={product._id} product={product} onEdit={handleEdit} onDelete={handleDelete} />
          ))}
        </div>
      ) : (
        <EmptyState />
      )}

      <div className="w-full mt-auto">
        <div className="w-full flex justify-center">
          <Pagination
            current={currentPage}
            total={filteredProducts.length}
            pageSize={pageSize}
            onChange={setCurrentPage}
            showLessItems
            className="rc-pagination"
          />
        </div>
      </div>
    </div>
  )
}

const ProductCard = ({ product, onEdit, onDelete }) => (
  <div className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200">
    <div className="relative">
      <img
        src={product.images?.[0]}
        alt={product.name}
        className="w-full h-[100px] md:h-[120px] object-cover rounded-t-lg"
      />
    </div>
    <div className="py-2 flex flex-col justify-between px-3 min-h-[calc(100%-100px)] md:min-h-[calc(100%-120px)]">
      <h3 className="font-semibold text-gray-900 text-sm mb-1 line-clamp-2 capitalize">{product.name}</h3>
      <p className="text-lg font-bold text-blue-600 md:mb-2">{product.price} Fcfa</p>
      <div className="flex justify-between items-center">
        <button
          onClick={() => onEdit(product)}
          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer flex gap-1 items-center"
        >
          <span>Modifier</span> <FiEdit className="text-lg" />
        </button>
        <button
          onClick={() => onDelete(product)}
          className="p-2 text-amber-500 hover:bg-red-50 rounded-lg transition-colors cursor-pointer flex gap-1 items-center"
        >
          <span>Supprimer</span> <FiTrash2 className="text-lg" />
        </button>
      </div>
    </div>
  </div>
)

const EmptyState = () => (
  <div className="text-center py-12">
    <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
      <FiPackage className="text-3xl text-gray-400" />
    </div>
    <h3 className="text-lg font-semibold text-gray-900 mb-2">Aucun produit trouvé</h3>
    <p className="text-gray-600">Commencez par ajouter votre premier produit</p>
  </div>
)

export default AllProducts
