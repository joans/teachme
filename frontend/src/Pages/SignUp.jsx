import React, { useReducer } from "react";
import { useEffect } from "react";
import Button from "../UI/Button";
import Card from "../UI/Card";
import classes from "./SignUp.Module.css";

const initialState = {
  username: "",
  email: "",
  password: "",
};

const newUserReducer = (state, action) => {
  if (action.type === "UPDATE") {
    return { ...state, [action.kind]: action.value };
  }
};

const SignUp = () => {
  const [newUser, dispatchNewUser] = useReducer(newUserReducer, initialState);

  const submitButtonClick = (event) => {
    event.preventDefault();
  };

  const handleInputUpdate = (event) => {
    dispatchNewUser({
      type: "UPDATE",
      value: event.target.value,
      kind: event.target.id,
    });
  };

  useEffect(() => {
    console.log(newUser);
  }, [newUser]);

  return (
    <>
      <Card>
        <h1>Sign Up</h1>
        <form action="">
          <label htmlFor="username">User Name</label>
          <input
            type="text"
            id="username"
            onChange={handleInputUpdate}
            value={newUser.username}
          />
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            name=""
            id="email"
            onChange={handleInputUpdate}
            value={newUser.email}
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name=""
            id="password"
            onChange={handleInputUpdate}
            value={newUser.password}
          />
          <div className={classes.actions}>
            <Button onClick={submitButtonClick}>Submit</Button>
          </div>
        </form>
      </Card>
    </>
  );
};

export default SignUp;
