import { useQuery } from '@tanstack/react-query'
import {
  fetchCompanyList,
  getCompany,
  getCompanyDocuments,
  getCompanyInternalReports,
  getCompanyProcessingReports,
  getCompanyRegulatorReports,
  getCompanyTwitterYears
} from './CompanyApi'
import { useParams } from 'react-router-dom'

export const useGetCompanyInternalReports = () => {
  const { companyId } = useParams()

  const { data } = useQuery({
    queryKey: ['useGetCompanyInternalReports', companyId],
    queryFn: () => getCompanyInternalReports(companyId),
    staleTime: 60000
  })

  return {
    internalReports: data?.results
  }
}

export const useGetCompanyRegulatorReports = () => {
  const { companyId } = useParams()

  const { data, refetch } = useQuery({
    queryKey: ['useGetCompanyRegulatorReports', companyId],
    queryFn: () => getCompanyRegulatorReports(companyId),
    staleTime: 60000
  })

  return {
    regulatorReports: data?.results,
    refetchRegulatorReports: refetch
  }
}

export const useFetchCompanyList = () => {
  return useQuery({
    queryKey: ['fetchCompanyList'],
    queryFn: () => fetchCompanyList()
  })
}

export const useGetCompany = () => {
  const { companyId } = useParams()

  const { data, refetch: refetchCompany } = useQuery({
    queryKey: ['getCompany', companyId],
    queryFn: () => getCompany(companyId),
    staleTime: 60000
  })

  return {
    companyId,
    company: data?.result,
    refetchCompany
  }
}

export const useGetCompanyDocuments = () => {
  const { companyId } = useParams()

  const { data, refetch: refetchCompanyDocuments } = useQuery({
    queryKey: ['useGetCompanyDocuments', companyId],
    queryFn: () => getCompanyDocuments(companyId),
    staleTime: 60000
  })

  return {
    companyId,
    companyDocuments: data?.result,
    refetchCompanyDocuments
  }
}

export const useGetCompanyProcessingReports = () => {
  const { companyId } = useParams()
  const { data } = useQuery({
    queryKey: ['getCompanyProcessingReports', companyId],
    queryFn: () => getCompanyProcessingReports(companyId),
    staleTime: 60000
  })

  return {
    processingReports: data?.results
  }
}

export const useGetCompanyTwitterYears = () => {
  const { companyId } = useParams()

  const { data, refetch: refetchCompanyTwitterYears } = useQuery({
    queryKey: ['useGetCompanyTwitterYears', companyId],
    queryFn: () => getCompanyTwitterYears(companyId),
    staleTime: 60000
  })

  return {
    companyId,
    companyTwitterYears: data?.result,
    refetchCompanyTwitterYears
  }
}
