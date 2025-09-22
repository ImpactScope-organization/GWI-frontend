import { Modal } from 'antd'
import { useCallback } from 'react'
import { usePaymentLink } from '../../../../Hooks/usePaymentLink'

export const usePaywallModal = () => {
  const [{ confirm }, modalContent] = Modal.useModal()
  const { paymentLink } = usePaymentLink()

  const open = useCallback(() => {
    confirm({
      title: 'Unlock full access to Greenwashing Reports',
      icon: null,
      content: (
        <div>
          As a free user you can view free reports. Premium members get unlimited access to our
          entire database and ongoing updates.
        </div>
      ),
      okText: 'Unlock full access',
      cancelText: 'Maybe later',
      onOk: () => {
        window.location.href = paymentLink
      }
    })
  }, [confirm, paymentLink])

  return { open, modalContent }
}
