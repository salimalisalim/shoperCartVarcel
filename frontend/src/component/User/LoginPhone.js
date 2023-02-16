import React, { Fragment, useState, useEffect } from "react";
import Loader from "../layout/Loader/Loader";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, loginPhoneFn, loginPhoneVerify } from "../../actions/userAction";
import { useAlert } from "react-alert";


const LoginPhone = ({ history, location }) => {
    const dispatch = useDispatch();
    const alert = useAlert();

    const { error, loading, isAuthenticated, data } = useSelector(
        (state) => state.user
    );

    const [loginPhone, setLoginPhone] = useState("");

    const [OTPNumber, setOTPNumber] = useState("");

    const [verifyForm, setVerifyForm] = useState("none");

    const [OTPForm, setOTPForm] = useState("block");

    const loginSubmit = (e) => {
        e.preventDefault();
        dispatch(loginPhoneFn(loginPhone));
    };
    const otpSubmit = (e) => {
        e.preventDefault();
        dispatch(loginPhoneVerify(data, OTPNumber));
    };

    const redirect = location.search ? location.search.split("=")[1] : "/account";

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        if (data && isAuthenticated === false) {

            alert.success(data.message);
            setVerifyForm("block");
            setOTPForm("none");
        }

        if (isAuthenticated === true) {
            history.push(redirect);
        }
    }, [dispatch, error, alert, history, redirect, data, isAuthenticated]);

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
                                <div className="col-lg-6 offset-lg-3 col-md-10 offset-md-1 col-12" style={{ display: verifyForm }}>
                                    <form className="card login-form" onSubmit={otpSubmit}>
                                        <div className="card-body">
                                            <div className="title">
                                                <h3>Enter the OTP number</h3>
                                                <p>Enter the OTP number you received in your number.</p>
                                            </div>


                                            <div className="form-group input-group">
                                                <label >OTP Number</label>
                                                <input className="form-control" type="text" value={OTPNumber}
                                                    onChange={(e) => setOTPNumber(e.target.value)} required name="OTPnumber" />
                                            </div>

                                            <div className="button">
                                                <button className="btn" type="submit">Enter OTP Number</button>
                                            </div>
                                            <p className="outer-link">Don't have an account? <Link to="/register">Register here </Link>
                                            </p>
                                        </div>
                                    </form>
                                </div>

                                <div className="col-lg-6 offset-lg-3 col-md-10 offset-md-1 col-12" style={{ display: OTPForm }}>
                                    <form className="card login-form" onSubmit={loginSubmit}>
                                        <div className="card-body">
                                            <div className="title">
                                                <h3>Login with Phone Number</h3>
                                                <p>You can login using your phone number.</p>
                                            </div>


                                            <div className="form-group input-group">
                                                <label >Phone Number</label>
                                                <input className="form-control" type="text" value={loginPhone}
                                                    onChange={(e) => setLoginPhone(e.target.value)} required name="loginPhone" />
                                            </div>

                                            <div className="button">
                                                <button className="btn" type="submit">Send OTP</button>
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
    )
}

export default LoginPhone