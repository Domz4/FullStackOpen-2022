import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addVote } from "../reducers/anecdoteReducer";
import {
  hideNotification,
  showNotification,
} from "../reducers/notificationReducer";
import { setAnecdote } from "../reducers/anecdoteReducer";
import anecdotesService from "../services/anecdotesService";

function AnecdoteList() {
  const dispatch = useDispatch();
  const anecdotes = useSelector((state) =>
    state.anecdotes.filter((e) => e.content.includes(state.filter))
  );
  useEffect(() => {
    anecdotesService
      .getAll()
      .then((anecdotes) => dispatch(setAnecdote(anecdotes)));
  }, [dispatch]);

  const handleVote = async (anecdote) => {
    const vote = await anecdotesService.updateAnecdote(anecdote);
    dispatch(addVote(vote));
    dispatch(showNotification(`you voted for ${anecdote.content}`));
    setTimeout(() => dispatch(hideNotification()), 5000);
  };
  return (
    <>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </>
  );
}
export default AnecdoteList;
