import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../UI/Button";
import classes from "./Header.module.css";

const Header = () => {
    const navigate = useNavigate();


  return (
    <>
      <header className={`${classes.header} color-main`}>
          <div className={classes["left-side"]}>
            <h1><Link to="/">Skill Bill</Link></h1>
          </div>
          <div className={classes["right-side"]}>
            <ul>
              <li>
                <Link to="/create_offer">Create Offer</Link>
              </li>
              <li>
                <Link to="/categories">Categories</Link>
              </li>
              <li>
                <Button onClick={()=> {navigate("/login")}} to="/login" variant="contained" className="color-two">Log In</Button>
              </li>
              <li>
                <Button onClick={()=> {navigate("/signup")}} className="color-three">Sign Up</Button>
              </li>
            </ul>
          </div>
      </header>
    </>
  );
};

export default Header;
