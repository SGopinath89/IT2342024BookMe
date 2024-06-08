import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AuthContext from "../AuthContext";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post("http://localhost:8080/auth/login", {
        email,
        password,
      });

      if (response.status === 200) {
        login(response.data.token);
        navigate("/");
      }
    } catch (error) {
      setError(error.response?.data?.message || "Login failed");
    }
  };

  const handleSignup = () => {
    navigate("/signup"); // Navigate to the signup page
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label className="labelemail">Email</label>
          <br />
          <input
            className="inputemail"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <br />
          <label className="labelpassword">Password</label>
          <br />
          <input
            className="inputpassword"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p className="error">{error}</p>}
        <br />
        <button type="submit" className="btnLogin">
          Login
        </button>
        <br />
        <a h className="LinkSignup" onClick={handleSignup}>
          Don't You have an Account Yet?
        </a>{" "}
        {/* Signup button */}
      </form>
    </div>
  );
}

export default Login;
