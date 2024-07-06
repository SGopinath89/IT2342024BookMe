import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function SeatBooking() {
  const { busId } = useParams();
  const navigate = useNavigate();
  const [seats, setSeats] = useState([]);
  const [selectedSeat, setSelectedSeat] = useState(null);

  useEffect(() => {
    const fetchSeats = async () => {
      try {
        const token = localStorage.getItem("token"); // Assuming token is stored in localStorage
        const response = await axios.get(
          `http://localhost:8080/bus/seat-booking/${busId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`, // Add token to headers
            },
          }
        );
        setSeats(response.data);
      } catch (error) {
        console.error("Error fetching seat details:", error);
      }
    };

    fetchSeats();
  }, [busId]);

  const handleSeatClick = (seatNumber) => {
    const selected = seats.find((seat) => seat.seatNumber === seatNumber);
    if (!selected.isBooked) {
      setSelectedSeat(seatNumber);
    }
  };

  const handleProceedClick = () => {
    navigate("/payment", { state: { busId, seatNumber: selectedSeat } });
  };

  return (
    <div className="seat-booking-container">
      <h2>Seat Details</h2>
      <div className="seat-grid">
        {seats.map((seat) => (
          <div
            key={seat._id}
            className={`seat ${seat.isBooked ? "booked" : "available"} ${
              selectedSeat === seat.seatNumber ? "selected" : ""
            }`}
            onClick={() => handleSeatClick(seat.seatNumber)}
          >
            {seat.seatNumber}
          </div>
        ))}
      </div>
      {selectedSeat && (
        <>
          <div className="selected-seat-message">
            You have selected seat number {selectedSeat}.
          </div>
          <button className="btnProceed" onClick={handleProceedClick}>
            Proceed
          </button>
        </>
      )}
    </div>
  );
}

export default SeatBooking;
