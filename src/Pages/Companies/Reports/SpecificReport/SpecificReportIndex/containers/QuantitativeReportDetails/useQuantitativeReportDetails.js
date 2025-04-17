import { toFixed } from '../../../../../../../utils/number'
import { useCurrentCompanyReport } from '../../../hooks/useCurrentCompanyReport'

export const useQuantitativeReportDetails = () => {
  const { currentCompanyReport } = useCurrentCompanyReport()

  const greenwashingRiskPercentage = toFixed(currentCompanyReport?.greenwashRiskPercentage)
  const reportingRiskPercentage = toFixed(currentCompanyReport?.reportingRiskPercentage)

  return {
    greenwashingRiskPercentage,
    reportingRiskPercentage
  }
}
