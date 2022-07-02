import React from "react";
import { useParams } from "react-router-dom";
import classes from "./PostDetails.module.css";
const testoffers = require("../data/testoffers.json");

const filterCurID = (offerID) => {
  return testoffers.filter((item) => {
    if (item.PostID === offerID) {
      return item;
    }
    return null;
  })[0];
};

const PostDetail = () => {
  const { id } = useParams();
  const curOffer = filterCurID(id);
  return (
    <div className={classes.postDetail}>
      <h1>{curOffer.title}</h1>
      <p>{curOffer.description}</p>
    </div>
  );
};

export default PostDetail;
