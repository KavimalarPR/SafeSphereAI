import Navbar from "../components/Navbar";
import { useState } from "react";

function NearbyPolice() {
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(false);

  const findPolice = () => {
    if (!navigator.geolocation) {
      alert("❌ Geolocation is not supported by your browser");
      return;
    }

    setLoading(true);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        setLocation({
          latitude,
          longitude,
        });

        setLoading(false);

        const policeMap =
          `https://www.google.com/maps/search/police+station/@${latitude},${longitude},15z`;

        window.open(policeMap, "_blank");
      },

      (error) => {
        console.error(error);

        setLoading(false);

        if (error.code === 1) {
          alert("❌ Location permission denied");
        } else if (error.code === 2) {
          alert("❌ Unable to determine your location");
        } else if (error.code === 3) {
          alert("❌ Location request timed out");
        } else {
          alert("❌ Unable to get your location");
        }
      },

      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  };

  return (
    <>
      <Navbar />

      <div className="dashboard">

        <h1>
          🚓 Nearby Police Stations
        </h1>

        <p>
          Find the nearest police station around you
        </p>

        <button
          className="sos-btn"
          onClick={findPolice}
          disabled={loading}
        >
          {loading
            ? "📍 Getting Location..."
            : "🚓 Find Police Station"}
        </button>

        {location && (
          <div className="dashboard-card">

            <h3>
              📍 Your Current Location
            </h3>

            <p>
              <strong>Latitude:</strong>{" "}
              {location.latitude}
            </p>

            <p>
              <strong>Longitude:</strong>{" "}
              {location.longitude}
            </p>

            <p>
              🔎 Google Maps is showing police stations
              near your location.
            </p>

            <a
              href={`https://www.google.com/maps/search/police+station/@${location.latitude},${location.longitude},15z`}
              target="_blank"
              rel="noreferrer"
            >
              🚓 Open Nearby Police Stations
            </a>

          </div>
        )}

      </div>
    </>
  );
}

export default NearbyPolice;