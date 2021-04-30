import './App.css';
import {FormControl, MenuItem, Select} from "@material-ui/core";
import {useEffect, useState} from "react";

function App() {
    const [countries, setCountries] = useState(['USA']);

    // https://disease.sh/v3/covid-19/countries

    useEffect(() => {
        // Thee code inside will run once the component loads, and not again after

    }, [countries])


  return (
    <div className="app">
        <div className="app__header">
      <h1>COVID-21 TRACKER</h1>
        <FormControl className="app__dropdown">
            <Select variant="outlined" value="abc">
                {/* loop thought all the countries and show the a drop down of possible options*/}

                {
                    countries.map(country => (
                        <MenuItem value={country}>{country}</MenuItem>
                    ))
                }


                {/*<MenuItem value="Rokas">Rokas</MenuItem>*/}
                {/*<MenuItem value="Rokas">Option two</MenuItem>*/}
                {/*<MenuItem value="Rokas">Option 3</MenuItem>*/}
                {/*<MenuItem value="Rokas">Option 4</MenuItem>*/}
            </Select>
        </FormControl>
        </div>

    {/*    Header   */}
    {/*    Title and select input dropdown field    */}

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
