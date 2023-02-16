import React, { Fragment, useState, useEffect } from "react";
import Loader from "../layout/Loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { clearErrors, register } from "../../actions/userAction";
import "./UserSignUp.css";
import { Link } from "react-router-dom";
const UserSignUp = ({ history, location }) => {

    const dispatch = useDispatch();

    const alert = useAlert();

    const { error, loading, isAuthenticated } = useSelector(
        (state) => state.user
    );

    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
        phone: ""
    });

    const { name, email, password, phone } = user;

    const [avatar, setAvatar] = useState("/Profile.png");
    const [avatarPreview, setAvatarPreview] = useState("/Profile.png");

    const registerSubmit = (e) => {
        e.preventDefault();

        const myForm = new FormData();

        myForm.set("name", name);
        myForm.set("email", email);
        myForm.set("password", password);
        myForm.set("phone", phone);
        myForm.set("avatar", avatar);
        dispatch(register(myForm));
    };

    const registerDataChange = (e) => {
        if (e.target.name === "avatar") {
            const reader = new FileReader();

            reader.onload = () => {
                if (reader.readyState === 2) {
                    setAvatarPreview(reader.result);
                    setAvatar(reader.result);
                }
            };

            reader.readAsDataURL(e.target.files[0]);
        } else {
            setUser({ ...user, [e.target.name]: e.target.value });
        }
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
                                        <h1 className="page-title">Registration</h1>
                                    </div>
                                </div>
                                <div className="col-lg-6 col-md-6 col-12">
                                    <ul className="breadcrumb-nav">
                                        <li><Link to="/"><i className="lni lni-home"></i> Home</Link></li>
                                        <li>Registration</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="account-login section">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-6 offset-lg-3 col-md-10 offset-md-1 col-12">
                                    <div className="register-form">
                                        <div className="title">
                                            <h3>No Account? Register</h3>
                                            <p>Registration takes less than a minute but gives you full control over your orders.</p>
                                        </div>
                                        <form className="row" encType="multipart/form-data"
                                            onSubmit={registerSubmit} >
                                            <div className="col-sm-6">
                                                <div className="form-group">
                                                    <label for="reg-fn">Full Name</label>
                                                    <input className="form-control" type="text" name="name"
                                                        value={name} onChange={registerDataChange} required="" />
                                                </div>
                                            </div>
                                            <div className="col-sm-6">
                                                <div className="form-group">
                                                    <label for="reg-email">E-mail Address</label>
                                                    <input className="form-control" name="email" type="email" value={email}
                                                        onChange={registerDataChange} required="" />
                                                </div>
                                            </div>

                                            <div className="col-sm-6">
                                                <div className="form-group">
                                                    <label for="reg-pass">Password</label>
                                                    <input className="form-control" name="password" type="password" value={password}
                                                        onChange={registerDataChange} required="" />
                                                </div>
                                            </div>
                                            <div className="col-sm-6">
                                                <div className="form-group">
                                                    <label for="reg-phone">Phone</label>
                                                    <input className="form-control" name="phone" type="text" value={phone}
                                                        onChange={registerDataChange} required="" />
                                                </div>
                                            </div>
                                            <div className="col-sm-6">
                                                <div className="form-group" id="registerImage">
                                                    <img src={avatarPreview} alt="Avatar Preview" />
                                                    <input
                                                        type="file"
                                                        name="avatar"
                                                        accept="image/*"
                                                        onChange={registerDataChange}
                                                    />
                                                </div>
                                            </div>
                                            <div className="button">
                                                <button className="btn" type="submit">Register</button>
                                            </div>
                                            <p className="outer-link">Already have an account? <Link to="/login">Login Now</Link>
                                            </p>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Fragment>
            )}
        </Fragment>
    )
}

export default UserSignUp