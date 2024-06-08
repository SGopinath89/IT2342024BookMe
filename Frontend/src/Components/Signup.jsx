import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8080/auth/signup", {
        name,
        email,
        password,
      });

      if (response.status === 201) {
        navigate("/login");
      }
    } catch (error) {
      setError(error.response.data.message);
    }
  };
  const handleLogin = () => {
    navigate("/login"); // Navigate to the signup page
  };

  return (
    <div className="signup-container">
      <h2>Signup</h2>
      <form onSubmit={handleSignup}>
        <div>
          <label className="labelName">Name</label>
          <input
            className="inputName"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="labelEmail">Email</label>
          <input
            className="inputEmail"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="labelPass">Password</label>
          <input
            className="inputPass"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p className="error">{error}</p>}
        <button className="btnSign" type="submit">
          Signup
        </button>
        <br />
        <a className="Already" onClick={handleLogin}>
          Already Have an Account?
        </a>
      </form>
    </div>
  );
}

export default Signup;
