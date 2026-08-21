import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import './MapView.css';

// Default Leaflet marker icons don't load correctly with CRA's bundler
// unless we point them at the CDN copies directly.
const pickupIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const dropIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [20, 33],
  iconAnchor: [10, 33],
});

// Erode is our default map center since it's the company base.
const ERODE_CENTER = [11.3410, 77.7172];

// NOTE: route/distance calculation is intentionally not implemented
// yet (on hold, per project scope). This component only places
// markers for the selected pickup and destination.
export default function MapView({ pickup, destination }) {
  const center = pickup?.lat && pickup?.lng ? [pickup.lat, pickup.lng] : ERODE_CENTER;

  return (
    <div className="map-view">
      <MapContainer center={center} zoom={9} scrollWheelZoom={false} className="map-container">
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {pickup?.lat && pickup?.lng && (
          <Marker position={[pickup.lat, pickup.lng]} icon={pickupIcon}>
            <Popup>Pickup: {pickup.name}</Popup>
          </Marker>
        )}

        {destination?.lat && destination?.lng && (
          <Marker position={[destination.lat, destination.lng]} icon={dropIcon}>
            <Popup>Destination: {destination.name}</Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  );
}
