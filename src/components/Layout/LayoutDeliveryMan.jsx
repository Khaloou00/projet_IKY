import { Outlet, Link } from 'react-router'

const LayoutDeliveryMan = () => (
  <div className="min-h-screen bg-gray-50">
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm border-b border-gray-100 px-6 py-3">
      <Link to="/" className="text-xl font-bold text-amber-500">SuperBe</Link>
      <span className="ml-4 text-gray-600">Espace Livreur</span>
    </header>
    <main className="pt-16">
      <Outlet />
    </main>
  </div>
)

export default LayoutDeliveryMan
