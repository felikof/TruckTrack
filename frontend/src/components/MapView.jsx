import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

function MapView() {
    return (
        <MapContainer
            center={[6.1319, 1.2228]}
            zoom={13}
            style={{ height: "60vh", width: "100%" }}
        >
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[6.1319, 1.2228]}>
                <Popup>Port Autonome de Lomé</Popup>
            </Marker>
        </MapContainer>
    );
}

export default MapView;
