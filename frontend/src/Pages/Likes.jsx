import React, { useEffect, useContext, useState } from "react";
import Card from "../UI/Card";
import Axios from "axios";
import AuthContext from "../store/auth-context";
import SingleOffer from "../partials/SingleOffer";
import { Link } from "react-router-dom";
import classes from "./Likes.module.css";

const Likes = () => {
  const authCtx = useContext(AuthContext);

  const [likedPosts, updateLikedPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const useruuid = authCtx.auth.uuid;
        if (useruuid) {
          const res = await Axios.get(`/fetch_likes_posts/${useruuid}`);
          updateLikedPosts(res.data);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [authCtx]);
  return (
    <Card className={classes.likes}>
      <h1>Your Likes</h1>
      {likedPosts.length === 0 && (
        <p>
          You have no liked posts,&nbsp;
          {
            <Link to="/" className={classes.link}>
              go and find some posts to like
            </Link>
          }{" "}
        </p>
      )}
      {likedPosts.map((singleItem, key) => (
        <SingleOffer
          className=""
          key={key} // should be replaced by the offer ID later
          item={singleItem}
          doTruncate={false}
        />
      ))}
    </Card>
  );
};

export default Likes;
