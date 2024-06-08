import React, { useState } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Header from "./Components/Header";
import Body from "./Components/Body";
import List from "./Components/List";
import BusList from "./Components/BusList";
import SeatBooking from "./Components/SeatBooking";
import Payment from "./Components/Payment";
import Ticket from "./Components/Ticket";
import Signup from "./Components/Signup";
import Login from "./Components/Login";
import { AuthProvider } from "./AuthContext";

function App() {
  const [searchCriteria, setSearchCriteria] = useState(null);

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <>
          <Header />
          <Body />
          <List setSearchCriteria={setSearchCriteria} />
        </>
      ),
    },
    {
      path: "/search-result",
      element: (
        <>
          <Header />
          <Body />
          <BusList searchCriteria={searchCriteria} />
        </>
      ),
    },
    {
      path: "/seat-booking/:busId",
      element: (
        <>
          <Header />
          <Body />
          <SeatBooking />
        </>
      ),
    },
    {
      path: "/payment",
      element: (
        <>
          <Header />
          <Body />
          <Payment />
        </>
      ),
    },
    {
      path: "/ticket",
      element: (
        <>
          <Header />
          <Body />
          <Ticket />
        </>
      ),
    },
    {
      path: "/signup",
      element: (
        <>
          <Header />
          <Body />
          <Signup />
        </>
      ),
    },
    {
      path: "/login",
      element: (
        <>
          <Header />
          <Body />
          <Login />
        </>
      ),
    },
  ]);

  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
