import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import "./Navbar.css";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);

      alert("Logged out successfully");

      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="safesphere-navbar">

      {/* LOGO */}
      <div
        className="safesphere-brand"
        onClick={() => navigate(user ? "/dashboard" : "/")}
      >
        <div className="brand-icon">
          🛡️
        </div>

        <div className="brand-text">
          <span className="brand-name">
            SafeSphere
          </span>

          <span className="brand-subtitle">
            AI SAFETY PLATFORM
          </span>
        </div>
      </div>


      {/* NAVIGATION */}
      <div className="safesphere-nav-links">

        <button
          className={isActive("/") ? "nav-item active" : "nav-item"}
          onClick={() => navigate("/")}
        >
          <span>⌂</span>
          Home
        </button>


        {user ? (
          <>
            <button
              className={
                isActive("/dashboard")
                  ? "nav-item active"
                  : "nav-item"
              }
              onClick={() => navigate("/dashboard")}
            >
              <span>▦</span>
              Dashboard
            </button>


            <button
              className={
                isActive("/contacts")
                  ? "nav-item active"
                  : "nav-item"
              }
              onClick={() => navigate("/contacts")}
            >
              <span>👥</span>
              Contacts
            </button>


            <button
              className={
                isActive("/profile")
                  ? "nav-item active"
                  : "nav-item"
              }
              onClick={() => navigate("/profile")}
            >
              <span>◉</span>
              Profile
            </button>


            {/* USER STATUS */}
            <div className="user-status">
              <span className="online-dot"></span>

              <div>
                <strong>Protected</strong>
                <small>Account active</small>
              </div>
            </div>


            {/* LOGOUT */}
            <button
              className="logout-button"
              onClick={handleLogout}
            >
              <span>↪</span>
              Logout
            </button>
          </>
        ) : (
          <>
            <button
              className={
                isActive("/login")
                  ? "nav-item active"
                  : "nav-item"
              }
              onClick={() => navigate("/login")}
            >
              Login
            </button>

            <button
              className="register-button"
              onClick={() => navigate("/register")}
            >
              Get Started
            </button>
          </>
        )}

      </div>

    </nav>
  );
}

export default Navbar;