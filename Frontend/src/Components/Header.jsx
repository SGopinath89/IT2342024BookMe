import { Outlet } from "react-router-dom";
import logo from "./assets/Bus.svg";

function Header() {
  return (
    <>
      <header>
        <nav>
          <img className="logo" src={logo} />
          <ul className="list">
            <li>
              <a href="#">Dashboard</a>
            </li>
            <li>
              <a href="#">Bus TimeTable</a>
            </li>
            <li>
              <a href="#">About Us</a>
            </li>
            <li>
              <a href="#">Contact</a>
            </li>
          </ul>
          <button className="btnLogout">
            <a href="#">Logout</a>
          </button>
        </nav>
      </header>
      <Outlet></Outlet>
    </>
  );
}
export default Header;
