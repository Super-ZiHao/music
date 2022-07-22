import axios from 'axios'
import { getMusicSourceType } from '../function'

const getApiBaseUrl = () => {
  const source = getMusicSourceType()
  switch (source) {
    case '网易云':
      return 'https://netease-cloud-music-api-nu-one.vercel.app'
    case 'QQ':
      return 'https://netease-cloud-music-api-nu-one.vercel.appqq'
  }
}

export const http = axios.create({
  timeout: 10000,
  baseURL: getApiBaseUrl()
})

http.interceptors.request.use(
  (config) => {
    return config
  },
  (err) => {
    return Promise.reject(err)
  }
)

http.interceptors.response.use(
  (res) => res.data,
  (err) => Promise.reject(err)
)
