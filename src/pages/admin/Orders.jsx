import { useState } from 'react'
import { format } from 'date-fns'
import { frCA } from 'date-fns/locale'
import { FaFilePdf } from 'react-icons/fa6'
import Lottie from 'lottie-react'
import Pagination from 'rc-pagination'
import toast from 'react-hot-toast'
import ZeroPurchase from '../../assets/animation/EmptyOrder.json'
import Aloading from '../../assets/animation/ALoading.json'
import { useGetOrdersQuery, useUpdateOrderStatusMutation } from '../../services/api/ordersApi'

const STATUS_OPTIONS = [
  { value: 'processing', label: 'En cours' },
  { value: 'shipped', label: 'Expédié' },
  { value: 'delivered', label: 'Livré' },
  { value: 'cancelled', label: 'Annulé' },
]

const formatNumberWithDots = (number) =>
  number?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')

const Orders = () => {
  const { data: allOrders = [], error, isLoading } = useGetOrdersQuery()
  const [updateOrderStatus] = useUpdateOrderStatusMutation()
  const [currentPage, setCurrentPage] = useState(1)
  const pageSize = 8

  const startIdx = (currentPage - 1) * pageSize
  const currentItems = allOrders.slice(startIdx, startIdx + pageSize)

  const changeState = async (e, id) => {
    try {
      await updateOrderStatus({ id, status: e.target.value }).unwrap()
      toast.success('Statut mis à jour ✅')
    } catch (err) {
      toast.error(err?.data?.message || 'Erreur lors de la mise à jour.')
    }
  }

  if (error) {
    return <div className="text-center py-12 text-amber-500">Erreur: Impossible de charger les commandes.</div>
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[25rem]">
        <Lottie animationData={Aloading} loop className="w-32" />
      </div>
    )
  }

  if (allOrders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center px-4">
        <Lottie animationData={ZeroPurchase} loop className="w-48 md:w-64" />
        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-2">Aucune commande trouvée</h3>
        <p className="text-gray-600 max-w-md">Il n'y a aucune commande dans le système pour le moment.</p>
      </div>
    )
  }

  return (
    <div className="space-y-5 h-full flex-col flex">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Toutes les commandes</h1>
        <p className="text-gray-600 mt-2">{allOrders.length} commandes au total</p>
        <div className="w-12 h-0.5 bg-blue-600 rounded-full mt-2"></div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gradient-to-br from-blue-600 to-blue-700 text-white">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider hidden lg:table-cell">Client</th>
                <th className="px-2 md:px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider hidden md:table-cell">Montant</th>
                <th className="px-2 md:px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Statut</th>
                <th className="px-2 md:px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Impression</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentItems.map((order) => (
                <tr key={order._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 hidden lg:table-cell capitalize">
                    {order.customer?.fullName ?? '—'}
                  </td>
                  <td className="px-2 md:px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {format(new Date(order.createdAt), 'dd/MM/yy', { locale: frCA })}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 hidden md:table-cell">
                    {formatNumberWithDots(order.totalAmount)} Fcfa
                  </td>
                  <td className="px-2 md:px-6 py-4 whitespace-nowrap">
                    <select
                      className={`cursor-pointer rounded-md p-2 outline-none text-[12px] md:text-[16px] border border-gray-300 ${order.status === 'delivered' ? 'bg-green-500 border-none text-white' : ''}`}
                      onChange={(e) => changeState(e, order._id)}
                      value={order.status}
                    >
                      {STATUS_OPTIONS.map((opt) => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                      ))}
                    </select>
                  </td>
                  <td className="px-2 md:px-6 py-4 whitespace-nowrap text-sm">
                    <button className="text-amber-500 hover:text-amber-600 transition-colors" title="Télécharger PDF">
                      <FaFilePdf className="text-2xl" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="w-full mt-auto">
        <div className="w-full flex justify-center">
          <Pagination
            current={currentPage}
            total={allOrders.length}
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

export default Orders
