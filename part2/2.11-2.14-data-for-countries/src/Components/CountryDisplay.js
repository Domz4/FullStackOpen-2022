import Weather from "./Wheather";

function CountryDisplay({ country }) {
  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>
        Capital: <b>{country.capital}</b>
      </p>
      <p>
        Area:
        {country.area} km<sup>2</sup>
      </p>
      <img
        id="flag"
        src={country.flags.png}
        alt={`${country.name.common} flag`}
      />
      <div id="weather">
        <Weather city={country.capital}></Weather>
      </div>
    </div>
  );
}
export default CountryDisplay;
