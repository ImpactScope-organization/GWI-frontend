import axios from 'axios'
import apiUrl from '../../../utils/baseURL'

export const getAllDefaultPrompts = async () => {
  const response = await axios.get(`${apiUrl}/api/default-prompt`)
  return response?.data?.result
}

export const setDefaultPrompt = async (promptToSet) => {
  const response = await axios.post(`${apiUrl}/api/default-prompt/set`, promptToSet)
  return response?.data?.result
}
