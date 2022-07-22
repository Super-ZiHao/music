import { getMusicSourceType } from '@/utils/function'
import { createSlice } from '@reduxjs/toolkit'
import { MusicInterface } from './currentPlayMusicSlice'

export type MusicListType = MusicInterface[]

const initSearchedMusicListSlice: MusicListType = [
  {
    musicId: 513360721,
    musicName: '云烟成雨',
    singerName: '房东的猫',
    coverUrl: 'https://p2.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg',
    album: '母鸡'
  },
  {
    musicId: 513360721,
    musicName: '云烟成雨',
    singerName: '房东的猫',
    coverUrl: 'https://p2.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg',
    album: '母鸡'
  }
]

// 创建一个 slice
const searchedMusicListSlice = createSlice({
  name: 'music',
  // 初始化状态
  initialState: initSearchedMusicListSlice,
  // 内部定义状态的方法
  reducers: {
    setMusicList(data: any) {
      // 获取当前所处的音乐 api
      const source = getMusicSourceType()
      // 区分不同的来源数据，统一整理成该程序可以处理的数据
      switch (source) {
        case '网易云': {
        }
        case 'QQ': {
        }
      }
    }
  }
})

// 导出定义的方法
export const { setMusicList } = searchedMusicListSlice.actions

// 默认导出
export default searchedMusicListSlice.reducer
