import { useAccessContext } from '../../../../Context/AccessContext'
import { SuccessButton } from '../../../../Components/Buttons/SuccessButton'

export const CompanySubscriptionHero = () => {
  const { isFreeB2CTier } = useAccessContext()
  return (
    <>
      {isFreeB2CTier && (
        <section className={`relative mb-6`}>
          <div className="grid gap-5 rounded-2xl border border-slate-200 bg-white shadow-sm p-5 md:p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">Title</h2>
                <div className="text-slate-600 mt-1 md:mt-2 max-w-2xl">
                  <div>As a free user you can view the sample greenwashing reports.</div>
                  <div>Premium users get access to all reports in our database</div>
                  <div>
                    Get access to unique greenwashing risk insights for publicly listed companies.
                  </div>
                  <div>Used by the world's leading regulators and financial institutions.</div>
                  <div>
                    Unrestricted access to publicly listed companies in UK, US, EU and more.
                  </div>

                  <div>New reports are updated weekly.</div>

                  <div>Request a report for any company not in our database.</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <div className="text-sm text-slate-500">500 €</div>
                  <SuccessButton>Unlock full access</SuccessButton>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  )
}
