import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Header from "./Layout/Header";
import CreateOfferHandler from "./Pages/CreateOfferHandler";
import Categories from "./Pages/Categories";
import SignUp from "./Pages/SignUp";
import ErrorPage from "./Pages/ErrorPage";
import Login from "./Pages/Login";

function App() {
  return (
    <div className="App">
      <Header />
      <div className="page">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create_offer" element={<CreateOfferHandler />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
