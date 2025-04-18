import { getApi } from '../../../../utils/api'

export const createReportQueueItem = async (data) => {
  const response = await (
    await getApi()
  ).post(`/api/report-queue/create`, data, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
  return response.data
}

export const fetchReportQueueStatus = async (id) => {
  const response = await (await getApi()).get(`/api/report-queue/${id}`)
  return response.data
}
