import { Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { getMonth } from 'date-fns'
import { IoIosWarning } from 'react-icons/io'
import Lottie from 'lottie-react'
import { useOutletContext } from 'react-router'
import { useGetOrdersQuery } from '../../services/api/ordersApi'
import Aloading from '../../assets/animation/ALoading.json'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const months = [
  'Janvier','Février','Mars','Avril','Mai','Juin',
  'Juillet','Août','Septembre','Octobre','Novembre','Décembre',
]

const formatNumber = (num) =>
  num?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')

const DashboardAdmin = () => {
  const [isCollapsed] = useOutletContext()
  const { data: allOrders = [], isLoading } = useGetOrdersQuery()

  const getMonthlyRevenue = (monthIndex) =>
    allOrders
      .filter((o) => getMonth(new Date(o.createdAt)) === monthIndex)
      .reduce((sum, o) => sum + (o.totalAmount || 0), 0)

  const getMonthlyItems = (monthIndex) =>
    allOrders
      .filter((o) => getMonth(new Date(o.createdAt)) === monthIndex)
      .reduce((sum, o) => sum + (o.items?.length || 0), 0)

  const revenueData = {
    labels: months,
    datasets: [{
      label: "Chiffre d'affaires (FCFA)",
      data: months.map((_, i) => getMonthlyRevenue(i)),
      backgroundColor: '#fe8e3c',
      borderColor: '#fe8e3c',
      borderWidth: 1,
      borderRadius: 6,
      borderSkipped: false,
    }],
  }

  const itemsData = {
    labels: months,
    datasets: [{
      label: 'Articles vendus',
      data: months.map((_, i) => getMonthlyItems(i)),
      backgroundColor: 'rgba(34, 197, 94, 0.6)',
      borderColor: 'rgba(34, 197, 94, 0.6)',
      borderWidth: 1,
      borderRadius: 6,
      borderSkipped: false,
    }],
  }

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'top', labels: { font: { size: 14 } } },
      title: { display: true, font: { size: 18, weight: 'bold' } },
    },
    scales: {
      x: { ticks: { font: { size: 12 } } },
      y: { ticks: { font: { size: 12 } }, beginAtZero: true },
    },
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <Lottie animationData={Aloading} loop className="w-32" />
      </div>
    )
  }

  const totalRevenue = allOrders.reduce((sum, o) => sum + (o.totalAmount || 0), 0)
  const totalItems = allOrders.reduce((sum, o) => sum + (o.items?.length || 0), 0)

  const stats = [
    { title: "Chiffre d'affaires", value: `${formatNumber(totalRevenue)} FCFA`, color: 'from-amber-400 to-amber-500' },
    { title: 'Nombre de commandes', value: allOrders.length, color: 'from-blue-500 to-blue-600' },
    { title: 'Articles vendus', value: totalItems, color: 'from-green-500 to-green-600' },
  ]

  return (
    <div className="lg:p-6 space-y-8">
      <div className={`grid ${isCollapsed ? 'md:grid-cols-3' : 'md:grid-cols-1'} grid-cols-1 lg:grid-cols-3 gap-3 lg:gap-6 text-nowrap`}>
        {stats.map((stat, idx) => (
          <div key={idx} className={`bg-gradient-to-r ${stat.color} rounded-2xl p-2 px-4 lg:px-6 lg:p-6 text-white shadow-lg hover:shadow-xl transition-shadow`}>
            <h3 className="text-sm font-medium uppercase tracking-wide opacity-90">{stat.title}</h3>
            <p className="text-xl md:text-2xl lg:text-3xl font-extrabold md:mt-2">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="space-y-8 mt-10 hidden lg:block">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-xl text-center font-bold text-gray-600">Chiffre d'affaires par mois</h3>
          <div className="h-80 -mt-6">
            <Bar data={revenueData} options={chartOptions} />
          </div>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-xl text-center font-bold text-gray-600">Articles vendus par mois</h3>
          <div className="h-80 -mt-6">
            <Bar data={itemsData} options={chartOptions} />
          </div>
        </div>
      </div>

      <div className="text-center mt-5 lg:hidden">
        <div className="flex justify-center text-[40px]">
          <IoIosWarning className="text-amber-500" />
        </div>
        <p className="text-sm md:text-lg">
          Pour voir les graphes, connectez vous sur un appareil d'au moins
          <span className="font-semibold"> 11 pouces !</span>
        </p>
      </div>
    </div>
  )
}

export default DashboardAdmin
