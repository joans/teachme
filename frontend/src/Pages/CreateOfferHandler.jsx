import React from "react";
import { useContext } from "react";
import AuthContext from "../store/auth-context";
import CreateOffer from "./CreateOffer";
import ErrorPage from "./ErrorPage";

const CreateOfferHandler = () => {
  const auth = useContext(AuthContext);

  return (
    <>
      {auth.isLoggedIn ? (
        <CreateOffer />
      ) : (
        <ErrorPage>You are logged out, please log in</ErrorPage>
      )}
    </>
  );
};

export default CreateOfferHandler;
