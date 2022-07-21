import { createSlice } from '@reduxjs/toolkit'

export interface MusicInterface {
  musicName: string // 音乐名称
  singerName: string // 歌手名称
}
const initMusic: MusicInterface = {
  musicName: '云烟成雨',
  singerName: '房东的猫'
}

// 创建一个 slice
const musicSlice = createSlice({
  name: 'music',
  // 初始化状态
  initialState: initMusic,
  // 内部定义状态的方法
  reducers: {}
})

// 导出定义的方法
export const {} = musicSlice.actions

// 默认导出
export default musicSlice.reducer
