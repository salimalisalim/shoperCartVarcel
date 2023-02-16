import { Link } from "react-router-dom";
import { Rating } from "@material-ui/lab";
import { addItemsToCart } from "../../actions/cartAction";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import "./ProductCard.css";
import { addItemsToWishList } from "../../actions/wishlistAction";
import { useEffect, useState } from "react";

const ProductCard = ({ product }) => {

  const { cartItems } = useSelector((state) => state.cart);

  const { wishListItems } = useSelector((state) => state.wishList);

  const [wishedItemStatus, setWishedItemStatus] = useState("");

  const dispatch = useDispatch();
  const alert = useAlert();
  let quantity = 1;

  let createdDate = new Date(product.createdAt).getMonth() + 1 + '/' + new Date(product.createdAt).getDate() + '/' + new Date(product.createdAt).getFullYear();

  let todayDate = new Date().getMonth() + 1 + '/' + new Date().getDate() + '/' + new Date().getFullYear();

  let Difference_In_Time = new Date(todayDate).getTime() - new Date(createdDate).getTime();

  let Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
  // console.log(Difference_In_Days);

  const addToCartHandler = () => {
    cartItems.find(item => {
      if (item.product === product._id) {
        quantity = item.quantity + 1
        return quantity
      }
      return ''
    });

    dispatch(addItemsToCart(product._id, quantity)); //3

    alert.success("Item Added To Cart");

  };

  const addToWishListHandler = () => {
    dispatch(addItemsToWishList(product._id)); //3
    alert.success("Item Added To Wish List");
    // setWishedItemStatus("wishedItem");
  }

  const options = {
    value: product.ratings,
    readOnly: true,
    precision: 0.5,
  };



  return (

    <div className="single-product" key={product._id}>
      <div className="product-image">
        <img src={product.images[0].url} alt={product.name} />
        {product.discount > 0 && <span className="sale-tag"> - {((product.discount / product.price) * 100).toFixed()} % </span>}
        {((Difference_In_Days < 7 && product.discount < 0) || (product.discount === undefined)) &&
          <span className="new-tag">New</span>
        }
        <span className={`wishlist ${wishedItemStatus}`}>
          <button onClick={addToWishListHandler}><i className="lni lni-heart "></i></button>
        </span>

        <div className="button">
          <span onClick={addToCartHandler} className="btn"><i className="lni lni-cart"></i> Add to Cart</span>
        </div>
      </div>
      <div className="product-info">
        <span className="category">{product.category}</span>
        <h4 className="title">
          <Link className="productCard" to={`/product/${product._id}`}>{product.name}</Link>
        </h4>
        <ul className="review">
          <Rating {...options} />

          <li><span>{product.numOfReviews} Review(s)</span></li>
        </ul>
        <div className="price">
          <span>{`₹${product.price}`}</span>
        </div>
      </div>
    </div >



  );
};

export default ProductCard;
