import { createBrowserRouter } from "react-router-dom";
import Header from "../Components/Header";
import Body from "../Components/Body";
import List from "../Components/List";
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Header />
        <Body />
        <List />
      </>
    ),
  },
]);
export default router;
