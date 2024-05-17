import { line } from "./assets/Line.png";
function Ticket() {
  return (
    <>
      <div className="TicketDiv">
        <img className="lineIcon" src={line} alt="Image" />
        <div className="LineDiv"></div>
      </div>
    </>
  );
}
export default Ticket;
