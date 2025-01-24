import axios from 'axios'
import apiUrl from '../../../utils/baseURL'

export const createReportQueueItem = async (data) => {
  const response = await axios.post(`${apiUrl}/api/report-queue/create`, data, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
  return response.data
}

export const fetchReportQueueStatus = async (id) => {
  const response = await axios.get(`${apiUrl}/api/report-queue/${id}`)
  return response.data
}

export const fetchReportQueueList = async () => {
  const response = await axios.get(`${apiUrl}/api/report-queue`)
  return response.data
}
