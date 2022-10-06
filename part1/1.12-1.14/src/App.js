import { useState } from "react";

const Display = ({ anecdote, votes }) => {
  return (
    <>
      <p id="anecdote">{anecdote}</p>
      <p>
        Has <b> {votes} </b>votes!
      </p>
    </>
  );
};
const Button = ({ handleClick, text }) => {
  return (
    <>
      <button className="btn" onClick={handleClick}>
        {text}
      </button>
    </>
  );
};

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
  ];
  const [selected, setSelected] = useState(0);
  const [points, setPoints] = useState({
    0: 0,
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
  });

  const [mostVotes, setMostVotes] = useState(0);

  // handleClicks
  const setToSelected = () => () => {
    setSelected(randomNum);
  };
  const setToNext = (newValue) => () => {
    return newValue >= anecdotes.length - 1
      ? setSelected((newValue = 0))
      : setSelected(newValue + 1);
  };
  const setToPrev = (newValue) => () => {
    return newValue <= 0
      ? setSelected((newValue = anecdotes.length - 1))
      : setSelected(newValue - 1);
  };
  const randomNum = () => {
    let temp = Math.floor(Math.random() * anecdotes.length);
    while (temp === selected) {
      temp = Math.floor(Math.random() * anecdotes.length);
    }
    return temp;
  };

  const votes = () => {
    const newPoints = { ...points };
    newPoints[selected] += 1;
    setPoints(newPoints);
    if (newPoints[mostVotes] < newPoints[selected]) {
      setMostVotes(selected);
    }
  };
  return (
    <>
      <div className="display">
        <Display
          anecdote={anecdotes[selected]}
          votes={points[selected]}
        ></Display>
        <Display
          anecdote={anecdotes[mostVotes]}
          votes={points[mostVotes]}
        ></Display>
      </div>
      <div className="btns">
        <Button
          handleClick={setToPrev(selected)}
          text="Previous anecdote"
        ></Button>
        <Button handleClick={setToSelected()} text="Random anecdote"></Button>
        <Button handleClick={setToNext(selected)} text="Next anecdote"></Button>
        <Button handleClick={votes} text="Vote!"></Button>
      </div>
    </>
  );
};

export default App;
