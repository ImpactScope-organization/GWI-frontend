import axios from 'axios'
import apiUrl from '../../../../../utils/baseURL'

export const getPromptCategories = async () => {
  const response = await axios.get(`${apiUrl}/api/prompt-category`)
  return response.data
}

export const createPromptCategory = async (category) => {
  const response = await axios.post(`${apiUrl}/api/prompt-category/create`, { name: category })
  return response.data
}

export const updatePromptCategory = async (id, category) => {
  const response = await axios.put(`${apiUrl}/api/prompt-category/update/${id}`, { name: category })
  return response.data
}

export const deletePromptCategory = async (id) => {
  const response = await axios.delete(`${apiUrl}/api/prompt-category/delete/${id}`)
  return response.data
}
