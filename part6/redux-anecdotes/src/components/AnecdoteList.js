import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  hideNotification,
  showNotification,
} from "../reducers/notificationReducer";
import { votingAnecdotes, initialAnecdotes } from "../reducers/anecdoteReducer";
function AnecdoteList() {
  const dispatch = useDispatch();
  const anecdotes = useSelector((state) =>
    state.anecdotes.filter((e) => e.content.includes(state.filter))
  );
  useEffect(() => {
    dispatch(initialAnecdotes());
  }, [dispatch]);

  const handleVote = async (anecdote) => {
    dispatch(votingAnecdotes(anecdote));
    dispatch(showNotification(`you voted for ${anecdote.content}`));
    setTimeout(() => dispatch(hideNotification()), 5000);
  };
  const anecdotesSorted = anecdotes.sort((a, b) => a.votes < b.votes);
  return (
    <>
      {anecdotesSorted.map((anecdote) => (
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
