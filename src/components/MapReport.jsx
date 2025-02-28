// import React, { useState ,useEffect } from "react";
// import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";

// const MapReport = ({ onSelectLocation }) => {
//     const [position, setPosition] = useState(null);

//     useEffect(() => {
//         if ("geolocation" in navigator) {
//           navigator.geolocation.getCurrentPosition(
//             (location) => {
//               setPosition([location.coords.latitude, location.coords.longitude]);
//             },
//             (error) => {
//               console.error("❌ Location access denied:", error);
//               setPosition([28.6139, 77.2090]); // ✅ Fallback to Delhi if denied
//             }
//           );
//         } else {
//           console.error("❌ Geolocation not supported");
//           setPosition([28.6139, 77.2090]); // ✅ Fallback location
//         }
//       }, []);

//   const MapClickHandler = () => {
//     useMapEvents({
//       click(e) {
//         const { lat, lng } = e.latlng;
//         setPosition([lat, lng]);
//         onSelectLocation(lat, lng); // ✅ Send selected location to parent component
//       },
//     });
//     return position ? <Marker position={position} /> : null;
//   };

//   return (
//     <MapContainer center={[28.6139, 77.2090]} zoom={12} className="w-full h-80 rounded-lg">
//       <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
//       <MapClickHandler />
//     </MapContainer>
//   );
// };

// export default MapReport;
import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, useMap, useMapEvents } from "react-leaflet";

const MapReport = ({ onSelectLocation }) => {
  const [position, setPosition] = useState(null);

  // ✅ Get User Location
  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (location) => {
          setPosition([location.coords.latitude, location.coords.longitude]);
        },
        (error) => {
          console.error("❌ Location access denied:", error);
          setPosition([28.6139, 77.2090]); // ✅ Fallback to Delhi if denied
        }
      );
    } else {
      console.error("❌ Geolocation not supported");
      setPosition([28.6139, 77.2090]); // ✅ Fallback location
    }
  }, []);

  // ✅ Update map center when position changes
  function ChangeMapCenter({ position }) {
    const map = useMap();
    useEffect(() => {
      if (position) {
        map.setView(position, 13);
      }
    }, [position, map]);
    return null;
  }

  // ✅ Handle user clicking on the map
  function MapClickHandler() {
    useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng;
        setPosition([lat, lng]);
        onSelectLocation(lat, lng);
      },
    });
    return position ? <Marker position={position} /> : null;
  }

  // ✅ Wait for position before rendering the map
  if (!position) {
    return <p className="text-center text-gray-500">Loading map...</p>;
  }

  return (
    <MapContainer center={position} zoom={12} className="w-full h-80 rounded-lg">
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <ChangeMapCenter position={position} />
      <MapClickHandler />
    </MapContainer>
  );
};

export default MapReport;
