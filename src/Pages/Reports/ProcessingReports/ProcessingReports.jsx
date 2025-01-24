import React from 'react'
import { ReportContainer } from '../components/ReportContainer/ReportContainer'
import { useQuery } from '@tanstack/react-query'
import { fetchReportQueueList } from '../api/ReportQueueApi'
import { ProcessingReportList } from './ProcessingReportList'

export const ProcessingReports = () => {
  const { data } = useQuery({
    queryKey: ['fetchReportQueueList'],
    queryFn: () => fetchReportQueueList()
  })

  return (
    <ReportContainer>
      <ProcessingReportList data={data} />
    </ReportContainer>
  )
}
