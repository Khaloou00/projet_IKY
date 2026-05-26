import { useSelector } from 'react-redux'
import { Navigate, useLocation } from 'react-router'

const ProtectedRoute = ({ children, roles }) => {
  const { accessToken, user } = useSelector((state) => state.auth)
  const location = useLocation()

  if (!accessToken) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  if (roles && !roles.includes(user?.role)) {
    return <Navigate to="/" replace />
  }

  return children
}

export default ProtectedRoute
