import { Navigate, Outlet } from 'react-router-dom'
import { ROUTES } from '../../../routes'
import { useAuthContext } from '../../../Context/AuthContext'

export const AuthRoute = () => {
  const { isAuthenticated, isLocalStorageFetched } = useAuthContext()

  return (
    <>
      {isLocalStorageFetched &&
        (isAuthenticated ? <Outlet /> : <Navigate to={ROUTES.login} replace />)}
    </>
  )
}
