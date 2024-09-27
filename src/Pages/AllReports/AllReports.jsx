import React, { useEffect, useState } from 'react'
import { useStepsContext } from '../../Context/StateContext'
import { useGetAllReportsSentToRegulators } from '../../Hooks/reports-hooks'
import { ROUTES } from '../../routes'
import { ButtonLink } from '../../Components/ButtonLink/ButtonLink'
import { ReportList } from './ReportList'

const TABS = {
  internalReports: 1,
  sendToRegulator: 2
}

const AllReports = () => {
  const [activeTab, setActiveTab] = useState(TABS.internalReports)
  const { allInitializedReports, fetchAllInititalizedReports } = useStepsContext()

  const { data: getAllPendingReports, isLoading: pendingReportLoading } =
    useGetAllReportsSentToRegulators()

  const handleTabClick = (tab) => {
    setActiveTab(tab)
  }

  useEffect(() => {
    ;(async () => {
      await fetchAllInititalizedReports()
    })()
  }, [])

  return (
    <div className="w-[90%] mx-auto my-10">
      {/* Top Container */}
      <div className="flex justify-between items-start mb-6">
        {/* Left */}
        <div>
          <h1 className="text-darkBlack font-bold text-3xl mb-1">Companies</h1>
          <p className="subtitle-text ">Overview all of companies here</p>
        </div>
        {/* Right */}
        <ButtonLink to={ROUTES.create}>Add new company</ButtonLink>
      </div>

      {/* Tabs Container */}
      <div className="flex gap-10 w-fit justify-center item-center mb-8">
        <h1
          onClick={() => handleTabClick(1)}
          className={`cursor-pointer ${
            activeTab === TABS.internalReports
              ? 'border-b-[2px] border-primary text-darkBlack font-semibold'
              : 'text-[#5f6264]'
          }  pb-1 `}
        >
          Internal reports
        </h1>
        <h1
          onClick={() => handleTabClick(2)}
          className={`cursor-pointer ${
            activeTab === TABS.sendToRegulator
              ? 'border-b-[2px] border-primary text-darkBlack font-semibold'
              : 'text-[#5a5c5e]'
          }  pb-1 `}
        >
          Sent to regulator
        </h1>
      </div>

      {/* pages Container */}
      <div className="w-full gap-7 grid grid-cols-3">
        {activeTab === TABS.internalReports && <ReportList data={allInitializedReports} />}
        {activeTab === TABS.sendToRegulator && <ReportList data={getAllPendingReports} />}
      </div>
    </div>
  )
}

export default AllReports
