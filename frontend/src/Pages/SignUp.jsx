import React, { useReducer, useEffect } from "react";
import Button from "../UI/Button";
import Card from "../UI/Card";
import classes from "./SignUp.Module.css";

import { FaCheck, FaTimes, FaInfoCircle } from "react-icons/fa";

const USER_REGEX = /^\w{1,}[\w\d]{2,22}$/;
const PWD_REGEX = /^.{8,30}$/;

const initialUserState = {
  username: "",
  email: "",
  password: "",
  repeatPassword: "",
};

const initialValidState = {
  usernameValid: null,
  emailValid: null,
  passwordValid: null,
  passwordMatching: null,
};

const newUserReducer = (state, action) => {
  if (action.type === "UPDATE") {
    return { ...state, [action.kind]: action.value };
  }
  if (action.type === "SUBMIT_FORM") {
    return initialUserState;
  }
};

const handleFormChangeReducer = (state, action) => {};

const SignUp = () => {
  const [newUser, dispatchNewUser] = useReducer(
    newUserReducer,
    initialUserState
  );

  const [formIsValid, dispatchFormIsValid] = useReducer(
    handleFormChangeReducer,
    initialValidState
  );

  const handleFormSubmit = () => {
    dispatchNewUser({
      type: "SUBMIT_FORM",
    });
  };
  const submitButtonClick = (event) => {
    event.preventDefault();
    handleFormSubmit();
  };

  const handleInputUpdate = (event) => {
    dispatchNewUser({
      type: "UPDATE",
      value: event.target.value,
      kind: event.target.id,
    });
  };

  return (
    <>
      <Card>
        <h1>Sign Up</h1>
        <form onSubmit={handleFormSubmit}>
          <label htmlFor="username">User Name</label>
          <input
            type="text"
            id="username"
            required
            autoComplete="off"
            onChange={handleInputUpdate}
            value={newUser.username}
          />
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            name=""
            id="email"
            required
            autoComplete="off"
            onChange={handleInputUpdate}
            value={newUser.email}
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name=""
            id="password"
            required
            onChange={handleInputUpdate}
            value={newUser.password}
          />
          <label htmlFor="repeatPassword">Repeat Password</label>
          <input
            type="password"
            name=""
            id="repeatPassword"
            required
            onChange={handleInputUpdate}
            value={newUser.repeatPassword}
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
