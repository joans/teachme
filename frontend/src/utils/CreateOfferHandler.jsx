import React from "react";
import { useContext } from "react";
import AuthContext from "../store/auth-context";
import CreateOffer from "../Pages/CreateOffer";
import ErrorPage from "../Pages/ErrorPage";

const CreateOfferHandler = () => {
  const auth = useContext(AuthContext);

  return (
    <>
      {auth.isLoggedIn ? (
        <CreateOffer />
      ) : (
        <ErrorPage>
          You are logged out, please log in to post an offer.
        </ErrorPage>
      )}
    </>
  );
};

export default CreateOfferHandler;
