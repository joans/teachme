import React, { useState, useEffect, useContext } from "react";
import AuthContext from "./auth-context";
import Axios from "axios";

const LikeContext = React.createContext({
  likes: [],
  toggleLike: (postuuid) => {},
});

export const LikeContextProvider = (props) => {
  const authCtx = useContext(AuthContext);
  const authAccessToken = authCtx.auth.accessToken;
  const useruuid = authCtx.auth.uuid;
  const [likes, setLikes] = useState([]);

  const fetchLikes = async (useruuid) => {
    if (useruuid) {
      const res = await Axios.get(
        `http://localhost:3307/fetch_likes/${useruuid}`
      );
      // unpack the likes returned from the backend. the likes from the backend are in JSON as follows:
      // [{"postuuid": <postuuid0>}, {"postuuid": <postuuid1>}, {"postuuid": <postuuid2>}]
      const likedPostsObjects = Object.values(res.data);
      const likedPostsUuids = likedPostsObjects.map((item) => {
        return item.postUUID;
      });
      setLikes(likedPostsUuids);
    } else {
      setLikes([]);
    }
  };

  useEffect(() => {
    fetchLikes(useruuid);
  }, [useruuid]);

  const likeFunction = async (postuuid) => {
    const res = await Axios.get(
      `http://localhost:3307/toggle_like_post/${postuuid}`,
      { headers: { "x-access-token": authAccessToken } }
    );
    fetchLikes(useruuid);
  };

  return (
    <LikeContext.Provider
      value={{
        likes: likes,
        toggleLike: likeFunction,
      }}
    >
      {props.children}
    </LikeContext.Provider>
  );
};

export default LikeContext;
