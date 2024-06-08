import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, Link } from "react-router-dom";

function BusList() {
  const [searchResults, setSearchResults] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const searchCriteria = location.state?.searchCriteria;

    if (searchCriteria) {
      axios
        .post("http://localhost:8080/searchBuses", searchCriteria)
        .then((response) => {
          console.log("Search Data Posted:", response.data);
          setSearchResults(response.data);
        })
        .catch((err) => {
          console.log("Error Posting Search Data:", err);
        });
    }
  }, [location.state?.searchCriteria]);

  return (
    <div className="searchResults">
      {searchResults.length > 0 ? (
        searchResults.map((bus) => (
          <div key={bus.BusID} className="busDetails">
            <div className="ListDiv1">
              <label className="BusRoute">Route No: </label>
              <span className="BusRoute-Text">{bus.Route_No}</span>
            </div>
            <div className="busDetailRow">
              <label className="busId">Bus ID: </label>
              <span className="busId-Text">{bus.BusID}</span>
            </div>
            <div className="busDetailRow">
              <label className="DepatureCity">Departure City: </label>
              <span className="DepatureCity-Text">{bus.Departure_City}</span>
            </div>
            <div className="busDetailRow">
              <label className="Departure_Time">Departure Time: </label>
              <span className="Departure_Time-Text">{bus.Departure_Time}</span>
            </div>
            <div className="busDetailRow">
              <label className="Arrival_City">Arrival City: </label>
              <span className="Arrival_City-Text">{bus.Arrival_City}</span>
            </div>
            <div className="busDetailRow">
              <label className="Arrival_Time">Arrival Time: </label>
              <span className="Arrival_Time-Text">{bus.Arrival_Time}</span>
            </div>
            <div className="busDetailRow"></div>
            <div className="busDetailRow">
              <label className="Price">Price: </label>
              <span className="Price-Text">Rs. {bus.Price}.00</span>
            </div>
            <div className="busDetailRow">
              <label className="Seats">Available Seats: </label>
              <span className="Seats-Text">{bus.Seat_No}</span>
            </div>
            {/* Other bus details */}
            <Link to={`/seat-booking/${bus._id}`} className="btnBookSeat">
              Book Seat
            </Link>
          </div>
        ))
      ) : (
        <p>No buses found</p>
      )}
    </div>
  );
}

export default BusList;
