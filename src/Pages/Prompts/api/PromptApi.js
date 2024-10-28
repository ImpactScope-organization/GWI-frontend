import axios from 'axios'
import apiUrl from '../../../utils/baseURL'

export const createPromptCategory = async (data) => {
  const response = await axios.post(`${apiUrl}/api/prompt/create`, data, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
  return response.data
}

export const testPromptCategory = async (data) => {
  const response = await axios.post(`${apiUrl}/api/prompt/test`, data, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
  return response.data
}
