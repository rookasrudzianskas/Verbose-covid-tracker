import './App.css';
import {FormControl, MenuItem, Select, Card, CardContent} from "@material-ui/core";
import {useEffect, useState} from "react";
import InfoBox from "./InfoBox";
import Map from "./Map";
import Table from "./Table";
import {sortData} from "./util";
import LineGraph from "./LineGraph";
// they do not tell you, that you have to import it
import "leaflet/dist/leaflet.css";



function App() {
    const [countries, setCountries] = useState([]);
    const [country, setCountry] = useState('worldwide');
    const [countryInfo, setCountryInfo] = useState({});
    const [mapCountries, setMapCountries] = useState([]);
    const [tableData, setTableData] = useState([]);
    // giving the exact coordinates, the center of the world, it loads at this point
    const [mapCenter, setMapCenter] = useState({ lat: 34.80746, lng: -40.4796 });
    const [mapZoom, setMapZoom] = useState(3);
    // console.log('🗺️', mapCenter, mapZoom);

    // ===================== The first useEffect to get all the countries then app loads =========================//
    // https://disease.sh/v3/covid-19/countries
    // then the app initially loads, the request will be made, and the all data is going to be received
    useEffect(() => {
        fetch('https://disease.sh/v3/covid-19/all')
            .then(response => response.json())
            .then(data => {
                // and set to the country info variable
                setCountryInfo(data);
            })
    }, []);

    // ===================== end of The first useEffect to get all the countries then app loads =========================//



    // ===================== The Second useEffect to get all the countries the names to put in the list =========================//

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

                    // before setting the state, we have to sort
                    const sortedData = sortData(data);
                    // also sets the received data to the tableData
                    // in this case it gets all the data, all, and puts it into the Tabledata state
                    //
                    setTableData(sortedData);
                    setMapCountries(data)
                    // it finishes and we are ready to add all the countries array to the state to the countries, by using set Countries
                    setCountries(countries);
                });
        };
        // at this point we just call as fusnction to make the api call
        getCountriesData();
    }, []);

    // ===================== end of The Seccond useEffect to get all the countries the names to put in the list =========================//

    const onCountryChange = async (event) => {
        const countryCode = event.target.value;
        setCountry(countryCode);

        /// checking to which link to go

        const url = countryCode === "worldwide" ? 'https://disease.sh/v3/covid-19/all' :
            `https://disease.sh/v3/covid-19/countries/${countryCode}`;

        // https://disease.sh/v3/covid-19/all
        // https://disease.sh/v3/covid-19/countries
        // making another call to make get the info by the country

        await fetch(url)
            .then(response => response.json())
            .then(data => {
                // we got all the data and set to country info state
                setCountry(countryCode);
                // All of the fetched data
                setCountryInfo(data);

                // greetting the coordinates from the data api
                setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
                setMapZoom(4);
            });
    };
    console.log(countryInfo);

  return (
    <div className="app">
        {/* the start of the left section*/}
        <div className="app__left">
        <div className="app__header">
      <h1>ROOKAS COVID-21 TRACKER</h1>
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

            <InfoBox title="Coronavirus Cases" cases={countryInfo.todayCases} total={countryInfo.cases} />

            <InfoBox title="Coronavirus Recovered" cases={countryInfo.todayRecovered} total={countryInfo.recovered} />

            <InfoBox title="Coronavirus Deaths" cases={countryInfo.todayDeaths} total={countryInfo.deaths}/>


    {/*    map*/}

        </div>
        <Map center={mapCenter} zoom={mapZoom} countries={mapCountries}/>
        </div>
        {/* the section left end*/}

        {/* the right section*/}
        <Card className="app__right">

            <CardContent>

                <h3>Live Cases By Country</h3>
                    {/* This forms the data table */}
                    {/*    table    */}
                    <Table countries={tableData}/>

                <h3>Worldwide new cases</h3>
                {/* Line Graph*/}
                <LineGraph />
            </CardContent>



        </Card>
    </div>
  );
}

export default App;
