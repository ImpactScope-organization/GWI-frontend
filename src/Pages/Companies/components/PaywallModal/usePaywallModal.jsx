import { Modal } from 'antd'
import { useCallback } from 'react'
import { usePaymentLink } from '../../../../Hooks/usePaymentLink'
import { CompanySubscriptionListItem } from '../CompanySubscriptionHero/components/CompanySubscriptionListItem'

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
          As a free user you can view free reports. Premium members get unlimited access to our
          entire database and ongoing updates.
          <div className="my-5 h-px w-full bg-slate-200" />
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-slate-500">Quarterly plan</div>
              <div className="mt-1 text-3xl font-semibold tracking-tight text-slate-900">
                €500
                <span className="ml-2 align-middle text-sm font-normal text-slate-500">
                  / quarter
                </span>
              </div>
            </div>
          </div>
          <div className="my-5 h-px w-full bg-slate-200" />
          <ul className="space-y-2 text-sm text-slate-700">
            <CompanySubscriptionListItem>Unlimited report access</CompanySubscriptionListItem>
            <CompanySubscriptionListItem>Weekly updates & new coverage</CompanySubscriptionListItem>
            <CompanySubscriptionListItem>Priority support</CompanySubscriptionListItem>
          </ul>
          <div className="my-5 h-px w-full bg-slate-200" />
          <p className="mt-3 mb-2 text-center text-xs text-slate-500">
            Secure checkout. Cancel anytime before the next billing cycle.
          </p>
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
