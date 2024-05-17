import Body from "./Components/Body";
import Header from "./Components/Header";
import { BrowserRouter as Router, Routes } from "react-router-dom";
import List from "./Components/List";
import Ticket from "./Components/Ticket";

const App = () => {
  return (
    <>
      <Header />
      <Body>
        <List />
        <Ticket></Ticket>
      </Body>
      <Router>
        <Routes path="/" exact></Routes>
      </Router>
    </>
  );
};

export default App;
