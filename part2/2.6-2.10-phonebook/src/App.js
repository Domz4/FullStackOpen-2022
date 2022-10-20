import { useState, useEffect } from "react";
import axios from "axios";

const Persons = ({ persons }) => {
  return (
    <>
      {persons.map((person) => {
        return (
          <li key={person.id}>
            {person.name} {person.number}
          </li>
        );
      })}
    </>
  );
};
const Forms = ({ name, number, handlePerson, handleNumber, addNumber }) => {
  return (
    <>
      <form onSubmit={addNumber}>
        <div>
          name:
          <input value={name} onChange={handlePerson} />
          number:
          <input value={number} onChange={handleNumber} />
        </div>
        <div>
          <button type="submit">Add to phonebook</button>
        </div>
      </form>
    </>
  );
};
const App = () => {
  const [persons, setPersons] = useState([]);
  useEffect(() => {
    console.log("effect");
    axios
    .get("http://localhost:3001/persons")
    .then((response) => setPersons(response.data));
  }, []);
  
  const [newName, setNewName] = useState("");
  const [number, setNumber] = useState("");
  const [search, setSearch] = useState("");

  const addNumber = (e) => {
    e.preventDefault();

    const newPerson = () => {
      const setNewPerson = {
        name: newName,
        number: number,
        id: persons.length + 1,
      };
      return persons.some(
        (person) => person.name === newName || person.number === number
      )
        ? alert(`${newName} is already added to phonebook`)
        : setPersons(persons.concat(setNewPerson));
    };
    newPerson();
    setNumber("");
    setNewName("");
  };

  const filterPhonebook = () => {
    return search.length === 0
      ? persons
      : persons.filter(
          (person) =>
            person.name.toLowerCase().includes(search.toLowerCase()) ||
            (person.number + "").includes(search)
        );
  };

  const handlePersonChange = (e) => {
    setNewName(e.target.value);
  };
  const handleNumberChange = (e) => {
    setNumber(e.target.value);
  };
  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  return (
    <div>
      <div>
        <p>
          search number:{" "}
          <input value={search} onChange={handleSearchChange}></input>
        </p>
      </div>
      <h2>Phonebook</h2>
      <Forms
        name={newName}
        number={number}
        handlePerson={handlePersonChange}
        handleNumber={handleNumberChange}
        addNumber={addNumber}
      ></Forms>
      <h2>Numbers</h2>
      <ul>
        <Persons persons={filterPhonebook()}></Persons>
      </ul>
    </div>
  );
}; 

export default App;
