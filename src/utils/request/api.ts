import { musicSourceActuator } from '../function'
import { http } from './http'

/**
 * @name 歌曲名称
 * @limit 返回数量 默认 15
 * @offset 返回页数 默认 0
 * @returns
 */
export const searchMusicApi: (name: string, limit?: number, offset?: number) => any = (name, limit = 25, offset = 0) => {
  return musicSourceActuator(
    () => {
      console.log(`https://netease-cloud-music-api-nu-one.vercel.app/search?keywords=${name}&limit=${limit}&offset=${offset}`)
      return http.get(`search?keywords=${name}&limit=${limit}&offset=${offset}`).then((res: any) => res.result)
    },
    () => {
      return http.get(`search?keywords=${name}`).then((res) => {})
    }
  )
}

export const getAlbumApi: (id: number) => any = (id) => {
  return musicSourceActuator(
    () => http.get(`/album?id=${id}`).then((res: any) => res.album),
    () => http.get(`/album?id=${id}`).then((res) => res)
  )
}
