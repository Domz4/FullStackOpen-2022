import axios from "axios";
const baseUrl = "http://localhost:3001/anecdotes";

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};
const createNew = async (content) => {
  const newAnecdote = {
    content: content,
    votes: 0,
  };
  const response = await axios.post(baseUrl, newAnecdote);
  return response.data;
};
const updateAnecdote = async (anecdote) => {
  const id = anecdote.id;
  const response = await axios.patch(`${baseUrl}/${id}`, {
    votes: anecdote.votes + 1,
  });
  return response.data;
};
// eslint-disable-next-line
export default {
  getAll,
  createNew,
  updateAnecdote,
};
