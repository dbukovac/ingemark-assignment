import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchQuote } from '../Api/fetchQuote';
import { isLetter } from '../Utils/utils';

const initialState = {
  value: [],
  id: "",
  uniqueCharacters: 0,
  status: "idle",
}

export const fetchQuoteAsync = createAsyncThunk(
  'quote/fetchQuote',
  async () => {
    const response = await fetchQuote();
    return response;
  }
)

export const quoteSlice = createSlice({
  name: 'quote',
  initialState,
  extraReducers: builder => {
    builder
      .addCase(fetchQuoteAsync.pending, state => {
        state.status = 'loading'
      })
      .addCase(fetchQuoteAsync.fulfilled, (state, action) => {
        const splitQuote = action.payload.content.split("")

        state.status = 'idle'
        state.value = splitQuote
        state.id = action.payload.id
        state.uniqueCharacters = splitQuote.reduce((acc, value) => {
          if(isLetter(value) && !acc.includes(value.toLowerCase())) {
            acc.push(value.toLowerCase())
          }
          return acc
        }, [])
      })
  }
})

export const selectQuoteValue = state => state.quote.value
export const selectQuoteId = state => state.quote.id
export const selectQuoteUniqueChars = state => state.quote.uniqueCharacters

export default quoteSlice.reducer