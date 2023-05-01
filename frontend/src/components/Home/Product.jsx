import { Link, useLocation } from "react-router-dom";

import ReactStars from "react-rating-stars-component";
import { useEffect } from "react";

// eslint-disable-next-line react/prop-types
const Product = ({ product }) => {

  const {pathname} = useLocation();

  const options = {
    edit: false,
    color: "rgba(20,20,20,0.1)",
    activeColor: "tomato",
    value: product.rating,
    size: window.innerWidth < 600 ? 20 : 25,
    isHalf: true,
  };
  return (
    <Link className="productCard" to={pathname==="/products"?`${pathname}/${product._id}`: `products/${product._id}`}>
      {product.images && product.images.length > 0 && (
        <img src={product.images[0].url} alt="img" />
      )}
      <p>{product.name}</p>
      <div>
        <ReactStars {...options} />{" "}
        <span>{`(${product.numOfReviews}Reviews)`}</span>
      </div>
      <span>{`₹${product.price}`}</span>
    </Link>
  );
};

export default Product;
