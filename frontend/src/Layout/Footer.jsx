import React from "react";
import { Link } from "react-router-dom";
import classes from "./Footer.module.css";
import HeaderClasses from "./Header.module.css";
import { RiCopyrightLine } from "react-icons/ri";
import { FaFacebookSquare } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className={classes.footer}>
      {/* Footer navigation */}
      <ul className={classes.footer_nav}>
        <li>
          <Link to="/Privacy_Statement" className={HeaderClasses.link}>
            {" "}
            <span className={HeaderClasses.text}>Privacy Statement</span>
          </Link>
        </li>
        <li>
          <Link to="/Imprint" className={HeaderClasses.link}>
            {" "}
            <span className={HeaderClasses.text}>Imprint</span>
          </Link>
        </li>
        <li>
          <Link to="/Contact" className={HeaderClasses.link}>
            {" "}
            <span className={HeaderClasses.text}>Contact</span>
          </Link>
        </li>
      </ul>
      {/* End footer navigation */}

      {/* Contact buttons */}
      <div className={classes.footer_contact}>
        <Link to="/Contact">
          <span>
            <FaFacebookSquare />
          </span>
        </Link>
        <Link to="/Contact">
          <span>
            <FaInstagramSquare />
          </span>
        </Link>
      </div>
      {/* End contact buttons */}

      {/* Copyright notice */}
      <div className={classes.copyright}>
        <p className={classes.copyright_text}>
          <RiCopyrightLine /> 2022{" "}
          <Link to="/" className={HeaderClasses.link}>
            <span className={HeaderClasses.text}>TeachMe</span>
          </Link>
          . All rights reserved.
        </p>
      </div>
      {/* End copyright notice */}
    </footer>
  );
};

export default Footer;
