import { createSlice } from '@reduxjs/toolkit'

export interface GlobalStateInterface {
  progressBarChange: boolean
}

const initGlobalState: GlobalStateInterface = {
  progressBarChange: false
}

const globalStateSlice = createSlice({
  name: 'global-state',
  initialState: initGlobalState,
  reducers: {
    changeProgressBar(state) {
      state.progressBarChange = !state.progressBarChange
    }
  }
})

export const { changeProgressBar } = globalStateSlice.actions

export default globalStateSlice.reducer
