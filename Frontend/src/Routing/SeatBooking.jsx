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
        const response = await axios.get(
          `http://localhost:8080/seat-booking/${busId}`
        );
        setSeats(response.data);
      } catch (error) {
        console.error("Error fetching seat details:", error);
      }
    };

    fetchSeats();
  }, [busId]);

  const handleSeatClick = (seatNumber) => {
    setSelectedSeat(seatNumber);
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
