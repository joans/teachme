import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import signUpClasses from "../Pages/SignUp.module.css";
import Card from "../UI/Card";
import SingleOffer from "../partials/SingleOffer";
import Axios from "axios";
import { FaTimes } from "react-icons/fa";

const SearchResults = () => {
  const { searchTerm } = useParams();
  const [searchResults, updateSearchResults] = useState({
    count: 0,
    rows: [],
  });
  const [errMsg, updateErrMsg] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await Axios.get(`/search/${searchTerm}`);
        updateSearchResults(res.data);
        console.log(res.data);
      } catch (err) {
        updateErrMsg(err);
      }
    };
    fetchData();
  }, [searchTerm]);

  return (
    <Card>
      <span className={errMsg ? signUpClasses.errMsg : signUpClasses.offscreen}>
        <FaTimes />
        {errMsg}
      </span>
      <h1>Search Results</h1>
      <p>Your search results for "{searchTerm}"</p>
      <p>
        There {searchResults.count !== 1 ? "were" : "was"} {searchResults.count}{" "}
        result
        {searchResults.count !== 1 ? "s" : ""}
      </p>
      {searchResults.rows.map((singleItem, key) => (
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

export default SearchResults;
