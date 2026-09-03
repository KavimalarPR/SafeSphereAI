import Navbar from "../components/Navbar";
import Features from "../components/Features";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import "./Home.css";

function Home() {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />

      {/* ========================================
          HERO SECTION
      ======================================== */}

      <section className="safesphere-home">

        <div className="home-background-glow"></div>

        <div className="home-hero">

          {/* LEFT CONTENT */}
          <div className="home-hero-content">

            <div className="home-badge">
              <span className="badge-dot"></span>
              AI-POWERED PERSONAL SAFETY
            </div>

            <h1>
              Your Safety.
              <br />
              <span>Always Within Reach.</span>
            </h1>

            <p className="home-description">
              SafeSphere is an intelligent safety platform designed to
              help you respond quickly during emergencies, stay connected
              with trusted contacts, and access essential safety resources.
            </p>

            <div className="home-buttons">

              <button
                className="home-primary-button"
                onClick={() => navigate("/register")}
              >
                <span>🚨</span>

                <div>
                  <strong>Get Started</strong>
                  <small>Create your SafeSphere account</small>
                </div>

                <span className="button-arrow">→</span>
              </button>

              <button
                className="home-secondary-button"
                onClick={() => navigate("/login")}
              >
                Login to SafeSphere
                <span>→</span>
              </button>

            </div>

            <div className="home-trust">

              <div className="trust-item">
                <span>✓</span>
                Emergency Ready
              </div>

              <div className="trust-item">
                <span>✓</span>
                Location Aware
              </div>

              <div className="trust-item">
                <span>✓</span>
                AI Assisted
              </div>

            </div>

          </div>


          {/* RIGHT VISUAL */}
          <div className="home-visual">

            <div className="visual-glow"></div>

            <div className="safety-orbit orbit-one"></div>
            <div className="safety-orbit orbit-two"></div>

            <div className="home-shield">
              🛡️
            </div>

            <div className="floating-card location-card">
              <span className="floating-icon">📍</span>

              <div>
                <strong>Live Location</strong>
                <small>Location protected</small>
              </div>

              <span className="floating-status">●</span>
            </div>

            <div className="floating-card ai-card">
              <span className="floating-icon">🤖</span>

              <div>
                <strong>AI Safety</strong>
                <small>Assistant ready</small>
              </div>
            </div>

            <div className="floating-card emergency-card">
              <span className="floating-icon">🚨</span>

              <div>
                <strong>Emergency SOS</strong>
                <small>One tap away</small>
              </div>
            </div>

          </div>

        </div>


        {/* STATS */}
        <div className="home-stats">

          <div className="home-stat">
            <strong>01</strong>
            <span>One-Tap SOS</span>
          </div>

          <div className="stat-divider"></div>

          <div className="home-stat">
            <strong>24/7</strong>
            <span>Safety Access</span>
          </div>

          <div className="stat-divider"></div>

          <div className="home-stat">
            <strong>AI</strong>
            <span>Safety Guidance</span>
          </div>

          <div className="stat-divider"></div>

          <div className="home-stat">
            <strong>GPS</strong>
            <span>Location Support</span>
          </div>

        </div>

      </section>


      {/* ========================================
          FEATURES
      ======================================== */}

      <section className="home-features-section">

        <div className="home-section-heading">

          <span>SAFETY ECOSYSTEM</span>

          <h2>
            Everything you need to
            <br />
            <strong>stay prepared.</strong>
          </h2>

          <p>
            A connected set of tools designed to help you
            respond, communicate, and stay informed.
          </p>

        </div>

        <Features />

      </section>


      {/* ========================================
          FINAL CTA
      ======================================== */}

      <section className="home-cta">

        <div className="cta-content">

          <span>READY WHEN YOU NEED IT</span>

          <h2>
            Your safety shouldn't
            <br />
            depend on luck.
          </h2>

          <p>
            Set up your SafeSphere account and keep your
            essential safety tools within reach.
          </p>

          <button
            onClick={() => navigate("/register")}
            className="cta-button"
          >
            Create SafeSphere Account
            <span>→</span>
          </button>

        </div>

        <div className="cta-shield">
          🛡️
        </div>

      </section>


      <Footer />

    </>
  );
}

export default Home;