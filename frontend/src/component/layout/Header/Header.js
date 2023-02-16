import { useSelector, useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { removeItemsFromCart } from "../../../actions/cartAction";
import CommonSideNav from "./CommonSideNav";
import UserOptions from "./UserOptions";
import Search from "../../Product/Search";
import UserNav from "./UserNav";
import "./Header.css";
import { removeItemsFromWishList } from "../../../actions/wishlistAction";

const Header = () => {

  const dispatch = useDispatch();

  const url = useHistory()

  const { cartItems } = useSelector((state) => state.cart);
  const { wishListItems } = useSelector((state) => state.wishList);

  const { isAuthenticated, user } = useSelector((state) => state.user);

  let cartItemCount = cartItems.length;

  let wishListItemCount = wishListItems.length;

  let lastTwoCartItems = cartItems.slice(-2).reverse()

  let lastTwoWishListItems = wishListItems.slice(-2).reverse()


  const deleteCartItems = (id) => {
    dispatch(removeItemsFromCart(id));
  };

  const deleteWishListItems = (id) => {
    dispatch(removeItemsFromWishList(id));
  };


  return (

    <header className="header navbar-area">

      <div className="topbar">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-4 col-md-4 col-12">
              <div className="top-left">
                <ul className="menu-top-link">
                  <li>
                    <div className="select-position">
                      <select id="select4">
                        <option value="0" >$ USD</option>
                        <option value="1">€ EURO</option>
                        <option value="2">$ CAD</option>
                        <option value="3">₹ INR</option>
                        <option value="4">¥ CNY</option>
                        <option value="5">৳ BDT</option>
                      </select>
                    </div>
                  </li>
                  <li>
                    <div className="select-position">
                      <select id="select5">
                        <option value="0" >English</option>
                        <option value="1">Español</option>
                        <option value="2">Filipino</option>
                        <option value="3">Français</option>
                        <option value="4">العربية</option>
                        <option value="5">हिन्दी</option>
                        <option value="6">বাংলা</option>
                      </select>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-4 col-md-4 col-12">
              <div className="top-middle">
                <ul className="useful-links">
                  <li><Link to="/">Home</Link></li>
                  <li><Link to="/about">About Us</Link></li>
                  <li><Link to="/contact">Contact Us</Link></li>
                </ul>
              </div>
            </div>
            <div className="col-lg-4 col-md-4 col-12">
              <div className="top-end">
                {isAuthenticated ? (
                  <UserOptions user={user} />

                ) : (
                  <ul className="user-login">
                    <li>
                      <Link to="/login">Sign In</Link>
                    </li>

                  </ul>
                )}

              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="header-middle">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-3 col-md-3 col-7">

              <Link className="navbar-brand" to="/">
                <img src="/logo.svg" alt="ShoperCart" />
              </Link>

            </div>
            <div className="col-lg-5 col-md-7 d-xs-none">

              <div className="main-menu-search">

                <Search history={url} />

              </div>

            </div>
            <div className="col-lg-4 col-md-2 col-5">
              <div className="middle-right-area">
                <div className="nav-hotline">
                  <i className="lni lni-phone"></i>
                  <h3>Hotline:
                    <span>(+91) 000 000 00 00</span>
                  </h3>
                </div>
                <div className="navbar-cart">
                  <div className="wishlist">
                    <button>
                      <i className="lni lni-heart"></i>
                      <span className="total-items">{wishListItemCount}</span>
                    </button>
                    {wishListItemCount > 0 && (
                      <div className="wishlist-items">
                        <div className="dropdown-cart-header">
                          <span>{wishListItemCount} Item(s)</span>
                          <Link to="/wishlist">View Wish List</Link>
                        </div>
                        <ul className="shopping-list">
                          {
                            lastTwoWishListItems.map((item) => (

                              <li key={item.product}>
                                <span className="remove" onClick={() => deleteWishListItems(item.product)} title="Remove this item"><i
                                  className="lni lni-close"></i></span>
                                <div className="cart-img-head">
                                  <Link className="cart-img" to={`/product/${item.product}`}><img
                                    src={item.image} alt="#" /></Link>
                                </div>

                                <div className="content">
                                  <h4><Link to={`/product/${item.product}`}>
                                    {item.name}</Link></h4>
                                  <p className="quantity">₹ <span className="amount">
                                    {item.price}
                                  </span></p>
                                </div>
                              </li>
                            ))
                          }


                        </ul>

                      </div>
                    )}
                  </div>
                  <div className="cart-items">
                    <button href="#" className="main-btn">
                      <i className="lni lni-cart"></i>
                      <span className="total-items">{cartItemCount}</span>
                    </button>

                    {cartItemCount > 0 && (
                      <div className="shopping-item">
                        <div className="dropdown-cart-header">
                          <span>{cartItemCount} Item(s)</span>
                          <Link to="/cart">View Cart</Link>
                        </div>
                        <ul className="shopping-list">
                          {
                            lastTwoCartItems.map((item) => (

                              <li key={item.product}>
                                <span className="remove" onClick={() => deleteCartItems(item.product)} title="Remove this item"><i
                                  className="lni lni-close"></i></span>
                                <div className="cart-img-head">
                                  <Link className="cart-img" to={`/product/${item.product}`}><img
                                    src={item.image} alt="#" /></Link>
                                </div>

                                <div className="content">
                                  <h4><Link to={`/product/${item.product}`}>
                                    {item.name}</Link></h4>
                                  <p className="quantity">{item.quantity} x  <span className="amount">
                                    {item.price}
                                  </span></p>
                                </div>
                              </li>
                            ))
                          }


                        </ul>
                        <div className="bottom">
                          <div className="total">
                            <span>Total</span>
                            <span className="total-amount">
                              {`₹${cartItems.reduce(
                                (acc, item) => acc + item.quantity * item.price,
                                0
                              )}`}
                            </span>
                          </div>
                          <div className="button">
                            <Link to="/cart" className="btn animate">Checkout</Link>
                          </div>
                        </div>
                      </div>
                    )}

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-8 col-md-6 col-12">
            <div className="nav-inner">


              {isAuthenticated ? (
                <UserNav user={user} />
              ) : (
                <CommonSideNav />
              )
              }
              < nav className="navbar navbar-expand-lg">
                <button className="navbar-toggler mobile-menu-btn" type="button" data-bs-toggle="collapse"
                  data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                  aria-expanded="false" aria-label="Toggle navigation">
                  <span className="toggler-icon"></span>
                  <span className="toggler-icon"></span>
                  <span className="toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse sub-menu-bar" id="navbarSupportedContent">
                  <ul id="nav" className="navbar-nav ms-auto">
                    <li className="nav-item">
                      <Link to="/" aria-label="Toggle navigation">Home</Link>
                    </li>
                    <li className="nav-item">
                      <Link to="/products">Products</Link>

                    </li>
                    <li className="nav-item">
                      <Link to="/about">About us</Link>

                    </li>

                    <li className="nav-item">
                      <Link to="/contact" >Contact Us</Link>
                    </li>
                  </ul>
                </div>
              </nav>

            </div>
          </div>
          <div className="col-lg-4 col-md-6 col-12">

            <div className="nav-social">
              <h5 className="title">Follow Us:</h5>
              <ul>
                <li>
                  <Link to="/"><i className="lni lni-facebook-filled"></i></Link>
                </li>
                <li>
                  <Link to="/"><i className="lni lni-twitter-original"></i></Link>
                </li>
                <li>
                  <Link to="/"><i className="lni lni-instagram"></i></Link>
                </li>
                <li>
                  <Link to="/"><i className="lni lni-skype"></i></Link>
                </li>
              </ul>
            </div>

          </div>
        </div>
      </div>

    </header >




    // <ReactNavbar {...options} />

  );
};

export default Header;
