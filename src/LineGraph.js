import React, {useEffect, useState} from "react";
import { Line } from "react-chartjs-2";

const LineGraph = () => {
    // the store to store all the data in the state then we fetch
    const [data, setData] = useState({});

    // https://disease.sh/v3/covid-19/historical/all?lastdays=120

    // now we need to make the function, which transforms the data we have received in the json to the object with x and y coords
    //because chart needs to have x and y coordinates, where x is the date, and the y is the cases number, in this way
    // it is going to be able to draw it in the table
// that casesType does the exact same thing as adding the data[cases], emaning it goes and grabs the cases, and not anything different
    // x is going to be the date, and y is going to be cases for that day
    const buildChartData = (data, casesType='cases') => {
        const chartData = []
        // the object which is currently empty
        let lastDataPoint;
        // every single entry, then we loop each time is going to be the date on the x coord
        data[casesType].cases.forEach(date => {
            if(lastDataPoint) {
                const newDataPoint = {
                    x: date,
                    // y because we are going to show it for the cases, and it goes to the data object, to the cases, to the cases date, and
                    // - the lastDataPoint. We do so, because we want to get the differece between two dates, how much it decreased or increased
                    // the lastDataPoint, is the last cases number
                    // basically y becomes the difference between last day and the current day
                    // data, the cases, because we are going to show the chart for the data and not for deaths or something like that
                    y: data[casesType][date] - lastDataPoint // the difference between the last day, and the next day. shows all the new cases
                }
                // we push the formed x and y to the newly formed chart data array
                chartData.push(newDataPoint); // 🔝
            }
            // we just update the lasst dataa point, to the next day,
            lastDataPoint = data[casesType][date]; // sets the last date to the next day
        })
        return chartData

    }


    useEffect(() => {
        fetch('https://disease.sh/v3/covid-19/historical/all?lastdays=120')
            // we get the response, and take just the json response
            .then(response => response.json())
            // and receive the data, and do all the magic with it below
            .then(data => {
                // clever stuff with data
                console.log(data);
                const chartData = buildChartData(data);
                setData(chartData);
            });
    }, []);


    return (
        <div>
            <h1>I ama graph</h1>
            {/*<Line*/}
            {/*    data*/}
            {/*    options*/}
            {/*/>*/}
        </div>
    )
}

export default LineGraph;