import { Navigate, useLocation, Outlet } from 'react-router-dom'
import { useApp } from '../context/AppContext'

function ProtectedRoute({ children, allowedRoles }) {
  const location = useLocation()
  const { isLoggedIn, user } = useApp()

  // Not logged in - redirect to login
  if (!isLoggedIn) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  // Role check
  if (allowedRoles && allowedRoles.length > 0) {
    if (!user || !allowedRoles.includes(user.role)) {
      switch (user?.role) {
        case 'admin':
          return <Navigate to="/dashboard" replace />
        case 'student':
          return <Navigate to="/student-portal" replace />
        case 'alumni':
          return <Navigate to="/alumni-portal" replace />
        default:
          return <Navigate to="/login" replace />
      }
    }
  }

  // Render children or Outlet
  if (children) {
    return children
  }

  return <Outlet />
}

export default ProtectedRoute
