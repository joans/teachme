import React, { useEffect, useState } from "react";
import SingleOffer from "../partials/SingleOffer";
import classes from "./OfferOverview.module.css";
import signUpClasses from "../Pages/SignUp.module.css";
import Axios from "axios";

import { FaTimes } from "react-icons/fa";

const OfferOverview = () => {
  const [posts, updatePosts] = useState([]);
  const [errMsg, updateErrMsg] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await Axios.get("http://localhost:3307/posts");
        updatePosts(res.data);
      } catch (err) {
        updateErrMsg(err.message);
        console.log(err);
      }
      // For test purposes only: Pick a random index from the array and use this users uuid as a login param
    };
    fetchData();
  }, []);

  return (
    <div className={classes.offerContainer}>
      <span className={errMsg ? signUpClasses.errMsg : signUpClasses.offscreen}>
        <FaTimes />
        {errMsg}
      </span>
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
