import { MusicType, RankingListType } from '@/types/type'
import { getAllRankingListApi, getSongSheetDetailApi } from '@/utils/request/api'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export interface RankingListInterface {
  rankingList: RankingListType[]
  rankingListData: {
    [any: string]: MusicType[]
  }
}

const initRankingListSlice: RankingListInterface = {
  rankingList: [],
  rankingListData: {}
}

export const getAllRankingList = createAsyncThunk('rankingList/getAllRankingList', async () => {
  return await getAllRankingListApi()
})
export const getSongSheetDetail = createAsyncThunk('rankingListData/getSongSheetDetail', async (id: number) => {
  const data = await getSongSheetDetailApi(id)
  return {
    data,
    id
  }
})

const rankingListSlice = createSlice({
  name: 'rankingList',
  initialState: initRankingListSlice,
  reducers: {},
  extraReducers(builder) {
    // 获取所有排行榜数据
    builder.addCase(getAllRankingList.fulfilled, (state, { payload }) => {
      state.rankingList = payload
    }),
      // 获取歌单数据
      builder.addCase(getSongSheetDetail.fulfilled, (state, { payload }) => {
        state.rankingListData[payload.id] = payload.data
      })
  }
})

export const {} = rankingListSlice.actions
export default rankingListSlice.reducer
