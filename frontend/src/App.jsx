import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Header from "./Layout/Header";
import CreateOfferHandler from "./utils/CreateOfferHandler";
import Categories from "./Pages/Categories";
import SignUp from "./Pages/SignUp";
import ErrorPage from "./Pages/ErrorPage";
import Login from "./Pages/Login";
import PostDetail from "./Pages/PostDetail";
import Profile from "./Pages/Profile";
import SearchResults from "./Pages/SearchResults";
import Footer from "./Layout/Footer";
import Imprint from "./Pages/Imprint";
import PrivacyStatement from "./Pages/PrivacyStatement";
import AboutUs from "./Pages/AboutUs";

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
          <Route path="/offer/:id" element={<PostDetail />} />
          <Route path="/user/:id" element={<Profile />} />
          <Route path="/search/:searchTerm" element={<SearchResults />} />
          <Route path="/offer/edit/:id" element={<CreateOfferHandler />} />
          <Route path="/imprint" element={<Imprint />} />
          <Route path="/privacy_statement" element={<PrivacyStatement />} />
          <Route path="/about_us" element={<AboutUs />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
