import { useQuery } from '@tanstack/react-query'
import {
  fetchCompanyList,
  getCompany,
  getCompanyInternalReports, getCompanyProcessingReports,
  getCompanyRegulatorReports
} from './CompanyApi'

export const useGetCompanyInternalReports = (companyId) => {
  return useQuery({
    queryKey: ['useGetCompanyInternalReports', companyId],
    queryFn: () => getCompanyInternalReports(companyId),
    staleTime: 60000
  })
}

export const useGetCompanyRegulatorReports = (companyId) => {
  return useQuery({
    queryKey: ['useGetCompanyRegulatorReports', companyId],
    queryFn: () => getCompanyRegulatorReports(companyId),
    staleTime: 60000
  })
}

export const useFetchCompanyList = () => {
  return useQuery({
    queryKey: ['fetchCompanyList'],
    queryFn: () => fetchCompanyList()
  })
}

export const useGetCompany = (companyId) => {
  return useQuery({
    queryKey: ['getCompany', companyId],
    queryFn: () => getCompany(companyId),
    staleTime: 60000
  })
}

export const useGetCompanyProcessingReports = (companyId) => {
  return useQuery({
    queryKey: ['getCompanyProcessingReports', companyId],
    queryFn: () => getCompanyProcessingReports(companyId),
    staleTime: 60000
  })
}
