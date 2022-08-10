import React from "react";
import classes from "./SplashPage.module.css";
import { Link } from "react-router-dom";

const SplashPage = () => {
  return (
    <div className={classes.team}>
      <h1>
        Wilkommen zu <strong>Skillpact</strong>!
      </h1>
      <p> Make learning an adventure.</p>
      <p>
        <strong> Skillpact </strong> is an online plattform that connects people
        who want to develope personally while creating real connections.
      </p>
      <p> Share your skills and make an impact with Skillpact!</p>
      <button class="Button_button__8Orjn color-three">Sign Up</button>
    </div>
  );
};

export default SplashPage;
