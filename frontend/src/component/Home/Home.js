import React, { Fragment, useEffect } from "react";
import "./Home.css";
import ProductCard from "./ProductCard.js";
import MetaData from "../layout/MetaData";
import { clearErrors, getProduct } from "../../actions/productAction";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../layout/Loader/Loader";
import { useAlert } from "react-alert";
import { Link } from "react-router-dom";


const Home = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { loading, error, products } = useSelector((state) => state.products);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProduct());
  }, [dispatch, error, alert]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="ShoperCart" />
          <section className="hero-area">
            <div className="container">
              <div className="row">
                <div className="col-lg-8 col-12 custom-padding-right">

                  <div className="slider-head">

                    <div className="hero-slider">

                      <div className="single-slider" style={{ background: "url(/assets/images/hero/slider-bg1.jpg)" }}>
                        <div className="content">
                          <h2><span>No restocking fee ($35 savings)</span>
                            M75 Sport Watch
                          </h2>
                          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                            incididunt ut labore et dolore magna aliqua.</p>
                          <h3><span>Now Only</span> $320.99</h3>
                          <div className="button">
                            <Link to="/" className="btn">Shop Now</Link>
                          </div>
                        </div>
                      </div>
                      <div>

                      </div>


                    </div>

                  </div>
                </div>
                <div className="col-lg-4 col-12">
                  <div className="row">
                    <div className="col-lg-12 col-md-6 col-12 md-custom-padding">

                      <div className="hero-small-banner" style={{ background: "url(assets/images/hero/slider-bnr.jpg)" }}>
                        <div className="content">
                          <h2>
                            <span>New line required</span>
                            iPhone 12 Pro Max
                          </h2>
                          <h3>$259.99</h3>
                        </div>
                      </div>

                    </div>
                    <div className="col-lg-12 col-md-6 col-12">

                      <div className="hero-small-banner style2">
                        <div className="content">
                          <h2>Weekly Sale!</h2>
                          <p>Saving up to 50% off all online store items this week.</p>
                          <div className="button">
                            <Link className="btn" to="/">Shop Now</Link>
                          </div>
                        </div>
                      </div>

                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="trending-product section" style={{ marginTop: "20px" }}>
            <div className="container">
              <div className="row">
                <div className="col-12">
                  <div className="section-title">
                    <h2>Trending Products</h2>
                    <p>There are many variations of passages of Lorem Ipsum available, but the majority have
                      suffered alteration in some form.</p>
                  </div>
                </div>
              </div>
              <div className="row products-listing-home">
                {products &&
                  products.slice(0, 8).map((product) => (
                    <div className="col-lg-3 col-md-6 col-12" key={product._id}>
                      <ProductCard key={product._id} product={product} />
                    </div>
                  ))}


              </div>
            </div>
          </section>
        </Fragment>
      )
      }

      <section className="call-action section">
        <div className="container">
          <div className="row ">
            <div className="col-lg-8 offset-lg-2 col-12">
              <div className="inner">
                <div className="content">
                  <h2 className="wow fadeInUp" data-wow-delay=".4s">Door to a new world of shopping <br />
                    Experience a shopping</h2>
                  <p className="wow fadeInUp" data-wow-delay=".6s">Go through our products and explore the offers and best discounts,<br /> the best offers in the market</p>
                  <div className="button wow fadeInUp" data-wow-delay=".8s">
                    <Link to="/products" className="btn">Explore Now</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="banner section">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 col-md-6 col-12">
              <div className="single-banner" style={{ backgroundImage: "url('assets/images/banner/banner-1-bg.jpg')" }}>
                <div className="content">
                  <h2>Smart Watch 2.0</h2>
                  <p>Space Gray Aluminum Case with <br />Black/Volt Real Sport Band </p>
                  <div className="button">
                    <Link to="/" className="btn">View Details</Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-md-6 col-12">
              <div className="single-banner custom-responsive-margin"
                style={{ backgroundImage: "url('assets/images/banner/banner-2-bg.jpg')" }}>
                <div className="content">
                  <h2>Smart Headphone</h2>
                  <p>Lorem ipsum dolor sit amet, <br />eiusmod tempor
                    incididunt ut labore.</p>
                  <div className="button">
                    <Link to="/" className="btn">Shop Now</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="shipping-info">
        <div className="container">
          <ul>

            <li>
              <div className="media-icon">
                <i className="lni lni-delivery"></i>
              </div>
              <div className="media-body">
                <h5>Free Shipping</h5>
                <span>On order over ₹999</span>
              </div>
            </li>

            <li>
              <div className="media-icon">
                <i className="lni lni-support"></i>
              </div>
              <div className="media-body">
                <h5>24/7 Support.</h5>
                <span>Live Chat Or Call.</span>
              </div>
            </li>

            <li>
              <div className="media-icon">
                <i className="lni lni-credit-cards"></i>
              </div>
              <div className="media-body">
                <h5>Online Payment.</h5>
                <span>Secure Payment Services.</span>
              </div>
            </li>

            <li>
              <div className="media-icon">
                <i className="lni lni-reload"></i>
              </div>
              <div className="media-body">
                <h5>Easy Return.</h5>
                <span>Hassle Free Shopping.</span>
              </div>
            </li>
          </ul>
        </div>
      </section>

    </Fragment >
  );
};

export default Home;
