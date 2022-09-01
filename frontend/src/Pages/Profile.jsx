import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import Axios from "axios";
import AuthContext from "../store/auth-context";
import Card from "../UI/Card";
import signUpClasses from "../Pages/SignUp.module.css";
import SingleOffer from "../partials/SingleOffer";
import classes from "./Profile.module.css";

import { FaTimes } from "react-icons/fa";
import { AiOutlineMail, AiFillLike } from "react-icons/ai";
import { BsGenderTrans } from "react-icons/bs";
import { MdOutlineLanguage } from "react-icons/md";

function capitalize(str) {
  if (str) {
    const singleWordCapitalized = (str) => {
      return str.charAt(0).toUpperCase() + str.slice(1);
    };

    return str.split(" ").map(singleWordCapitalized).join(" ");
  }
}

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

const Profile = () => {
  const [errMsg, updateErrMsg] = useState();
  const [userData, updateUserData] = useState({
    username: null,
    email: null,
    createdAt: null,
    interestedIn: null,
    posts: [],
  });
  const authCtx = useContext(AuthContext);

  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await Axios.get(`/users/${id}`, {
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
      <UserDetails userData={userData} />

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

const UserDetails = ({ userData }) => {
  return (
    <>
      {userData.aboutMeText && (
        <p className={`${classes.aboutme} ${classes.entry}`}>
          {userData.aboutMeText}
        </p>
      )}
      <SingleDataItem symbol={<AiOutlineMail />} text={userData.email} />
      <SingleDataItem symbol={<BsGenderTrans />} text={userData.gender} />
      <SingleDataItem
        symbol={<AiFillLike />}
        text={capitalize(userData.interestedIn)}
      />
      <SingleDataItem
        symbol={<MdOutlineLanguage />}
        text={capitalize(userData.languages)}
      />

      <p>User since: {timeSince(userData.createdAt)}</p>
    </>
  );
};

const SingleDataItem = ({ symbol, text }) => {
  return (
    <>
      {text && (
        <p className={classes.entry}>
          {symbol} {text}
        </p>
      )}
    </>
  );
};

export default Profile;
