import axios from 'axios';

export const http = axios.create({
  timeout: 3000,
  baseURL: 'https://netease-cloud-music-api-nu-one.vercel.app/'
})

http.interceptors.request.use((config) => {
  return config
}, (err) => {
  return Promise.reject(err)
})

http.interceptors.response.use((res) => res.data, (err) => Promise.reject(err))