import React from "react";
import { Link } from "react-router-dom";
import classes from "./SingleOffer.module.css";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import AuthContext from "../store/auth-context";
import LikeContext from "../store/like-context";
import { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";

const truncate = (string, maxlength = 30, doTruncate = true) => {
  if (!doTruncate) {
    return string;
  }
  return string.length > maxlength
    ? `${string.substring(0, maxlength - 3)}...`
    : string;
};

const SingleOffer = ({ item, className, doTruncate = true, icon }) => {
  const authCtx = useContext(AuthContext);
  const likeCtx = useContext(LikeContext);
  const [postLiked, setPostLiked] = useState(false);

  const handleLike = () => {
    likeCtx.toggleLike(item.uuid);
  };

  // checks if the "likes" list from the LikeContext contains the current posts UUID and if
  // the user is currently logged in. When both conditions are met, the "postLiked"
  // state is set to true which displays the filled star icon, otherwise the outline
  // version of the star icon is shown.
  useEffect(() => {
    if (likeCtx.likes.includes(item.uuid) && authCtx.isLoggedIn) {
      setPostLiked(true);
    } else {
      setPostLiked(false);
    }
  }, [item.uuid, likeCtx.likes, authCtx.isLoggedIn]);

  // console.log(item);
  return (
    <div className={`${classes.singleCard} ${className}`}>
      <div className={classes.icon}>{icon}</div>
      <h2 className={classes.title}>
        <Link to={`/offer/${item.uuid}`}>
          {truncate(item.title, 20, doTruncate)}
        </Link>
      </h2>
      <p className={classes.body}>{truncate(item.body, 40, doTruncate)}</p>
      {/* <div className={classes.meta}> */}
      {/* <span className={classes.points}>
          {item.points} {item.points > 1 ? "Points" : "Point"}
        </span> */}
      <span className={classes.favorite}>
        <button
          onClick={handleLike}
          className={`${classes["star-button"]} ${
            !authCtx.isLoggedIn && "hidden"
          } button-nooutline`}
        >
          {postLiked ? <AiFillStar /> : <AiOutlineStar />}
        </button>
      </span>
      <span className={classes.category}>
        {item.category && item.category.displayName}
      </span>
      {/* </div> */}
    </div>
  );
};

export default SingleOffer;
