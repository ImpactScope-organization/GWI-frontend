import { FilledSuccessButton } from '../../Components/Buttons/FilledSuccessButton'
import { useAccessContext } from '../../Context/AccessContext'
import { useNewCompanyRequestModal } from './useNewCompanyRequestModal'

export const NewCompanyRequestButton = () => {
  const { isFreeB2CTier } = useAccessContext()
  const { modalContent, open } = useNewCompanyRequestModal()

  if (!isFreeB2CTier) return null

  return (
    <>
      <FilledSuccessButton onClick={open}>Request a New Company</FilledSuccessButton>
      {modalContent}
    </>
  )
}
