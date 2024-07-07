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
import AuthRoute from "./Auth/AuthRoute";
import MyBookings from "./Components/MyBookings";

function App() {
  const [searchCriteria, setSearchCriteria] = useState(null);

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <AuthRoute>
          <>
            <Header />
            <Body />
            <List setSearchCriteria={setSearchCriteria} />
          </>
        </AuthRoute>
      ),
    },
    {
      path: "/search-result",
      element: (
        <AuthRoute>
          <>
            <Header />
            <Body />
            <BusList searchCriteria={searchCriteria} />
          </>
        </AuthRoute>
      ),
    },
    {
      path: "/seat-booking/:busId",
      element: (
        <AuthRoute>
          <>
            <Header />
            <Body />
            <SeatBooking />
          </>
        </AuthRoute>
      ),
    },
    {
      path: "/payment",
      element: (
        <AuthRoute>
          <>
            <Header />
            <Body />
            <Payment />
          </>
        </AuthRoute>
      ),
    },
    {
      path: "/ticket",
      element: (
        <AuthRoute>
          <>
            <Header />
            <Body />
            <Ticket />
          </>
        </AuthRoute>
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
    {
      path: "/Mybooking",
      element: (
        <AuthRoute>
          <>
            <Header />
            <Body />
            <MyBookings />
          </>
        </AuthRoute>
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
