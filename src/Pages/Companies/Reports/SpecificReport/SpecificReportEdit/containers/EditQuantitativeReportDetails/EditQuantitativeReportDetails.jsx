import { SpecificReportInputLegacyPercentage } from '../../components/SpecificReportInputText/SpecificReportInputLegacyPercentage'
import { SpecificReportInputText } from '../../components/SpecificReportInputText/SpecificReportInputText'
import { useCurrentCompanyReport } from '../../../hooks/useCurrentCompanyReport'

export const EditQuantitativeReportDetails = () => {
  const { currentCompanyReport } = useCurrentCompanyReport()

  return (
    <div className="card_shadow rounded-2xl flex basis-4/12 flex-col gap-1 py-4 px-3">
      <h3 className="text-[18px] leading-[24px] font-[600]">Report</h3>
      <div className="flex flex-col gap-[16px] my-[24px]">
        {currentCompanyReport?.quantitativePercentages?.length === 0 && (
          <>
            <SpecificReportInputLegacyPercentage
              name="greenwashRiskPercentage"
              label="Greenwashing risk"
            />
            <SpecificReportInputLegacyPercentage
              name="reportingRiskPercentage"
              label="Reporting risk"
            />
          </>
        )}

        <SpecificReportInputText name="GHGEmissions" label="GHG emissions" />
      </div>
    </div>
  )
}
