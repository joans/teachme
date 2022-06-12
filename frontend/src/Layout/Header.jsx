import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../UI/Button";
import classes from "./Header.module.css";
import { TiPlus, TiTags } from "react-icons/ti";
import { CgLogIn } from "react-icons/cg";
import { GiSkills } from "react-icons/gi";

const Header = () => {
  const navigate = useNavigate();

  return (
    <>
      <header className={`${classes.header} color-main`}>
        <div className={classes["left-side"]}>
          <h1>
            <Link to="/">
              <GiSkills className={classes.icon} />
              <span className={classes.text}> Skill Bill</span>
            </Link>
          </h1>
        </div>
        <div className={classes["right-side"]}>
          <ul>
            <li>
              <Link to="/create_offer">
                <TiPlus className={classes.icon} />
                <span className={classes.text}>Create Offer</span>
              </Link>
            </li>
            <li>
              <Link to="/categories">
                <TiTags className={classes.icon} />
                <span className={classes.text}>Categories</span>
              </Link>
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
                {/* <CgLogIn className={classes.icon} /> */}
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
