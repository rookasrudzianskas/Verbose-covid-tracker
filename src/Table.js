import React from "react";
import "./Table.css";
const Table = ({ countries }) => {
    return (
        <div className="table">
            {/* we go per all the countries, and map each country to the different table row*/}
            {/* basically means, we got per each country and make return each item in the following structure*/}
            {/* it is going to split up to the country and the cases, and take for each iteration the different values and display*/}
            {/* we split the prop countries, to the country and the cases, the variables we need, this means, means we can access them*/}
            {/* in the table simple way*/}
            {/* for example, the props we receive is countries but it splits to the country and the cases, the keys, which are in the countries object*/}
            {countries.map(({country, cases}) => (
                // tr>td*2
                <tr>
                    <td>{country}</td>
                    <td><strong>{cases}</strong></td>
                </tr>
            ))}
        </div>
    )
}

export default Table;