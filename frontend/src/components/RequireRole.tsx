import { useSelector } from 'react-redux'
import { Navigate, useLocation } from 'react-router-dom'
import { selectUser } from '~store/api'

const RequireRole = ({ role, children }: { role: number; children: JSX.Element }) => {
  const user = useSelector(selectUser)

  if (user && user.role !== role) {
    // redirect to home page when different role
    return <Navigate to="/" replace />
  }

  return children
}

export default RequireRole
