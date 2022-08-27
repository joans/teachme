import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import Axios from "axios";
import AuthContext from "../store/auth-context";
import Card from "../UI/Card";
import signUpClasses from "../Pages/SignUp.module.css";
import SingleOffer from "../partials/SingleOffer";

import { FaTimes } from "react-icons/fa";

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
  const formatDate = (date) => {
    let dt = new Date(date);
    const CustomFormatter = new Intl.DateTimeFormat("en-GB", {
      year: "numeric",
      month: "long",
      day: "numeric",
      // hour: "numeric",
      // minute: "numeric",
    });
    return CustomFormatter.format(dt);
  };

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
      <p>{userData.email}</p>
      <p>User since: {formatDate(userData.createdAt)}</p>
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
