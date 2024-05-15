import List from "./List";
function Body({ children }) {
  return (
    <>
      <div className="Box">
        <div className="Rectangle">{children}</div>
      </div>
    </>
  );
}
export default Body;
