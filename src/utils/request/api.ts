import { getMusicSourceType } from '../function'
import { http } from './http'
// 搜索歌曲
export const searchMusicApi: (name: string) => any = (name) =>
  http.get(`search?keywords=${name}`).then((res) => {
    // 判断来源
    const source = getMusicSourceType()
    switch (source) {
      case '网易云': {
        return res
      }
      case 'QQ': {
        return res
      }
    }
  })
