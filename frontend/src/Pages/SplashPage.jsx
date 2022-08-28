import React from "react";
import classes from "./SplashPage.module.css";
import { Link } from "react-router-dom";
import Button from "../UI/Button";

const SplashPage = () => {
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
      <Button class="color-three">Sign Up</Button>
    </div>
  );
};

export default SplashPage;
