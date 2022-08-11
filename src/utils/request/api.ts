import { AlbumType, MusicType } from '@/types/type'
import { message } from 'antd'
import axios from 'axios'
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
      return http
        .get(`search?keywords=${name}&limit=${limit}&offset=${offset}`)
        .then((res: any) => {
          const musicList: MusicType[] = []
          const albumList: AlbumType[] = []
          res.result.songs.forEach((item: any) => {
            const musicObj: MusicType = {
              musicName: item.name,
              musicId: item.id,
              singerName: item.artists[0].name,
              coverUrl: item.album.artist.img1v1Url,
              duration: item.duration,
              albumId: item.album.id,
              musicUrl: '', // 无
              lyric: [] // 无
            }
            const albumsObj: AlbumType = {
              id: item.album.id,
              name: item.album.name,
              url: ''
            }
            musicList.push(musicObj)
            albumList.push(albumsObj)
          })
          return {
            musicList,
            albumList
          }
        })
        .catch(error => {
          return new Error('error')
        })
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
        return http
          .get('search/hot/detail')
          .then((res: any) =>
            res.data.map((item: any) => ({
              searchWord: item.searchWord, // 搜索词
              score: item.score, // 搜索数量
              iconUrl: item.iconUrl, // 搜索icon
              content: item.content // 搜索上下文
            }))
          )
          .catch(err => {
            return undefined
          })
      }
      return http
        .get('search/hot')
        .then((res: any) => res.result.hots)
        .catch(err => {
          return undefined
        })
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
 * 获取专辑详情
 * @param 专辑id
 */
export const getAlbumApi: (id: number) => any = id => {
  return musicSourceActuator(
    () =>
      http.get(`album?id=${id}`).then((res: any) => ({
        id: res.album.id,
        name: res.album.name,
        url: res.album.picUrl
      })),
    () =>
      http.get(`album?id=${id}`).then((res: any) => ({
        id: res.album.id,
        name: res.album.name,
        url: res.album.picUrl
      }))
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
export const getMusicUrlApi: (id: number) => any = id => {
  return musicSourceActuator(
    () =>
      axios.get(`/api/song/media/outer/url?id=${id}&br=320000`).then((res: any) => {
        return res.request.responseURL
      }),
    () => http.get(`song/url?id=${id}`).then((res: any) => res.data.url)
  )
}

/**
 * 获取所有排行榜
 */
export const getAllRankingListApi: () => any = () => {
  return musicSourceActuator(
    () =>
      http
        .get('toplist')
        .then((res: any) => {
          return res.list.map((item: any) => ({
            id: item.id,
            name: item.name,
            desc: item.description,
            updateFrequency: item.updateFrequency,
            updateTime: item.updateTime,
            coverImgUrl: item.coverImgUrl
          }))
        })
        .catch(err => {
          message.error('获取排行榜数据出错，请确认是否连接网络')
          return []
        }),
    () => http.get('')
  )
}

/**
 * 获取歌单详情
 */
export const getSongSheetDetailApi: (id: number) => any = id => {
  return musicSourceActuator(
    () =>
      http
        .get(`playlist/detail?id=${id}`)
        .then((res: any) => {
          console.log(res.playlist.tracks);
          return res.playlist.tracks.map((item: any) => ({
            musicId: item.al.id,
            musicName: item.al.name,
            musicUrl: '',
            singerName: item.ar.reduce((value: string, item: any, index: number) => `${item.name}${index > 0 ? '、' : ''}${value}`, ''),
            coverUrl: item.al.picUrl
          }))
        })
        .catch(err => message.error('当前网络不佳，请检查网络是否有效。')),
    () =>
      http
        .get(`playlist/detail?id=${id}`)
        .then((res: any) => {
          return res.playlist.tracks.map((item: any) => ({
            musicId: item.al.id,
            musicName: item.al.name,
            musicUrl: '',
            singerName: item.ar.reduce((value: string, item: any, index: number) => `${item.name}${index > 0 ? '、' : ''}${value}`, ''),
            coverUrl: item.al.picUrl
          }))
        })
        .catch(err => message.error('当前网络不佳，请检查网络是否有效。'))
  )
}
