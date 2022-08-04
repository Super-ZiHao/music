import { AlbumType, MusicType } from '@/types/type'
import { musicSourceActuator } from '@/utils/function'
import { createSlice } from '@reduxjs/toolkit'

export interface SearchedMusicListInterface {
  musics: MusicType[]
  albums: AlbumType[]
  loading: false
}

const initSearchedMusicListSlice: SearchedMusicListInterface = {
  musics: [], // 常用数据
  albums: [], // 专辑
  loading: false
}

// 创建一个 slice
const searchedMusicListSlice = createSlice({
  name: 'music',
  // 初始化状态
  initialState: initSearchedMusicListSlice,
  // 内部定义状态的方法
  reducers: {
    setMusicList(data, { payload }) {
      if (!payload) return
      const musicList: MusicType[] = []
      const albumList: AlbumType[] = []
      // 获取当前所处的音乐 api
      musicSourceActuator(
        () => {
          payload.map((item: any) => {
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
        },
        () => {}
      )
      // 区分不同的来源数据，统一整理成该程序可以处理的数据
      data.musics = musicList
      data.albums = albumList
      data.loading = false
    },
    setMusicListLoading(data, { payload }) {
      data.loading = payload
    }
  }
})

// 导出定义的方法
export const { setMusicList, setMusicListLoading } = searchedMusicListSlice.actions
// 默认导出
export default searchedMusicListSlice.reducer
