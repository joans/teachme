import React, { useReducer, useEffect } from "react";
import Button from "../UI/Button";
import Card from "../UI/Card";
import classes from "./SignUp.Module.css";

import { FaCheck, FaTimes, FaInfoCircle } from "react-icons/fa";
import { useState } from "react";

const USER_REGEX = /^\w{1,}[\w\d]{2,22}$/;
const EMAIL_REGEX = /^\S+\@.+\..+$/;
const PWD_REGEX = /^.{8,30}$/;

const initialUserState = {
  username: "",
  email: "",
  password: "",
  repeatPassword: "",
};

const initialValidState = {
  usernameValid: false,
  emailValid: false,
  passwordValid: false,
  passwordMatching: false,
};

const initialFocusState = {
  username: false,
  email: false,
  password: false,
  repeatPassword: false,
};

const newUserReducer = (state, action) => {
  if (action.type === "UPDATE") {
    return { ...state, [action.kind]: action.value };
  }
  if (action.type === "SUBMIT_FORM") {
    return initialUserState;
  }
};

const handleFormChangeReducer = (state, action) => {
  if (action.type === "PASSWORD_MATCH") {
    return { ...state, passwordMatching: action.value };
  }
  if (action.type === "PASSWORD_CHANGE") {
    return { ...state, passwordValid: action.value };
  }
  if (action.type === "USERNAME_CHANGE") {
    return { ...state, usernameValid: action.value };
  }
  if (action.type === "EMAIL_CHANGE") {
    return { ...state, emailValid: action.value };
  }
};

const userFocusReducer = (state, action) => {
  if (action.type === "FOCUS") {
    return { ...state, [action.kind]: action.value };
  }
};

const SignUp = () => {
  const [curFocus, disptachCurFocus] = useReducer(
    userFocusReducer,
    initialFocusState
  );

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

  const handleFocusChange = (event) => {
    const focusEvent = event._reactName;
    if (focusEvent === "onFocus") {
      disptachCurFocus({ type: "FOCUS", value: true, kind: event.target.id });
    }
    if (focusEvent === "onBlur") {
      disptachCurFocus({ type: "FOCUS", value: false, kind: event.target.id });
    }
  };

  // Check for matching passwords
  useEffect(() => {
    const passwordValid = PWD_REGEX.test(newUser.password);
    if (passwordValid) {
      dispatchFormIsValid({ type: "PASSWORD_CHANGE", value: true });
    } else {
      dispatchFormIsValid({ type: "PASSWORD_CHANGE", value: false });
    }

    if (newUser.password === newUser.repeatPassword) {
      dispatchFormIsValid({ type: "PASSWORD_MATCH", value: true });
    } else {
      dispatchFormIsValid({ type: "PASSWORD_MATCH", value: false });
    }
  }, [newUser.password, newUser.repeatPassword]);

  useEffect(() => {
    const emailValid = EMAIL_REGEX.test(newUser.email);
    if (emailValid) {
      dispatchFormIsValid({ type: "EMAIL_CHANGE", value: true });
    } else {
      dispatchFormIsValid({ type: "EMAIL_CHANGE", value: false });
    }
  }, [newUser.email]);

  useEffect(() => {
    const usernameRegexMatch = USER_REGEX.test(newUser.username);
    if (usernameRegexMatch) {
      dispatchFormIsValid({ type: "USERNAME_CHANGE", value: true });
    } else {
      dispatchFormIsValid({ type: "USERNAME_CHANGE", value: false });
    }
  }, [newUser.username]);

  return (
    <>
      <Card>
        <h1>Sign Up</h1>
        <form onSubmit={handleFormSubmit}>
          <label htmlFor="username">
            User Name
            {formIsValid.usernameValid ? (
              <FaCheck />
            ) : (
              <p>User Name is not valid</p>
            )}
          </label>
          <input
            type="text"
            id="username"
            required
            autoComplete="off"
            onChange={handleInputUpdate}
            value={newUser.username}
            onFocus={handleFocusChange}
            onBlur={handleFocusChange}
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
