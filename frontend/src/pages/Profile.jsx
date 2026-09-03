import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import "./Profile.css";

function Profile() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Load profile from Firebase
  useEffect(() => {
    const loadProfile = async () => {
      const user = auth.currentUser;

      if (!user) {
        setLoading(false);
        return;
      }

      try {
        const userRef = doc(db, "users", user.uid);
        const userSnapshot = await getDoc(userRef);

        if (userSnapshot.exists()) {
          const data = userSnapshot.data();

          setName(data.name || "");
          setEmail(data.email || user.email || "");
          setPhone(data.phone || "");
        } else {
          setEmail(user.email || "");
        }
      } catch (error) {
        console.error("Profile loading error:", error);
        alert("Unable to load profile");
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, []);

  // Save profile to Firebase
  const saveProfile = async () => {
    const user = auth.currentUser;

    if (!user) {
      alert("Please login first");
      return;
    }

    if (name.trim() === "") {
      alert("Please enter your name");
      return;
    }

    if (phone.trim() === "") {
      alert("Please enter your phone number");
      return;
    }

    setSaving(true);

    try {
      await setDoc(
        doc(db, "users", user.uid),
        {
          name: name.trim(),
          email: email.trim() || user.email,
          phone: phone.trim(),
        },
        {
          merge: true,
        }
      );

      alert("Profile saved successfully");
    } catch (error) {
      console.error("Profile save error:", error);
      alert("Failed to save profile");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />

        <main className="profile-page">
          <div className="profile-loading">
            <div className="profile-loading-icon">👤</div>
            <h2>Loading Profile</h2>
            <p>Please wait while we load your account information.</p>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <main className="profile-page">

        {/* Header */}
        <section className="profile-header">
          <div>
            <span className="profile-label">ACCOUNT SETTINGS</span>

            <h1>
              Your <span>Profile</span>
            </h1>

            <p>
              Manage your personal information and keep your SafeSphere
              account up to date.
            </p>
          </div>

          <div className="profile-security">
            <span className="security-dot"></span>
            Account Protected
          </div>
        </section>

        {/* Profile Content */}
        <section className="profile-layout">

          {/* Left Profile Card */}
          <div className="profile-card profile-summary">

            <div className="profile-avatar">
              {name ? name.charAt(0).toUpperCase() : "U"}
            </div>

            <h2>
              {name || "SafeSphere User"}
            </h2>

            <p className="profile-email">
              {email || "No email available"}
            </p>

            <div className="profile-status">
              <span></span>
              Verified SafeSphere Account
            </div>

            <div className="profile-divider"></div>

            <div className="profile-info-item">
              <span className="info-icon">🛡️</span>

              <div>
                <strong>Safety Status</strong>
                <small>Protection features enabled</small>
              </div>
            </div>

            <div className="profile-info-item">
              <span className="info-icon">📍</span>

              <div>
                <strong>Emergency Services</strong>
                <small>Location services available</small>
              </div>
            </div>

          </div>

          {/* Right Edit Form */}
          <div className="profile-card profile-form-card">

            <div className="form-header">
              <div>
                <span className="profile-label">PERSONAL INFORMATION</span>
                <h2>Account Details</h2>
              </div>

              <span className="edit-icon">✎</span>
            </div>

            <div className="profile-form">

              <div className="form-group">
                <label>FULL NAME</label>

                <div className="input-wrapper">
                  <span>👤</span>

                  <input
                    type="text"
                    placeholder="Enter your full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
              </div>

              <div className="form-group">
                <label>EMAIL ADDRESS</label>

                <div className="input-wrapper">
                  <span>✉️</span>

                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div className="form-group">
                <label>PHONE NUMBER</label>

                <div className="input-wrapper">
                  <span>📞</span>

                  <input
                    type="tel"
                    placeholder="Enter your phone number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
              </div>

              <div className="profile-security-note">
                <span>🔒</span>

                <p>
                  Your personal information is securely stored and used
                  to provide SafeSphere emergency services.
                </p>
              </div>

              <button
                className="profile-save-button"
                onClick={saveProfile}
                disabled={saving}
              >
                {saving ? "Saving Changes..." : "Save Changes"}
              </button>

            </div>

          </div>

        </section>

      </main>
    </>
  );
}

export default Profile;