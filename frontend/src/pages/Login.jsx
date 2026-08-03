import Navbar from "../components/Navbar";

function Login() {
  return (
    <>
      <Navbar />

      <div className="auth-container">
        <div className="auth-card">

          <h1>Login</h1>

          <input
            type="email"
            placeholder="Email"
          />

          <input
            type="password"
            placeholder="Password"
          />

          <button>Login</button>

          <p>
            Don't have an account? Register
          </p>

        </div>
      </div>
    </>
  );
}

export default Login;