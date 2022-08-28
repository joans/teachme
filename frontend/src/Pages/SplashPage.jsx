import React from "react";
import classes from "./SplashPage.module.css";
import { useNavigate } from "react-router-dom";
import AuthContext from "../store/auth-context";
import Button from "../UI/Button";
import { useContext } from "react";

const SplashPage = () => {
  const navigate = useNavigate();
  const authCtx = useContext(AuthContext);

  return (
    <div className={classes.team}>
      <h1>
        <span>
          Welcome to <strong>Skillpact</strong>!
        </span>
      </h1>
      <div className={classes.text}>
        <span> Make learning an adventure.</span>
        <br />
        <span>
          <strong> Skillpact </strong> is an online plattform that connects
          people who want to develop personally while creating real connections.
        </span>
        <br />
        <span> Share your skills and make an impact with Skillpact!</span>

        <br />
      </div>
      {!authCtx.isLoggedIn && (
        <Button
          className={`${classes.button}`}
          onClick={() => {
            navigate("/signup");
          }}
        >
          Sign Up
        </Button>
      )}
    </div>
  );
};

export default SplashPage;
