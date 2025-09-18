import { useCallback, useEffect } from 'react'
import { useQueryParams } from '../../Hooks/useQueryParams'
import { useLoading } from '../../Hooks/useLoading'
import { getApi } from '../../utils/api'

export const useConfirmPayment = () => {
  const { queryParams } = useQueryParams()
  const { isLoading, startLoading, finishLoading } = useLoading()

  const sessionId = queryParams.get('session')

  // Logic for confirming payment would go here
  const confirmPayment = useCallback(async () => {
    startLoading()
    // Placeholder function to simulate payment confirmation
    console.log(`Confirming payment for session: ${sessionId}`)

    await (await getApi()).post('/api/payment/confirm', { sessionId })
    // In a real implementation, you would call an API endpoint to confirm the payment
    finishLoading()
  }, [finishLoading, sessionId, startLoading])

  useEffect(() => {
    confirmPayment()
  }, [confirmPayment, sessionId])

  return {
    isLoading
  }
}
