import { configureStore } from '@reduxjs/toolkit'
import musicSlice, { MusicInterface } from './music'

export interface StoreInterface {
  music: MusicInterface
}

const store = configureStore({
  // 合并多个 slice
  reducer: {
    music: musicSlice
  }
})

export default store
