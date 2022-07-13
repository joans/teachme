import React from "react";
import SingleOffer from "../partials/SingleOffer";
import classes from "./OfferOverview.module.css";
import Axios from "axios";
import { useEffect } from "react";
import { useState } from "react";

const OfferOverview = () => {
  const [posts, updatePosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await Axios.get("http://localhost:3307/posts");
      // For test purposes only: Pick a random index from the array and use this users uuid as a login param
      updatePosts(res.data);
    };
    fetchData();
  }, []);

  return (
    <div className={classes.offerContainer}>
      {posts.map((singleItem, key) => (
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
