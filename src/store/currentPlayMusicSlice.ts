import { MusicType } from '@/types/type'
import { createSlice } from '@reduxjs/toolkit'

export interface CurrentPlayerMusicInterface {
  currentMusic: MusicType
  currentMusicAlbum: any
}

const initCurrentPlayerMusicSlice: CurrentPlayerMusicInterface = {
  currentMusic: {
    musicId: -1,
    musicName: '',
    singerName: '',
    coverUrl: '',
    albumId: '',
    duration: 0
  },
  currentMusicAlbum: {}
}

// 创建一个 slice
const currentPlayMusicSlice = createSlice({
  name: 'music',
  // 初始化状态
  initialState: initCurrentPlayerMusicSlice,
  // 内部定义状态的方法
  reducers: {
    setCurrentMusic(state, { payload }) {
      state.currentMusic = payload
    }
  }
})

// 导出定义的方法
export const { setCurrentMusic } = currentPlayMusicSlice.actions

// 默认导出
export default currentPlayMusicSlice.reducer
