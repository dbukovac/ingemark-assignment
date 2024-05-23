import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  startTimestamp: 0,
  endTimestamp: 0
}

export const errorsSlice = createSlice({
  name: 'timer',
  initialState,
  reducers: {
    startTimer: state => {
      state.startTimestamp = Date.now()
    },
    endTimer: state => {
      state.endTimestamp = Date.now()
    },
    resetTimer: state => {
      state.startTimestamp = Date.now()
      state.endTimestamp = initialState.endTimestamp
    },
  },
})

export const { startTimer, endTimer, resetTimer } = errorsSlice.actions

export const selectTime = state => state.timer.endTimestamp && state.timer.startTimestamp ? state.timer.endTimestamp - state.timer.startTimestamp : 0

export default errorsSlice.reducer