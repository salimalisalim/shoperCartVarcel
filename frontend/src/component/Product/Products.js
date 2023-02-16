import React, { Fragment, useEffect, useState } from "react";
import "./Products.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getProduct } from "../../actions/productAction";
import Loader from "../layout/Loader/Loader";
import ProductCard from "../Home/ProductCard";
import Pagination from "react-js-pagination";
import Slider from "@material-ui/core/Slider";
import { useAlert } from "react-alert";
import MetaData from "../layout/MetaData";
import "./Products.css";
import { Link, useHistory } from "react-router-dom";
import SearchProducts from "./SearchProducts";
import ProductCardList from "../Home/ProductCardList";

const categories = [
  "Watches",
  "Speaker",
  "Camera",
  "Phones",
  "Headphones",
  "Speaker",
  "Laptop"
];

const Products = ({ match }) => {
  const dispatch = useDispatch();

  const alert = useAlert();

  const history = useHistory();

  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([0, 25000]);
  const [category, setCategory] = useState("");
  const [ratings, setRatings] = useState(0);

  const [grid, setGrid] = useState("show active");
  const [list, setList] = useState("");

  const {
    products,
    loading,
    error,
    productsCount,
    resultPerPage,
    filteredProductsCount,
  } = useSelector((state) => state.products);

  // console.log(products);
  const keyword = match.params.keyword;

  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };

  const priceHandler = (event, newPrice) => {
    setPrice(newPrice);
  };
  let count = filteredProductsCount;

  useEffect(() => {

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    dispatch(getProduct(keyword, currentPage, price, category, ratings));
  }, [dispatch, keyword, currentPage, price, category, ratings, alert, error]);

  const showGrid = () => {
    setGrid("show active");
    setList('');
  }
  const showList = () => {
    setGrid("");
    setList('show active');
  }
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="PRODUCTS -- ShoperCart" />

          <div className="breadcrumbs">
            <div className="container">
              <div className="row align-items-center">
                <div className="col-lg-6 col-md-6 col-12">
                  <div className="breadcrumbs-content">
                    <h1 className="page-title">Products Listing</h1>
                  </div>
                </div>
                <div className="col-lg-6 col-md-6 col-12">
                  <ul className="breadcrumb-nav">
                    <li><Link to="/"><i className="lni lni-home"></i> Home</Link></li>
                    <li><Link to="/products">Products</Link></li>

                  </ul>
                </div>
              </div>
            </div>
          </div>
          <section className="product-grids section">
            <div className="container">
              <div className="row">
                <div className="col-lg-3 col-12">

                  <div className="product-sidebar">

                    <SearchProducts history={history} />


                    <div className="single-widget">
                      <h3>All Categories</h3>
                      <ul className="category-list list">
                        {categories.map((category, index) => (

                          < li key={index}>
                            <button key={index}
                              onClick={() => setCategory(category)}>

                              {category}
                              {/* <span></span> */}
                            </button>
                          </li>
                        ))}

                      </ul>
                    </div>


                    <div className="single-widget range">
                      <h3>Filtered By Price</h3>
                      <Slider

                        value={price}
                        onChange={priceHandler}
                        valueLabelDisplay="auto"
                        aria-labelledby="range-slider"
                        min={0}
                        max={25000}

                      />
                      <div className="range-inner mt-2">
                        <label>₹{price[0]} - {price[1]}</label>
                      </div>
                    </div>

                    <div className="single-widget range">
                      <h3>Filtered By Ratings</h3>
                      <Slider
                        value={ratings}
                        onChange={(e, newRating) => {
                          setRatings(newRating);
                        }}
                        aria-labelledby="continuous-slider"
                        valueLabelDisplay="auto"
                        min={0}
                        max={5}
                      />
                      <div className="range-inner mt-2">
                        <label>Rating(s): {ratings}</label>
                      </div>
                    </div>

                  </div>

                </div>
                <div className="col-lg-9 col-12">
                  <div className="product-grids-head">
                    <div className="product-grid-topbar">
                      <div className="row align-items-center">
                        <div className="col-lg-7 col-md-8 col-12">

                          <div className="product-sorting">
                            <label >Sort by:</label>
                            <select value={category} className="form-control" id="sorting" onChange={(e) => (setCategory(e.target.value))} >
                              <option value=''>All</option>
                              {categories.map((category, index) => (
                                <option key={index} value={category}>{category}</option>
                              ))}
                            </select>
                            <h3 className="total-show-product">Showing:
                              {products &&
                                <span>{currentPage * resultPerPage - resultPerPage + 1} - {currentPage * resultPerPage - resultPerPage + products.length} items</span>
                              }
                            </h3>
                          </div>
                        </div>
                        <div className="col-lg-5 col-md-4 col-12">
                          <nav>
                            <div className="nav nav-tabs" id="nav-tab" role="tablist">
                              <button className={`nav-link ${grid}`} onClick={showGrid} id="nav-grid-tab" data-bs-toggle="tab" data-bs-target="#nav-grid" type="button" role="tab" aria-controls="nav-grid" aria-selected="true"><i className="lni lni-grid-alt"></i></button>
                              <button className={`nav-link ${list}`} onClick={showList} id="nav-list-tab" data-bs-toggle="tab" data-bs-target="#nav-list" type="button" role="tab" aria-controls="nav-list" aria-selected="false"><i className="lni lni-list"></i></button>
                            </div>
                          </nav>
                        </div>
                      </div>
                    </div>
                    <div className="tab-content" id="nav-tabContent">
                      <div className={`tab-pane fade ${grid}`} id="nav-grid" role="tabpanel" aria-labelledby="nav-grid-tab">
                        <div className="row">

                          {products &&
                            products.map((product, index) =>
                            (
                              < div className="col-lg-4 col-md-6 col-12" key={product._id} >
                                <ProductCard key={product._id} product={product} />
                              </div>
                            ))
                          }
                        </div>
                        <div className="row">
                          <div className="col-12">

                            <div className="pagination left">

                              {resultPerPage < count && (
                                <Pagination
                                  innerClass="pagination-list"
                                  activePage={currentPage}
                                  itemsCountPerPage={resultPerPage}
                                  totalItemsCount={productsCount}
                                  onChange={setCurrentPageNo}
                                  nextPageText={<i className="lni lni-chevron-right"></i>}
                                  prevPageText={<i className="lni lni-chevron-left"></i>}
                                  firstPageText="1st"
                                  lastPageText="Last"
                                  itemClass="page-item"
                                  linkClass="page-link"
                                  activeClass="pageItemActive"
                                  activeLinkClass="pageLinkActive"
                                />
                              )}


                            </div>

                          </div>
                        </div>
                      </div>
                      <div className={`tab-pane fade ${list}`} id="nav-list" role="tabpanel" aria-labelledby="nav-list-tab">
                        <div className="row">

                          {products &&
                            products.map((product, index) =>
                            (
                              <div className="col-lg-12 col-md-12 col-12" key={product._id} >
                                <ProductCardList key={product._id} product={product} />
                              </div>
                            ))
                          }



                          <div className="single-product">
                            <div className="row align-items-center">
                              <div className="col-lg-4 col-md-4 col-12">
                                <div className="product-image">
                                  <img src="../assets/images/products/product-7.jpg" alt="#" />
                                  <span className="sale-tag">-50%</span>
                                  <div className="button">
                                    <Link to="product-details.html" className="btn"><i className="lni lni-cart"></i> Add to
                                      Cart</Link>
                                  </div>
                                </div>
                              </div>
                              <div className="col-lg-8 col-md-8 col-12">
                                <div className="product-info">
                                  <span className="category">Headphones</span>
                                  <h4 className="title">
                                    <Link to="product-grids.html">PX7 Wireless Headphones</Link>
                                  </h4>
                                  <ul className="review">
                                    <li><i className="lni lni-star-filled"></i></li>
                                    <li><i className="lni lni-star-filled"></i></li>
                                    <li><i className="lni lni-star-filled"></i></li>
                                    <li><i className="lni lni-star-filled"></i></li>
                                    <li><i className="lni lni-star"></i></li>
                                    <li><span>4.0 Review(s)</span></li>
                                  </ul>
                                  <div className="price">
                                    <span>$100.00</span>
                                    <span className="discount-price">$200.00</span>
                                  </div>
                                </div>
                              </div>
                            </div>


                          </div>
                        </div>
                        <div className="row">
                          <div className="col-12">

                            <div className="pagination left">

                              {resultPerPage < count && (
                                <Pagination
                                  innerClass="pagination-list"
                                  activePage={currentPage}
                                  itemsCountPerPage={resultPerPage}
                                  totalItemsCount={productsCount}
                                  onChange={setCurrentPageNo}
                                  nextPageText={<i className="lni lni-chevron-right"></i>}
                                  prevPageText={<i className="lni lni-chevron-left"></i>}
                                  firstPageText="1st"
                                  lastPageText="Last"
                                  itemClass="page-item"
                                  linkClass="page-link"
                                  activeClass="pageItemActive"
                                  activeLinkClass="pageLinkActive"
                                />
                              )}


                            </div>

                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>


        </Fragment >
      )
      }
    </Fragment >
  );
};

export default Products;
