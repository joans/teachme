import React, { useState } from "react";
import { useEffect } from "react";
import Axios from "axios";
import SingleOffer from "../partials/SingleOffer";
import Card from "../UI/Card";
import classes from "./Categories.module.css";
import Button from "../UI/Button";

const Categories = () => {
  const [origPosts, updateOrigPosts] = useState([]);
  const [filteredPosts, updateFilteredPosts] = useState(origPosts);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await Axios.get("http://localhost:3307/categories_entries");
        updateOrigPosts(res.data);
      } catch (err) {
        const errMsgBackend = err;
        console.log(errMsgBackend);
      }
    };
    fetchData();
  }, []);

  const cateogryButtonOnClick = (e) => {
    const selectedCategory = e.target.name;
    const newPosts = origPosts.filter((post) => {
      if (post.name === selectedCategory) {
        return post;
      } else {
        return null;
      }
    });
    updateFilteredPosts(newPosts);
  };

  return (
    <Card>
      <div className={classes["complete-container"]}>
        <div className={classes["category-picker"]}>
          Categories:
          {origPosts.map((post) => (
            <Button onClick={cateogryButtonOnClick} name={post.name}>
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
