import CountryDisplay from "./CountryDisplay";
function Countries({ countries, setFound }) {
  return countries.length === 1 ? (
    <CountryDisplay country={countries[0]} />
  ) : countries.length > 10 && countries.length !== 0 ? (
    <p>Too many matches, specify another filter</p>
  ) : (
    <>
      {countries.map((country) => {
        return (
          <div key={country.name.official}>
            {country.name.common}
            <br />
            <button onClick={() => setFound([country])}>show</button>
          </div>
        );
      })}
    </>
  );
}

export default Countries;
