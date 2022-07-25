import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import classes from "./PostDetails.module.css";
import signUpClasses from "../Pages/SignUp.module.css";
import Axios from "axios";
import Card from "../UI/Card";

import { FaTimes } from "react-icons/fa";

const PostDetail = () => {
  const [singlePost, updateSinglePost] = useState({
    user: { uuid: null, username: null },
  });
  const [errMsg, updateErrMsg] = useState();

  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await Axios.get(`http://localhost:3307/posts/${id}`);
        // For test purposes only: Pick a random index from the array and use this users uuid as a login param
        updateSinglePost(res.data);
      } catch (err) {
        updateErrMsg(err.message);
      }
    };
    fetchData();
  }, [id]);

  return (
    <Card>
      <div className={classes.postDetail}>
        <span
          className={errMsg ? signUpClasses.errMsg : signUpClasses.offscreen}
        >
          <FaTimes />
          {errMsg}
        </span>
        <h1>{singlePost.title}</h1>
        <div className={classes.grid}>
          <div>
            <img
              src="https://autorhodes.com/sites/default/files/special-offer_4.jpg"
              alt="test"
            />
          </div>
          <div>Description: {singlePost.body}</div>
        </div>
        <p>Category: {singlePost.category}</p>
        <p>
          Posted by:{" "}
          <Link to={`/user/${singlePost.user.uuid}`}>
            {singlePost.user.username}
          </Link>
        </p>
        <p>
          Last updated on:{" "}
          <Link to={`/post/${singlePost.updatedAt}`}>
            {singlePost.updatedAt}
          </Link>
          {/* How do I format date information from database? */}
        </p>
      </div>
    </Card>
  );
};

export default PostDetail;
