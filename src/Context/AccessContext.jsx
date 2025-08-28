import React, { createContext, useContext, useCallback, useMemo } from 'react'
import { useAuthContext } from './AuthContext'
import { ROLES } from '../utils/roles'
import { getRouteWithParams, ROUTES } from '../routes'

const AccessContext = createContext({
  userRoles: {
    isAdmin: false,
    isRegulator: false,
    isDemo: false
  },
  isClientAvailable: () => {},
  hasRole: () => {},
  getCompanyRouteByRole: () => {}
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
      if (Array.isArray(role)) {
        return role.some((r) => roles.includes(r))
      }
      return roles.includes(role)
    },
    [roles]
  )

  const getCompanyRouteByRole = useCallback(
    (params) => {
      return getRouteWithParams(
        userRoles.isAdmin ? ROUTES.companies.reports.internal : ROUTES.companies.reports.regulator,
        params
      )
    },
    [userRoles.isAdmin]
  )

  return (
    <AccessContext.Provider
      value={{ userRoles, isClientAvailable, hasRole, getCompanyRouteByRole }}
    >
      {children}
    </AccessContext.Provider>
  )
}

export const useAccessContext = () => useContext(AccessContext)
