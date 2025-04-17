import { Dropdown } from 'antd'
import { IoEllipsisHorizontalSharp } from 'react-icons/io5'
import { captureScreen } from '../../../../../../../../../utils/helpers'
import React from 'react'
import { useQuantitativeReportNavigation } from './useQuantitativeReportNavigation'
import { useCurrentCompanyReport } from '../../../../../hooks/useCurrentCompanyReport'

export const QuantitativeReportNavigation = () => {
  const { currentCompanyReport } = useCurrentCompanyReport()

  const {
    handleSendToBlockchain,
    isSendToBlockchainInProgress,
    deleteCompanyHandler,
    dropdownConfiguration,
    storedOnBlockchain
  } = useQuantitativeReportNavigation()

  return (
    <>
      {!storedOnBlockchain && (
        <div className="flex flex-row gap-4 w-full">
          <button
            disabled={isSendToBlockchainInProgress}
            onClick={handleSendToBlockchain}
            className={`${
              isSendToBlockchainInProgress ? 'bg-greyText' : 'bg-darkGreen'
            } flex-1 rounded-lg py-3 px-3 border-none outline-none text-[#fff] text-[16px] font-[600] leading-[24px]`}
          >
            Send to blockchain
          </button>
          <Dropdown
            disabled={isSendToBlockchainInProgress}
            trigger={['click']}
            menu={dropdownConfiguration}
            placement="bottomRight"
          >
            <div className="py-[12px] px-[18px] rounded-md border bg-transparent flex justify-center items-center">
              <IoEllipsisHorizontalSharp />
            </div>
          </Dropdown>
        </div>
      )}
      {storedOnBlockchain && (
        <div className="flex flex-row justify-center gap-2 col-span-2 w-full">
          <button
            onClick={() => captureScreen('report-container', currentCompanyReport?.companyName)}
            className="bg-primary rounded-lg py-[12px] flex w-full text-center justify-center px-[4px] col-span-1 border-none outline-none text-[#fff] text-[16px] font-[600] leading-[24px]"
          >
            Download as .pdf
          </button>
          <button
            onClick={deleteCompanyHandler}
            className="bg-white border border-darkBlack rounded-lg w-full text-center justify-center flex py-[12px] col-span-1 px-[4px] text-darkBlack text-[16px] font-[600] leading-[24px]"
          >
            Remove from DB
          </button>
        </div>
      )}
    </>
  )
}
