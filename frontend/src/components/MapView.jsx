import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "/src/MapView.css";
import L from "leaflet";

// Icône personnalisée futuriste
const truckIcon = new L.Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/616/616408.png",
    iconSize: [30, 30],
    iconAnchor: [15, 30],
});

const MapView = () => {
    const position = [6.1319, 1.2228]; // Ex: Lomé

    return (
        <div className="mapview-container">
            <h2 className="map-title">Suivi des Camions</h2>
            <MapContainer center={position} zoom={13} className="leaflet-map">
                <TileLayer
                    url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
                    attribution="&copy; OpenStreetMap"
                />
                <Marker position={position} icon={truckIcon}>
                    <Popup>Camion n°1 - Dernière position</Popup>
                </Marker>
            </MapContainer>
        </div>
    );
};

export default MapView;
