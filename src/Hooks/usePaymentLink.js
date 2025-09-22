import { useAuthContext } from '../Context/AuthContext'
import { useMemo } from 'react'
import { config } from '../config'

export const usePaymentLink = () => {
  const {
    userInfo: { email, id }
  } = useAuthContext()

  const paymentLink = useMemo(() => {
    return `${config.stripeQuarterlyProductPaymentUrl}?prefilled_email=${email}&client_reference_id=${id}`
  }, [email, id])

  return { paymentLink }
}
