import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Header from "./Layout/Header";
import CreateOffer from "./Pages/CreateOffer";
import Categories from "./Pages/Categories";
import SignUp from "./Pages/SignUp";
import ErrorPage from "./Pages/ErrorPage";

function App() {
  return (
    <div className="App">
      <Router>
      <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create_offer" element={<CreateOffer />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
