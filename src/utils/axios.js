import axios from 'axios'
import apiUrl from './baseURL'

export const axiosInstance = axios.create({
  baseURL: `${apiUrl}/api`, // Replace with your API base URL
  timeout: 10000000,
  headers: { 'Content-Type': 'application/json' }
})
