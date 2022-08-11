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

const CreateOffer = ({ id }) => {
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();

  const defaultArticleState = {
    title: "",
    category: "none",
    offerText: "",
  };

  const [newArticle, updateNewArticle] = useState(defaultArticleState);

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
        const completeErrorBackend = JSON.parse(err.request.response);
        const errMsgBackend = completeErrorBackend.error;
        console.log(JSON.parse(err.request.response));
        updateErrMsg(errMsgBackend);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    updateErrMsg("");
    // reset the error message when the form is interacted with
  }, [formBlur]);

  // Fetch data when there is an ID passed to the component -> Edit Post Functionality
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await Axios.get(`http://localhost:3307/posts/${id}`);
        const { category, title, body } = res.data;
        console.log(res.data);
        updateNewArticle({
          title: title,
          category: category.name,
          offerText: body,
        });
      } catch (err) {
        console.log(err);
        // const completeErrorBackend = JSON.parse(err.request.response);
        // const errMsgBackend = completeErrorBackend.error;
        // updateErrMsg(errMsgBackend);
      }
    };
    if (id) {
      fetchData();
      updateFormIsValid({ title: true, category: true, offerText: true });
    } else {
      // resetting the info when changing from an edit article to posting a new article
      updateNewArticle({
        title: "",
        category: "none",
        offerText: "",
      });
      updateFormIsValid({
        title: false,
        category: false,
        offerText: false,
      });
    }
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    let payloadData = {
      userUUID: authCtx.auth.uuid,
      title: newArticle.title,
      category: newArticle.category,
      body: newArticle.offerText,
    };
    let dataEndpoint = "http://localhost:3307/create_post";

    if (id) {
      // if there is an id use it to update the post
      payloadData = { ...payloadData, postUUID: id };
      dataEndpoint = "http://localhost:3307/update_post";

      Axios.put(dataEndpoint, payloadData, {
        headers: { "x-access-token": authCtx.auth.accessToken },
      }).then(
        (response) => {
          console.log(response);
        },
        (error) => {
          console.log(error);
          updateErrMsg(error.response.data.error);
        }
      );
    } else {
      Axios.post(dataEndpoint, payloadData, {
        headers: { "x-access-token": authCtx.auth.accessToken },
      }).then(
        (response) => {
          console.log(response);
        },
        (error) => {
          console.log(error);
          updateErrMsg(error.response.data.error);
        }
      );
    }
    if (id) {
      navigate(`/offer/${id}`);
    } else {
      navigate("/");
    }
  };

  return (
    <Card>
      {/* "id" is a shortcut for when the offer is updated instead of creating a new offer */}
      {/* When there is no id passed to the Component, then the form will create a new offer */}
      <h1> {id ? "Update" : "Create"} Offer</h1>
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
          value={newArticle.category}
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
            {id ? "Save Changes" : "Post Offer"}
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default CreateOffer;
