import { useSelector } from 'react-redux'
import { Navigate, useLocation } from 'react-router-dom'
import { selectIsAuthenticated } from '~store/api'

const RequireAuth = ({ children }: { children: JSX.Element }) => {
  const isAuthenticated = useSelector(selectIsAuthenticated)
  let location = useLocation()

  if (!isAuthenticated) {
    // redirect to login page
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return children
}

export default RequireAuth
