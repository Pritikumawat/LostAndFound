import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// ✅ Custom icons for Lost (Red) and Found (Green)
const lostIcon = new L.Icon({
  iconUrl: "https://maps.google.com/mapfiles/ms/icons/red-dot.png",
  iconSize: [30, 30],
});

const foundIcon = new L.Icon({
  iconUrl: "https://maps.google.com/mapfiles/ms/icons/green-dot.png",
  iconSize: [30, 30],
});

// ✅ Dummy lost and found items data
const items = [
  { id: 1, type: "lost", name: "Lost Wallet", lat: 28.7041, lng: 77.1025 },
  { id: 2, type: "found", name: "Found Keys", lat: 28.705, lng: 77.103 },
];

// ✅ Component to dynamically change map center
function ChangeMapCenter({ position }) {
  const map = useMap();
  useEffect(() => {
    if (position) {
      map.setView(position, 13);
    }
  }, [position, map]);
  return null;
}

function UserLocationMap() {
  const [position, setPosition] = useState(null);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (location) => {
          setPosition([location.coords.latitude, location.coords.longitude]);
        },
        (error) => {
          console.error("Location access denied:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported");
    }
  }, []);

  return (
    <MapContainer
      center={position || [28.6139, 77.2090]}
      zoom={13}
      style={{ height: "500px", width: "100%" }}
      scrollWheelZoom={true}
      dragging={true}
      touchZoom={true}
      doubleClickZoom={true}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      
      {/* Change map center when location updates */}
      {position && <ChangeMapCenter position={position} />}
      
      {/* Show user location marker */}
      {position && (
        <Marker position={position}>
          <Popup>📍 You are here!</Popup>
        </Marker>
      )}

      {/* ✅ Add lost (red) and found (green) markers */}
      {items.map((item) => (
        <Marker
          key={item.id}
          position={[item.lat, item.lng]}
          icon={item.type === "lost" ? lostIcon : foundIcon}
        >
          <Popup>{item.name}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

export default UserLocationMap;
