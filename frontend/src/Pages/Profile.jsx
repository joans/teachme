import React, { useEffect, useState, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import Axios from "axios";
import AuthContext from "../store/auth-context";
import Card from "../UI/Card";
import SingleOffer from "../partials/SingleOffer";

const Profile = () => {
  const [errMsg, updateErrMsg] = useState();
  const [userData, updateUserData] = useState({
    usename: null,
    email: null,
    posts: [],
  });
  const authCtx = useContext(AuthContext);

  const { id } = useParams();

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
        updateErrMsg(err.message);
      }
    };
    fetchData();
  }, [id, authCtx]);

  return (
    <Card>
      <h1>{userData.username}</h1>
      <p>{userData.email}</p>
      <p>User since: {userData.createdAt}</p>
      <h2>Offers</h2>
      {userData.posts.map((singleItem, key) => (
        <SingleOffer
          className=""
          key={key} // should be replaced by the offer ID later
          item={singleItem}
        />
      ))}
    </Card>
  );
};

export default Profile;
