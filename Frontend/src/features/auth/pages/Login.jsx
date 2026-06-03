import { Link, useNavigate } from "react-router";
import "./auth.form.scss";
import { useState } from "react";
import { useAuth } from "../hooks/useAuth";

function Login() {
  const { loading, handleLogin } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await handleLogin({ email, password });

    navigate("/");
  };

  if (loading) return <main className="loading-screen"><div className="spinner" /></main>;
  return (
    <main>
      <div className="form-container">
        <h1>Login</h1>
        <form>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
            />
          </div>
          <button
            className="button primary-button"
            type="submit"
            onClick={handleSubmit}
          >
            Login
          </button>
          <p>
            Don't have an account? <Link to="/register">Register</Link>
          </p>
        </form>
      </div>
    </main>
  );
}

export default Login;
