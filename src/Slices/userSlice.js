import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: "",
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUsername: (state, action) => {
      state.value = action.payload
    }
  },
});

export const { setUsername } = userSlice.actions;

export const selectUser = state => state.user.value;

export default userSlice.reducer;