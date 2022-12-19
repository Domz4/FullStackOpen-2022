import { createSlice } from "@reduxjs/toolkit";
import anecdoteServices from "../services/anecdotesService";

const anecdotesSlice = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
    addVote(state, action) {
      const { id } = action.payload;
      const anecdote = state.find((a) => a.id === id);
      const vote = { ...anecdote, votes: anecdote.votes + 1 };
      return state.map((e) => (e.id !== id ? e : vote));
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

export const initialAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteServices.getAll();
    dispatch(setAnecdote(anecdotes));
  };
};
export const votingAnecdotes = (anecdote) => {
  return async (dispatch) => {
    const anecdoteVote = await anecdoteServices.updateAnecdote(anecdote);
    dispatch(addVote(anecdoteVote));
  };
};
export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newContent = await anecdoteServices.createNew(content);
    dispatch(appendAnecdote(newContent));
  };
};
export default anecdotesSlice.reducer;
