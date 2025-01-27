import { useCallback, useState } from 'react'

export const useLoading = () => {
  const [isLoading, setIsLoading] = useState(true)

  const startLoading = useCallback(() => setIsLoading(true), [])
  const finishLoading = useCallback(() => setIsLoading(false), [])

  return {
    isLoading,
    startLoading,
    finishLoading
  }
}
