import { useAccessContext } from '../../../../Context/AccessContext'
import { SuccessButton } from '../../../../Components/Buttons/SuccessButton'

export const CompanySubscriptionHero = () => {
  const { isFreeB2CTier } = useAccessContext()
  if (!isFreeB2CTier) return null

  return (
    <section className="relative mb-8">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-6 rounded-2xl border border-slate-200 bg-white/90 backdrop-blur-sm shadow-sm p-6 md:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* left: copy */}
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
                As a free user you can view sample reports. Premium members get unlimited access to
                our entire database and ongoing updates.
              </p>

              <div className="mt-5 grid gap-2 sm:grid-cols-2">
                <ul className="space-y-2 text-slate-700">
                  <li className="relative pl-4 before:absolute before:left-0 before:top-2 before:h-1.5 before:w-1.5 before:rounded-full before:bg-slate-800">
                    Get unique greenwashing risk insights for publicly listed companies.
                  </li>
                  <li className="relative pl-4 before:absolute before:left-0 before:top-2 before:h-1.5 before:w-1.5 before:rounded-full before:bg-slate-800">
                    Used by leading regulators and financial institutions.
                  </li>
                  <li className="relative pl-4 before:absolute before:left-0 before:top-2 before:h-1.5 before:w-1.5 before:rounded-full before:bg-slate-800">
                    Coverage across UK, US, EU and more.
                  </li>
                </ul>
                <ul className="space-y-2 text-slate-700">
                  <li className="relative pl-4 before:absolute before:left-0 before:top-2 before:h-1.5 before:w-1.5 before:rounded-full before:bg-slate-800">
                    New reports updated weekly.
                  </li>
                  <li className="relative pl-4 before:absolute before:left-0 before:top-2 before:h-1.5 before:w-1.5 before:rounded-full before:bg-slate-800">
                    Request any company not yet in our database.
                  </li>
                </ul>
              </div>
            </div>

            {/* right: price card */}
            <div className="lg:col-span-2">
              <div className="h-full rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
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
                  <span className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
                    Best for teams
                  </span>
                </div>

                <div className="my-5 h-px w-full bg-slate-200" />

                <ul className="space-y-2 text-sm text-slate-700">
                  <li className="flex items-start gap-2">
                    <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-slate-800" />
                    Unlimited report access
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-slate-800" />
                    Weekly updates & new coverage
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-slate-800" />
                    Priority support
                  </li>
                </ul>

                <div className="mt-6">
                  <SuccessButton className="w-full h-11 rounded-xl text-base">
                    Unlock full access
                  </SuccessButton>
                  <p className="mt-3 text-center text-xs text-slate-500">
                    Secure checkout. Cancel anytime before the next billing cycle.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* subtle footer bar with social proof / reassurance */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-slate-200 pt-4">
            <div className="text-sm text-slate-500">
              Free tier includes sample reports. Upgrade anytime for full access.
            </div>
            <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
              <span className="inline-flex items-center gap-1">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                Trusted by professionals
              </span>
              <span>•</span>
              <span>Weekly updates</span>
              <span>•</span>
              <span>Priority support</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
