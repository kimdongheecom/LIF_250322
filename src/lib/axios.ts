// src/lib/axios.ts
import axios from 'axios'
import { getAccessToken } from './authToken'


const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
})

api.interceptors.request.use((config) => {
  const accessToken = getAccessToken()
  if (accessToken) {
    console.log("🔏🔐🔒🔓accessToken", accessToken)
    config.headers.Authorization = `Bearer ${accessToken}`
  }
  return config
})

export default api