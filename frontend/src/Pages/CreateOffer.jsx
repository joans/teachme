import React, { useContext, useState } from "react";
import Button from "../UI/Button";
import Card from "../UI/Card";
import signupClasses from "./SignUp.module.css";
import classes from "./CreateOffer.module.css";
import AuthContext from "../store/auth-context";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { FaTimes } from "react-icons/fa";

const CreateOffer = () => {
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();

  const [newArticle, updateNewArticle] = useState({
    title: "",
    category: "",
    offerText: "",
  });

  const [formIsValid, updateFormIsValid] = useState({
    title: false,
    category: false,
    offerText: false,
  });

  const [formBlur, updateFormBlur] = useState({
    title: false,
    category: false,
    offerText: false,
  });

  const [errMsg, updateErrMsg] = useState();

  const [categories, updateCategories] = useState([]);

  // const [showInfoBox, updateShowInfoBox] = useState({
  //   title: false,
  //   category: false,
  //   offerText: false,
  // });

  const updateArticleState = (e) => {
    const { value, id } = e.target;

    updateNewArticle((oldState) => ({ ...oldState, [id]: value }));
    if (id === "title") {
      if (value.length < 5) {
        updateFormIsValid((oldState) => ({ ...oldState, [id]: false }));
      } else {
        updateFormIsValid((oldState) => ({ ...oldState, [id]: true }));
      }
    }
    if (id === "category") {
      updateFormIsValid((oldState) => ({ ...oldState, [id]: true }));
    }

    if (id === "offerText") {
      if (value.length < 30) {
        updateFormIsValid((oldState) => ({ ...oldState, [id]: false }));
      } else {
        updateFormIsValid((oldState) => ({ ...oldState, [id]: true }));
      }
    }
  };

  const handleFocusChange = (e) => {
    const { id } = e.target;
    updateFormBlur((state) => ({ ...state, [id]: true }));
  };

  const handleBlurChange = (e) => {
    const { id } = e.target;
    updateFormBlur((state) => ({ ...state, [id]: false }));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await Axios.get("http://localhost:3307/categories");
        updateCategories(res.data);
      } catch (err) {
        updateErrMsg("Could not fetch categories from backend");
        console.log(err);
      }
    };
    fetchData();
  }, []);

  const handleSubmit = (e) => {
    Axios.post(
      "http://localhost:3307/create_post",
      {
        userUUID: authCtx.auth.uuid,
        title: newArticle.title,
        category: newArticle.category,
        body: newArticle.offerText,
      },
      { headers: { "x-access-token": authCtx.auth.accessToken } }
    ).then(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    );
    e.preventDefault();
    navigate("/");
  };

  return (
    <Card>
      <h1>Create Offer</h1>
      <form onSubmit={handleSubmit}>
        <span
          className={errMsg ? signupClasses.errMsg : signupClasses.offscreen}
        >
          <FaTimes />
          {errMsg}
        </span>
        <label htmlFor="title" className={signupClasses.label}>
          Title
        </label>
        <input
          type="text"
          id="title"
          onChange={updateArticleState}
          onFocus={handleFocusChange}
          onBlur={handleBlurChange}
          value={newArticle.title}
          className={`${signupClasses.input}`}
          placeholder="The Title of your offer"
        />
        <label htmlFor="category" className={signupClasses.label}>
          Category
        </label>
        <select
          name=""
          id="category"
          onChange={updateArticleState}
          className={signupClasses.input}
          defaultValue="none"
        >
          <option value="none" disabled hidden>
            Select an option...
          </option>
          {categories.map((category, key) => (
            <option key={key} value={category.name}>
              {category.displayName}
            </option>
          ))}
        </select>
        <label htmlFor="offerText" className={signupClasses.label}>
          Description
        </label>
        <textarea
          className={`${signupClasses.input} ${classes.textarea}`}
          name=""
          id="offerText"
          value={newArticle.offerText}
          onFocus={handleFocusChange}
          onBlur={handleBlurChange}
          onChange={updateArticleState}
          cols="30"
          rows="10"
          placeholder="Please write at least 30 characters."
        ></textarea>
        <div className={signupClasses.actions}>
          <Button
            type="submit"
            className={`${classes.button} ${signupClasses.button} ${
              Object.values(formIsValid).every(Boolean)
                ? ""
                : signupClasses.buttonInvalid
            }`}
            disabled={Object.values(formIsValid).every(Boolean) ? false : true}
          >
            Post
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default CreateOffer;
