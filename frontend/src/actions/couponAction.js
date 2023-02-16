import axios from "axios";

import {
    ADMIN_COUPON_REQUEST,
    ADMIN_COUPON_SUCCESS,
    ADMIN_COUPON_FAIL,
    NEW_COUPON_REQUEST,
    NEW_COUPON_SUCCESS,
    NEW_COUPON_FAIL,

    COUPON_DETAILS_REQUEST,
    COUPON_DETAILS_FAIL,
    COUPON_DETAILS_SUCCESS,
    CLEAR_ERRORS,
} from "../constants/couponConstants";

// Get All Coupons For Admin
export const getAdminCoupon = () => async (dispatch) => {
    try {
        dispatch({ type: ADMIN_COUPON_REQUEST });

        const { data } = await axios.get("/api/v1/admin/coupons");

        dispatch({
            type: ADMIN_COUPON_SUCCESS,
            payload: data.coupons,
        });
    } catch (error) {
        dispatch({
            type: ADMIN_COUPON_FAIL,
            payload: error.response.data.message,
        });
    }
};

// Create Coupon
export const createCoupon = (couponData) => async (dispatch) => {
    try {
        dispatch({ type: NEW_COUPON_REQUEST });

        const config = {
            headers: { "Content-Type": "application/json" },
        };

        const { data } = await axios.post(
            `/api/v1/admin/coupon/new`,
            couponData,
            config
        );

        dispatch({
            type: NEW_COUPON_SUCCESS,
            payload: data.coupon,
        });
    } catch (error) {
        dispatch({
            type: NEW_COUPON_FAIL,
            payload: error.response.data.message,
        });
    }
};


// Find a Coupon
export const findCoupon = (couponCode) => async (dispatch) => {
    try {
        dispatch({ type: COUPON_DETAILS_REQUEST });

        const config = { headers: { "Content-Type": "application/json" } };

        const { data } = await axios.post(
            `/api/v1/coupon/find`,
            { couponCode },
            config
        );

        dispatch({ type: COUPON_DETAILS_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: COUPON_DETAILS_FAIL, payload: error.response.data.message });
    }
};

// Clearing Errors
export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
};
