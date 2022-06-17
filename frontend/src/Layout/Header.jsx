import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../UI/Button";
import classes from "./Header.module.css";
import { TiPlus, TiTags } from "react-icons/ti";
import { GiSkills } from "react-icons/gi";
import AuthContext from "../store/auth-context";

const Header = () => {
  const navigate = useNavigate();
  const auth = useContext(AuthContext);

  return (
    <>
      <header className={`${classes.header} color-main`}>
        <div className={classes["left-side"]}>
          <h1>
            <Link to="/" className={classes.link}>
              <GiSkills className={classes.icon} />
              <span className={classes.text}> Project Skill</span>
            </Link>
          </h1>
        </div>
        <div className={classes["right-side"]}>
          <ul>
            <li>
              {auth.isLoggedIn && (
                <Link to="/create_offer" className={classes.link}>
                  <TiPlus className={classes.icon} />
                  <span className={classes.text}>Create Offer</span>
                </Link>
              )}
            </li>
            <li>
              <Link to="/categories" className={classes.link}>
                <TiTags className={classes.icon} />
                <span className={classes.text}>Categories</span>
              </Link>
            </li>
            <li>
              {auth.isLoggedIn ? (
                <Button
                  onClick={auth.onLogout}
                  variant="contained"
                  className="color-two"
                >
                  {/* <CgLogIn className={classes.icon} /> */}
                  Log Out
                </Button>
              ) : (
                <Button
                  onClick={() => {
                    navigate("/login");
                  }}
                  variant="contained"
                  className="color-two"
                >
                  {/* <CgLogIn className={classes.icon} /> */}
                  Log In
                </Button>
              )}
            </li>
            <li>
              {!auth.isLoggedIn && (
                <Button
                  onClick={() => {
                    navigate("/signup");
                  }}
                  className="color-three"
                >
                  Sign Up
                </Button>
              )}
            </li>
          </ul>
        </div>
      </header>
    </>
  );
};

export default Header;
