import { addVote } from "../reducers/anecdoteReducer";
import { useSelector, useDispatch } from "react-redux";

function AnecdoteList() {
  const anecdotes = useSelector((state) => state);
  const dispatch = useDispatch();
  const vote = (id) => {
    dispatch(addVote(id));
  };
  return (
    <>
      {anecdotes
        .sort((a, b) => a.votes < b.votes)
        .map((anecdote) => (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button onClick={() => vote(anecdote.id)}>vote</button>
            </div>
          </div>
        ))}
    </>
  );
}
export default AnecdoteList;
