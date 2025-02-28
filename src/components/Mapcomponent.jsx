import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import axios from "axios";
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

// ✅ Change Map Center when position updates
function ChangeMapCenter({ position }) {
  const map = useMap();
  useEffect(() => {
    if (position) {
      map.flyTo(position, 13, { animate: true });
    }
  }, [position, map]); // ✅ Ensures reactivity
  return null;
}

function Mapcomponent({ onSelectLocation }) {
  const [position, setPosition] = useState(null);
  const [markers, setMarkers] = useState([]);

  // ✅ Fetch Markers from MongoDB
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/locations")
      .then((response) => setMarkers(response.data))
      .catch((error) => console.error("Error fetching markers:", error));
  }, []);

  // ✅ Get User's Current Location
  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (location) => {
          const userLocation = [location.coords.latitude, location.coords.longitude];
          setPosition(userLocation); // ✅ Updates position state
        },
        (error) => {
          console.error("❌ Location access denied:", error);
          setPosition([24.5964, 73.7337]); // ✅ Default fallback (Udaipur)
        }
      );
    } else {
      console.error("❌ Geolocation is not supported");
      setPosition([24.5964, 73.7337]); // ✅ Default fallback
    }
  }, []);

  return (
    <MapContainer
      center={position || [28.6139, 77.2090]} // ✅ Ensures user location is set
      zoom={13}
      style={{ height: "300px", width: "100%" }}
      scrollWheelZoom={true}
      dragging={true}
      touchZoom={true}
      doubleClickZoom={true}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {/* ✅ Change map center when location updates */}
      {position && <ChangeMapCenter position={position} />}

      {/* ✅ Show user's location marker */}
      {position && (
        <Marker position={position}>
          <Popup>📍 You are here!</Popup>
        </Marker>
      )}

      {/* ✅ Display all lost & found markers from MongoDB */}
      {markers.map((item) => (
        <Marker
          key={item._id}
          position={[item.lat, item.lng]}
          icon={item.status === "lost" ? lostIcon : foundIcon}
        >
          <Popup>
            <b>{item.name}</b>
            <br />
            Status: {item.status.toUpperCase()}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

export default Mapcomponent;
