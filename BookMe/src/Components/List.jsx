import { useState } from "react";
function List() {
  const [value, setValue] = useState("");
  const onChange = (event) => {
    setValue(even.target.value);
  };
  return (
    <>
      <div className="ListDiv">
        <p>Online Reservation</p>
      </div>
      <div className="DivofList">
        <div className="fromDiv">
          <input
            type="text"
            placeholder="From"
            value={value}
            onChange={onChange}
          />
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
