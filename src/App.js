import './App.css';
import {FormControl, MenuItem, Select} from "@material-ui/core";
import {useEffect, useState} from "react";
import InfoBox from "./InfoBox";

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
                    // making the array of countries, by mapping through data, and making countries = [{name:..., value:...}]
                    const countries = data.map((country) => (
                        {
                            name: country.country, // United States, India
                            value: country.countryInfo.iso2 // UK, USA, FR
                        }));
                    // it finishes and we are ready to add all the countries array to the state to the countries, by using set Countries
                    setCountries(countries);
                });
        };
        // at this point we just call as function to make the api call
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
            {/* at first it is going to show the worldwide, because it is going to be first one in array, and on the top shows */}
            {/* the country which is first, but then we click on some of them, the onCountryChange gets excecuted.*/}
            {/* meaning, onCountryChange takes the event with all the data, and sets the country code to the country code of the event data*/}
            {/* and sets up the country state, with setCountry to the country name */}
            {/* on select the value is country, so from the state arrives the updated value*/}
            <Select variant="outlined" value={country} onChange={onCountryChange}>
                {/* loop thought all the countries and show the a drop down of possible options*/}
                {/* worldwide is the default option, meaning it is going to be the first one, and always there will be*/}
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
        <div className="app__stats">

            <InfoBox title="Coronavirus Cases" total={4324234} cases={34234}/>

            <InfoBox title="Recovered" total={3423432} cases={43243}/>

            <InfoBox title="Coronavirus Deaths" total={342343} cases={4324}/>

            {/*    info boxes title="coronavirus cases" */}



            {/*    info boxes */}
            {/*    info boxes* and so on/}
        </div>


    {/*    table    */}
    {/*    Graph    */}

    {/*    map*/}
        </div>
    </div>
  );
}

export default App;
