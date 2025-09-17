import React, { createContext, useState, useEffect, useContext, useCallback, useMemo } from 'react'
import { jwtDecode } from 'jwt-decode'
import { ACCESS_TOKEN_STORAGE_KEY, REFRESH_TOKEN_STORAGE_KEY } from '../utils/auth'
import { useQueryClient } from '@tanstack/react-query'

const AuthContext = createContext({
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
  accessToken: undefined,
  refreshToken: undefined,
  userInfo: {
    roles: [],
    clientIds: [],
    email: undefined,
    id: undefined
  },
  isUserIdMatching: (userId) => {}
})

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLocalStorageFetched, setIsLocalStorageFetched] = useState(false)
  const [accessToken, setAccessToken] = useState(undefined)
  const [refreshToken, setRefreshToken] = useState(undefined)
  const queryClient = useQueryClient()

  const setTokens = useCallback((accessTokenToSet, refreshTokenToSet) => {
    setAccessToken(accessTokenToSet)
    setRefreshToken(refreshTokenToSet)

    setIsAuthenticated(!!accessTokenToSet)
  }, [])

  const login = useCallback(
    ({ accessToken: loginAccessToken, refreshToken: loginRefreshToken }) => {
      localStorage.setItem(ACCESS_TOKEN_STORAGE_KEY, loginAccessToken)
      localStorage.setItem(REFRESH_TOKEN_STORAGE_KEY, loginRefreshToken)

      setTokens(loginAccessToken, loginRefreshToken)
    },
    [setTokens]
  )

  const logout = useCallback(async () => {
    localStorage.removeItem(ACCESS_TOKEN_STORAGE_KEY)
    localStorage.removeItem(REFRESH_TOKEN_STORAGE_KEY)

    setTokens(undefined, undefined)

    queryClient.clear()
  }, [queryClient, setTokens])

  useEffect(() => {
    const storedAccessToken = localStorage.getItem(ACCESS_TOKEN_STORAGE_KEY)
    const storedRefreshToken = localStorage.getItem(REFRESH_TOKEN_STORAGE_KEY)

    if (storedAccessToken) {
      setTokens(storedAccessToken, storedRefreshToken)
    }
    setIsLocalStorageFetched(true)
  }, [setTokens])

  const userInfo = useMemo(() => {
    if (!!accessToken) {
      const { roles, clientIds, b2cTiers, email, id } = jwtDecode(accessToken)

      return {
        roles,
        clientIds,
        b2cTiers,
        email,
        id
      }
    }

    return {
      roles: [],
      clientIds: [],
      email: undefined,
      id: undefined
    }
  }, [accessToken])

  const isUserIdMatching = useCallback(
    (userId) => {
      return userInfo?.id === userId
    },
    [userInfo]
  )

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isLocalStorageFetched,
        login,
        logout,
        accessToken,
        refreshToken,
        userInfo,
        isUserIdMatching
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuthContext = () => useContext(AuthContext)
