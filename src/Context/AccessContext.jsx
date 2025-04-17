import React, { createContext, useContext, useCallback, useMemo } from 'react'
import { useAuthContext } from './AuthContext'
import { ROLES } from '../utils/roles'

const AccessContext = createContext({
  userRoles: {
    isAdmin: false,
    isRegulator: false,
    isDemo: false
  },
  isClientAvailable: () => {},
  hasRole: () => {}
})

export const AccessContextProvider = ({ children }) => {
  const {
    userInfo: { roles, clientIds }
  } = useAuthContext()

  const userRoles = useMemo(() => {
    return {
      isAdmin: roles.includes(ROLES.ADMIN),
      isRegulator: roles.includes(ROLES.REGULATOR),
      isDemo: roles.includes(ROLES.DEMO)
    }
  }, [roles])

  const isClientAvailable = useCallback(
    (clientId) => {
      return clientIds.includes(clientId)
    },
    [clientIds]
  )

  const hasRole = useCallback(
    (role) => {
      return roles.includes(role)
    },
    [roles]
  )

  return (
    <AccessContext.Provider value={{ userRoles, isClientAvailable, hasRole }}>
      {children}
    </AccessContext.Provider>
  )
}

export const useAccessContext = () => useContext(AccessContext)
