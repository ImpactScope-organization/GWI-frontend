import { useCurrentCompanyReport } from '../../../../../hooks/useCurrentCompanyReport'
import { captureScreen } from '../../../../../../../../../utils/helpers'
import React from 'react'

export const ReportNavigationRegulator = () => {
  const { currentCompanyReport } = useCurrentCompanyReport()
  const isRegulatorDownloadAvailable = false

  return (
    <div className="flex flex-row justify-center gap-2 col-span-2 w-full">
      {isRegulatorDownloadAvailable && (
        <button
          onClick={() => captureScreen('report-container', currentCompanyReport?.companyName)}
          className="bg-primary rounded-lg py-[12px] flex w-full text-center justify-center px-[4px] col-span-1 border-none outline-none text-[#fff] text-[16px] font-[600] leading-[24px]"
        >
          Download as .pdf
        </button>
      )}
    </div>
  )
}
