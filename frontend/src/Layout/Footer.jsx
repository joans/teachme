import { Link } from "react-router-dom";
import classes from "./Footer.module.css";
import { BsGithub } from "react-icons/bs";

const Footer = () => {
  return (
    <footer className={classes.footer}>
      <hr className={classes.hrule} />

      {/* Contact */}
      <section className={classes.contact_buttons}>
        Source Code on GitHub:&nbsp;
        <a
          href="https://github.com/joans/teachme"
          target="_blank"
          rel="noreferrer"
        >
          <span>
            <BsGithub className={classes.icon} />
          </span>
        </a>
      </section>
      {/* End contact */}

      {/* Footer navigation */}
      <ul className={classes.footer_nav}>
        <li>
          <Link to="/privacy_statement" className={classes.footer_link}>
            {" "}
            <span>Privacy Statement</span>
          </Link>
        </li>
        <li>
          <Link to="/imprint" className={classes.footer_link}>
            {" "}
            <span>Imprint</span>
          </Link>
        </li>
        <li>
          <Link to="/about_us" className={classes.footer_link}>
            {" "}
            <span>About us</span>
          </Link>
        </li>
      </ul>
      {/* End footer navigation */}

      {/* Copyright notice */}
      <div className={classes.copyright}>
        &copy;{new Date().getFullYear()}&nbsp;
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
