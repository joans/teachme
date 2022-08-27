import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import classes from "./PostDetails.module.css";
import signUpClasses from "../Pages/SignUp.module.css";
import Axios from "axios";
import Card from "../UI/Card";
import Button from "../UI/Button";
import AuthContext from "../store/auth-context";
import LikeContext from "../store/like-context";

import { FaTimes } from "react-icons/fa";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";

const PostDetail = () => {
  const [singlePost, updateSinglePost] = useState({
    user: { uuid: null, username: null },
    category: { displayName: null },
  });
  const [errMsg, updateErrMsg] = useState();
  const [showEditButton, updateShowEditButton] = useState(false);
  const [postLiked, setPostLiked] = useState(false);

  const { id } = useParams();
  const authCtx = useContext(AuthContext);
  const likeCtx = useContext(LikeContext);
  const navigate = useNavigate();

  // toggles which star symbol is shown
  // when "postLiked" is true, then the star outline will be filled
  useEffect(() => {
    if (likeCtx.likes.includes(singlePost.uuid) && authCtx.isLoggedIn) {
      setPostLiked(true);
    } else {
      setPostLiked(false);
    }
  }, [singlePost.uuid, likeCtx.likes, authCtx.isLoggedIn]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await Axios.get(`http://localhost:3307/posts/${id}`);
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

  // handles the deletion of posts. When a post is deleted successfully,
  // the user gets navigated to the front page
  const handleDeletePost = async () => {
    try {
      await Axios.delete(
        `http://localhost:3307/delete_post/${singlePost.uuid}`,
        {
          headers: { "x-access-token": authCtx.auth.accessToken },
        }
      );
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (authCtx.isLoggedIn && singlePost.user.uuid === authCtx.auth.uuid) {
      updateShowEditButton(true);
    } else updateShowEditButton(false);
  }, [singlePost, authCtx]);

  const handleLike = () => {
    likeCtx.toggleLike(singlePost.uuid);
  };

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
        <div className={classes.interactions}>
          {!showEditButton && (
            <button
              onClick={handleLike}
              className={`${classes.icon} ${
                !authCtx.isLoggedIn && "hidden"
              } button-nooutline`}
            >
              {postLiked ? <AiFillStar /> : <AiOutlineStar />}
            </button>
          )}
          {showEditButton && (
            <Button
              onClick={() => {
                navigate(`/offer/edit/${singlePost.uuid}`);
              }}
              variant="contained"
              className="color-two"
            >
              Edit Offer
            </Button>
          )}
          {showEditButton && (
            <Button
              onClick={handleDeletePost}
              variant="contained"
              className="color-three"
            >
              Delete Offer
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
};

export default PostDetail;
