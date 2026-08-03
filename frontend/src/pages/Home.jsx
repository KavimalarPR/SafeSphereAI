import Navbar from "../components/Navbar";
import Features from "../components/Features";
import Footer from "../components/Footer";

function Home() {
  return (
    <>
      <Navbar />

      <section className="hero">
        <h1>Stay Safe Anytime, Anywhere</h1>

        <p>AI-Powered Women's Safety & Emergency Response Platform</p>

        <div className="buttons">
          <button className="primary">🚨 Emergency SOS</button>
          <button className="secondary">Get Started</button>
        </div>
      </section>

      
    <Features />

      <Footer />
    </>
    
  );
}

export default Home;