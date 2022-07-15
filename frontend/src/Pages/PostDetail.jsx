import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import classes from "./PostDetails.module.css";
import Axios from "axios";

const PostDetail = () => {
  const [singlePost, updateSinglePost] = useState("");

  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const res = await Axios.get(`http://localhost:3307/posts/${id}`);
      // For test purposes only: Pick a random index from the array and use this users uuid as a login param
      updateSinglePost(res.data);
    };
    fetchData();
  }, [id]);

  return (
    <div className={classes.postDetail}>
      <h1>{singlePost.title}</h1>
      <p>{singlePost.body}</p>
    </div>
  );
};

export default PostDetail;
