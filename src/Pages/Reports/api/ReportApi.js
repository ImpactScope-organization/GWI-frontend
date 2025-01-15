import axios from 'axios'
import apiUrl from '../../../utils/baseURL'

export const createReport = async (data) => {
  const response = await axios.post(`${apiUrl}/api/report/create`, data, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
  return response.data
}
