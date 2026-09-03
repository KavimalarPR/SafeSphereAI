import Navbar from "../components/Navbar";
import { useEffect, useRef, useState } from "react";
import { auth, db } from "../firebase";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";

function LiveLocation() {
  const [location, setLocation] = useState(null);
  const [tracking, setTracking] = useState(false);
  const [loading, setLoading] = useState(false);

  const watchId = useRef(null);

  // Update location in Firebase
  const updateFirebaseLocation = async (position) => {
    const user = auth.currentUser;

    if (!user) {
      alert("❌ Please login first");
      stopTracking();
      return;
    }

    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    setLocation({
      latitude,
      longitude,
      accuracy: position.coords.accuracy,
    });

    try {
      await setDoc(
        doc(
          db,
          "users",
          user.uid,
          "liveLocation",
          "current"
        ),
        {
          latitude: latitude,
          longitude: longitude,
          accuracy: position.coords.accuracy,
          updatedAt: serverTimestamp(),
          tracking: true,
        }
      );

      console.log("📍 Location updated:", latitude, longitude);
    } catch (error) {
      console.error("Firebase location error:", error);
    }
  };

  // Start live tracking
  const startTracking = () => {
    const user = auth.currentUser;

    if (!user) {
      alert("❌ Please login first");
      return;
    }

    if (!navigator.geolocation) {
      alert("❌ Geolocation is not supported by your browser");
      return;
    }

    setLoading(true);

    // Get first location immediately
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        await updateFirebaseLocation(position);

        setLoading(false);
        setTracking(true);

        // Continue watching location
        watchId.current = navigator.geolocation.watchPosition(
          updateFirebaseLocation,
          handleLocationError,
          {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 5000,
          }
        );

        alert("🟢 Live location tracking started");
      },
      (error) => {
        handleLocationError(error);
        setLoading(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  };

  // Stop live tracking
  const stopTracking = async () => {
    if (watchId.current !== null) {
      navigator.geolocation.clearWatch(watchId.current);
      watchId.current = null;
    }

    setTracking(false);

    const user = auth.currentUser;

    if (user) {
      try {
        await setDoc(
          doc(
            db,
            "users",
            user.uid,
            "liveLocation",
            "current"
          ),
          {
            ...(location || {}),
            tracking: false,
            updatedAt: serverTimestamp(),
          },
          {
            merge: true,
          }
        );
      } catch (error) {
        console.error(
          "Failed to update tracking status:",
          error
        );
      }
    }

    alert("🛑 Live location tracking stopped");
  };

  // Location error handler
  const handleLocationError = (error) => {
    console.error("Location error:", error);

    if (error.code === 1) {
      alert("❌ Location permission was denied");
    } else if (error.code === 2) {
      alert("❌ Unable to determine your location");
    } else if (error.code === 3) {
      alert("❌ Location request timed out");
    } else {
      alert("❌ Unable to get your location");
    }
  };

  // Stop tracking when leaving the page
  useEffect(() => {
    return () => {
      if (watchId.current !== null) {
        navigator.geolocation.clearWatch(
          watchId.current
        );
      }
    };
  }, []);

  return (
    <>
      <Navbar />

      <div className="dashboard">

        <h1>
          📍 Live Location
        </h1>

        <p>
          Share and track your current location
        </p>

        {!tracking ? (
          <button
            className="sos-btn"
            onClick={startTracking}
            disabled={loading}
          >
            {loading
              ? "Getting Location..."
              : "🟢 Start Live Tracking"}
          </button>
        ) : (
          <button
            className="sos-btn"
            onClick={stopTracking}
          >
            🛑 Stop Live Tracking
          </button>
        )}

        {tracking && (
          <div className="dashboard-card">

            <h3>
              🟢 Live Tracking Active
            </h3>

            <p>
              Your location is being updated.
            </p>

          </div>
        )}

        {location && (
          <div className="dashboard-card">

            <h3>
              📍 Current Location
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
              <strong>Accuracy:</strong>{" "}
              {location.accuracy
                ? `${Math.round(location.accuracy)} meters`
                : "Unknown"}
            </p>

            <a
              href={`https://www.google.com/maps?q=${location.latitude},${location.longitude}`}
              target="_blank"
              rel="noreferrer"
            >
              📍 Open in Google Maps
            </a>

          </div>
        )}

      </div>
    </>
  );
}

export default LiveLocation;