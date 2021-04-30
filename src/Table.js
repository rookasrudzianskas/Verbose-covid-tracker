import React from "react";

const Table = ({ countries }) => {
    return (
        <div className="table">
            {/* we go per all the countries, and map each country to the differnet table row*/}
            {/* it is going to split up to the country and the cases, and take for each iteration the differnt values and display*/}
            {countries.map(({country, cases}) => (
                // tr>td*2
                <tr>
                    <td>{country}</td>
                    <td><strong>cases</strong></td>
                </tr>
            ))}
        </div>
    )
}

export default Table;