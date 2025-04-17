import CustomGaugeChart from '../../../../../../../Components/gauge-chart'
import { captureScreen } from '../../../../../../../utils/helpers'
import { Dropdown } from 'antd'
import { IoEllipsisHorizontalSharp } from 'react-icons/io5'
import React from 'react'
import { useQuantitativeReportDetails } from './useQuantitativeReportDetails'
import { ReportingRisk } from './components/ReportingRisk'
import { ReportingRiskItem } from './components/ReportingRiskItem'
import { ReportStatus } from './containers/ReportStatus'
import { useCurrentCompanyReport } from '../../../hooks/useCurrentCompanyReport'
import { BlockchainDetails } from './components/BlockchainDetails'
import { QuantitativeReportNavigation } from './components/QuantitativeReportNavigation/QuantitativeReportNavigation'

export const QuantitativeReportDetails = () => {
  const { currentCompanyReport } = useCurrentCompanyReport()

  const { greenwashingRiskPercentage, reportingRiskPercentage } = useQuantitativeReportDetails()

  return (
    <div className="card_shadow rounded-2xl flex basis-4/12 flex-col gap-1 py-4 px-3">
      <h5 className="text-[18px] leading-[24px] font-[600]">Report</h5>
      <div className="overflow-hidden w-full px-2 flex justify-center items-center ">
        <CustomGaugeChart percentage={greenwashingRiskPercentage} />
      </div>
      {/* Cols */}
      <div className="mt-[24px] flex flex-col lg:max-w-[370px]  gap-2 my-3 ">
        <ReportingRisk reportingRiskPercentage={reportingRiskPercentage} />
        <ReportingRiskItem title="GHG emissions">
          {currentCompanyReport?.GHGEmissions}
        </ReportingRiskItem>
        <ReportStatus />
        <BlockchainDetails />
      </div>
      <QuantitativeReportNavigation />
    </div>
  )
}
