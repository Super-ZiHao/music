import { createSlice } from '@reduxjs/toolkit'

export interface MusicInterface {
  musicName: string // 音乐名称
  musicId: number // 音乐 id
  singerName: string // 歌手名称
  coverUrl: string // 封面地址
  album: string // 专辑名称
}
const initCurrentPlayMusicSlice: MusicInterface = {
  musicId: 513360721,
  musicName: '云烟成雨',
  singerName: '房东的猫',
  coverUrl: 'https://p2.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg',
  album: '母鸡'
}

// 创建一个 slice
const currentPlayMusicSlice = createSlice({
  name: 'music',
  // 初始化状态
  initialState: initCurrentPlayMusicSlice,
  // 内部定义状态的方法
  reducers: {}
})

// 导出定义的方法
export const {} = currentPlayMusicSlice.actions

// 默认导出
export default currentPlayMusicSlice.reducer
