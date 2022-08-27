import React, { useEffect, useContext, useState } from "react";
import Card from "../UI/Card";
import Axios from "axios";
import AuthContext from "../store/auth-context";
import SingleOffer from "../partials/SingleOffer";

const Likes = () => {
  const authCtx = useContext(AuthContext);

  const [likedPosts, updateLikedPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const useruuid = authCtx.auth.uuid;
        if (useruuid) {
          const res = await Axios.get(
            `http://localhost:3307/fetch_likes_posts/${useruuid}`
          );
          updateLikedPosts(res.data);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [authCtx]);
  return (
    <Card>
      <h1>Your Likes</h1>
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
