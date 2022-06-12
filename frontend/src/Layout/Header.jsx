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

  const loginButtonFn = () => {
    // navigate("/login");
    auth.onLogin();
  };

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
                    loginButtonFn();
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
