import { useAccessContext } from '../../../Context/AccessContext'

export const RoleRender = ({ children, role }) => {
  const { hasRole } = useAccessContext()
  return hasRole(role) ? <>{children}</> : <></>
}
