import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import classes from "./PostDetails.module.css";
import signUpClasses from "../Pages/SignUp.module.css";
import Axios from "axios";
import Card from "../UI/Card";
import { FaTimes } from "react-icons/fa";
import Moment from "react-moment";

const PostDetail = () => {
  const [singlePost, updateSinglePost] = useState({
    user: { uuid: null, username: null },
    category: { displayName: null },
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
        const completeErrorBackend = JSON.parse(err.request.response);
        const errMsgBackend = completeErrorBackend.error;
        console.log(JSON.parse(err.request.response));
        updateErrMsg(errMsgBackend);
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
        <h1 className={classes.title}>{singlePost.title}</h1>
        <div className={classes.grid}>
          <img
            src={process.env.PUBLIC_URL + "/testimage.jpg"}
            alt="test"
            className={classes.grid_img}
          />
          {/* this needs to be updated once we have images in the database! */}
          <p>Description: {singlePost.body}</p>
        </div>
        <p>Category: {singlePost.category.displayName}</p>
        <p>
          Posted by:{" "}
          <Link to={`/user/${singlePost.user.uuid}`}>
            {singlePost.user.username}
          </Link>
        </p>
        <p>
          Last updated on:{" "}
          <Moment format="DD/MM/YYYY, HH:mm:ss">{singlePost.updatedAt}</Moment>
        </p>
      </div>
    </Card>
  );
};

export default PostDetail;
