import React from "react";
import OfferOverview from "./OfferOverview";
import SplashPage from "./SplashPage";

const Home = () => {
  return (
    <>
      <div>
        <SplashPage />
        <h1>Offers</h1>
        <OfferOverview />
      </div>
    </>
  );
};

export default Home;
