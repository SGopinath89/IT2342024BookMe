import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

function Payment() {
  const navigate = useNavigate();
  const location = useLocation();
  const { busId, seatNumber } = location.state;
  const userId = "60b7be9f2e35f10654a24b6c"; // Replace this with the actual logged-in user's ID

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();
    console.log("Payment submitted");

    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "http://localhost:8080/seat/book-seat",
        { busId, seatNumber, userId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      navigate("/ticket", { state: { busId, seatNumber } });
    } catch (error) {
      console.error("Error booking seat:", error);
    }
  };

  return (
    <div className="payment-container">
      <h2>Payment Page</h2>
      <p>Bus ID: {busId}</p>
      <p>Seat Number: {seatNumber}</p>
      <form className="payment-form" onSubmit={handlePaymentSubmit}>
        <div className="form-group">
          <label htmlFor="cardName">Cardholder Name</label>
          <input type="text" id="cardName" name="cardName" required />
        </div>
        <div className="form-group">
          <label htmlFor="cardNumber">Card Number</label>
          <input
            type="text"
            id="cardNumber"
            name="cardNumber"
            required
            maxLength="16"
          />
        </div>
        <div className="form-group">
          <label htmlFor="expiryDate">Expiry Date</label>
          <input
            type="text"
            id="expiryDate"
            name="expiryDate"
            placeholder="MM/YY"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="cvv">CVV</label>
          <input type="text" id="cvv" name="cvv" required maxLength="3" />
        </div>
        <button type="submit" className="btnSubmit">
          Submit Payment
        </button>
      </form>
    </div>
  );
}

export default Payment;
