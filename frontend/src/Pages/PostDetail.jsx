import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import classes from "./PostDetails.module.css";
import signUpClasses from "../Pages/SignUp.module.css";
import Axios from "axios";
import Card from "../UI/Card";
import Button from "../UI/Button";
import AuthContext from "../store/auth-context";

import { FaTimes } from "react-icons/fa";
import { useContext } from "react";

const PostDetail = () => {
  const [singlePost, updateSinglePost] = useState({
    user: { uuid: null, username: null },
    category: { displayName: null },
  });
  const [errMsg, updateErrMsg] = useState();
  const [showEditButton, updateShowEditButton] = useState(false);

  const { id } = useParams();
  const authCtx = useContext(AuthContext);

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

  useEffect(() => {
    if (authCtx.isLoggedIn && singlePost.user.uuid === authCtx.auth.uuid) {
      updateShowEditButton(true);
    }
  }, [singlePost, authCtx]);

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
        <p>{singlePost.body}</p>
        <p>Category: {singlePost.category.displayName}</p>
        <p>
          Posted by:{" "}
          <Link to={`/user/${singlePost.user.uuid}`}>
            {singlePost.user.username}
          </Link>
        </p>
        {showEditButton && <Button>Edit Offer</Button>}
      </div>
    </Card>
  );
};

export default PostDetail;
