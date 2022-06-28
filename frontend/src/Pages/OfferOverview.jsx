import React from "react";
import SingleOffer from "./SingleOffer";
import classes from "./OfferOverview.module.css";

const testoffers = require("../data/testoffers.json");

const OfferOverview = () => {
  return (
    <div className={classes.offerContainer}>
      {testoffers.map((singleItem) => (
        <SingleOffer className={classes.offerCard} item={singleItem} />
      ))}
    </div>
  );
};

export default OfferOverview;
