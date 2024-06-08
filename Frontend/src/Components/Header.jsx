import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import logo from "./assets/Bus.svg";
import { Outlet } from "react-router-dom";
import AuthContext from "../AuthContext";

function Header() {
  const { isAuthenticated, logout } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      const fetchUsername = async () => {
        try {
          const token = localStorage.getItem("token");
          const response = await axios.get("http://localhost:8080/auth/me", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setUsername(response.data.name);
        } catch (error) {
          console.error("Error fetching username:", error);
        }
      };

      fetchUsername();
    }
  }, [isAuthenticated]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <>
      <header>
        <nav>
          <img className="logo" src={logo} alt="Bus Logo" />
          <ul className="list">
            <li>
              <a href="#">Dashboard</a>
            </li>
            <li>
              <a href="#">Bus TimeTable</a>
            </li>
            <li>
              <a href="#">About Us</a>
            </li>
            <li>
              <a href="#">Contact</a>
            </li>
          </ul>
          {isAuthenticated ? (
            <div className="user-info">
              <span>Welcome, {username}</span>
              <button className="btnLogout" onClick={handleLogout}>
                Logout
              </button>
            </div>
          ) : (
            <button className="btnLogout" onClick={() => navigate("/login")}>
              Login
            </button>
          )}
        </nav>
      </header>
      <Outlet />
    </>
  );
}

export default Header;
