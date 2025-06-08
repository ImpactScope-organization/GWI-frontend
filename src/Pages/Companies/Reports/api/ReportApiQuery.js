import { useQuery } from '@tanstack/react-query'
import { getReportPlatforms } from './ReportApi'

export const useGetReportPlatforms = () => {
  const { data } = useQuery({
    queryKey: ['useGetReportPlatforms'],
    queryFn: () => getReportPlatforms(),
    staleTime: 60000
  })

  return {
    reportPlatforms: data?.data?.result || []
  }
}
