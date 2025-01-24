import { useEffect } from 'react'
import { fetchReportQueueStatus } from '../api/ReportQueueApi'
import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'

export const useProcessReport = () => {
  const { id: reportQueryId } = useParams()
  const {
    data: { percentage, processText },
    refetch
  } = useQuery({
    queryKey: ['fetchReportQueueStatus', reportQueryId],
    queryFn: () => fetchReportQueueStatus(reportQueryId),
    initialData: {
      percentage: 0,
      processText: 'Creating queue item'
    }
  })

  useEffect(() => {
    setInterval(async () => {
      await refetch()
    }, 700)
  }, [refetch])

  return { percentage, processText }
}
