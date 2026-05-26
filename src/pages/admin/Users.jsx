import { useState } from 'react'
import { format } from 'date-fns'
import { frCA } from 'date-fns/locale'
import { MdAdminPanelSettings, MdRemoveModerator } from 'react-icons/md'
import { FiUser, FiShield, FiMail, FiCalendar } from 'react-icons/fi'
import Lottie from 'lottie-react'
import toast from 'react-hot-toast'
import Pagination from 'rc-pagination'
import 'rc-pagination/assets/index.css'
import Aloading from '../../assets/animation/ALoading.json'
import ZeroPurchase from '../../assets/animation/EmptyOrder.json'
import { useGetUsersQuery, useUpdateUserRoleMutation } from '../../services/api/usersApi'

const ROLE_LABELS = {
  admin: 'Administrateur',
  seller: 'Vendeur',
  delivery: 'Livreur',
  user: 'Client',
}

const Users = () => {
  const { data: allUsers = [], error, isLoading } = useGetUsersQuery()
  const [updateUserRole] = useUpdateUserRoleMutation()
  const [currentPage, setCurrentPage] = useState(1)
  const pageSize = 15

  const startIdx = (currentPage - 1) * pageSize
  const currentItems = allUsers.slice(startIdx, startIdx + pageSize)

  const promoteToAdmin = async (id) => {
    try {
      await updateUserRole({ id, role: 'admin' }).unwrap()
      toast.success('Nouveau Administrateur Ajouté')
    } catch (err) {
      toast.error(err?.data?.message || 'Erreur lors de la mise à jour du rôle.')
    }
  }

  const demoteToUser = async (id) => {
    try {
      await updateUserRole({ id, role: 'user' }).unwrap()
      toast.error("Rôle d'Administrateur retiré ❌")
    } catch (err) {
      toast.error(err?.data?.message || 'Erreur lors de la mise à jour du rôle.')
    }
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-amber-600">Une erreur s'est produite lors de la récupération des données</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full">
      <div className="mb-6">
        <h1 className="text-xl md:text-2xl font-bold text-gray-900">Gestion des Utilisateurs</h1>
        <p className="text-gray-600 mt-2">
          {currentItems.length} {currentItems.length > 1 ? 'utilisateurs' : 'utilisateur'}
        </p>
        <div className="w-12 h-0.5 bg-blue-600 rounded-full mt-2"></div>
      </div>

      {isLoading && (
        <div className="flex items-center justify-center h-screen -mt-[20vh]">
          <Lottie animationData={Aloading} loop className="w-50" />
        </div>
      )}

      {!isLoading && currentItems.length === 0 && (
        <div className="flex flex-col items-center justify-center h-96 text-center">
          <Lottie animationData={ZeroPurchase} loop className="w-64 mb-4" />
          <h3 className="text-xl font-semibold text-gray-700 mb-2">Aucun utilisateur</h3>
          <p className="text-gray-500">Aucun utilisateur n'est enregistré pour le moment</p>
        </div>
      )}

      {!isLoading && currentItems.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-br from-blue-600 to-blue-700 border-b border-blue-500">
                <tr>
                  <th className="text-left text-xs uppercase p-2 lg:p-4 font-semibold text-white">Utilisateur</th>
                  <th className="text-left p-2 lg:p-4 font-semibold text-xs uppercase text-white hidden lg:table-cell">Email</th>
                  <th className="text-left p-2 lg:p-4 font-semibold text-xs uppercase text-white">Rôle</th>
                  <th className="text-left p-2 lg:p-4 font-semibold text-xs uppercase text-white hidden md:table-cell">Date</th>
                  <th className="text-left p-2 lg:p-4 font-semibold text-xs uppercase text-white">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {currentItems.map((user) => (
                  <tr key={user._id} className="transition-colors">
                    <td className="p-2 md:p-4">
                      <div className="flex items-center space-x-3">
                        <div className="hidden w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full lg:flex items-center justify-center">
                          <FiUser className="text-white text-lg" />
                        </div>
                        <div>
                          <p className="font-medium text-xs text-gray-900 capitalize">{user.fullName}</p>
                          <p className="text-xs text-gray-500 md:hidden">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-2 md:p-4 hidden lg:table-cell">
                      <div className="flex items-center space-x-2 text-xs text-gray-600">
                        <FiMail className="text-gray-400" />
                        <span>{user.email}</span>
                      </div>
                    </td>
                    <td className="p-2 md:p-4">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${user.role === 'admin' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>
                        <FiShield className="hidden md:block mr-1" />
                        <span className="block md:hidden uppercase">{user.role.slice(0, 2)}.</span>
                        <span className="hidden md:block">{ROLE_LABELS[user.role] ?? user.role}</span>
                      </span>
                    </td>
                    <td className="p-2 lg:p-4 hidden md:table-cell">
                      <div className="flex items-center space-x-2 text-gray-600">
                        <FiCalendar className="text-gray-400" />
                        <span>{format(new Date(user.createdAt), 'dd/MM/yy', { locale: frCA })}</span>
                      </div>
                    </td>
                    <td className="p-2 lg:p-4">
                      {user.role !== 'admin' ? (
                        <button
                          onClick={() => promoteToAdmin(user._id)}
                          className="flex items-center space-x-2 text-green-600 hover:text-green-700 transition-colors cursor-pointer"
                        >
                          <MdAdminPanelSettings className="text-xl" />
                          <span className="hidden sm:inline">Promouvoir</span>
                        </button>
                      ) : (
                        <button
                          onClick={() => demoteToUser(user._id)}
                          className="flex items-center space-x-2 text-amber-500 hover:text-amber-600 transition-colors cursor-pointer"
                        >
                          <MdRemoveModerator className="text-xl" />
                          <span className="hidden sm:inline">Rétrograder</span>
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <div className="w-full mt-auto pt-4">
        <div className="w-full flex justify-center">
          <Pagination
            current={currentPage}
            total={allUsers.length}
            pageSize={pageSize}
            onChange={setCurrentPage}
            showLessItems
            showTitle={false}
            className="rc-pagination"
          />
        </div>
      </div>
    </div>
  )
}

export default Users
