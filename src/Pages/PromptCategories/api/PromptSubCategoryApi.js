import axios from 'axios'
import apiUrl from '../../../utils/baseURL'

export const getSubCategoriesByParentId = async (parentId) => {
  const response = await axios.get(`${apiUrl}/api/prompt-category/sub-category/${parentId}`)
  return response.data
}

export const createPromptSubCategory = async (name, parentId) => {
  const response = await axios.post(`${apiUrl}/api/prompt-category/create`, {
    name,
    parentId,
    isQuantitative: true
  })
  return response.data
}
