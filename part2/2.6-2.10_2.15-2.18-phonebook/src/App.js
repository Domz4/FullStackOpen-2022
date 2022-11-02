import { useState, useEffect } from "react";
import service from "./services/persons";
import "./styless.css";

const Notification = ({ msg }) => {
  if (msg === null) return null;
  if (msg.includes("failed")) {
    return <div className="error">{msg}</div>;
  }
  return <div className="success">{msg}</div>;
};
const Persons = ({ persons, del }) => {
  return (
    <>
      {persons.map((person) => {
        return (
          <li key={person.id}>
            {person.name} {person.number}
            <button onClick={() => del(person.id, person.name)}>delete</button>
          </li>
        );
      })}
    </>
  );
};
const Forms = ({ newPerson, handleChange, addNumber }) => {
  return (
    <>
      <form onSubmit={addNumber}>
        <div>
          name:
          <input name="name" value={newPerson.name} onChange={handleChange} />
          number:
          <input
            name="number"
            value={newPerson.number}
            onChange={handleChange}
          />
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
  const [newPerson, setNewPerson] = useState({ name: "", number: "" });
  const [search, setSearch] = useState("");
  const [msg, setMsg] = useState(null);

  useEffect(() => {
    service.getAll().then((response) => {
      setPersons(response);
    });
  }, []);
  useEffect(() => {
    service.getAll().then((response) => {
      setPersons(response);
    });
  }, []);
  useEffect(() => {
    const timer = setTimeout(() => {
      setMsg(null);
    }, 5000);
    return () => {
      clearTimeout(timer);
    };
  }, [msg]);

  useEffect(() => {
    service.getAll().then((response) => {
      setPersons(response);
    });
  }, []);

  const addNumber = (e) => {
    e.preventDefault();
    const currentName = persons.filter(
      (person) => person.name === newPerson.name
    );

    if (currentName.length === 0) {
      service
        .create(newPerson)
        .then((returnedPerson) => {
          setPersons(persons.concat(returnedPerson));
        })
        .catch((error) => setMsg(error.response.data.error));
    } else {
      if (
        window.confirm(
          `${newPerson.name} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        service
          .update(currentName.id, newPerson)
          .then((returnedPerson) => {
            const updatedPersons = persons.map((person) =>
              person.id !== returnedPerson.id ? person : returnedPerson
            );
            setPersons(updatedPersons);
            setMsg(`Added ${newPerson.name} to phonebook`);
          })
          .catch((error) => setMsg(error.response.data.error));
      }
    }
    setNewPerson({ name: "", number: "" });
  };

  const del = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      service.del(id).then(() => {
        const updatedPersons = persons.filter((person) => person.id !== id);
        setPersons(updatedPersons);
        setMsg(`Removed ${name} from phonebook`);
      });
    }
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewPerson({ ...newPerson, [name]: value });
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  return (
    <div>
      <div>
        <Notification msg={msg} />
        <p>
          search number:
          <input value={search} onChange={handleSearchChange}></input>
        </p>
      </div>
      <h2>Phonebook</h2>
      <Forms
        newPerson={newPerson}
        handleChange={handleChange}
        addNumber={addNumber}
      ></Forms>
      <h2>Numbers</h2>
      <ul>
        <Persons persons={filterPhonebook()} del={del}></Persons>
      </ul>
    </div>
  );
};

export default App;
