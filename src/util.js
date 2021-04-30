import { Circle, Popup } from "react-leaflet";
import React from "react";
import numeral from "numeral";

// this is the object, with colors, and the number which represent of how big number to multiply for particular case
const casesTypeColors = {
    cases: {
        hex: "#CC1034",
        multiplier: 800,
    },
    recovered: {
        hex: "#7dd71d",
        multiplier: 1200,
    },
    deaths: {
        hex: "#fb4443",
        multiplier: 2000,
    },
};


// this function just takes the data
export const sortData = (data) => {
    // the copies all the data to the array sorted data and we apply the sort function to it
    const sortedData = [...data];
    return sortedData.sort((a, b) => a.cases > b.cases ? -1 : 1);
};

// Draw circles on the map with interactive tooltip
export const showDataOnMap = (data, casesType='cases') =>
    data.map(country => (
        // draws the circle and takes these attributes
        <Circle
            center={[country.countryInfo.lat, country.countryInfo.long]}
            color={casesTypeColors[casesType].hex}
            fillColor={casesTypeColors[casesType].hex}
            fillOpacity={0.4}
             // the radius is magic thing, it takes the number of cases for that country that day, and multiplies, by the multiplier from the
             // object which is called casesTypeColors above
            radius={
                Math.sqrt(country[casesType]) * casesTypeColors[casesType].multiplier
            }
        >
        <Popup>
            <h1>I am poppup</h1>
        </Popup>
        </Circle>
    ));