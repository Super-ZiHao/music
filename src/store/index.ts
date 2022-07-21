import { configureStore } from '@reduxjs/toolkit'
import currentPlayMusicSlice, { MusicInterface } from './currentPlayMusicSlice'

export interface StoreInterface {
  music: MusicInterface
}

const store = configureStore({
  // 合并多个 slice
  reducer: {
    music: currentPlayMusicSlice
  }
})

export default store
