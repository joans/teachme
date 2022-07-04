import React from "react";
import Button from "../UI/Button";
import Card from "../UI/Card";
import signupClass from "./SignUp.module.css";
import classes from "./CreateOffer.module.css";

const CreateOffer = () => {
  return (
    <>
      <Card>
        <h1>Create Offer</h1>
        <form>
          <label htmlFor="title" className={signupClass.label}>
            Title
          </label>
          <input
            type="text"
            id="title"
            className={`${signupClass.input}`}
            placeholder="The Title of your offer"
          />
          <label htmlFor="category" className={signupClass.label}>
            Category
          </label>
          <select name="" id="category" className={signupClass.input}>
            <option value="none" selected disabled hidden>
              Select an option
            </option>
            <option value="handicraft">Handicraft</option>
            <option value="sports_fitness">Sports/Fitness</option>
            <option value="art">Art</option>
            <option value="cooking">Cooking</option>
          </select>
          <label htmlFor="offer-text" className={signupClass.label}>
            Description
          </label>
          <textarea
            className={`${signupClass.input} ${classes.textarea}`}
            name=""
            id="offer-text"
            cols="30"
            rows="10"
            placeholder="Please write at least 30 characters."
          ></textarea>
          <div className={signupClass.actions}>
            <Button
              type="submit"
              className={`${classes.button} ${signupClass.button}`}
            >
              Post
            </Button>
          </div>
        </form>
      </Card>
    </>
  );
};

export default CreateOffer;
