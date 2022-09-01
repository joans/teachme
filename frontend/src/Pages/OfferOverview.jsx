import React, { useEffect, useState } from "react";
import SingleOffer from "../partials/SingleOffer";
import classes from "./OfferOverview.module.css";
import signUpClasses from "../Pages/SignUp.module.css";
import Axios from "axios";

import { FaTimes } from "react-icons/fa";
// import { GiCookingPot } from "react-icons/gi";

const OfferOverview = () => {
  const [posts, updatePosts] = useState([]);
  const [errMsg, updateErrMsg] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await Axios.get(`/posts`);
        updatePosts(res.data);
      } catch (err) {
        updateErrMsg(err.message);
        console.log(err);
      }
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
          // icon={<GiCookingPot />}
          className={`${classes.offerCard} ${
            classes[singleItem.category.name]
          }`}
          key={key}
          item={singleItem}
        />
      ))}
    </div>
  );
};

export default OfferOverview;
