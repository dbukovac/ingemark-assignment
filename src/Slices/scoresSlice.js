import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchScores } from '../Api/fetchScores';

const initialState = {
  value: [],
  status: "idle",
}

export const fetchScoresAsync = createAsyncThunk(
  'scores/fetchScores',
  async () => {
    const response = await fetchScores();
    return response;
  }
)

export const scoresSlice = createSlice({
  name: 'scores',
  initialState,
  extraReducers: builder => {
    builder
      .addCase(fetchScoresAsync.pending, state => {
        state.status = 'loading'
      })
      .addCase(fetchScoresAsync.fulfilled, (state, action) => {
        state.value = action.payload
        state.status = 'idle'
      })
  }
})

export const selectScores = state => state.scores.value

export default scoresSlice.reducer