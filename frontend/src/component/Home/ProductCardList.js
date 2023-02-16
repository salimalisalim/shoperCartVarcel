import React from 'react'
import { Link } from "react-router-dom";
import { Rating } from "@material-ui/lab";
import { addItemsToCart } from "../../actions/cartAction";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import "./ProductCard.css";

const ProductCardList = ({ product }) => {
  const { cartItems } = useSelector((state) => state.cart);

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

  const options = {
    value: product.ratings,
    readOnly: true,
    precision: 0.5,
  };
  return (

    <div className="single-product" key={product._id}>
      <div className="row align-items-center">
        <div className="col-lg-4 col-md-4 col-12">
          <div className="product-image">
            <img src={product.images[0].url} alt={product.name} />
            {product.discount > 0 && <span className="sale-tag"> - {((product.discount / product.price) * 100).toFixed()} % </span>}
            {((Difference_In_Days < 7 && product.discount < 0) || (product.discount === undefined)) &&
              <span className="new-tag">New</span>
            }
            <div className="button">
              <span onClick={addToCartHandler} className="btn"><i className="lni lni-cart"></i> Add to Cart</span>
            </div>
          </div>
        </div>
        <div className="col-lg-8 col-md-8 col-12">
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
        </div>
      </div>


    </div >



  );
}

export default ProductCardList