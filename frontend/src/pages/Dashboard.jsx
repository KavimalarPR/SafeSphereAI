import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { auth, db } from "../firebase";
import "./Dashboard.css";

import {
  collection,
  addDoc,
  getDocs,
  serverTimestamp,
} from "firebase/firestore";

function Dashboard() {
  const navigate = useNavigate();

  const [countdown, setCountdown] = useState(null);
  const countdownTimer = useRef(null);

  // Start SOS countdown
  const startSOS = () => {
    if (!auth.currentUser) {
      alert("❌ Please login first");
      navigate("/login");
      return;
    }

    setCountdown(5);

    let count = 5;

    countdownTimer.current = setInterval(() => {
      count--;

      if (count === 0) {
        clearInterval(countdownTimer.current);
        countdownTimer.current = null;
        setCountdown(null);

        activateSOS();
      } else {
        setCountdown(count);
      }
    }, 1000);
  };

  // Cancel SOS
  const cancelSOS = () => {
    if (countdownTimer.current) {
      clearInterval(countdownTimer.current);
      countdownTimer.current = null;
    }

    setCountdown(null);

    alert("✅ SOS cancelled");
  };

  // Activate SOS after countdown
  const activateSOS = async () => {
    const user = auth.currentUser;

    if (!user) {
      alert("❌ Please login first");
      navigate("/login");
      return;
    }

    if (!navigator.geolocation) {
      alert("❌ Geolocation is not supported by your browser");
      return;
    }

    try {
      // Get emergency contacts
      const contactsSnapshot = await getDocs(
        collection(
          db,
          "users",
          user.uid,
          "contacts"
        )
      );

      const contacts = contactsSnapshot.docs.map((document) => ({
        id: document.id,
        ...document.data(),
      }));

      if (contacts.length === 0) {
        alert(
          "❌ No emergency contacts found.\n\nPlease add an emergency contact first."
        );

        navigate("/contacts");
        return;
      }

      alert("🚨 SOS ACTIVATED!\n\n📍 Getting your location...");

      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;

          const mapLink =
            `https://www.google.com/maps?q=${latitude},${longitude}`;

          try {
            // Save SOS to Firestore
            const sosRef = await addDoc(
              collection(
                db,
                "users",
                user.uid,
                "sosHistory"
              ),
              {
                latitude: latitude,
                longitude: longitude,
                location: mapLink,
                status: "Emergency Activated",
                contactsCount: contacts.length,
                createdAt: serverTimestamp(),
              }
            );

            console.log("SOS saved:", sosRef.id);

            // Emergency message
            const message =
              "🚨 EMERGENCY ALERT 🚨\n\n" +
              "I need help! Please check my current location.\n\n" +
              "📍 My Location:\n" +
              mapLink +
              "\n\n" +
              "Please contact me immediately.";

            const encodedMessage =
              encodeURIComponent(message);

            // First emergency contact
            const primaryContact = contacts[0];

            const smsLink =
              `sms:${primaryContact.phone}?body=${encodedMessage}`;

            // Open SMS application
            window.location.href = smsLink;

            alert(
              `🚨 SOS ACTIVATED!\n\n` +
              `Contact: ${primaryContact.name}\n` +
              `Location saved to Firebase.`
            );

          } catch (error) {
            console.error("SOS save error:", error);

            alert(
              "❌ Failed to save SOS alert."
            );
          }
        },

        (error) => {
          console.error("Location error:", error);

          if (error.code === 1) {
            alert(
              "❌ Location permission denied."
            );
          } else if (error.code === 2) {
            alert(
              "❌ Unable to determine your location."
            );
          } else if (error.code === 3) {
            alert(
              "❌ Location request timed out."
            );
          } else {
            alert(
              "❌ Unable to get your location."
            );
          }
        },

        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0,
        }
      );

    } catch (error) {
      console.error(
        "Emergency contact error:",
        error
      );

      alert(
        "❌ Unable to load emergency contacts."
      );
    }
  };

  // Cleanup timer when component is removed
  useEffect(() => {
    return () => {
      if (countdownTimer.current) {
        clearInterval(countdownTimer.current);
      }
    };
  }, []);

  return (
  <>
    <Navbar />

    <main className="dashboard">

      {/* HEADER */}
      <section className="dashboard-header">

        <div>
          <span className="dashboard-label">
            SAFESPHERE SECURITY CENTER
          </span>

          <h1>
            Welcome back 👋
          </h1>

          <p>
            Your personal safety dashboard
          </p>
        </div>

        <div className="security-status">
          <span className="status-dot"></span>
          <div>
            <strong>System Active</strong>
            <small>Your safety tools are ready</small>
          </div>
        </div>

      </section>


      {/* EMERGENCY HERO */}
      <section className="emergency-hero">

        <div className="emergency-content">

          <span className="emergency-tag">
            ● EMERGENCY RESPONSE
          </span>

          <h2>
            Need immediate help?
          </h2>

          <p>
            Press the SOS button to send your emergency alert
            with your current location to your trusted contact.
          </p>

          <button
            className="sos-main-button"
            onClick={countdown === null ? startSOS : undefined}
          >
            <span className="sos-icon">🚨</span>

            <span>
              <strong>ACTIVATE SOS</strong>
              <small>Emergency assistance</small>
            </span>
          </button>

        </div>

        <div className="emergency-visual">
          <div className="pulse-ring ring-one"></div>
          <div className="pulse-ring ring-two"></div>
          <div className="sos-circle">
            SOS
          </div>
        </div>

      </section>


      {/* SOS COUNTDOWN */}
      {countdown !== null && (
        <section className="sos-countdown">

          <div className="countdown-warning">
            🚨
          </div>

          <div className="countdown-content">

            <span>EMERGENCY ALERT</span>

            <h2>
              SOS activating in
            </h2>

            <div className="countdown-number">
              {countdown}
            </div>

            <p>
              Stay calm. Your emergency alert is being prepared.
            </p>

            <button
              className="cancel-sos"
              onClick={cancelSOS}
            >
              Cancel SOS
            </button>

          </div>

        </section>
      )}


      {/* QUICK ACTIONS */}
      <section className="dashboard-section">

        <div className="section-heading">
          <div>
            <span>SAFETY TOOLS</span>
            <h2>Quick Actions</h2>
          </div>

          <p>
            Access your most important safety features
          </p>
        </div>


        <div className="dashboard-grid">

          {/* CONTACTS */}
          <div
            className="dashboard-card contacts-card"
            onClick={() => navigate("/contacts")}
          >
            <div className="card-icon">
              👥
            </div>

            <div className="card-content">
              <h3>Emergency Contacts</h3>
              <p>
                Manage your trusted emergency contacts.
              </p>
            </div>

            <span className="card-arrow">→</span>
          </div>


          {/* LIVE LOCATION */}
          <div
            className="dashboard-card location-card"
            onClick={() => navigate("/live-location")}
          >
            <div className="card-icon">
              📍
            </div>

            <div className="card-content">
              <h3>Live Location</h3>
              <p>
                View and share your current location.
              </p>
            </div>

            <span className="card-arrow">→</span>
          </div>


          {/* POLICE */}
          <div
            className="dashboard-card"
            onClick={() => navigate("/nearby-police")}
          >
            <div className="card-icon">
              🚓
            </div>

            <div className="card-content">
              <h3>Nearby Police</h3>
              <p>
                Quickly locate nearby police stations.
              </p>
            </div>

            <span className="card-arrow">→</span>
          </div>


          {/* HOSPITALS */}
          <div
            className="dashboard-card"
            onClick={() => navigate("/nearby-hospitals")}
          >
            <div className="card-icon">
              🏥
            </div>

            <div className="card-content">
              <h3>Nearby Hospitals</h3>
              <p>
                Find nearby hospitals and medical help.
              </p>
            </div>

            <span className="card-arrow">→</span>
          </div>


          {/* AI */}
          <div
            className="dashboard-card ai-card"
            onClick={() => navigate("/ai-assistant")}
          >
            <div className="card-icon">
              🤖
            </div>

            <div className="card-content">
              <h3>AI Safety Assistant</h3>
              <p>
                Get intelligent safety guidance anytime.
              </p>
            </div>

            <span className="card-arrow">→</span>
          </div>


          {/* HISTORY */}
          <div
            className="dashboard-card"
            onClick={() => navigate("/sos-history")}
          >
            <div className="card-icon">
              📜
            </div>

            <div className="card-content">
              <h3>SOS History</h3>
              <p>
                Review your previous emergency alerts.
              </p>
            </div>

            <span className="card-arrow">→</span>
          </div>


          {/* PROFILE */}
          <div
            className="dashboard-card"
            onClick={() => navigate("/profile")}
          >
            <div className="card-icon">
              ⚙️
            </div>

            <div className="card-content">
              <h3>Profile & Settings</h3>
              <p>
                Manage your SafeSphere account.
              </p>
            </div>

            <span className="card-arrow">→</span>
          </div>

        </div>

      </section>


      {/* SAFETY INFORMATION */}
      <section className="safety-info">

        <div className="safety-info-icon">
          🛡️
        </div>

        <div>
          <h3>Your safety matters</h3>
          <p>
            SafeSphere keeps your emergency tools accessible
            whenever you need them. Stay alert and stay safe.
          </p>
        </div>

      </section>

    </main>
  </>
);
}

export default Dashboard;