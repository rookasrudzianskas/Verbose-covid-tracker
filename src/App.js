import './App.css';
import {FormControl, MenuItem, Select} from "@material-ui/core";
import {useEffect, useState} from "react";

function App() {
    const [countries, setCountries] = useState([]);
    const [country, setCountry] = useState('worldwide')

    // https://disease.sh/v3/covid-19/countries

    useEffect(() => {
        // Thee code inside will run once the component loads, and not again after
        // async -> send a request, wait for it and then do something

        const getCountriesData = async () => {
            // getting the json object from this link
            await fetch("https://disease.sh/v3/covid-19/countries")
                // from the response, we just take away the json object
                .then((response) => response.json())
                // mapping throug all the countries in the json object, to make the array of countries, which consist of objects
                // which has name and value
                .then((data) => {
                    const countries = data.map((country) => (
                        {
                            name: country.country, // United States, India
                            value: country.countryInfo.iso2 // UK, USA, FR
                        }));
                    setCountries(countries);
                });
        };
        getCountriesData();
    }, []);

    const onCountryChange = async (event) => {
        const countryCode = event.target.value;
        setCountry(countryCode);
    };


  return (
    <div className="app">
        <div className="app__header">
      <h1>COVID-21 TRACKER</h1>
        <FormControl className="app__dropdown">
            <Select variant="outlined" value={country} onChange={onCountryChange}>
                {/* loop thought all the countries and show the a drop down of possible options*/}
                <MenuItem value="worldwide">Worldwide</MenuItem>
                {
                    countries.map(country => (
                        <MenuItem value={country.value}>{country.name}</MenuItem>
                    ))
                }


                {/*<MenuItem value="Rokas">Rokas</MenuItem>*/}
                {/*<MenuItem value="Rokas">Option two</MenuItem>*/}
                {/*<MenuItem value="Rokas">Option 3</MenuItem>*/}
                {/*<MenuItem value="Rokas">Option 4</MenuItem>*/}
            </Select>
        </FormControl>
        </div>

    {/*    info boxes*/}
    {/*    info boxes*/}
    {/*    info boxes*/}

    {/*    table    */}
    {/*    Graph    */}

    {/*    map*/}
    </div>
  );
}

export default App;
