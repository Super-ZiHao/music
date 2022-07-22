import { getMusicSourceType } from '../function'
import { http } from './http'

/**
 * @name 歌曲名称
 * @limit 返回数量 默认 15
 * @offset 返回页数 默认 0
 * @returns
 */
export const searchMusicApi: (name: string, limit?: number, offset?: number) => any = (name, limit = 15, offset = 0) => {
  // 判断来源
  const source = getMusicSourceType()
  switch (source) {
    case '网易云': {
      return http.get(`search?keywords=${name}&limit=${limit}&offset=${offset}`).then((res: any) => res.result)
    }
    case 'QQ': {
      return http.get(`search?keywords=${name}`).then((res) => {})
    }
  }
}
