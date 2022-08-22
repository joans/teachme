import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../UI/Button";
import classes from "./Header.module.css";
import { TiPlus, TiTags } from "react-icons/ti";

import AuthContext from "../store/auth-context";

const Header = () => {
  const navigate = useNavigate();
  const auth = useContext(AuthContext);
  const [searchTerm, updateSearchTerm] = useState("");

  const searchBackend = (e) => {
    e.preventDefault();
    const searchTermURIEncoded = encodeURI(searchTerm);
    navigate(`/search/${searchTermURIEncoded}`);
  };

  return (
    <div className={classes.header}>
      <header className={classes["header-content"]}>
        <div className={classes["left-side"]}>
          <h1>
            <Link to="/" className={classes.link}>
              <span className={classes["s-icon"]}>skill</span>
              <span className={classes.text}>pact</span>
            </Link>
          </h1>
        </div>
        <div className={classes["middle-side"]}>
          <form className={classes.form} onSubmit={searchBackend}>
            <input
              type="text"
              id="searchterm"
              placeholder="Search Offers"
              className={classes.input}
              value={searchTerm}
              onChange={(e) => {
                updateSearchTerm(e.target.value);
              }}
            />
            <Button className={classes["search-button"]}>Go</Button>
          </form>
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
      <hr className={classes.hrule} />
    </div>
  );
};

export default Header;
