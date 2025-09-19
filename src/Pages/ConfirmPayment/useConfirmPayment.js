import { useCallback, useEffect } from 'react'
import { useQueryParams } from '../../Hooks/useQueryParams'
import { useLoading } from '../../Hooks/useLoading'
import { getApi } from '../../utils/api'
import { toast } from 'react-toastify'
import { ROUTES } from '../../routes'
import { useAuthContext } from '../../Context/AuthContext'
import { useNavigate } from 'react-router-dom'

export const useConfirmPayment = () => {
  const { queryParams } = useQueryParams()
  const { isLoading, startLoading, finishLoading } = useLoading()
  const { login } = useAuthContext()
  const navigate = useNavigate()

  const sessionId = queryParams.get('session')

  const confirmPayment = useCallback(async () => {
    startLoading()
    try {
      const { data } = await (await getApi()).post('/api/payment/confirm', { sessionId })

      toast.success('Logged in Successfully! Welcome to GWI Premium!')
      login(data)
      navigate(ROUTES.companies.index)
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Failed to confirm payment')
      navigate(ROUTES.login)
    }

    finishLoading()
  }, [finishLoading, login, navigate, sessionId, startLoading])

  useEffect(() => {
    confirmPayment()
  }, [confirmPayment, sessionId])

  return {
    isLoading
  }
}
