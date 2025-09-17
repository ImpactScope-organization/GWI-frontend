import axios from 'axios'
import apiUrl from './baseURL'
import { ACCESS_TOKEN_STORAGE_KEY, REFRESH_TOKEN_STORAGE_KEY } from './auth'
import { toast } from 'react-toastify'
import { config } from '../config'

const ApiInstance = axios.create({
  baseURL: config.apiUrl,
  headers: {
    'content-type': 'application/json'
  },
  timeout: 100000
})

export async function getApi() {
  ApiInstance.interceptors.request.use((config) => {
    const accessToken = localStorage.getItem(ACCESS_TOKEN_STORAGE_KEY)

    if (accessToken) {
      config.headers = { ...config.headers, Authorization: `Bearer ${accessToken}` }
    }

    return config
  })

  ApiInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config

      if (error.response?.status === 500 && !originalRequest._retry) {
        originalRequest._retry = true

        try {
          const refreshTokenToUse = localStorage.getItem(REFRESH_TOKEN_STORAGE_KEY)
          if (refreshTokenToUse) {
            const {
              data: {
                result: { accessToken, refreshToken }
              }
            } = await axios.post(`${apiUrl}/api/auth/refresh`, {
              refreshToken: refreshTokenToUse
            })

            localStorage.setItem(ACCESS_TOKEN_STORAGE_KEY, accessToken)
            localStorage.setItem(REFRESH_TOKEN_STORAGE_KEY, refreshToken)

            originalRequest.headers.Authorization = `Bearer ${accessToken}`

            return ApiInstance(originalRequest)
          }
        } catch (refreshError) {
          console.error('Failed to refresh token:', refreshError)

          toast.error(`Authorization error: ${error?.response?.data?.message}`)
          localStorage.removeItem(ACCESS_TOKEN_STORAGE_KEY)
          localStorage.removeItem(REFRESH_TOKEN_STORAGE_KEY)
          window.location.href = '/login'

          return Promise.reject(refreshError)
        }
      }

      return Promise.reject(error)
    }
  )

  return ApiInstance
}
