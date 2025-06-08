import { getApi } from '../../../../utils/api'

export const createManualReportQueueItem = async (data) => {
  const response = await (
    await getApi()
  ).post(`/api/report-queue/create/manual`, data, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
  return response.data
}

export const createDocumentReportQueueItem = async (data) => {
  const response = await (await getApi()).post(`/api/report-queue/create/document`, data)
  return response.data
}

export const createDynamicReportQueueItem = async (data) => {
  const response = await (await getApi()).post(`/api/report-queue/create/dynamic`, data)
  return response.data
}

export const fetchReportQueueStatus = async (id) => {
  const response = await (await getApi()).get(`/api/report-queue/${id}`)
  return response.data
}
