import { Navigate, Outlet } from 'react-router-dom'
import { ROUTES } from '../../../routes'
import { useAccessContext } from '../../../Context/AccessContext'

export const RoleRoute = ({ role }) => {
  const { hasRole } = useAccessContext()

  return hasRole(role) ? <Outlet /> : <Navigate to={ROUTES.notFound} replace />
}
