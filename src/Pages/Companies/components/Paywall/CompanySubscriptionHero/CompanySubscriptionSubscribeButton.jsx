import { useAccessContext } from '../../../../../Context/AccessContext'
import { FilledSuccessButton } from '../../../../../Components/Buttons/FilledSuccessButton'
import { usePaywallModal } from '../PaywallModal/usePaywallModal'

export const CompanySubscriptionSubscribeButton = () => {
  const { isFreeB2CTier } = useAccessContext()
  const { modalContent, open } = usePaywallModal()

  if (!isFreeB2CTier) return null

  return (
    <>
      <FilledSuccessButton onClick={open}>Unlock full access</FilledSuccessButton>
      {modalContent}
    </>
  )
}
