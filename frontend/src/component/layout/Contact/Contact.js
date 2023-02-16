import React, { Fragment } from "react";
import "./Contact.css";
import { Link } from "@material-ui/core";

const Contact = () => {
  return (
    <Fragment>
      <div className="breadcrumbs">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 col-md-6 col-12">
              <div className="breadcrumbs-content">
                <h1 className="page-title">Contact Us</h1>
              </div>
            </div>
            <div className="col-lg-6 col-md-6 col-12">
              <ul className="breadcrumb-nav">
                <li><Link to="/"><i className="lni lni-home"></i> Home</Link></li>
                <li><Link to="/contact">Contact us</Link></li>

              </ul>
            </div>
          </div>
        </div>
      </div>
      <section className="product-grids section">
        <div className="container">
          <div className="row text-center">
            <h4>Contact me @ <Link to="mailto:salimalisalim@gmail.com" target="_blank">salimalisalim@gmail.com</Link></h4>
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default Contact;
