import { useEffect } from 'react'
import { fetchReportQueueStatus } from '../api/ReportQueueApi'
import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { useGetReportByReportQueueId } from '../../../Hooks/reports-hooks'

export const useProcessingDetailsReport = () => {
  const { id: reportQueueId } = useParams()
  const { data: report, refetch: refetchReport } = useGetReportByReportQueueId(reportQueueId)

  const {
    data: { percentage, processText },
    refetch: refetchQueueStatus
  } = useQuery({
    queryKey: ['fetchReportQueueStatus', reportQueueId],
    queryFn: () => fetchReportQueueStatus(reportQueueId),
    initialData: {
      percentage: 0,
      processText: 'Creating queue item'
    }
  })

  useEffect(() => {
    const interval = setInterval(async () => {
      await refetchQueueStatus()
    }, 700)

    if (percentage === 100) {
      refetchReport()
      clearInterval(interval)
    }

    return () => {
      clearInterval(interval)
    }
  }, [percentage, refetchQueueStatus, refetchReport])

  const isReportCreated = !!report?.reportQueueId

  return { percentage, processText, report, isReportCreated }
}
