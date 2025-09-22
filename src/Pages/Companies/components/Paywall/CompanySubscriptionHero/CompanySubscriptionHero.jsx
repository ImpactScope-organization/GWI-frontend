import { useAccessContext } from '../../../../../Context/AccessContext'
import { CompanySubscriptionListItem } from './components/CompanySubscriptionListItem'
import { FilledSuccessButton } from '../../../../../Components/Buttons/FilledSuccessButton'
import { usePaymentLink } from '../../../../../Hooks/usePaymentLink'
import { Link } from 'react-router-dom'
import { Divider } from '../components/Divider'
import { QuarterlyPlan } from '../components/QuarterlyPlan'
import { SecureCheckout } from '../components/SecureCheckout'

export const CompanySubscriptionHero = () => {
  const { isFreeB2CTier } = useAccessContext()
  const { paymentLink } = usePaymentLink()

  if (!isFreeB2CTier) return null

  return (
    <section className="relative mb-8">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-6 rounded-2xl border border-slate-200 bg-white/90 backdrop-blur-sm shadow-sm p-6 md:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            <div className="lg:col-span-3">
              <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-600">
                Premium access
                <span className="mx-1 h-1 w-1 rounded-full bg-slate-300" />
                Quarterly plan
              </div>

              <h2 className="mt-3 text-3xl md:text-4xl font-semibold tracking-tight text-slate-900">
                Unlock full access to Greenwashing Reports
              </h2>

              <p className="mt-3 text-slate-600 max-w-2xl">
                As a free user you can view free reports. Premium members get unlimited access to
                our entire database and ongoing updates.
              </p>

              <div className="mt-5 grid gap-2 sm:grid-cols-2">
                <ul className="space-y-2 text-slate-700">
                  <CompanySubscriptionListItem>
                    Get unique greenwashing risk insights for publicly listed companies.
                  </CompanySubscriptionListItem>
                  <CompanySubscriptionListItem>
                    Used by leading regulators and financial institutions.
                  </CompanySubscriptionListItem>
                  <CompanySubscriptionListItem>
                    Coverage across UK, US, EU and more.
                  </CompanySubscriptionListItem>
                </ul>
                <ul className="space-y-2 text-slate-700">
                  <CompanySubscriptionListItem>
                    New reports updated weekly.
                  </CompanySubscriptionListItem>
                  <CompanySubscriptionListItem>
                    Request any company not yet in our database.
                  </CompanySubscriptionListItem>
                </ul>
              </div>
            </div>

            <div className="lg:col-span-2">
              <div className="h-full rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <QuarterlyPlan />
                </div>

                <Divider />

                <ul className="space-y-2 text-sm text-slate-700">
                  <CompanySubscriptionListItem>Unlimited report access</CompanySubscriptionListItem>
                  <CompanySubscriptionListItem>
                    Weekly updates & new coverage
                  </CompanySubscriptionListItem>
                  <CompanySubscriptionListItem>Priority support</CompanySubscriptionListItem>
                </ul>

                <div className="mt-6">
                  <Link to={paymentLink}>
                    <FilledSuccessButton>Unlock full access</FilledSuccessButton>
                  </Link>

                  <SecureCheckout />
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-slate-200 pt-4">
            <div className="text-sm text-slate-500">
              Free tier includes limited reports. Upgrade anytime for full access.
            </div>
            <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
              <span className="inline-flex items-center gap-1">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                Trusted by FCA in UK
              </span>
              <span className="h-1 w-1 rounded-full bg-slate-500" />
              <span>Weekly updates</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
