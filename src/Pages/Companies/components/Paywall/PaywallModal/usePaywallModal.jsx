import { Modal } from 'antd'
import { useCallback } from 'react'
import { usePaymentLink } from '../../../../../Hooks/usePaymentLink'
import { CompanySubscriptionListItem } from '../CompanySubscriptionHero/components/CompanySubscriptionListItem'
import { Divider } from '../components/Divider'
import { QuarterlyPlan } from '../components/QuarterlyPlan'
import { SecureCheckout } from '../components/SecureCheckout'

export const usePaywallModal = () => {
  const [{ confirm }, modalContent] = Modal.useModal()
  const { paymentLink } = usePaymentLink()

  const open = useCallback(() => {
    confirm({
      title: (
        <h2 className="mt-3 text-xl md:text-2xl font-semibold tracking-tight text-slate-900">
          Unlock full access to Greenwashing Reports
        </h2>
      ),
      icon: null,
      content: (
        <div>
          <div>
            As a free user you can view free reports. Premium members get unlimited access to our
            entire database and ongoing updates.
          </div>
          <Divider />
          <QuarterlyPlan />
          <Divider />
          <ul className="space-y-2 text-sm text-slate-700">
            <CompanySubscriptionListItem>Unlimited report access</CompanySubscriptionListItem>
            <CompanySubscriptionListItem>Weekly updates & new coverage</CompanySubscriptionListItem>
            <CompanySubscriptionListItem>Priority support</CompanySubscriptionListItem>
          </ul>
          <Divider />
          <SecureCheckout />
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
