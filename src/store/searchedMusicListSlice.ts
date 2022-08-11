import { AlbumType, MusicType } from '@/types/type'
import { searchMusicApi } from '@/utils/request/api'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { StoreInterface } from '.'

export interface SearchedMusicListInterface {
  musics: {
    [any: string]: MusicType[]
  }
  albums: {
    [any: string]: AlbumType[]
  }
  currentSearchName: string
  loading: false
}

const initSearchedMusicListSlice: SearchedMusicListInterface = {
  musics: {}, // 常用数据
  albums: {}, // 专辑
  currentSearchName: '',
  loading: false
}

export const getSearchMusicList = createAsyncThunk(
  'searchedMusicList/getSearchMusicList',
  async ({ name, limit, offset }: { name: string; limit?: number; offset?: number }, { dispatch, getState }) => {
    dispatch(setMusicListLoading(true))
    const state = getState() as StoreInterface
    if (Object.keys(state.searchedMusicList.albums).some(item => item === name)) {
      dispatch(setMusicListLoading(false))
      dispatch(changeCurrentSearchName(name))
      return
    }
    const data = await searchMusicApi(name, limit, offset)
    dispatch(setMusicListLoading(false))
    return {
      musics: { [name]: data.musicList },
      albums: { [name]: data.albumList },
      name
    }
  }
)

const searchedMusicListSlice = createSlice({
  name: 'searchedMusicList',
  initialState: initSearchedMusicListSlice,
  reducers: {
    // 内部使用
    changeCurrentSearchName(state, { payload }) {
      state.currentSearchName = payload
    },
    // 外部使用
    setMusicListLoading(data, { payload }) {
      data.loading = payload
    }
  },
  extraReducers(builder) {
    builder.addCase(getSearchMusicList.fulfilled, (state, { payload }) => {
      if (!payload) return
      state.musics = { ...state.musics, ...payload.musics }
      state.albums = { ...state.albums, ...payload.albums }
      state.currentSearchName = payload.name
      state.loading = false
    })
  }
})

export const { setMusicListLoading, changeCurrentSearchName } = searchedMusicListSlice.actions

export default searchedMusicListSlice.reducer
