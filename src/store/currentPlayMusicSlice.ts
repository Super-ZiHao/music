import { createSlice } from '@reduxjs/toolkit'

export interface MusicInterface {
  musicName: string // 音乐名称
  musicId: number // 音乐 id
  singerName: string // 歌手名称
  coverUrl: string // 封面地址
  album: string // 专辑名称
  duration: number // 歌曲的总时长
  [any: string]: any
}
const initCurrentPlayMusicSlice: MusicInterface = {
  musicId: -1,
  musicName: '',
  singerName: '',
  coverUrl: '',
  album: '',
  duration: 0
}

// 创建一个 slice
const currentPlayMusicSlice = createSlice({
  name: 'music',
  // 初始化状态
  initialState: initCurrentPlayMusicSlice,
  // 内部定义状态的方法
  reducers: {
    setMusic(state, { payload }) {
      Object.keys(payload).forEach((item) => {
        state[item] = payload[item]
      })
    }
  }
})

// 导出定义的方法
export const { setMusic } = currentPlayMusicSlice.actions

// 默认导出
export default currentPlayMusicSlice.reducer
