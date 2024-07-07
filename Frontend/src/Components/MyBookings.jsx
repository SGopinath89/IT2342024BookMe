import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import AuthContext from "../AuthContext";

function MyBookings() {
  const { isAuthenticated } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    if (isAuthenticated) {
      const fetchBookings = async () => {
        try {
          const token = localStorage.getItem("token");
          if (!token) {
            console.error("No token found in localStorage");
            return;
          }
          const response = await axios.get(
            "http://localhost:8080/booking/my-reservations",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setBookings(response.data);
        } catch (error) {
          console.error("Error fetching bookings:", error);
        }
      };

      fetchBookings();
    }
  }, [isAuthenticated]);

  return (
    <div className="bookings-container">
      <h2>My Bookings</h2>
      {bookings.length > 0 ? (
        <>
          <p>
            <strong>Number of bookings: </strong>
            {bookings.length}
          </p>
          {bookings.map((booking) => (
            <div key={booking._id} className="booking-details">
              <div>
                <strong>Reference Number:</strong> {booking.referenceNumber}
              </div>
              <div>
                <strong>Bus ID:</strong> {booking.busId.BusID}
              </div>
              <div>
                <strong>Route No:</strong> {booking.busId.Route_No}
              </div>
              <div>
                <strong>Departure City:</strong> {booking.busId.Departure_City}
              </div>
              <div>
                <strong>Arrival City:</strong> {booking.busId.Arrival_City}
              </div>
              <div>
                <strong>Departure Time:</strong> {booking.busId.Departure_Time}
              </div>
              <div>
                <strong>Arrival Time:</strong> {booking.busId.Arrival_Time}
              </div>
              <div>
                <strong>Seat Number:</strong> {booking.seatNumber}
              </div>
            </div>
          ))}
        </>
      ) : (
        <p>No bookings found</p>
      )}
    </div>
  );
}

export default MyBookings;
