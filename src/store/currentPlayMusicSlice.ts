import { MusicType, AlbumType } from '@/types/type'
import { musicSourceActuator } from '@/utils/function'
import { getAlbumApi } from '@/utils/request/api'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export interface CurrentPlayerMusicInterface {
  currentMusic: MusicType
  currentMusicAlbum: AlbumType
}

const initCurrentPlayerMusicSlice: CurrentPlayerMusicInterface = {
  currentMusic: {
    musicId: -1,
    musicName: '',
    singerName: '',
    coverUrl: '',
    albumId: -1,
    duration: 0
  },
  currentMusicAlbum: {
    id: -2,
    name: '',
    url: 'https://p2.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg'
  }
}

export const getAlbum = createAsyncThunk('currentPlayMusic/getAlbum', async (id: number, d) => {
  return await getAlbumApi(id)
})
// 创建一个 slice
const currentPlayMusicSlice = createSlice({
  name: 'currentPlayMusic',
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
      console.log(payload)
      const albumObj = musicSourceActuator<AlbumType>(
        () => ({
          id: payload.id,
          name: payload.name,
          url: payload.picUrl
        }),
        () => ({
          id: payload,
          name: payload,
          url: payload
        })
      )
      state.currentMusicAlbum = albumObj
    })
  }
})

// 导出定义的方法
export const { setCurrentMusic } = currentPlayMusicSlice.actions

// 默认导出
export default currentPlayMusicSlice.reducer
