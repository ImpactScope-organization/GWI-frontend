import { useQuery } from '@tanstack/react-query'
import ReportService from '../Services/reports-services'

export const useGetAllInitializedReports = () => {
  return useQuery({
    queryKey: ['useGetAllInitializedReports'],
    queryFn: () => ReportService.getAllInitializedReport()
  })
}

export const useGetAllReportsSentToRegulators = () => {
  return useQuery({
    queryKey: ['getAllReportsSentToRegulators'],
    queryFn: () => ReportService.getAllReportsSentToRegulators()
  })
}

export const useGetCompanyReport = (companyId) => {
  return useQuery({
    queryKey: ['useGetCompanyReport', companyId],
    queryFn: () => ReportService.getCompanyReport(companyId)
  })
}
