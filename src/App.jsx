import { createBrowserRouter, RouterProvider } from 'react-router'

// Layouts
import LayoutUI from './components/Layout/LayoutUI'
import LayoutAdmin from './components/Layout/LayoutAdmin'
import LayoutDeliveryMan from './components/Layout/LayoutDeliveryMan'

// Auth guard
import ProtectedRoute from './components/Shared/ProtectedRoute'

// Hydration hook
import { useAuthHydration } from './hooks/useAuthHydration'

// Public pages
import Home from './pages/Home'
import Shop from './pages/Shop'
import Product from './pages/Product'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import Search from './pages/Search'
import Contact from './pages/Contact'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import VerifyOTP from './pages/VerifyOTP'
import ForgotPassword from './pages/ForgotPassword'
import UpdatePassword from './pages/UpdatePassword'

// Admin pages
import DashboardAdmin from './pages/admin/DashboardAdmin'
import AllProducts from './pages/admin/AllProducts'
import AddProduct from './pages/admin/AddProduct'
import EditProduct from './pages/admin/EditProduct'
import Orders from './pages/admin/Orders'
import Users from './pages/admin/Users'

// User / Delivery spaces (Phase 2)
import DashboardUser from './pages/user/DashboardUser'
import DashboardDelivery from './pages/delivery/DashboardDelivery'

const router = createBrowserRouter([
  // ─── Public ───────────────────────────────────────────────────
  {
    element: <LayoutUI />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/boutique', element: <Shop /> },
      { path: '/product/:id', element: <Product /> },
      { path: '/search', element: <Search /> },
      { path: '/contact', element: <Contact /> },
    ],
  },

  // ─── Semi-protected (must be logged in) ────────────────────
  {
    element: <LayoutUI />,
    children: [
      {
        path: '/cart',
        element: <Cart />,
      },
      {
        path: '/checkout',
        element: (
          <ProtectedRoute>
            <Checkout />
          </ProtectedRoute>
        ),
      },
      {
        path: '/dashboard',
        element: (
          <ProtectedRoute>
            <DashboardUser />
          </ProtectedRoute>
        ),
      },
    ],
  },

  // ─── Auth (no header/footer) ───────────────────────────────
  { path: '/login', element: <SignIn /> },
  { path: '/register', element: <SignUp /> },
  { path: '/verify-otp', element: <VerifyOTP /> },
  { path: '/forgot-password', element: <ForgotPassword /> },
  { path: '/reset-password', element: <UpdatePassword /> },

  // ─── Admin ────────────────────────────────────────────────
  {
    path: '/admin',
    element: (
      <ProtectedRoute roles={['admin']}>
        <LayoutAdmin />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <DashboardAdmin /> },
      { path: 'all-products', element: <AllProducts /> },
      { path: 'add-product', element: <AddProduct /> },
      { path: 'edit-product/:id', element: <EditProduct /> },
      { path: 'orders', element: <Orders /> },
      { path: 'users', element: <Users /> },
    ],
  },

  // ─── Delivery ─────────────────────────────────────────────
  {
    path: '/delivery',
    element: (
      <ProtectedRoute roles={['delivery', 'admin']}>
        <LayoutDeliveryMan />
      </ProtectedRoute>
    ),
    children: [{ index: true, element: <DashboardDelivery /> }],
  },
])

const App = () => {
  useAuthHydration()
  return <RouterProvider router={router} />
}

export default App
