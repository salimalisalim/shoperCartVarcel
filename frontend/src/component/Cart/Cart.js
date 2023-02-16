import React, { Fragment, useEffect, useState } from "react";
import "./Cart.css";
// import CartItemCard from "./CartItemCard";
import { useSelector, useDispatch } from "react-redux";
import { addItemsToCart, removeItemsFromCart } from "../../actions/cartAction";
import { clearErrors, findCoupon } from "../../actions/couponAction";
import { Typography } from "@material-ui/core";
import RemoveShoppingCartIcon from "@material-ui/icons/RemoveShoppingCart";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";

const Cart = ({ history }) => {
  const { cartItems } = useSelector((state) => state.cart);

  const { error, success, coupon } = useSelector((state) => state.couponDetails);

  const dispatch = useDispatch();
  const alert = useAlert();

  const [enteredCoupon, setEnteredCoupon] = useState("");


  const [couponAmount, setCouponAmount] = useState(0);


  let savedPrice = 0;

  const increaseQuantity = (id, quantity, stock) => {
    const newQty = quantity + 1;
    if (stock <= quantity) {
      return;
    }
    dispatch(addItemsToCart(id, newQty));
  };

  const decreaseQuantity = (id, quantity) => {
    const newQty = quantity - 1;
    if (1 >= quantity) {
      return;
    }
    dispatch(addItemsToCart(id, newQty));
  };

  const deleteCartItems = (id) => {
    dispatch(removeItemsFromCart(id));
  };

  const checkoutHandler = () => {
    history.push("/login?redirect=shipping");
  };

  const couponSubmit = (e) => {
    e.preventDefault();
    dispatch(findCoupon(enteredCoupon));
  };

  // console.log(coupon.couponCode);
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (success) {
      setCouponAmount(coupon.coupon.couponAmount);
      alert.success("Coupon Applied Successfully");
      // setCouponAmount(0);
    }
    dispatch(clearErrors());
  }, [dispatch, error, alert, success, coupon]);

  return (
    <Fragment>
      <div className="breadcrumbs">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 col-md-6 col-12">
              <div className="breadcrumbs-content">
                <h1 className="page-title">Products Cart</h1>
              </div>
            </div>
            <div className="col-lg-6 col-md-6 col-12">
              <ul className="breadcrumb-nav">
                <li><Link to="/"><i className="lni lni-home"></i> Home</Link></li>
                <li><Link to="/products">Products</Link></li>
                <li>Cart</li>
              </ul>
            </div>
          </div>
        </div>
      </div>


      {cartItems.length === 0 ? (
        <div className="emptyCart">
          <div className="shopping-cart section">
            <div className="container">
              <div className="d-flex justify-content-center align-self-center">
                <div className="emptyCart">
                  <RemoveShoppingCartIcon />
                  <Typography>No Product in Your Cart</Typography>
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
                        <p>Quantity</p>
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
                    </div>
                  </div>


                  {cartItems &&
                    cartItems.map((item) => (
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
                            <div className="count-input">
                              <div className="cartInput">
                                <button
                                  onClick={() =>
                                    decreaseQuantity(item.product, item.quantity)
                                  }
                                >
                                  -
                                </button>
                                <input type="number" value={item.quantity} readOnly />
                                <button
                                  onClick={() =>
                                    increaseQuantity(
                                      item.product,
                                      item.quantity,
                                      item.stock
                                    )
                                  }
                                >
                                  +
                                </button>
                              </div>
                            </div>
                          </div>
                          <div className="col-lg-2 col-md-2 col-12">
                            {`₹${item.price * item.quantity
                              }`}
                          </div>
                          <div className="col-lg-2 col-md-2 col-12">
                            {item.discount === undefined ? item.discount = 0 : ''}
                            ₹ {item.discount * item.quantity}
                          </div>
                          <div className="col-lg-1 col-md-2 col-12">
                            <span className="remove-item" onClick={() => deleteCartItems(item.product)}>
                              <i className="lni lni-close"></i>
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
                              <form onSubmit={couponSubmit}>
                                <input name="Coupon" value={enteredCoupon} onChange={(e) => setEnteredCoupon(e.target.value)}
                                  placeholder="Enter Your Coupon" disabled={couponAmount > 0 ? true : false} />
                                <div className="button">
                                  <button type="submit" className={couponAmount > 0 ? "btn bg-success" : "btn"} >
                                    {couponAmount > 0 && <i className="lni lni-checkmark"></i>}

                                    Apply Coupon</button>
                                </div>
                              </form>
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-4 col-md-6 col-12">
                          <div className="right">
                            <ul>
                              <li>Cart Subtotal<span>Gross</span></li>
                              <li>Shipping<span>Free</span></li>
                              {couponAmount > 0 &&
                                <li>Coupon Amount<span>₹{couponAmount}</span></li>
                              }

                              <li>You Save<span>₹ {savedPrice =
                                cartItems.reduce(
                                  (sva, item) => sva + item.quantity * item.discount,
                                  0) + couponAmount
                              }</span></li>

                              <li className="last">You Pay<span> {cartItems.reduce(
                                (acc, item) => acc + item.quantity * item.price,
                                0) - savedPrice} </span></li>
                            </ul>
                            <div className="button">
                              <span onClick={checkoutHandler} className="btn">Checkout</span>
                              <Link to="/products" className="btn btn-alt">Continue shopping</Link>
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
