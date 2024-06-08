import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function List({ setSearchCriteria }) {
  const [departureCity, setDepartureCity] = useState("");
  const [arrivalCity, setArrivalCity] = useState("");
  const [travelDate, setTravelDate] = useState("");
  const [cities, setCities] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCities();
  }, []);

  const fetchCities = async () => {
    try {
      const response = await axios.get("http://localhost:8080/cities");
      setCities(response.data);
    } catch (error) {
      console.error("Error fetching cities:", error);
    }
  };

  const handleSearchBuses = (e) => {
    e.preventDefault();
    const searchData = {
      departureCity,
      arrivalCity,
      travelDate,
    };
    setSearchCriteria(searchData);
    navigate("/search-result", { state: { searchCriteria: searchData } });
  };

  const today = new Date().toISOString().split("T")[0];

  return (
    <>
      <div className="ListDiv1">
        <p>Online Reservation</p>
      </div>
      <form className="DivofList" onSubmit={handleSearchBuses}>
        <div className="fromDiv">
          <input
            type="text"
            className="inputDeparture"
            value={departureCity}
            onChange={(e) => setDepartureCity(e.target.value)}
            placeholder="Departure City"
            list="departureCities"
            required
          />
          <datalist id="departureCities">
            {cities.map((city) => (
              <option key={city} value={city} />
            ))}
          </datalist>
        </div>
        <div className="toDiv">
          <input
            type="text"
            className="inputArrival"
            value={arrivalCity}
            onChange={(e) => setArrivalCity(e.target.value)}
            placeholder="Arrival City"
            list="arrivalCities"
            required
          />

          <datalist id="arrivalCities">
            {cities.map((city) => (
              <option key={city} value={city} />
            ))}
          </datalist>
        </div>
        <div className="datediv">
          <input
            type="date"
            className="Dateinput"
            value={travelDate}
            onChange={(e) => setTravelDate(e.target.value)}
            placeholder="Travel Date"
            min={today}
          />
        </div>
        <button type="submit" className="BtnSearchBuses">
          Search Buses
        </button>
      </form>
    </>
  );
}

export default List;
