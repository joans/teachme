import React from "react";
import { Link } from "react-router-dom";
import classes from "./Footer.module.css";
import HeaderClasses from "./Header.module.css";
import { BsGithub } from "react-icons/bs";
import Grid from "@mui/material/Unstable_Grid2";
import Item from "@mui/material/Unstable_Grid2";

const Footer = () => {
  return (
    <footer className={classes.footer}>
      {/* Contact */}
      <section className={classes.contact_buttons}>
        <div>
          <span>Visit our project respository: </span>
        </div>

        <div>
          <a
            href="https://github.com/joans/teachme"
            target="_blank"
            rel="noreferrer"
          >
            <span>
              {" "}
              <BsGithub />
            </span>
          </a>
        </div>
      </section>
      {/* End contact */}

      {/* Footer navigation */}
      <Grid container spacing={2} className={classes.footer_nav}>
        <Grid>
          <Item>
            <Link to="/privacy_statement" className={HeaderClasses.link}>
              <span className={HeaderClasses.text}>Privacy Statement</span>
            </Link>
          </Item>
        </Grid>
        <Grid>
          <Item>
            <Link to="/imprint" className={HeaderClasses.link}>
              <span className={HeaderClasses.text}>Imprint</span>
            </Link>
          </Item>
        </Grid>
      </Grid>
      {/* End footer navigation */}

      {/* Copyright notice */}
      <div className={classes.copyright}>
        &copy; {new Date().getFullYear()} Copyright:{" "}
        <Link to="/" className={HeaderClasses.link}>
          <span className={HeaderClasses.text}> Skillpact</span>
        </Link>
        . All rights reserved.
      </div>
      {/* End copyright notice */}
    </footer>
  );
};

export default Footer;
