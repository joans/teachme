import React, { useReducer, useEffect, useState } from "react";
import Button from "../UI/Button";
import Card from "../UI/Card";
import classes from "./SignUp.module.css";

import { FaCheck, FaTimes, FaInfoCircle, FaInfo } from "react-icons/fa";

const USER_REGEX = /^\w{1,}[\w\d_-]{3,22}$/;
const EMAIL_REGEX = /^\S+@.+\..+$/;
const PWD_REGEX = /^.{8,64}$/;

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
  username: true,
  email: true,
  password: true,
  repeatPassword: true,
};

const newUserReducer = (state, action) => {
  if (action.type === "UPDATE") {
    return { ...state, [action.kind]: action.value };
  }
  if (action.type === "SUBMIT_FORM") {
    console.log(state);
    // TODO: Send Data to Backend here!
  }
  return state;
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
  return state;
};

const userFocusReducer = (state, action) => {
  if (action.type === "FOCUS") {
    return { ...state, [action.kind]: action.value };
  }
  return state;
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

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const valid1 = USER_REGEX.test(newUser.username);
    const valid2 = PWD_REGEX.test(newUser.password);
    const valid3 = EMAIL_REGEX.test(newUser.email);

    if (!valid1 || !valid2 || !valid3) {
      return;
    }

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
    // if (focusEvent === "onFocus") {
    //   disptachCurFocus({ type: "FOCUS", value: true, kind: event.target.id });
    // }
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

  useEffect(() => {}, [newUser]);

  return (
    <>
      <Card>
        <h1>Sign Up</h1>
        <form onSubmit={handleFormSubmit}>
          <label htmlFor="username" className={classes.label}>
            User Name {formIsValid.usernameValid && <FaCheck />}
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
            className={classes.input}
          />
          <p
            className={
              !formIsValid.usernameValid &&
              !curFocus.username &&
              newUser.username
                ? classes.howto
                : classes.offscreen
            }
          >
            <FaInfoCircle /> 4 to 24 characters <br />
            Allowed: letters numbers, underscore, hyphen <br />
            Has to start with a letter
          </p>
          <label htmlFor="email" className={classes.label}>
            E-Mail {formIsValid.emailValid && <FaCheck />}
          </label>
          <input
            type="email"
            name=""
            id="email"
            required
            autoComplete="off"
            onChange={handleInputUpdate}
            onFocus={handleFocusChange}
            onBlur={handleFocusChange}
            value={newUser.email}
            className={classes.input}
          />
          <p
            className={
              !formIsValid.emailValid && !curFocus.email && newUser.email
                ? classes.howto
                : classes.offscreen
            }
          >
            <FaInfoCircle /> E-Mail Address not valid
          </p>
          <label htmlFor="password" className={classes.label}>
            Password {formIsValid.passwordValid && <FaCheck />}
          </label>
          <input
            type="password"
            name=""
            id="password"
            required
            onChange={handleInputUpdate}
            onFocus={handleFocusChange}
            onBlur={handleFocusChange}
            value={newUser.password}
            className={classes.input}
          />
          <p
            className={
              !formIsValid.passwordValid &&
              !curFocus.password &&
              newUser.password
                ? classes.howto
                : classes.offscreen
            }
          >
            <FaInfoCircle /> 8 to 64 characters <br />
          </p>
          <label htmlFor="repeatPassword" className={classes.label}>
            Repeat Password{" "}
            {/* TODO: Password matching checkmark is shown shortly after first letter of password is typed in */}
            {formIsValid.passwordMatching && newUser.password && <FaCheck />}
          </label>
          <input
            type="password"
            name=""
            id="repeatPassword"
            required
            onChange={handleInputUpdate}
            onFocus={handleFocusChange}
            onBlur={handleFocusChange}
            value={newUser.repeatPassword}
            className={classes.input}
          />
          <p
            className={
              !formIsValid.passwordMatching &&
              !curFocus.repeatPassword &&
              newUser.repeatPassword
                ? classes.howto
                : classes.offscreen
            }
          >
            <FaInfoCircle /> Passwords are not matching
          </p>
          <div className={classes.actions}>
            <Button
              disabled={
                !formIsValid.usernameValid ||
                !formIsValid.emailValid ||
                !formIsValid.passwordValid ||
                !formIsValid.passwordMatching
                  ? true
                  : false
              }
            >
              Submit
            </Button>
          </div>
        </form>
      </Card>
    </>
  );
};

export default SignUp;
