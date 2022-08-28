import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import Axios from "axios";
import AuthContext from "../store/auth-context";
import Card from "../UI/Card";
import signUpClasses from "../Pages/SignUp.module.css";
import SingleOffer from "../partials/SingleOffer";

import { FaTimes } from "react-icons/fa";
import { AiOutlineMail } from "react-icons/ai";

const Profile = () => {
  const [errMsg, updateErrMsg] = useState();
  const [userData, updateUserData] = useState({
    usename: null,
    email: null,
    createdAt: "1977",
    posts: [],
  });
  const authCtx = useContext(AuthContext);

  const { id } = useParams();

  function timeSince(input) {
    const date = new Date(input);
    var seconds = Math.floor((new Date() - date) / 1000);

    var interval = seconds / 31536000;

    if (interval > 1) {
      return Math.floor(interval) + " years";
    }
    interval = seconds / 2592000;
    if (interval > 1) {
      return Math.floor(interval) + " months";
    }
    interval = seconds / 86400;
    if (interval > 1) {
      return Math.floor(interval) + " days";
    }
    interval = seconds / 3600;
    if (interval > 1) {
      return Math.floor(interval) + " hours";
    }
    interval = seconds / 60;
    if (interval > 1) {
      return Math.floor(interval) + " minutes";
    }
    return Math.floor(seconds) + " seconds";
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await Axios.get(`http://localhost:3307/users/${id}`, {
          headers: { "x-access-token": authCtx.auth.accessToken },
        });
        // For test purposes only: Pick a random index from the array and use this users uuid as a login param
        updateUserData(res.data);
        console.log(res.data);
      } catch (err) {
        const completeErrorBackend = JSON.parse(err.request.response);
        const errMsgBackend = completeErrorBackend.error;
        console.log(JSON.parse(err.request.response));
        updateErrMsg(errMsgBackend);
      }
    };
    fetchData();
  }, [id, authCtx]);

  return (
    <Card>
      <span className={errMsg ? signUpClasses.errMsg : signUpClasses.offscreen}>
        <FaTimes />
        {errMsg}
      </span>
      <h1>{userData.username}</h1>
      <p>
        <AiOutlineMail />
        &nbsp;
        {userData.email}
      </p>
      <p>User since: {timeSince(userData.createdAt)}</p>
      <h2>Offers</h2>
      {userData.posts.map((singleItem, key) => (
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

export default Profile;
