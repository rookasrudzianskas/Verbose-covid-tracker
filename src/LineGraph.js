import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import numeral from "numeral";

const options = {
    legend: {
        display: false,
    },
    elements: {
        point: {
            radius: 0,
        },
    },
    maintainAspectRatio: false,
    tooltips: {
        mode: "index",
        intersect: false,
        callbacks: {
            label: function (tooltipItem, data) {
                return numeral(tooltipItem.value).format("+0,0");
            },
        },
    },
    scales: {
        xAxes: [
            {
                type: "time",
                time: {
                    format: "MM/DD/YY",
                    tooltipFormat: "ll",
                },
            },
        ],
        yAxes: [
            {
                gridLines: {
                    display: false,
                },
                ticks: {
                    // Include a dollar sign in the ticks
                    callback: function (value, index, values) {
                        return numeral(value).format("0a");
                    },
                },
            },
        ],
    },
};

const buildChartData = (data, casesType) => {
    let chartData = [];
    let lastDataPoint;
    for (let date in data.cases) {
        if (lastDataPoint) {
            let newDataPoint = {
                x: date,
                y: data[casesType][date] - lastDataPoint,
            };
            chartData.push(newDataPoint);
        }
        lastDataPoint = data[casesType][date];
    }
    return chartData;
};


function LineGraph({ casesType }) {
    // the store to store all the data in the state then we fetch
    const [data, setData] = useState({});


//     https://disease.sh/v3/covid-19/historical/all?lastdays=120
//
//     now we need to make the function, which transforms the data we have received in the json to the object with x and y coords
//     because chart needs to have x and y coordinates, where x is the date, and the y is the cases number, in this way
//     it is going to be able to draw it in the table
// that casesType does the exact same thing as adding the data[cases], emaning it goes and grabs the cases, and not anything different
//     x is going to be the date, and y is going to be cases for that day


    useEffect(() => {
        const fetchData = async () => {
            // we get the response, and take just the json response
            await fetch("https://disease.sh/v3/covid-19/historical/all?lastdays=120")
            // and receive the data, and do all the magic with it below
                .then((response) => {
                    return response.json();
                })
                .then((data) => {
                    console.log(data);
                    // clever stuff with data
                    let chartData = buildChartData(data, 'cases');
                    // we fire the buildchart data function to reformat the data to make the chart
                    setData(chartData);

                    console.log(chartData);
                    // buildChart(chartData);
                });
        };

        fetchData();
    }, [casesType]);

    return (
        <div>
            {/* this checks if data actually exists, if it is false, it just returns the same data, not freaks out*/}
            {data?.length > 0 && (
                <Line
                    data={{
                        // we pass the data and some table colors in the dataset
                        datasets: [
                            {
                                backgroundColor: "rgba(204, 16, 52, 0.5)",
                                borderColor: "#CC1034",
                                data: data,
                            },
                        ],
                    }}
                    options={options}
                />
            )}
        </div>
    );
}

export default LineGraph;



















