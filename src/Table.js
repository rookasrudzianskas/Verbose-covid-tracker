import React from "react";

const Table = ({ countries }) => {
    return (
        <div className="table">
            {/* we go per all the countries, and map each country to the differnet table row*/}
            {countries.map(country => (
                // tr>td*2
                <tr>
                    <td></td>
                    <td></td>
                </tr>
            ))}
        </div>
    )
}

export default Table;