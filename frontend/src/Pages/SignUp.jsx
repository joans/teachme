import React, { useReducer, useEffect, useState } from "react";
import Button from "../UI/Button";
import Card from "../UI/Card";
import classes from "./SignUp.module.css";
import Axios from "axios";

import { FaTimes, FaInfoCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

const USER_REGEX = /^[\w\d_-]{4,24}$/;
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
    Axios.post("http://localhost:3307/register", {
      username: state.username,
      email: state.email,
      password: state.password,
    }).then(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    );
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
  const [errMsg, setErrMsg] = useState("");

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
      setErrMsg("Invalid form!");
      return;
    }

    dispatchNewUser({
      type: "SUBMIT_FORM",
    });
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

  useEffect(() => {
    setErrMsg("");
  }, [newUser]);

  useEffect(() => {}, [newUser]);

  return (
    <Card>
      <div className={classes.signup}>
        <h1>Sign Up</h1>
        <form onSubmit={handleFormSubmit}>
          <span className={errMsg ? classes.errMsg : classes.offscreen}>
            <FaTimes />
            {errMsg}
          </span>
          <label htmlFor="username" className={classes.label}>
            User Name
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
            className={`${classes.input} ${
              formIsValid.usernameValid
                ? classes["input-valid"]
                : classes["input-invalid"]
            }`}
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
          </p>
          <label htmlFor="email" className={classes.label}>
            E-Mail
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
            className={`${classes.input} ${
              formIsValid.emailValid
                ? classes["input-valid"]
                : classes["input-invalid"]
            }`}
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
            Password
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
            className={`${classes.input} ${
              formIsValid.passwordValid
                ? classes["input-valid"]
                : classes["input-invalid"]
            }`}
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
            className={`${classes.input} ${
              formIsValid.passwordMatching && newUser.repeatPassword
                ? classes["input-valid"]
                : classes["input-invalid"]
            }`}
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
              className={`${classes.button} ${
                (!formIsValid.usernameValid ||
                  !formIsValid.emailValid ||
                  !formIsValid.passwordValid ||
                  !formIsValid.passwordMatching) &&
                classes.buttonInvalid
              }`}
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
        <p className={classes["already-account-message"]}>
          Already have an account? <br />
          <Link to="/login" className={classes.link}>
            Log in
          </Link>
        </p>
      </div>
    </Card>
  );
};

export default SignUp;
