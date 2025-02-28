// import { useState, useEffect } from "react";
// import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from "react-leaflet";
// import L from "leaflet";
// import "leaflet/dist/leaflet.css";

// // ✅ Custom icons for Lost (Red) and Found (Green)
// const lostIcon = new L.Icon({
//   iconUrl: "https://maps.google.com/mapfiles/ms/icons/red-dot.png",
//   iconSize: [30, 30],
// });

// const foundIcon = new L.Icon({
//   iconUrl: "https://maps.google.com/mapfiles/ms/icons/green-dot.png",
//   iconSize: [30, 30],
// });
// // ✅ Get stored markers from localStorage (persistent across reloads)
// const getStoredMarkers = () => {
//     const stored = localStorage.getItem("lostItems");
//     return stored ? JSON.parse(stored) : [];
//   };
// // ✅ Dummy lost and found items data
// // const items = [
// //   { id: 1, type: "lost", name: "Lost Wallet", lat: 28.7041, lng: 77.1025 },
// //   { id: 2, type: "found", name: "Found Keys", lat: 28.705, lng: 77.103 },
// // ];

// // ✅ Component to dynamically change map center
// function ChangeMapCenter({ position }) {
//   const map = useMap();
//   useEffect(() => {
//     if (position) {
//       map.setView(position, 13);
//     }
//   }, [position, map]);
//   return null;
// }

// // ✅ Clickable Map Component
// function ClickableMap({ onSelectLocation }) {
//     const [marker, setMarker] = useState(null);
  
//     // ✅ Listen for click events on the map
//     useMapEvents({
//       click(e) {
//         if (marker) {
//           // ✅ If marker exists, remove it (toggle)
//           setMarker(null);
//           onSelectLocation(null, null);
//         } else {
//           // ✅ If no marker, add new marker
//           setMarker([e.latlng.lat, e.latlng.lng]);
//           onSelectLocation(e.latlng.lat, e.latlng.lng);
//         }
//       },
//     });
  
//     return marker ? (
//       <Marker position={marker} icon={lostIcon}>
//         <Popup>📍 Selected Location</Popup>
//       </Marker>
//     ) : null;
//   }

// function Mapcomponent({onSelectLocation}) {
//     const [position, setPosition] = useState(null);
//     const [markers, setMarkers] = useState(getStoredMarkers());

//   useEffect(() => {
//     if ("geolocation" in navigator) {
//       navigator.geolocation.getCurrentPosition(
//         (location) => {
//           setPosition([location.coords.latitude, location.coords.longitude]);
//         },
//         (error) => {
//           console.error("Location access denied:", error);
//         }
//       );
//     } else {
//       console.error("Geolocation is not supported");
//     }
//   }, []);

//   // ✅ Handle map click event to add a new marker
//   const handleMapClick = (e) => {
//     const newMarker = { id: Date.now(), type: "lost", name: "New Report", lat: e.latlng.lat, lng: e.latlng.lng };
    
//     // ✅ Update local state and storage
//     const updatedMarkers = [...markers, newMarker];
//     setMarkers(updatedMarkers);
//     localStorage.setItem("lostItems", JSON.stringify(updatedMarkers));

//     // ✅ Pass selected location to parent (Report Form)
//     if (onSelectLocation) {
//       onSelectLocation(newMarker.lat, newMarker.lng);
//     }
//     };
    
//   return (
//     <MapContainer
//       center={position || [28.6139, 77.2090]}
//       zoom={13}
//       style={{ height: "300px", width: "100%" }}
//       scrollWheelZoom={true}
//       dragging={true}
//       touchZoom={true}
//           doubleClickZoom={true}
//           onClick={handleMapClick} // ✅ Allow user to click and mark location
//     >
//       <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      
//       {/* Change map center when location updates */}
//       {position && <ChangeMapCenter position={position} />}
      
//       {/* Show user location marker */}
//       {position && (
//         <Marker position={position}>
//           <Popup>📍 You are here!</Popup>
//         </Marker>
//       )}

//       {/* ✅ Add lost (red) and found (green) markers */}
//       {markers.map((item) => (
//         <Marker
//           key={item.id}
//           position={[item.lat, item.lng]}
//           icon={item.type === "lost" ? lostIcon : foundIcon}
//         >
//           <Popup>{item.name}</Popup>
//         </Marker>
//       ))}
//           {/* ✅ Clickable Map to Set/Unset Marker */}
//       <ClickableMap onSelectLocation={onSelectLocation} />
//     </MapContainer>
//   );
// }

// export default Mapcomponent;
import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from "react-leaflet";
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

// // ✅ Clickable Map Component (For Selecting New Location)
// function ClickableMap({ onSelectLocation }) {
//   const [marker, setMarker] = useState(null);

//   useMapEvents({
//     click(e) {
//       setMarker([e.latlng.lat, e.latlng.lng]);
//       onSelectLocation(e.latlng.lat, e.latlng.lng);
//     },
//   });

//   return marker ? (
//     <Marker position={marker} icon={lostIcon}>
//       <Popup>📍 Selected Location</Popup>
//     </Marker>
//   ) : null;
// }

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
      style={{ height: "300px", width: "100%" }}
      scrollWheelZoom={true}
      dragging={true}
      touchZoom={true}
      doubleClickZoom={true}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {/* ✅ Change map center when location updates */}
      {position && <ChangeMapCenter position={position} />}

      {/* ✅ Show user location marker */}
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

      {/* ✅ Clickable Map to Set/Unset Marker
      <ClickableMap onSelectLocation={onSelectLocation} /> */}
    </MapContainer>
  );
}

export default Mapcomponent;
