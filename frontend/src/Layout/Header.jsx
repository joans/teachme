import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../UI/Button";
import classes from "./Header.module.css";
import { TiPlus, TiTags } from "react-icons/ti";
import { CgLogIn } from "react-icons/cg"

const Header = () => {
  const navigate = useNavigate();

  return (
    <>
      <header className={`${classes.header} color-main`}>
        <div className={classes["left-side"]}>
          <h1>
            <Link to="/">Skill Bill</Link>
          </h1>
        </div>
        <div className={classes["right-side"]}>
          <ul>
            <li>
              <Link to="/create_offer">
                <TiPlus className={classes.icon} />
                Create Offer
              </Link>
            </li>
            <li>
                <TiTags className={classes.icon} />
              <Link to="/categories">Categories</Link>
            </li>
            <li>
              <Button
                onClick={() => {
                  navigate("/login");
                }}
                to="/login"
                variant="contained"
                className="color-two"
              >
                <CgLogIn className={classes.icon} />
                Log In
              </Button>
            </li>
            <li>
              <Button
                onClick={() => {
                  navigate("/signup");
                }}
                className="color-three"
              >
                Sign Up
              </Button>
            </li>
          </ul>
        </div>
      </header>
    </>
  );
};

export default Header;
