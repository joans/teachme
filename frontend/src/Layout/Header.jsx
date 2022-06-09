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
          <Button className="color-two">Log In</Button>
          <Button className="color-three">Sign Up</Button>
        </div>
      </header>
    </>
  );
};

export default Header;
