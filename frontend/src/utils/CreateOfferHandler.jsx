import React, { useContext } from "react";
import AuthContext from "../store/auth-context";
import CreateOffer from "../Pages/CreateOffer";
import ErrorPage from "../Pages/ErrorPage";
import { useParams } from "react-router-dom";

const CreateOfferHandler = () => {
  const auth = useContext(AuthContext);
  const { id } = useParams();

  return (
    <>
      {auth.isLoggedIn ? (
        <CreateOffer id={id} />
      ) : (
        <ErrorPage>
          You are logged out, please log in to post an offer.
        </ErrorPage>
      )}
    </>
  );
};

export default CreateOfferHandler;
