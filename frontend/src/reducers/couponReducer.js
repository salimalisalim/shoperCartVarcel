
import {
    NEW_COUPON_REQUEST,
    NEW_COUPON_SUCCESS,
    NEW_COUPON_FAIL,
    NEW_COUPON_RESET,
    COUPON_DETAILS_REQUEST,
    COUPON_DETAILS_FAIL,
    COUPON_DETAILS_SUCCESS,
    CLEAR_ERRORS
} from "../constants/couponConstants";

export const newCouponReducer = (state = {}, action) => {
    switch (action.type) {
        case NEW_COUPON_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case NEW_COUPON_SUCCESS:
            return {
                loading: false,
                success: action.payload.success,
                newCoupon: action.payload,
            };
        case NEW_COUPON_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case NEW_COUPON_RESET:
            return {
                ...state,
                success: false,
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };
        default:
            return state;
    }
};

export const couponDetailsReducer = (state = {}, action) => {
    switch (action.type) {
        case COUPON_DETAILS_REQUEST:
            return {
                loading: true,
                ...state,
            };
        case COUPON_DETAILS_SUCCESS:
            return {
                loading: false,
                success: action.payload.success,
                coupon: action.payload,
            };

        case COUPON_DETAILS_FAIL:
            return {
                loading: false,
                error: action.payload,
            };

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };
        default:
            return state;
    }
};