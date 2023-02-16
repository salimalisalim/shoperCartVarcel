import React, { Fragment } from "react";
import "./aboutSection.css";
const About = () => {

  return (
    <Fragment>
      <div className="breadcrumbs">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 col-md-6 col-12">
              <div className="breadcrumbs-content">
                <h1 className="page-title">About Us</h1>
              </div>
            </div>
            <div className="col-lg-6 col-md-6 col-12">
              <ul className="breadcrumb-nav">
                <li><a href="/"><i className="lni lni-home"></i> Home</a></li>
                <li><a href="/about">About us</a></li>

              </ul>
            </div>
          </div>
        </div>
      </div>
      <section className="product-grids section">
        <div className="container">
          <div className="row">
            This site is developed by Salim Ali as a Full Stack MERN project.
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default About;