// import React, {useEffect, useState} from "react";
// import { Line } from "react-chartjs-2";
// import numeral from "numeral";
//
// const options = {
//     legend: {
//         display: false,
//     },
//     elements: {
//         point: {
//             radius: 0,
//         },
//     },
//     maintainAspectRatio: false,
//     tooltips: {
//         mode: "index",
//         intersect: false,
//         callbacks: {
//             label: function (tooltipItem, data) {
//                 return numeral(tooltipItem.value).format("+0,0");
//             },
//         },
//     },
//     scales: {
//         xAxes: [
//             {
//                 type: "time",
//                 time: {
//                     format: "MM/DD/YY",
//                     tooltipFormat: "ll",
//                 },
//             },
//         ],
//         yAxes: [
//             {
//                 gridLines: {
//                     display: false,
//                 },
//                 ticks: {
//                     // Include a dollar sign in the ticks
//                     callback: function (value, index, values) {
//                         return numeral(value).format("0a");
//                     },
//                 },
//             },
//         ],
//     },
// };
//
//
//
// const LineGraph = () => {
//     // the store to store all the data in the state then we fetch
//     const [data, setData] = useState({});
//
//     // https://disease.sh/v3/covid-19/historical/all?lastdays=120
//
//     // now we need to make the function, which transforms the data we have received in the json to the object with x and y coords
//     //because chart needs to have x and y coordinates, where x is the date, and the y is the cases number, in this way
//     // it is going to be able to draw it in the table
// // that casesType does the exact same thing as adding the data[cases], emaning it goes and grabs the cases, and not anything different
//     // x is going to be the date, and y is going to be cases for that day
//
//     const buildChartData = (data, casesType = 'cases') => {
//         let chartData = [];
//         // the object which is currently empty
//         let lastDataPoint;
//         // it is going to per each date and make it as the coors, then push to new array
//         for (let date in data.cases) {
//             if (lastDataPoint) {
//                 let newDataPoint = {
//                     x: date,
//                     // y because we are going to show it for the cases, and it goes to the data object, to the cases, to the cases date, and
// //                 // - the lastDataPoint. We do so, because we want to get the differece between two dates, how much it decreased or increased
// //                 // the lastDataPoint, is the last cases number
// //                 // basically y becomes the difference between last day and the current day
// //                 // data, the cases, because we are going to show the chart for the data and not for deaths or something like that
//                     y: data[casesType][date] - lastDataPoint,  // the difference between the last day, and the next day. shows all the new cases
//                 };
//                 // we push the formed x and y to the newly formed chart data array
//                 chartData.push(newDataPoint);
//             }
//             // we just update the lasst dataa point, to the next day,
//             lastDataPoint = data[casesType][date];  // sets the last date to the next day
//         }
//         return chartData;
//     };
//
//     useEffect(() => {
//         const fetchData = async () => {
//            await fetch('https://disease.sh/v3/covid-19/historical/all?lastdays=120')
//                 // we get the response, and take just the json response
//                 .then(response => response.json())
//                 // and receive the data, and do all the magic with it below
//                 .then(data => {
//                     // clever stuff with data
//                     console.log(data);
//                     // we fire the buildchart data function to reformat the data to make the chart
//                     const chartData = buildChartData(data);
//                     setData(chartData);
//                 });
//         };
//         fetchData();
//
//     }, []);
//
//
//     return (
//         <div>
//             <h1>I ama graph</h1>
//             {data?.length > 0 &&(
//                 <Line
//                     options={options}
//                     data={{
//                         datasets: [
//                             {
//                                 backgroundColor: "rgba(204, 16, 52, 0.5)",
//                                 borderColor: "#CC1034",
//                                 data: data,
//                             },
//                         ],
//                     }}
//                 />
//                 )
//             }
//
//         </div>
//     )
// }
//
// export default LineGraph;
//
//
//
// // const buildChartData = (data, casesType="cases") => {
// //     const chartData = []
// //     // the object which is currently empty
// //     let lastDataPoint;
// //     // every single entry, then we loop each time is going to be the date on the x coord
// //     data[casesType].forEach((date) => {
// //         if(lastDataPoint) {
// //             const newDataPoint = {
// //                 x: date,
// //                 // y because we are going to show it for the cases, and it goes to the data object, to the cases, to the cases date, and
// //                 // - the lastDataPoint. We do so, because we want to get the differece between two dates, how much it decreased or increased
// //                 // the lastDataPoint, is the last cases number
// //                 // basically y becomes the difference between last day and the current day
// //                 // data, the cases, because we are going to show the chart for the data and not for deaths or something like that
// //                 y: data[casesType][date] - lastDataPoint // the difference between the last day, and the next day. shows all the new cases
// //             };
// //             // we push the formed x and y to the newly formed chart data array
// //             chartData.push(newDataPoint); // 🔝
// //         }
// //         // we just update the lasst dataa point, to the next day,
// //         lastDataPoint = data[casesType][date]; // sets the last date to the next day
// //     });
// //     return chartData;
// //
// // };