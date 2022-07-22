import { configureStore } from '@reduxjs/toolkit'
import currentPlayMusicSlice, { MusicInterface } from './currentPlayMusicSlice'
import searchedMusicListSlice from './searchedMusicListSlice'

export interface StoreInterface {
  currentPlayerMusic: MusicInterface
  searchedMusicList: MusicInterface[]
}

const store = configureStore({
  // 合并多个 slice
  reducer: {
    currentPlayerMusic: currentPlayMusicSlice, // 当前播放的音乐数据
    searchedMusicList: searchedMusicListSlice // 当前搜索到的音乐数据组
  }
})

export default store
