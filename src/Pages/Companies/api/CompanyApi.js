import { getApi } from '../../../utils/api'

export const createCompany = async (company) => {
  const response = await (await getApi()).post(`/api/company/create`, company)
  return response.data
}

export const updateCompany = async (companyId, company) => {
  const response = await (await getApi()).put(`/api/company/${companyId}/update`, company)
  return response.data
}

export const fetchCompanyList = async () => {
  const response = await (await getApi()).get(`/api/company`)
  return response.data
}

export const getCompany = async (companyId) => {
  const response = await (await getApi()).get(`/api/company/${companyId}`)
  return response.data
}

export const getCompanyInternalReports = async (companyId) => {
  const response = await (await getApi()).get(`/api/company/${companyId}/reports/internal`)
  return response.data
}

export const getCompanyRegulatorReports = async (companyId) => {
  const response = await (await getApi()).get(`/api/company/${companyId}/reports/regulator`)
  return response.data
}

export const getCompanyProcessingReports = async (companyId) => {
  const response = await (await getApi()).get(`/api/company/${companyId}/reports/processing`)
  return response.data
}

export const getCompanyDocuments = async (companyId) => {
  const response = await (await getApi()).get(`/api/company/${companyId}/documents`)
  return response.data
}

export const getCompanyTwitterYears = async (companyId) => {
  const response = await (await getApi()).get(`/api/company/${companyId}/twitter-years`)
  return response.data
}
