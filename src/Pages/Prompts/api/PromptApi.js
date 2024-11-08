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

export const updatePrompt = async (id, data) => {
  const response = await axios.put(`${apiUrl}/api/prompt/update/${id}`, data)
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
export const testExistingPrompt = async (id, data) => {
  const response = await axios.post(`${apiUrl}/api/prompt/test/${id}`, data)
  return response.data
}

export const getPrompt = async (id) => {
  const response = await axios.get(`${apiUrl}/api/prompt/${id}`)
  return response?.data?.result
}

export const getAllPrompts = async () => {
  const response = await axios.get(`${apiUrl}/api/prompt/all`)
  return response?.data?.result
}

export const deletePrompt = async (id) => {
  const response = await axios.delete(`${apiUrl}/api/prompt/delete/${id}`)
  return response?.data?.result
}
