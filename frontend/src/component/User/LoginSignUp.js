import React, { Fragment, useState, useEffect } from "react";
import Loader from "../layout/Loader/Loader";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, login } from "../../actions/userAction";
import { useAlert } from "react-alert";

const LoginSignUp = ({ history, location }) => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { error, loading, isAuthenticated } = useSelector(
    (state) => state.user
  );

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const loginSubmit = (e) => {
    e.preventDefault();
    dispatch(login(loginEmail, loginPassword));
  };

  const redirect = location.search ? location.search.split("=")[1] : "/account";

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isAuthenticated) {
      history.push(redirect);
    }
  }, [dispatch, error, alert, history, isAuthenticated, redirect]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>

          <div className="breadcrumbs">
            <div className="container">
              <div className="row align-items-center">
                <div className="col-lg-6 col-md-6 col-12">
                  <div className="breadcrumbs-content">
                    <h1 className="page-title">Login</h1>
                  </div>
                </div>
                <div className="col-lg-6 col-md-6 col-12">
                  <ul className="breadcrumb-nav">
                    <li><Link to="/"><i className="lni lni-home"></i> Home</Link></li>
                    <li>Login</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="account-login section">
            <div className="container">
              <div className="row">
                <div className="col-lg-6 offset-lg-3 col-md-10 offset-md-1 col-12">
                  <form className="card login-form" onSubmit={loginSubmit}>
                    <div className="card-body">
                      <div className="title">
                        <h3>Login Now</h3>
                        <p>You can login using your email address and password.</p>
                      </div>


                      <div className="form-group input-group">
                        <label >Email</label>
                        <input className="form-control" type="email" value={loginEmail}
                          onChange={(e) => setLoginEmail(e.target.value)} required />
                      </div>
                      <div className="form-group input-group">
                        <label >Password</label>
                        <input className="form-control" type="password" value={loginPassword}
                          onChange={(e) => setLoginPassword(e.target.value)} required />
                      </div>
                      <div className="d-flex flex-wrap justify-content-between bottom-content">
                        <div className="form-check">
                          <Link className="lost-pass" to="/loginphone">Login with phone</Link>
                        </div>
                        <Link className="lost-pass" to="/password/forgot">Forgot password?</Link>

                      </div>
                      <div className="button">
                        <button className="btn" type="submit">Login</button>
                      </div>
                      <p className="outer-link">Don't have an account? <Link to="/register">Register here </Link>
                      </p>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>


        </Fragment>
      )}
    </Fragment>
  );
};

export default LoginSignUp;
