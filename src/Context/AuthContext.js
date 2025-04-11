import React, { createContext, useState, useEffect, useContext, useCallback, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '../routes'
import { jwtDecode } from 'jwt-decode'

const AuthContext = createContext({
  isAuthenticated: false,
  login: (userToken) => {},
  logout: () => {}
})

const ACCESS_TOKEN_STORAGE_KEY = 'accessToken'
const REFRESH_TOKEN_STORAGE_KEY = 'refreshToken'

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLocalStorageFetched, setIsLocalStorageFetched] = useState(false)
  const [roles, setRoles] = useState([])
  const [availableClientIds, setAvailableClientIds] = useState([])

  const navigate = useNavigate()

  const loadJWTContent = useCallback((accessToken) => {
    const { roles: rolesToSet, clientIds: clientIdsToSet } = jwtDecode(accessToken)
    setRoles(rolesToSet)
    setAvailableClientIds(clientIdsToSet)
  }, [])

  const clearJWTContent = useCallback(() => {
    setRoles([])
    setAvailableClientIds([])
  }, [])

  const login = useCallback(
    ({ accessToken, refreshToken }) => {
      localStorage.setItem(ACCESS_TOKEN_STORAGE_KEY, accessToken)
      localStorage.setItem(REFRESH_TOKEN_STORAGE_KEY, refreshToken)
      setIsAuthenticated(true)
      loadJWTContent(accessToken)
    },
    [loadJWTContent]
  )

  const logout = useCallback(() => {
    localStorage.removeItem(ACCESS_TOKEN_STORAGE_KEY)
    localStorage.removeItem(REFRESH_TOKEN_STORAGE_KEY)
    setIsAuthenticated(false)
  }, [])

  useEffect(() => {
    const userInfo = localStorage.getItem(ACCESS_TOKEN_STORAGE_KEY)
    if (userInfo) {
      setIsAuthenticated(true)
      loadJWTContent(userInfo)
    }
    setIsLocalStorageFetched(true)
  }, [loadJWTContent])

  useEffect(() => {
    if (isLocalStorageFetched && !isAuthenticated) {
      navigate(ROUTES.login)
      clearJWTContent()
    }
  }, [clearJWTContent, isAuthenticated, isLocalStorageFetched, navigate])

  const userRoles = useMemo(() => {
    return {
      isAdmin: roles.includes('admin'),
      isRegulator: roles.includes('regulator'),
      isDemo: roles.includes('demo')
    }
  }, [roles])

  const isClientAvailable = useCallback(
    (clientId) => {
      return availableClientIds.includes(clientId)
    },
    [availableClientIds]
  )

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, userRoles, isClientAvailable }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuthContext = () => useContext(AuthContext)
