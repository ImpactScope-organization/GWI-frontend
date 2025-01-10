import axios from 'axios'
import apiUrl from '../../../utils/baseURL'

export const getPromptCategories = async () => {
  const response = await axios.get(`${apiUrl}/api/prompt-category`)
  return response.data
}

export const getRootPromptCategories = async () => {
  const response = await axios.get(`${apiUrl}/api/prompt-category/root`)
  return response.data
}
export const getGroupedPromptCategories = async () => {
  const response = await axios.get(`${apiUrl}/api/prompt-category/grouped`)
  return response.data
}

export const getPromptCategory = async (id) => {
  const response = await axios.get(`${apiUrl}/api/prompt-category/${id}`)
  return response.data
}

export const createPromptCategory = async (promptCategory) => {
  const response = await axios.post(`${apiUrl}/api/prompt-category/create`, promptCategory)
  return response.data
}

export const updatePromptCategory = async (id, promptCategory) => {
  const response = await axios.put(`${apiUrl}/api/prompt-category/update/${id}`, promptCategory)
  return response.data
}

export const deletePromptCategory = async (id) => {
  const response = await axios.delete(`${apiUrl}/api/prompt-category/delete/${id}`)
  return response.data
}
