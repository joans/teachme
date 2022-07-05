import React, { useContext, useState } from "react";
import Button from "../UI/Button";
import Card from "../UI/Card";
import signupClass from "./SignUp.module.css";
import classes from "./CreateOffer.module.css";
import AuthContext from "../store/auth-context";
import Axios from "axios";
import { useNavigate } from "react-router-dom";

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

  const handleSubmit = (e) => {
    console.log(authCtx.auth.uuid);
    Axios.post("http://localhost:3307/create_post", {
      userUUID: authCtx.auth.uuid,
      title: newArticle.title,
      category: newArticle.category,
      body: newArticle.offerText,
    }).then(
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
        <label htmlFor="title" className={signupClass.label}>
          Title
        </label>
        <input
          type="text"
          id="title"
          onChange={updateArticleState}
          value={newArticle.title}
          className={`${signupClass.input}`}
          placeholder="The Title of your offer"
        />
        <label htmlFor="category" className={signupClass.label}>
          Category
        </label>
        <select
          name=""
          id="category"
          onChange={updateArticleState}
          className={signupClass.input}
          defaultValue="none"
        >
          <option value="none" disabled hidden>
            Select an option...
          </option>
          <option value="handicraft">Handicraft</option>
          <option value="sports_fitness">Sports/Fitness</option>
          <option value="art">Art</option>
          <option value="cooking">Cooking</option>
        </select>
        <label htmlFor="offerText" className={signupClass.label}>
          Description
        </label>
        <textarea
          className={`${signupClass.input} ${classes.textarea}`}
          name=""
          id="offerText"
          value={newArticle.offerText}
          onChange={updateArticleState}
          cols="30"
          rows="10"
          placeholder="Please write at least 30 characters."
        ></textarea>
        <div className={signupClass.actions}>
          <Button
            type="submit"
            className={`${classes.button} ${signupClass.button} ${
              Object.values(formIsValid).every(Boolean)
                ? ""
                : signupClass.buttonInvalid
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
