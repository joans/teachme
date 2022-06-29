import React from "react";
import SingleOffer from "./SingleOffer";
import classes from "./OfferOverview.module.css";

const testoffers = require("../data/testoffers.json");

const OfferOverview = () => {
  return (
    <div className={classes.offerContainer}>
      {testoffers.map((singleItem, key) => (
        <SingleOffer
          className={classes.offerCard}
          key={key} // should be replaced by the offer ID later
          item={singleItem}
        />
      ))}
    </div>
  );
};

export default OfferOverview;
