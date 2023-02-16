import {
    ADD_TO_WISH_LIST,
    REMOVE_FROM_WISH_LIST,
    EMPTY_WISH_LIST
} from "../constants/wishlistConstants";
import axios from "axios";

// Add to wislist
export const addItemsToWishList = (id) => async (dispatch, getState) => {
    const { data } = await axios.get(`/api/v1/product/${id}`);
    dispatch({
        type: ADD_TO_WISH_LIST,
        payload: {
            product: data.product._id,
            name: data.product.name,
            price: data.product.price,
            discount: data.product.discount,
            image: data.product.images[0].url,
            status: true,
        },
    });

    localStorage.setItem("wishListItems", JSON.stringify(getState().wishList.wishListItems));
};


// REMOVE FROM whishlist
export const removeItemsFromWishList = (id) => async (dispatch, getState) => {
    dispatch({
        type: REMOVE_FROM_WISH_LIST,
        payload: id,
    });

    localStorage.setItem("wishListItems", JSON.stringify(getState().wishList.wishListItems));
};

// EMPTY wishlist
export const emptyItemsFromWishList = () => async (dispatch, getState) => {
    dispatch({
        type: EMPTY_WISH_LIST,
        payload: [],
    });

    localStorage.setItem("wishListItems", []);
};