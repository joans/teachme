import React, { useRef, useState, useContext } from "react";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../store/auth-context";
import Button from "../UI/Button";
import Card from "../UI/Card";
import classes from "./SignUp.module.css";
import Axios from "axios";

const Login = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  const emailRef = useRef();
  const [user, setUser] = useState({ email: "", password: "" });

  const updateUser = (e) => {
    setUser((oldstate) => {
      return { ...oldstate, [e.target.id]: e.target.value };
    });
  };

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  const formSubmit = (e) => {
    e.preventDefault();
    Axios.post("http://localhost:3307/login", {
      email: user.email,
      password: user.password,
    }).then(
      (response) => {
        console.log(response.data);
      },
      (error) => {
        console.log(error);
      }
    );
    auth.onLogin();
    navigate("/");
  };

  return (
    <Card>
      <h1>Login</h1>
      <form onSubmit={formSubmit}>
        <label htmlFor="email" className={classes.label}>
          Email
        </label>
        <input
          type="email"
          id="email"
          ref={emailRef}
          onChange={updateUser}
          value={user.email}
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

<h1>"Hallo" + loginStatus</h1>;

export default Login;
