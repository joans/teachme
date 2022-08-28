import React from "react";
import OfferOverview from "./OfferOverview";
import SplashPage from "./SplashPage";
import AuthContext from "../store/auth-context";
import { useContext } from "react";

const Home = () => {
  const authCtx = useContext(AuthContext);
  return (
    <>
      <div>
        {!authCtx.isLoggedIn && <SplashPage />}

        <h1>Offers</h1>
        <OfferOverview />
      </div>
    </>
  );
};

export default Home;
