import React, { useState } from "react";
import { useEffect } from "react";
import Axios from "axios";
import SingleOffer from "../partials/SingleOffer";
import Card from "../UI/Card";
import classes from "./Categories.module.css";
import Button from "../UI/Button";

const Categories = () => {
  const [origPosts, updateOrigPosts] = useState([]);
  // const [categories, setCategories] = useState([]);
  const [selectState, updateSelectState] = useState([]);
  const [filteredPosts, updateFilteredPosts] = useState([]);

  useEffect(() => {
    // fetch posts from backend
    const fetchData = async () => {
      try {
        const res = await Axios.get(`/categories_entries`);
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

    // check if the selected state is already in the selectState array
    if (selectState.includes(selectedCategory)) {
      updateSelectState((prevState) =>
        prevState.filter((e) => e !== selectedCategory)
      );
      return;
    }
    // add the selected category to the selectState array
    updateSelectState((prevState) => [...prevState, selectedCategory]);
  };

  // Effect that checks if the selectState array with the selected categories
  // or the origPosts were changed.
  useEffect(() => {
    // filter the origPost array with the selectState array. Only
    // posts that have matching categories with that in the selectState array get into the newPost array
    const newPosts = origPosts.filter((post) => {
      // post.name is the name of the category, because the backend returns all posts by category
      if (selectState.includes(post.name)) {
        return post;
      } else {
        return null;
      }
    });

    // if the selectState array is empty, include all posts in the filteredPosts array
    if (selectState.length === 0) {
      updateFilteredPosts(origPosts);
      return;
    }
    updateFilteredPosts(newPosts);
  }, [selectState, origPosts]);

  return (
    <Card>
      <div className={classes["complete-container"]}>
        <div className={classes["category-picker"]}>
          {origPosts.map((post) => (
            <Button
              onClick={cateogryButtonOnClick}
              className={`${
                // apply the "button-active" class if the current button is in the selectState
                // array. The "post.name" is the category of the post.
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
