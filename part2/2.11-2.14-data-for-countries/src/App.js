import axios from "axios";
import { useState, useEffect } from "react";
import "./styles.css";
import Countries from "./Components/Countries";

function App() {
  useEffect(() => {
    axios
      .get("https://restcountries.com/v3.1/all")
      .then((response) => setCountries(response.data), []);
  }, []);

  // States
  const [countries, setCountries] = useState([]);
  const [found, setFound] = useState([]);
  const [search, setSearch] = useState("");

  const handleSearchChange = (e) => {
    const newSearch = e.target.value;
    setSearch(newSearch);
    setFound(
      countries.filter((e) =>
        e.name.common.toLowerCase().includes(newSearch.toLowerCase())
      )
    );
  };
  return (
    <>
      <section>
        <div>
          Find countries: <input value={search} onChange={handleSearchChange} />
        </div>
        <ul>
          <Countries
            countries={found}
            handleSearch={handleSearchChange}
            setFound={setFound}
          />
        </ul>
      </section>
    </>
  );
}

export default App;
