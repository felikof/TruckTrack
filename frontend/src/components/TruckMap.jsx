import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const camions = [
  { id: 1, lat: 6.1274, lon: 1.2198, immatriculation: 'TG-4471-A', statut: 'En route', color: '#1D9E75' },
  { id: 2, lat: 6.1291, lon: 1.2231, immatriculation: 'TG-2290-B', statut: 'En chargement', color: '#BA7517' },
  { id: 3, lat: 6.1255, lon: 1.2172, immatriculation: 'TG-1187-C', statut: 'En chargement', color: '#BA7517' },
];

export default function TruckMap() {
  return (
    <MapContainer center={[6.128, 1.221]} zoom={14} style={{ height: '420px', width: '100%' }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {camions.map(camion => (
        <CircleMarker
          key={camion.id}
          center={[camion.lat, camion.lon]}
          radius={8}
          pathOptions={{ fillColor: camion.color, color: '#fff', weight: 2, fillOpacity: 1 }}
        >
          <Popup>{camion.immatriculation} <br /> {camion.statut}</Popup>
        </CircleMarker>
      ))}
    </MapContainer>
  );
}