import Body from "./Components/Body";
import Header from "./Components/Header";
import List from "./Components/List";
import Ticket from "./Components/Ticket";
import router from "./Routing/Routes";
import { RouterProvider } from "react-router-dom";
const App = () => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;
