import axios from 'axios'
import { musicSourceActuator } from '../function'

const getApiBaseUrl = () => {
  return musicSourceActuator(
    () => 'https://netease-cloud-music-api-nu-one.vercel.app',
    () => 'https://qq-music-api-coral.vercel.app/'
  )
}

export const http = axios.create({
  timeout: 20000,
  baseURL: getApiBaseUrl()
})

http.interceptors.request.use(
  config => {
    return config
  },
  err => {
    return Promise.reject(err)
  }
)

http.interceptors.response.use(
  res => res.data,
  err => Promise.reject(err)
)
