import React, { Fragment, useEffect } from "react";
import { useSelector } from "react-redux";
import MetaData from "../layout/MetaData";
import Loader from "../layout/Loader/Loader";
import { Link } from "react-router-dom";
import "./Profile.css";

const Profile = ({ history }) => {
  const { user, loading, isAuthenticated } = useSelector((state) => state.user);

  useEffect(() => {
    if (isAuthenticated === false) {
      history.push("/login");
    }
  }, [history, isAuthenticated]);
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={`${user.name}'s Profile`} />
          <div className="breadcrumbs">
            <div className="container">
              <div className="row align-items-center">
                <div className="col-lg-6 col-md-6 col-12">
                  <div className="breadcrumbs-content">
                    <h1 className="page-title">My Profile</h1>
                  </div>
                </div>
                <div className="col-lg-6 col-md-6 col-12">
                  <ul className="breadcrumb-nav">
                    <li><Link to="/"><i className="lni lni-home"></i> Home</Link></li>
                    <li><Link to="/account">Profile</Link></li>

                  </ul>
                </div>
              </div>
            </div>
          </div>
          <section className="product-grids pt-1">
            <div className="container profile pt-3 pb-3 ">
              <div className="row">
                <div className="card">
                  <img src={user.avatar.url} alt={user.name} />
                  <h4 className="pt-2">{user.name}</h4>
                  {/* <p className="title">CEO & Founder, Example</p> */}
                  <p>Email: {user.email}</p>
                  <p>Phone {user.phone}</p>
                  <p>Joined on: {String(user.createdAt).substr(0, 10)}</p>
                  <p> <Link className="profile-edit-btn" to="/me/update">Edit Profile</Link></p>
                  <Link className="p-2" to="/orders">My Orders</Link>
                  <Link className="p-2" to="/password/update">Change Password</Link>
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

export default Profile;
