import React, { useState } from "react";
import { useEffect } from "react";
import Axios from "axios";
import SingleOffer from "../partials/SingleOffer";
import Card from "../UI/Card";
import classes from "./Categories.module.css";
import Button from "../UI/Button";
import { useRef } from "react";

const Categories = () => {
  const [origPosts, updateOrigPosts] = useState([]);
  // const [categories, setCategories] = useState([]);
  const [selectState, updateSelectState] = useState([]);
  const [filteredPosts, updateFilteredPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await Axios.get("http://localhost:3307/categories_entries");
        updateOrigPosts(res.data);
        updateFilteredPosts(res.data);
      } catch (err) {
        const errMsgBackend = err;
        console.log(errMsgBackend);
      }
    };
    fetchData();
  }, []);

  const cateogryButtonOnClick = (e) => {
    const selectedCategory = e.target.name;
    updateSelectState((prevState) => [...prevState, selectedCategory]);

    if (selectState.includes(selectedCategory)) {
      updateSelectState((prevState) =>
        prevState.filter((e) => e !== selectedCategory)
      );
      return;
    }
  };

  useEffect(() => {
    const newPosts = origPosts.filter((post) => {
      console.log(selectState);
      if (selectState.includes(post.name)) {
        return post;
      } else {
        return null;
      }
    });

    if (selectState.length === 0) {
      updateFilteredPosts(origPosts);
      return;
    }
    updateFilteredPosts(newPosts);
  }, [selectState]);

  return (
    <Card>
      <div className={classes["complete-container"]}>
        <div className={classes["category-picker"]}>
          Categories:
          {origPosts.map((post) => (
            <Button
              onClick={cateogryButtonOnClick}
              className={`${
                selectState.includes(post.name) && classes["button-active"]
              } ${classes["custom-button"]}`}
              name={post.name}
            >
              {post.displayName}
            </Button>
          ))}
        </div>
        <div className={classes["post-list"]}>
          {filteredPosts.map((post, key) => (
            <>
              <h1>{post.displayName}</h1>
              {post.posts.map((singlepost, key) => (
                <SingleOffer key={key} item={singlepost} doTruncate={false} />
              ))}
            </>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default Categories;
