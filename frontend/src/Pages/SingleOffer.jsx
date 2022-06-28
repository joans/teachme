import React from "react";
import classes from "./SingleOffer.module.css";

const SingleOffer = ({ item, className }) => {
  return (
    <div className={`${classes.singleCard} ${className}`}>
      <h2 className={classes.title}>{item.title}</h2>
      <p className={classes.description}>{item.description}</p>
      <div className={classes.meta}>
        <span className={classes.points}>
          {item.points} {item.points > 1 ? "Points" : "Point"}
        </span>
        <span className={classes.category}>category: {item.category}</span>
      </div>
    </div>
  );
};

export default SingleOffer;
