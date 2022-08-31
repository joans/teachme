import React, { useContext, useState } from "react";
import AuthContext from "../store/auth-context";
import classes from "./UserButton.module.css";

import { BiUser } from "react-icons/bi";
import { Link } from "react-router-dom";

const UserButton = () => {
  const [navOpen, setNavOpen] = useState(false);

  return (
    <>
      <NavItem navOpen={navOpen} setNavOpen={setNavOpen}>
        <DropDownMenu setNavOpen={setNavOpen} />
      </NavItem>
    </>
  );
};

const NavItem = ({ navOpen, setNavOpen, children }) => {
  return (
    <>
      <button
        className={`button-nooutline`}
        onClick={() => setNavOpen((prevState) => !prevState)}
      >
        <BiUser className={classes.userbutton} />
      </button>
      {navOpen && children}
    </>
  );
};

const DropDownMenu = ({ setNavOpen }) => {
  const auth = useContext(AuthContext);

  const DropDownItem = (props) => {
    return (
      <div className={classes.menuItem}>
        {props.icon} {props.children}
      </div>
    );
  };
  return (
    <div className={classes.dropdown}>
      <DropDownItem>
        <Link
          to={`/user/${auth.auth.uuid}`}
          onClick={() => {
            setNavOpen(false);
          }}
        >
          My Profile
        </Link>
      </DropDownItem>
      <DropDownItem>
        <Link
          to={`/likes`}
          onClick={() => {
            setNavOpen(false);
          }}
        >
          My Likes
        </Link>
      </DropDownItem>
      <DropDownItem>
        <button
          onClick={auth.onLogout}
          variant="contained"
          className="button-nooutline"
        >
          {/* <CgLogIn className={classes.icon} /> */}
          Log Out
        </button>
      </DropDownItem>
    </div>
  );
};

export default UserButton;
