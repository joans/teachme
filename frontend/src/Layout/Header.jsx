import React from "react";
import Button from "../UI/Button";
import classes from "./Header.module.css";

const Header = () => {
  return (
    <>
      <header className={`${classes.header} color-main`}>
        <div className={classes["left-side"]}>
          <h1>Skill Bill</h1>
        </div>
        <div className={classes["right-side"]}>
          <ul>
            <li>
              <h3>Create Offer</h3>
            </li>
            <li><h3>Categories</h3></li>
            <li>
              <Button className="color-two">Log In</Button>
            </li>
            <li>
              <Button className="color-three">Sign Up</Button>
            </li>
          </ul>
        </div>
      </header>
    </>
  );
};

export default Header;
