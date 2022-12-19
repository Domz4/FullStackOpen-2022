import { createSlice } from "@reduxjs/toolkit";
import anecdoteService from "../services/anecdotesService";

const anecdotesSlice = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
    addVote(state, action) {
      const { id } = action.payload;
      const anecdote = state.find((a) => a.id === id);
      const vote = { ...anecdote, votes: anecdote.votes + 1 };
      const sorted = state
        .map((e) => (e.id !== id ? e : vote))
        .sort((a, b) => a.votes < b.votes);
      return sorted;
    },
    setAnecdote(state, action) {
      return action.payload;
    },
    appendAnecdote(state, action) {
      state.push(action.payload);
    },
  },
});
export const { addVote, setAnecdote, appendAnecdote } = anecdotesSlice.actions;
export default anecdotesSlice.reducer;
