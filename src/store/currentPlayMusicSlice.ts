import { MusicType, AlbumType } from '@/types/type'
import { musicSourceActuator } from '@/utils/function'
import { getAlbumApi, getLyricApi, getMusicUrlApi } from '@/utils/request/api'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export interface CurrentPlayerMusicInterface {
  currentMusic: MusicType
  currentMusicAlbum: AlbumType
}

const initCurrentPlayerMusicSlice: CurrentPlayerMusicInterface = {
  currentMusic: {
    musicId: -1,
    musicName: '',
    musicUrl: '',
    singerName: '',
    coverUrl: '',
    albumId: -1,
    duration: 0,
    lyric: []
  },
  currentMusicAlbum: {
    id: -2,
    name: '',
    url: 'https://p2.music.126.net/u7AqOOVQ1DDl38M8LOzFXw==/109951166221876266.jpg'
  }
}

export const getAlbum = createAsyncThunk('currentPlayMusic/getAlbum', async (id: number, d) => {
  return await getAlbumApi(id)
})
export const getLyric = createAsyncThunk('currentPlayMusic/getLyric', async (id: number, d) => {
  if (id < 0) return
  return await getLyricApi(id)
})
export const getMusicUrl = createAsyncThunk('currentPlayMusic/getUrl', async (id: number, d) => {
  return await getMusicUrlApi(id)
})

// 创建一个 slice
const currentPlayMusicSlice = createSlice({
  name: 'current-play-music',
  // 初始化状态
  initialState: initCurrentPlayerMusicSlice,
  // 内部定义状态的方法
  reducers: {
    setCurrentMusic(state, { payload }) {
      state.currentMusic = payload
    }
  },
  extraReducers(builder) {
    builder.addCase(getAlbum.fulfilled, (state, { payload }) => {
      state.currentMusicAlbum = payload
    }),
      builder.addCase(getLyric.fulfilled, (state, { payload }) => {
        if (!payload) return
        state.currentMusic.lyric = payload
      }),
      builder.addCase(getMusicUrl.fulfilled, (state, { payload }) => {
        state.currentMusic.musicUrl = payload
      })
  }
})

// 导出定义的方法
export const { setCurrentMusic } = currentPlayMusicSlice.actions

// 默认导出
export default currentPlayMusicSlice.reducer
