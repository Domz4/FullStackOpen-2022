import { useDispatch } from "react-redux";
import { filterAnecdotes } from "../reducers/filterReducer";

const Filter = () => {
  const dispatch = useDispatch();
  const handleFilter = (e) => {
    e.preventDefault();
    dispatch(filterAnecdotes(e.target.value));
  };

  return (
    <>
      <div style={{ margin: "10px" }}>
        <p>Filter anecdotes:</p>
        <input onChange={handleFilter} />
      </div>
    </>
  );
};
export default Filter;
