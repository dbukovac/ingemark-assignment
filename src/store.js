import { configureStore } from '@reduxjs/toolkit'
import stepsReducer from '../src/Slices/stepsSlice'
import userReducer from '../src/Slices/userSlice'
import quoteReducer from '../src/Slices/quoteSlice'
import errorReducer from '../src/Slices/errorsSlice'
import timerReducer from '../src/Slices/timerSlice'
import scoresReducer from '../src/Slices/scoresSlice'

export const store = configureStore({
  reducer: {
    steps: stepsReducer,
    user: userReducer,
    quote: quoteReducer,
    errors: errorReducer,
    timer: timerReducer,
    scores: scoresReducer
  }
})