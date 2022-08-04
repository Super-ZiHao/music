import { getMusicUrlString, musicSourceActuator } from '../function'
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
        return http.get('search/hot/detail').then((res: any) =>
          res.data.map((item: any) => ({
            searchWord: item.searchWord, // 搜索词
            score: item.score, // 搜索数量
            iconUrl: item.iconUrl, // 搜索icon
            content: item.content // 搜索上下文
          }))
        )
      }
      return http.get('search/hot').then((res: any) => res.result.hots)
    },
    () => {
      return http.get('search/hot')
    }
  )
}

/**
 * 获取搜索建议
 * @param 值value
 */
export const getSuggestApi: (value: string) => any = value => {
  return musicSourceActuator(
    () =>
      http.get(`search/suggest?keywords=${value}`).then((res: any) => {
        const resetName = (names: string[]) => {
          let newName = ''
          names.forEach(item => (newName += ` ${item}`))
          return newName
        }
        const songs = res.result?.songs.map((item: any) => ({
          id: item.id,
          musicName: item.name,
          singerName: resetName(item.artists.map((item: any) => item.name))
        }))
        const artists = res.result.artists?.map((item: any) => ({ id: item.id, singerName: item.name }))
        const albums = res.result?.albums.map((item: any) => ({ id: item.id, albumName: item.name, singerName: item.artist.name }))
        return {
          songs: songs ? songs : [],
          artists: artists ? artists : [],
          albums: albums ? albums : []
        }
      }),
    () => http.get(`search/suggest?keywords=${value}`).then(res => res)
  )
}

/**
 * 获取详情专辑详情
 * @param 专辑id
 */
export const getAlbumApi: (id: number) => any = id => {
  return musicSourceActuator(
    () => http.get(`album?id=${id}`).then((res: any) => res.album),
    () => http.get(`album?id=${id}`).then(res => res)
  )
}

/**
 * 获取歌词
 * @param 歌曲id
 */
export const getLyricApi: (id: number) => any = id => {
  return musicSourceActuator(
    () =>
      http.get(`lyric?id=${id}`).then((res: any) => {
        return res.lrc.lyric
          .split('[')
          .map((item: string) => {
            const dataArr = item.split(']')
            // 格式化时间
            const date = dataArr[0].split(':')
            const second = Number(date[0]) * 60 + Number(date[1])
            return {
              time: second,
              text: dataArr[1]
            }
          })
          .filter((item: any) => item.time && item.text !== '\n')
      }),
    () => http.get(`lyric?id=${id}`)
  )
}

/**
 * 获取歌曲 url
 */
// export const getMusicUrlApi: (id: number) => any = id => {
//   return musicSourceActuator(
//     () => http.get(`song/url?id=${id}&br=320000`).then((res: any) => {
//       // http://m701.music.126.net/20220804131109/60572ce621d9544bbbd8a78b529030c1/jdymusic/obj/wo3DlMOGwrbDjj7DisKw/14096469374/99cf/d5ca/bd53/0ebc3bc6cdb984d880ba58be8c5934af.mp3
//       console.log(res.data[0].url, 123)
//       if (res.data[0].url === null) return getMusicUrlString(id)
//       return res.data[0].url
//     }),
//     () => http.get(`song/url?id=${id}`).then((res: any) => res.data.url)
//   )
// }

export const getMusicUrlApi: (id: number) => any = id => {
  return musicSourceActuator(
    () => getMusicUrlString(id),
    () => getMusicUrlString(id)
  )
}
