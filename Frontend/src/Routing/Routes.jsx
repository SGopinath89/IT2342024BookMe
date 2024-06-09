import { createBrowserRouter } from "react-router-dom";
import Header from "../Components/Header";
import Body from "../Components/Body";
import List from "../Components/List";
import BusList from "../Components/BusList";

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
  {
    path: "/search-result",
    element: <BusList />,
  },
]);

export default router;
