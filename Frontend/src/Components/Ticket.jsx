import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import line from "./assets/LIne.svg";
import logo from "./assets/Bus.svg";
import logoBg from "./assets/Bus.png";
import Bar from "./assets/Bar.png";

function Ticket() {
  const location = useLocation();
  const { busId, seatNumber } = location.state;
  const [busDetails, setBusDetails] = useState({});
  const [username, setUsername] = useState("");
  const [referenceNumber, setReferenceNumber] = useState("");

  useEffect(() => {
    // Fetch the current user's username from the backend
    const fetchUsername = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:8080/auth/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUsername(response.data.name); // Assuming the user's name is stored in the backend
      } catch (error) {
        console.error("Error fetching username:", error);
      }
    };

    fetchUsername();
  }, []);

  useEffect(() => {
    // Fetch bus details
    const fetchBusDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `http://localhost:8080/bus/bus/${busId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setBusDetails(response.data);
      } catch (error) {
        console.error("Error fetching bus details:", error);
      }
    };

    fetchBusDetails();
  }, [busId]);

  useEffect(() => {
    // Fetch reservation details
    const fetchReservationDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `http://localhost:8080/seat/reservation`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            params: {
              busId: busId,
              seatNumber: seatNumber,
            },
          }
        );
        setReferenceNumber(response.data.referenceNumber); // Assuming the reservation data includes the reference number
      } catch (error) {
        console.error("Error fetching reservation details:", error);
      }
    };

    fetchReservationDetails();
  }, [busId, seatNumber]);

  return (
    <div className="TicketDiv">
      <img className="backgImage" src={logoBg} alt="Image" />
      <img className="lineIcon" src={line} alt="Image" />
      <img className="Barpng" src={Bar} alt="Image" />
      <div className="LineDiv"></div>
      <img className="logoImage" src={logo} alt="Image" />
      <div className="LineDiv"></div>
      <div className="box">
        <div className="ellipseLeft" />
        <div className="ellipseRight" />
        <label></label>
      </div>

      <label className="ticBusId">
        <strong>Name:</strong> {username}
      </label>
      <label className="ticReference">
        <strong>Reference Number:</strong> {referenceNumber}
      </label>
      <label className="ticDeparture">
        <strong>Departure City:</strong> {busDetails.Departure_City}
      </label>
      <label className="ticArrival">
        <strong>Arrival City:</strong> {busDetails.Arrival_City}
      </label>
      <label className="ticDepartureTime">
        <strong>Departure Time:</strong> {busDetails.Departure_Time}
      </label>
      <label className="ticArrivalTime">
        <strong>Arrival Time:</strong> {busDetails.Arrival_Time}
      </label>
      <label className="ticRoueNo">
        <strong>Route No:</strong> {busDetails.Route_No}
      </label>
      <label className="ticPrice">
        <strong>Price:</strong> Rs. {busDetails.Price}.00
      </label>
      <label className="ticSeatNo">
        <strong>Seat Number:</strong> {seatNumber}
      </label>
    </div>
  );
}

export default Ticket;
