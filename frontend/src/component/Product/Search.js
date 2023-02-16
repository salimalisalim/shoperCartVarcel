import React, { useState, Fragment } from "react";
import MetaData from "../layout/MetaData";
import "./Search.css";

const Search = ({ history }) => {
  const [keyword, setKeyword] = useState("");

  const searchSubmitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      history.push(`/products/${keyword}`);
    } else {
      history.push("/products");
    }
  };

  return (
    <Fragment>
      <MetaData title="Search A Product -- ShoperCart" />
      <form className="searchBox" >

        <div className="navbar-search search-style-5">

          <div className="search-input">
            <input type="text" placeholder="Search for products" onChange={(e) => setKeyword(e.target.value)} />
          </div>
          <div className="search-btn">
            <button onClick={searchSubmitHandler}><i className="lni lni-search-alt"></i></button>
          </div>
        </div>
      </form>



    </Fragment>
  );
};

export default Search;
