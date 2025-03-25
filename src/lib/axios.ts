// src/lib/axios.ts
import axios from 'axios'


const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
})

api.interceptors.request.use((config) => {
  // const token = useAuthStore.getState().accessToken
  // if (token) {
  //   config.headers.Authorization = `Bearer ${token}`
  // }
  config.headers.Authorization = `Bearer blah blah blah`
  return config
})

export default api