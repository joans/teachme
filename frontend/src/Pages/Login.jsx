import React, { useRef, useState, useContext } from "react";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../store/auth-context";
import Button from "../UI/Button";
import Card from "../UI/Card";
import classes from "./SignUp.module.css";
import Axios from "axios";
import { FaTimes } from "react-icons/fa";

const Login = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  const usernameRef = useRef();
  const [user, setUser] = useState({ username: "", password: "" });

  const [errMsg, setErrMsg] = useState();

  const updateUser = (e) => {
    setUser((oldstate) => {
      return { ...oldstate, [e.target.id]: e.target.value };
    });
  };

  useEffect(() => {
    usernameRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [user]);

  const formSubmit = async (e) => {
    e.preventDefault();

    try {
      const resp = await Axios.post(`/login`, user);
      console.log(resp.data);
      auth.onLogin(resp.data);
      navigate("/");
    } catch (err) {
      // err returns an Axios err object, the original error message from the backend is stored as
      // stringified version of the err object and must be parsed
      const errMsgBackend = err.response.data.error;
      console.log(errMsgBackend);
      setErrMsg(errMsgBackend);
    }

    // For test purposes only: Pick a random index from the array and use this users uuid as a login param
  };

  return (
    <Card>
      <h1>Login</h1>
      <form onSubmit={formSubmit}>
        <span className={errMsg ? classes.errMsg : classes.offscreen}>
          <FaTimes />
          {errMsg}
        </span>
        <label htmlFor="username" className={classes.label}>
          Username
        </label>
        <input
          type="username"
          id="username"
          ref={usernameRef}
          onChange={updateUser}
          value={user.username}
          autoComplete="off"
          className={`${classes.input} ${classes["input-invalid"]}`}
        />
        <label htmlFor="password" className={classes.label}>
          Password
        </label>
        <input
          type="password"
          id="password"
          onChange={updateUser}
          value={user.password}
          autoComplete="off"
          className={`${classes.input} ${classes["input-invalid"]}`}
        />
        <div className={classes.actions}>
          <Button className={classes.button}>Submit</Button>
        </div>
      </form>
      <p className={classes["already-account-message"]}>
        {" "}
        Need an account? <br />
        <Link to="/signup" className={classes.link}>
          Sign Up
        </Link>
        <br />
      </p>
    </Card>
  );
};

export default Login;
