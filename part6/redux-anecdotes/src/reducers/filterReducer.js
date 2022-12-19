import { createSlice } from "@reduxjs/toolkit";

const initialState = "";

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    filterAnecdotes(state, action) {
      state = action.payload;
      return state;
    },
  },
});


export const { filterAnecdotes } = filterSlice.actions;
export default filterSlice.reducer;
