import { addAnecdote } from "../reducers/anecdoteReducer";
import { useSelector, useDispatch } from "react-redux";

function AnecdoteForm() {
  const anecdotes = useSelector((state) => state);
  const dispatch = useDispatch();

  const handleAnecdote = (e) => {
    e.preventDefault();
    const newContent = e.target.anecdote.value;
    e.target.anecdote.value = "";
    dispatch(addAnecdote(newContent));
  };
  return (
    <>
      <h2>create new</h2>
      <form onSubmit={handleAnecdote}>
        <div>
          <input name="anecdote" />
        </div>
        <button type="submit">create</button>
      </form>
    </>
  );
}
export default AnecdoteForm;
