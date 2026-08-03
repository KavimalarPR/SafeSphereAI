import Navbar from "../components/Navbar";

function Register() {
  return (
    <>
      <Navbar />

      <div className="auth-container">
        <div className="auth-card">

          <h1>Create Account</h1>

          <input
            type="text"
            placeholder="Full Name"
          />

          <input
            type="email"
            placeholder="Email"
          />

          <input
            type="password"
            placeholder="Password"
          />

          <input
            type="password"
            placeholder="Confirm Password"
          />

          <button>Create Account</button>

        </div>
      </div>
    </>
  );
}

export default Register;