import { RankingListType } from '@/types/type'
import { getAllRankingListApi } from '@/utils/request/api'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export interface RankingListInterface {
  rankingList: RankingListType[]
}

const initRankingListSlice: RankingListInterface = {
  rankingList: []
}

export const getAllRankingList = createAsyncThunk('rankingList/getAllRankingList', async () => {
  return await getAllRankingListApi()
})

const rankingListSlice = createSlice({
  name: 'ranking-list',
  initialState: initRankingListSlice,
  reducers: {},
  extraReducers(builder) {
    // 获取所有排行榜数据
    builder.addCase(getAllRankingList.fulfilled, (state, { payload }) => {
      state.rankingList = payload
    })
  }
})

export const {} = rankingListSlice.actions
export default rankingListSlice.reducer
