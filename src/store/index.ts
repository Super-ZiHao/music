import { configureStore } from '@reduxjs/toolkit'
import currentPlayMusicSlice, { CurrentPlayerMusicInterface } from './currentPlayMusicSlice'
import globalStateSlice, { GlobalStateInterface } from './globalStateSlice'
import rankingListSlice, { RankingListInterface } from './rankingListSlice'
import searchedMusicListSlice, { SearchedMusicListInterface } from './searchedMusicListSlice'

export interface StoreInterface {
  currentPlayerMusic: CurrentPlayerMusicInterface
  searchedMusicList: SearchedMusicListInterface
  globalState: GlobalStateInterface
  rankingList: RankingListInterface
}

const store = configureStore({
  // 合并多个 slice
  reducer: {
    globalState: globalStateSlice, // 全局状态
    currentPlayerMusic: currentPlayMusicSlice, // 当前播放的音乐数据
    searchedMusicList: searchedMusicListSlice, // 当前搜索到的音乐数据组
    rankingList: rankingListSlice, // 排行榜
  }
})

export default store
