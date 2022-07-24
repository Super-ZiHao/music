import { configureStore } from '@reduxjs/toolkit'
import currentPlayMusicSlice, { CurrentPlayerMusicInterface } from './currentPlayMusicSlice'
import searchedMusicListSlice, { SearchedMusicListInterface } from './searchedMusicListSlice'

export interface StoreInterface {
  currentPlayerMusic: CurrentPlayerMusicInterface
  searchedMusicList: SearchedMusicListInterface
}

const store = configureStore({
  // 合并多个 slice
  reducer: {
    currentPlayerMusic: currentPlayMusicSlice, // 当前播放的音乐数据
    searchedMusicList: searchedMusicListSlice // 当前搜索到的音乐数据组
  }
})

export default store
