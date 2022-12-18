import { addVote } from "../reducers/anecdoteReducer";
import { useSelector, useDispatch } from "react-redux";
import {
  hideNotification,
  showNotification,
} from "../reducers/notificationReducer";

function AnecdoteList() {
  const anecdotes = useSelector((state) => state.anecdotes);
  const dispatch = useDispatch();
  const handleVote = (anecdote) => {
    dispatch(addVote(anecdote.id));
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
