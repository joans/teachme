import { Link } from "react-router-dom";
import classes from "./Footer.module.css";
import { BsGithub } from "react-icons/bs";

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
      <ul className={classes.footer_nav}>
        <li>
          <Link to="/Privacy_Statement" className={classes.footer_link}>
            {" "}
            <span>Privacy Statement</span>
          </Link>
        </li>
        <li>
          <Link to="/Imprint" className={classes.footer_link}>
            {" "}
            <span>Imprint</span>
          </Link>
        </li>
        <li>
          <Link to="/AboutUs" className={classes.footer_link}>
            {" "}
            <span>About us</span>
          </Link>
        </li>
      </ul>
      {/* End footer navigation */}

      {/* Copyright notice */}
      <div className={classes.copyright}>
        &copy; {new Date().getFullYear()} Copyright:{" "}
        <Link to="/" className={classes.link}>
          <span> Skillpact</span>
        </Link>
        . All rights reserved.
      </div>
      {/* End copyright notice */}
    </footer>
  );
};

export default Footer;
