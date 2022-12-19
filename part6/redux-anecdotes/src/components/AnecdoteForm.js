import { appendAnecdote } from "../reducers/anecdoteReducer";
import { createAnecdote } from "../reducers/anecdoteReducer";
import { useDispatch } from "react-redux";
import {
  hideNotification,
  showNotification,
} from "../reducers/notificationReducer";
function AnecdoteForm() {
  const dispatch = useDispatch();

  const handleAnecdote = async (e) => {
    e.preventDefault();
    const content = e.target.anecdote.value;
    e.target.anecdote.value = "";
    dispatch(createAnecdote(content));
    dispatch(showNotification(`New anecdote added: ${content}`));
    setTimeout(() => dispatch(hideNotification()), 5000);
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
