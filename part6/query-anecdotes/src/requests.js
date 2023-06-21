import axios from "axios";
const BASEURL = "http://localhost:3001/anecdotes";

export const getAnecdotes = () => axios.get(BASEURL).then((res) => res.data);
export const createAnecdotes = (newAnecdote) =>
    axios.post(BASEURL, newAnecdote).then((res) => res.data);
export const updateAnecdotes = (updatedAnecdote) =>
    axios.put(BASEURL + "/" + updatedAnecdote.id, updatedAnecdote).then((res) => res.data);
