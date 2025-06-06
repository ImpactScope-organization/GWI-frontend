import { getApi } from '../../../../utils/api'

export const createClientUser = async (clientId, client) => {
  const response = await (await getApi()).post(`/api/client/${clientId}/user/create`, client)
  return response.data
}

export const fetchClientUserList = async (clientId) => {
  const response = await (await getApi()).get(`/api/client/${clientId}/user`)
  return response.data
}

export const addClientToExistingUser = async (clientUser) => {
  const response = await (
    await getApi()
  ).put(`/api/client/${clientUser.clientId}/user/${clientUser.id}/add`)
  return response.data
}

export const removeClientFromExistingUser = async (clientUser) => {
  const response = await (
    await getApi()
  ).delete(`/api/client/${clientUser.clientId}/user/${clientUser.id}/remove`)
  return response.data
}
