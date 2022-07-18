import React from "react";
import { Link } from "react-router-dom";
import classes from "./SingleOffer.module.css";

const truncate = (string, maxlength = 30) => {
  return string.length > maxlength
    ? `${string.substring(0, maxlength - 3)}...`
    : string;
};

const SingleOffer = ({ item, className }) => {
  // console.log(item);
  return (
    <div className={`${classes.singleCard} ${className}`}>
      <h2 className={classes.title}>
        <Link to={`/offer/${item.uuid}`}>{truncate(item.title, 20)}</Link>
      </h2>
      <p className={classes.body}>{truncate(item.body)}</p>
      {/* <div className={classes.meta}> */}
      {/* <span className={classes.points}>
          {item.points} {item.points > 1 ? "Points" : "Point"}
        </span> */}
      <span className={classes.category}>category: {item.category}</span>
      {/* </div> */}
    </div>
  );
};

export default SingleOffer;
