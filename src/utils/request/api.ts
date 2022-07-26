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
      return http.get(`search?keywords=${name}`).then(res => {})
    }
  )
}
/**
 * 获取热门搜索
 * 是否查询热门搜索详情 detail = false
 */
export const getHotSearchApi: (detail?: boolean) => any = (detail = false) => {
  return musicSourceActuator(
    () => {
      if (detail) {
        return http.get('search/hot/detail').then((res: any) => res.data)
      }
      return http.get('search/hot').then((res: any) => res.result.hots)
    },
    () => {
      return http.get('search/hot')
    }
  )
}

/**
 * @param 值value
 * @returns 获取搜索建议
 */
export const getSuggestApi: (value: string) => any = value => {
  return musicSourceActuator(
    () => http.get(`search/suggest?keywords=${value}`).then(res => res),
    () => http.get(`search/suggest?keywords=${value}`).then(res => res)
  )
}

/**
 * @param 专辑id
 * @returns 专辑详情
 */
export const getAlbumApi: (id: number) => any = id => {
  return musicSourceActuator(
    () => http.get(`album?id=${id}`).then((res: any) => res.album),
    () => http.get(`album?id=${id}`).then(res => res)
  )
}
