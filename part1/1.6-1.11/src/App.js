import { useState } from "react";

const StatsLine = ({ value, text }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  );
};
const Stats = ({ good, neutral, bad }) => {
  const sum = () => {
    return good + neutral + bad;
  };
  const avr = () => {
    return ((good - bad) / sum()).toFixed(2);
  };
  const precentage = () => {
    return ((good * 100) / sum()).toFixed(2) + "%";
  };
  if (sum() === 0) {
    return <p>No feedback</p>;
  } else {
    return (
      <>
        <h2>Statistics</h2>
        <table>
          <tbody>
            <StatsLine value={good} text="Good:"></StatsLine>
            <StatsLine value={neutral} text="Neutral:"></StatsLine>
            <StatsLine value={bad} text="Bad:"></StatsLine>
            <StatsLine value={sum()} text="All:"></StatsLine>
            <StatsLine value={avr()} text="Avrage:"></StatsLine>
            <StatsLine value={precentage()} text="Positive:"></StatsLine>
          </tbody>
        </table>
      </>
    );
  }
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
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const setToGood = (newValue) => () => {
    setGood(newValue + 1);
  };
  const setToNeutral = (newValue) => () => {
    setNeutral(newValue + 1);
  };
  const setToBad = (newValue) => () => {
    setBad(newValue + 1);
  };
  return (
    <>
      <h1 className="main-header">Give your feedback!</h1>
      <div className="buttons">
        <Button handleClick={setToGood(good)} text="Good" />
        <Button handleClick={setToNeutral(neutral)} text="Neutral" />
        <Button handleClick={setToBad(bad)} text="Bad" />
      </div>
      <div className="display">
        <Stats good={good} neutral={neutral} bad={bad}></Stats>
      </div>
    </>
  );
};

export default App;
