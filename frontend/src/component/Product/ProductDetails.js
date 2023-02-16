import React, { Fragment, useEffect, useState } from "react";
import Carousel from "react-material-ui-carousel";
import "./ProductDetails.css";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  getProductDetails,
  newReview,
} from "../../actions/productAction";
import ReviewCard from "./ReviewCard.js";
import Loader from "../layout/Loader/Loader";
import { useAlert } from "react-alert";
import MetaData from "../layout/MetaData";
import { addItemsToCart } from "../../actions/cartAction";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@material-ui/core";
import { Rating } from "@material-ui/lab";
import { NEW_REVIEW_RESET } from "../../constants/productConstants";
import { Link } from "react-router-dom";
import { addItemsToWishList } from "../../actions/wishlistAction";

const ProductDetails = ({ match }) => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { product, loading, error } = useSelector(
    (state) => state.productDetails
  );

  const { success, error: reviewError } = useSelector(
    (state) => state.newReview
  );

  const options = {
    size: "large",
    value: product.ratings,
    readOnly: true,
    precision: 0.5,
  };

  const [quantity, setQuantity] = useState(1);
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const increaseQuantity = () => {
    if (product.Stock <= quantity) return;

    const qty = quantity + 1;
    setQuantity(qty);
  };

  const decreaseQuantity = () => {
    if (1 >= quantity) return;

    const qty = quantity - 1;
    setQuantity(qty);
  };

  const addToCartHandler = () => {
    dispatch(addItemsToCart(match.params.id, quantity));
    alert.success("Item Added To Cart");
  };

  const submitReviewToggle = () => {
    open ? setOpen(false) : setOpen(true);
  };

  const reviewSubmitHandler = () => {
    const myForm = new FormData();

    myForm.set("rating", rating);
    myForm.set("comment", comment);
    myForm.set("productId", match.params.id);

    dispatch(newReview(myForm));

    setOpen(false);
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (reviewError) {
      alert.error(reviewError);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success("Review Submitted Successfully");
      dispatch({ type: NEW_REVIEW_RESET });
    }
    dispatch(getProductDetails(match.params.id));
  }, [dispatch, match.params.id, error, alert, reviewError, success])

  const addToWishListHandler = () => {
    dispatch(addItemsToWishList(product._id)); //3
    alert.success("Item Added To Wish List");
  }
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={`${product.name} -- ShoperCart`} />
          <div className="breadcrumbs">
            <div className="container">
              <div className="row align-items-center">
                <div className="col-lg-6 col-md-6 col-12">
                  <div className="breadcrumbs-content">
                    <h1 className="page-title">Product Details</h1>
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
          <section className="item-details section">
            <div className="container">
              <div className="top-area">
                <div className="row align-items-center">
                  <div className="col-lg-6 col-md-12 col-12">
                    <div className="product-images">
                      <main id="gallery">
                        <Carousel>
                          {product.images &&
                            product.images.map((item, i) => (
                              <img
                                className="CarouselImage"
                                key={i}
                                src={item.url}
                                alt={`${i} Slide`}
                              />
                            ))}
                        </Carousel>
                      </main>
                    </div>
                  </div>

                  <div className="col-lg-6 col-md-12 col-12">
                    <div className="product-info">
                      <h2 className="title">{product.name}</h2>
                      <p className="category"><i className="lni lni-tag"></i> {product.category}</p>
                      {/* <p className="mb-1"> Product #: {product._id} </p> */}
                      <h3 className="price">₹ {product.price}
                        {product.discount &&
                          <span>₹ {product.discount + product.price}</span>
                        }
                      </h3>

                      <div className="detailsBlock-2">
                        <Rating {...options} />
                        <span className="detailsBlock-2-span">
                          {" "}
                          ({product.numOfReviews} Reviews)
                        </span>
                      </div>
                      <p className="info-text">{product.description}</p>
                      <div className="row">
                        <div className="col-lg-4 col-md-4 col-12">
                          <div className="form-group color-option">
                            <label className="title-label" >Choose color</label>
                            <div className="single-checkbox checkbox-style-1">
                              <input type="checkbox" id="checkbox-1" />
                              <label ><span></span></label>
                            </div>
                            <div className="single-checkbox checkbox-style-2">
                              <input type="checkbox" id="checkbox-2" />
                              <label ><span></span></label>
                            </div>
                            <div className="single-checkbox checkbox-style-3">
                              <input type="checkbox" id="checkbox-3" />
                              <label ><span></span></label>
                            </div>
                            <div className="single-checkbox checkbox-style-4">
                              <input type="checkbox" id="checkbox-4" />
                              <label ><span></span></label>
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-4 col-md-4 col-12">
                          <div className="form-group quantity">
                            <label >Quantity</label>
                            <div className="detailsBlock-3-1-1">
                              <button className="btn" onClick={decreaseQuantity}>-</button>
                              <input readOnly type="number" value={quantity} />
                              <button className="btn" onClick={increaseQuantity}>+</button>
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-4 col-md-4 col-12">
                          <div className="form-group ">
                            <label >&nbsp;</label>
                            <div className="button review-button detailsBlock-3-1-1">
                              <button className=" btn btn-secondary"
                                onClick={submitReviewToggle} style={{ width: "100%" }}>Add Review</button>
                            </div>
                          </div>
                        </div>
                      </div>
                      <p>
                        Status:
                        <b className={product.Stock < 1 ? "text-danger" : "text-success"}>
                          {product.Stock < 1 ? "OutOfStock" : "InStock"}
                        </b>
                      </p>
                      <div className="bottom-content">
                        <div className="row align-items-end">
                          <div className="col-lg-4 col-md-4 col-12">
                            <div className="button cart-button">
                              <button className="btn" disabled={product.Stock < 1 ? true : false}
                                onClick={addToCartHandler} style={{ width: "100%" }}>Add to Cart</button>
                            </div>
                          </div>
                          <div className="col-lg-4 col-md-4 col-12">
                            <div className="wish-button">
                              <button className="btn"><i className="lni lni-reload"></i> Compare</button>
                            </div>
                          </div>
                          <div className="col-lg-4 col-md-4 col-12">
                            <div className="wish-button">
                              <button className="btn" onClick={() => addToWishListHandler(product._id)}><i className="lni lni-heart"></i> To Wishlist</button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="product-details-info">
                <div className="single-block">
                  <div className="row">
                    <div className="col-lg-12 col-12">
                      <div className="info-body custom-responsive-margin">
                        <h4>Product Reviews</h4>
                        {product.reviews && product.reviews[0] ? (
                          <div className="reviews">
                            {product.reviews &&
                              product.reviews.map((review) => (
                                <ReviewCard key={review._id} review={review} />
                              ))}
                          </div>
                        ) : (
                          <p className="noReviews">No Reviews Yet</p>
                        )}
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </section>

          <Dialog
            aria-labelledby="simple-dialog-title"
            open={open}
            onClose={submitReviewToggle}
          >
            <DialogTitle>Submit Review</DialogTitle>
            <DialogContent className="submitDialog">
              <Rating
                onChange={(e) => setRating(e.target.value)}
                value={rating}
                size="large"
              />

              <textarea
                className="submitDialogTextArea"
                cols="30"
                rows="5"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              ></textarea>
            </DialogContent>
            <DialogActions>
              <Button onClick={submitReviewToggle} color="secondary">
                Cancel
              </Button>
              <Button onClick={reviewSubmitHandler} color="primary">
                Submit
              </Button>
            </DialogActions>
          </Dialog>


        </Fragment>
      )}
    </Fragment>
  );
};

export default ProductDetails;
