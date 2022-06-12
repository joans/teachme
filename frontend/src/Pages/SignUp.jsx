import React from "react";
import Button from "../UI/Button";
import Card from "../UI/Card";
import classes from "./SignUp.Module.css";

const SignUp = () => {
  const submitButtonClick = (event) => {
    event.preventDefault();
  };

  return (
    <>
      <Card>
        <h1>Sign Up</h1>
        <form action="">
          <label htmlFor="email">E-Mail</label>
          <input type="email" name="" id="email" />
          <label htmlFor="username">User Name</label>
          <input type="text" id="username" />
          <label htmlFor="password">Password</label>
          <input type="password" name="" id="password" />
          <div className={classes.actions}>
            <Button onClick={submitButtonClick}>Submit</Button>
          </div>
        </form>
      </Card>
    </>
  );
};

export default SignUp;
