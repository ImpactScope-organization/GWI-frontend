import axios from 'axios'
import apiUrl from '../../../utils/baseURL'

export const getSubCategoriesByParentId = async (parentId) => {
  const response = await axios.get(`${apiUrl}/api/prompt-category/sub-category/${parentId}`)
  return response.data
}
