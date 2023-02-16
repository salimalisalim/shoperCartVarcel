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

            <div className="single-widget search">
                <h3>Search Product</h3>
                <form onSubmit={searchSubmitHandler}>
                    <input type="text" placeholder="Search Here..." onChange={(e) => setKeyword(e.target.value)} />
                    <button type="submit"><i className="lni lni-search-alt"></i></button>
                </form>
            </div>




        </Fragment>
    );
};

export default Search;
