import React from "react";
import line from "./assets/LIne.svg";
function Ticket() {
  return (
    <>
      <div className="TicketDiv">
        <img className="lineIcon" src={line} alt="Image" />
        <div className="LineDiv"></div>
        <div className="box">
          <div className="ellipseLeft" />
          <div className="ellipseRight" />
          <label></label>
        </div>
      </div>
    </>
  );
}
export default Ticket;
