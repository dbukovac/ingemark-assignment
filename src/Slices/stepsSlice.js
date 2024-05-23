import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: 1
}

export const stepsSlice = createSlice({
  name: 'steps',
  initialState,
  reducers: {
    nextStep: state => {
      state.value += 1
    },
    reset: state => {
      state.value = 2
    },
    newGame: state => {
      state.value = initialState.value
    },
  },
})

export const { nextStep, reset, newGame } = stepsSlice.actions

export const selectStep = state => state.steps.value

export default stepsSlice.reducer