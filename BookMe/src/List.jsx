function List() {
  return (
    <>
      <div className="ListDiv">
        <p>Online Reservation</p>
      </div>
      <div className="DivofList">
        <div className="fromDiv">
          <p className="fromText">From</p>
        </div>
        <div className="fromTo">
          <p className="fromText">To</p>
        </div>
        <div className="datediv"></div>
      </div>
      <button className="BtnSearchBuses">Search Buses</button>
    </>
  );
}
export default List;
