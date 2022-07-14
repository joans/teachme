import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import classes from "./PostDetails.module.css";
import Axios from "axios";
import Card from "../UI/Card";

const PostDetail = () => {
  const [singlePost, updateSinglePost] = useState({
    user: { uuid: null, username: null },
  });

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
    <Card>
      <div className={classes.postDetail}>
        <h1>{singlePost.title}</h1>
        <p>{singlePost.body}</p>
        <p>Category: {singlePost.category}</p>
        <p>
          Posted by:{" "}
          <Link to={`/users/${singlePost.user.uuid}`}>
            {singlePost.user.username}
          </Link>
        </p>
      </div>
    </Card>
  );
};

export default PostDetail;
