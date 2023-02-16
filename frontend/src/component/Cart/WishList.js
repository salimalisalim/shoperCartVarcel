import React, { Fragment } from "react";
import "./Cart.css";
// import CartItemCard from "./CartItemCard";
import { useSelector, useDispatch } from "react-redux";
import { addItemsToCart } from "../../actions/cartAction";
import { Typography } from "@material-ui/core";
import RemoveShoppingCartIcon from "@material-ui/icons/RemoveShoppingCart";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";
import { removeItemsFromWishList } from "../../actions/wishlistAction";

const Cart = () => {
  const { cartItems } = useSelector((state) => state.cart);

  const { wishListItems } = useSelector((state) => state.wishList);

  const dispatch = useDispatch();
  const alert = useAlert();

  let quantity = 1;

  const deleteWishListItems = (id) => {
    dispatch(removeItemsFromWishList(id));
  };

  const addToCartHandler = (id, quantity) => {
    cartItems.find(item => {
      if (item.product === id) {
        quantity = item.quantity + 1
        return quantity
      }
      return ''
    });
    dispatch(addItemsToCart(id, quantity)); //3

    alert.success("Item Added To Cart");

  };

  return (
    <Fragment>
      <div className="breadcrumbs">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 col-md-6 col-12">
              <div className="breadcrumbs-content">
                <h1 className="page-title">Products Wish List</h1>
              </div>
            </div>
            <div className="col-lg-6 col-md-6 col-12">
              <ul className="breadcrumb-nav">
                <li><Link to="/"><i className="lni lni-home"></i> Home</Link></li>
                <li><Link to="/products">Products</Link></li>
                <li>Wish List</li>
              </ul>
            </div>
          </div>
        </div>
      </div>


      {wishListItems.length === 0 ? (
        <div className="emptyCart">
          <div className="shopping-cart section">
            <div className="container">
              <div className="d-flex justify-content-center align-self-center">
                <div className="emptyCart">
                  <RemoveShoppingCartIcon />
                  <Typography>No Product in Your Wish List</Typography>
                  <Link to="/products" >View Products</Link>
                </div>
              </div>
            </div>
          </div>


        </div>
      ) : (
        <Fragment>
          <div>
            <div className="shopping-cart section">
              <div className="container">
                <div className="cart-list-head">

                  <div className="cart-list-title">
                    <div className="row">
                      <div className="col-lg-1 col-md-1 col-12">
                      </div>
                      <div className="col-lg-4 col-md-3 col-12">
                        <p>Product Name</p>
                      </div>

                      <div className="col-lg-2 col-md-2 col-12">
                        <p>Subtotal</p>
                      </div>
                      <div className="col-lg-2 col-md-2 col-12">
                        <p>Discount</p>
                      </div>
                      <div className="col-lg-1 col-md-2 col-12">
                        <p>Remove</p>
                      </div>
                      <div className="col-lg-2 col-md-2 col-12">
                        <p>Add to Cart</p>
                      </div>
                    </div>
                  </div>

                  {wishListItems &&
                    wishListItems.map((item) => (
                      <div className="cart-single-list" key={item.product}>
                        <div className="row align-items-center">
                          <div className="col-lg-1 col-md-1 col-12">
                            <Link to={`/product/${item.product}`}><img src={item.image} alt={item.name} /></Link>
                          </div>
                          <div className="col-lg-4 col-md-3 col-12">
                            <h5 className="product-name"><Link to={`/product/${item.product}`}>
                              {item.name}</Link></h5>
                            <p className="product-des">
                              {/* <span><em>Type:</em> Mirrorless</span>
                              <span><em>Color:</em> Black</span> */}
                            </p>
                          </div>
                          <div className="col-lg-2 col-md-2 col-12">
                            {`₹${item.price
                              }`}
                          </div>
                          <div className="col-lg-2 col-md-2 col-12">
                            {item.discount === undefined ? item.discount = 0 : ''}
                            ₹ {item.discount}
                          </div>
                          <div className="col-lg-1 col-md-2 col-12">
                            <span className="remove-item" onClick={() => deleteWishListItems(item.product)}>
                              <i className="lni lni-close"></i>
                            </span>

                          </div>
                          <div className="col-lg-1 col-md-2 col-12">
                            <span className="remove-item" onClick={() => addToCartHandler(item.product, quantity)}>
                              <i className="lni lni-circle-plus"></i>
                            </span>

                          </div>
                        </div>
                      </div>
                    ))
                  }

                </div>
                <div className="row">
                  <div className="col-12">

                    <div className="total-amount">
                      <div className="row">
                        <div className="col-lg-8 col-md-6 col-12">
                          <div className="left">
                            <div className="coupon">

                            </div>
                          </div>
                        </div>

                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </div>



          </div >

        </Fragment >
      )
      }
    </Fragment >
  );
};

export default Cart;
