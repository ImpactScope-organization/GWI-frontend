import React, { createContext, useContext, useCallback, useMemo } from 'react'
import { useAuthContext } from './AuthContext'
import { ROLES } from '../utils/roles'
import { getRouteWithParams, ROUTES } from '../routes'

const AccessContext = createContext({
  userRoles: {
    isAdmin: false,
    isRegulator: false,
    isDemo: false,
    isB2C: false
  },
  hasRoleForCompany: (company) => false,
  isClientAvailable: (clientId) => false,
  hasRole: () => false,
  getCompanyRouteByRole: (params) => {}
})

export const AccessContextProvider = ({ children }) => {
  const {
    userInfo: { roles, clientIds, b2cTiers }
  } = useAuthContext()

  const userRoles = useMemo(() => {
    return {
      isAdmin: roles.includes(ROLES.ADMIN),
      isRegulator: roles.includes(ROLES.REGULATOR),
      isDemo: roles.includes(ROLES.DEMO),
      isB2C: roles.includes(ROLES.B2C_USER)
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

  const hasRoleForCompany = useCallback(
    (company) => {
      if (userRoles.isAdmin || userRoles.isRegulator) return true
      if (userRoles.isB2C) {
        return company.b2cTiers.some((tier) => b2cTiers.includes(tier))
      }
      return false
    },
    [userRoles, b2cTiers]
  )

  return (
    <AccessContext.Provider
      value={{ userRoles, isClientAvailable, hasRole, getCompanyRouteByRole, hasRoleForCompany }}
    >
      {children}
    </AccessContext.Provider>
  )
}

export const useAccessContext = () => useContext(AccessContext)
