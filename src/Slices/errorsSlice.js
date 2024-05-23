import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: 0,
}

export const errorsSlice = createSlice({
  name: 'errors',
  initialState,
  reducers: {
    incrementError: state => {
      state.value += 1
    },
    resetErrors: state => {
      state.value = initialState.value
    },
  },
})

export const { incrementError, resetErrors } = errorsSlice.actions

export const selectErrors = state => state.errors.value

export default errorsSlice.reducer