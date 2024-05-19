import List from "./List";
import Bus from "./assets/Bus.svg";
function Body({ children }) {
  return (
    <>
      <div className="Box">
        <img src={Bus} className="BusImg"></img>
        <div className="Rectangle">{children}</div>
      </div>
    </>
  );
}
export default Body;
