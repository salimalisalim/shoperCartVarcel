import React, { Fragment, useEffect, useState } from 'react'
import MetaData from '../layout/MetaData'
import "./NewCoupon.css";
import { clearErrors, createCoupon } from "../../actions/couponAction";
import { NEW_COUPON_RESET } from "../../constants/couponConstants";
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import SpellcheckIcon from "@material-ui/icons/Spellcheck";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import { Button } from '@material-ui/core';

const NewCoupon = ({ history }) => {

    const dispatch = useDispatch();
    const alert = useAlert();

    const { loading, error, success } = useSelector((state) => state.newCoupon);

    const [couponCode, setCouponCode] = useState("");
    const [couponAmount, setCouponAmount] = useState(0);

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        if (success) {
            alert.success("Coupon Created Successfully");
            history.push("/admin/dashboard");
            dispatch({ type: NEW_COUPON_RESET });
        }
    }, [dispatch, alert, error, history, success]);

    const createCouponSubmitHandler = (e) => {
        e.preventDefault();

        const myForm = new FormData();

        myForm.set("couponCode", couponCode);
        myForm.set("couponAmount", couponAmount);

        dispatch(createCoupon(myForm));

    }

    return (
        <Fragment>
            <MetaData title="Create a Coupon" />
            <div className="dashboard">
                <div className="container">
                    <div className="d-sm-flex align-items-center justify-content-between mb-4 mt-4">
                        <h1 className="h3 mb-0 text-gray-800">Create A Coupon</h1>

                    </div>
                    <div className='newCouponContainer'>
                        <form
                            className="createCouponForm"
                            encType="multipart/form-data"
                            onSubmit={createCouponSubmitHandler}
                        >
                            <div>
                                <SpellcheckIcon />
                                <input
                                    type="text"
                                    placeholder="Coupon Code"
                                    required
                                    value={couponCode}
                                    onChange={(e) => setCouponCode(e.target.value)}
                                />
                            </div>
                            <div>
                                <AttachMoneyIcon />
                                <input
                                    type="number"
                                    placeholder="Coupon Amount"
                                    required
                                    onChange={(e) => setCouponAmount(e.target.value)}
                                />
                            </div>
                            <Button
                                id="createProductBtn"
                                type="submit"
                                disabled={loading ? true : false}
                            >
                                Create
                            </Button>
                        </form>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default NewCoupon