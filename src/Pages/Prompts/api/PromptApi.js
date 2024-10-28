import axios from 'axios'
import apiUrl from '../../../utils/baseURL'

export const createPrompt = async (data) => {
  const response = await axios.post(`${apiUrl}/api/prompt/create`, data, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
  return response.data
}

export const testPrompt = async (data) => {
  const response = await axios.post(`${apiUrl}/api/prompt/test`, data, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
  return response.data
}

export const getPrompt = async (id) => {
  const response = await axios.get(`${apiUrl}/api/prompt/${id}`)
  return response?.data?.result
}
