import React from "react";
import { MapContainer as LeafletMap, TileLayer } from "react-leaflet";
import "./Map.css";
import {showDataOnMap} from "./util";
// import { showDataOnMap } from "./util";

function Map({countries, casesType, center, zoom }) {
    return (
        <div className="map">
            {/* center is the center, where actually the app starts*/}
            <LeafletMap center={center} zoom={zoom}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {/* lopp thought the countries and draw circles in the map*/}
                {showDataOnMap(countries, casesType)}

            </LeafletMap>
        </div>
    );
}

export default Map;