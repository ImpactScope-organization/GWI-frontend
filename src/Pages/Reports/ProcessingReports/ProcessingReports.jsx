import React from 'react'
import { ReportContainer } from '../components/ReportContainer/ReportContainer'
import { useGetAllInitializedReports } from '../../../Hooks/reports-hooks'
import { ReportList } from '../components/ReportList/ReportList'

export const ProcessingReports = () => {
  const { data } = useGetAllInitializedReports()

  return (
    <ReportContainer>
      <ReportList data={data} />
    </ReportContainer>
  )
}
