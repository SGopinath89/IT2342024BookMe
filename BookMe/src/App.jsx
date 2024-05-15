import Body from "./Components/Body";
import Header from "./Components/Header";
import { BrowserRouter as Router, Routes } from "react-router-dom";
import List from "./Components/List";
const App = () => {
  return (
    <>
      <Header />
      <Body>
        <List />
      </Body>
      <Router>
        <Routes path="/" exact></Routes>
      </Router>
    </>
  );
};

export default App;
