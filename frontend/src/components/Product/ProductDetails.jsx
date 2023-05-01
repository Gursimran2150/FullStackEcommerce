import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./productDetails.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductDetail } from "../../slices/productDeatailsSlice";
import { useParams } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import ReviewCard from "./ReviewCard";
import Loader from "../layout/Loader/Loader";
import { addToCart } from "../../slices/cartSlice";

const ProductDetails = () => {

  const [quantity,setQuantity] = useState(1);

  

  const dispatch = useDispatch();
  const productDetails = useSelector((state) => state.productDetails);
  const product = productDetails.product;
  const params = useParams();

  useEffect(() => {
    dispatch(fetchProductDetail(params.id));
  }, [params.id, dispatch]);

  if (productDetails.loading) {
    return <Loader />;
  }
  const increaseQuantity = ()=>{
    if(product.Stock<=quantity) return;

    setQuantity(quantity+1)
  }
  const decreaseQuantity = ()=>{
    if(quantity<=1)return;
    setQuantity(quantity-1)
  }

  //   console.log(product);
  const options = {
    edit: false,
    color: "rgba(20,20,20,0.1)",
    activeColor: "tomato",
    value: product.rating,
    size: window.innerWidth < 600 ? 20 : 25,
    isHalf: true,
  };

  const handleAddToCart = ()=>{
    alert("Added to Cart")
    dispatch(addToCart({
      id:product._id,
      name:product.name,
      price:product.price,
      quantity:quantity,
      image:product.images[0]
    }))
  }


  return (
    <>
      <div className="ProductDetails" style={{ marginTop: "80px" }}>
        <div className="slider-images">
          <ProductCarousel images={product.images} />
        </div>

        <div className="details-product">
          <div className="detailsBlock1">
            <h2>{product.name}</h2>
            <p>Product# {product._id}</p>
          </div>
          <div className="detailsBlock-2">
            <ReactStars {...options} />
            <span>{`(${product.numOfReviews} Reviews)`}</span>
          </div>
          <div className="detailsBlock-3">
            <h1>{`₹${product.price}`}</h1>
            <div className="detailsBlock-3-1">
              <div className="detailsBlock-3-1-1">
                <button onClick={decreaseQuantity}>-</button>
                <input readOnly type="number" value={quantity} />
                <button onClick={increaseQuantity}>+</button>
              </div>
              <button onClick={handleAddToCart}>Add to Cart</button>
            </div>
            <p>
              Status:{" "}
              <b className={product.Stock < 1 ? "redColor" : "greenColor"}>
                {product.Stock < 1 ? "Out of Stock" : "In Stock"}
              </b>
            </p>
          </div>
          <div className="detailsBlock-4">
            Descripton: <p>{product.description}</p>
          </div>
          <button className="submitReview">Submit Review</button>
        </div>
      </div>

      {product.reviews && product.reviews[0] ? (
        <div className="reviews">
          {product.reviews &&
            product.reviews.map((review) => (
              <ReviewCard key={review._id} review={review} />
            ))}
        </div>
      ) : (
        <p className="noReviews">No Reviews Yet</p>
      )}
    </>
  );
};

const ProductCarousel = ({ images = [] }) => {
  const renderIndicator = (onClickHandler, isSelected, index, label) => {
    if (isSelected) {
      return (
        <li
          style={{
            background: "#000000",
            width: "8px",
            height: "8px",
            borderRadius: "50%",
            margin: "0 5px",
            display: "inline-block",
            cursor: "pointer",
          }}
          aria-label={`Selected: ${label} ${index + 1}`}
          title={`Selected: ${label} ${index + 1}`}
        />
      );
    }
    return (
      <li
        style={{
          background: "#cccccc",
          width: "8px",
          height: "8px",
          borderRadius: "50%",
          margin: "0 5px",
          display: "inline-block",
          cursor: "pointer",
        }}
        aria-label={`${label} ${index + 1}`}
        title={`${label} ${index + 1}`}
        onClick={onClickHandler}
      />
    );
  };
  return (
    <Carousel
      showArrows={false}
      showThumbs={false}
      showStatus={false}
      autoPlay={true}
      infiniteLoop={true}
      interval={2000}
      transitionTime={500}
      swipeable={true}
      stopOnHover={true}
      renderIndicator={renderIndicator}
      className="ProductCarousel"
    >
      {images &&
        images.length > 0 &&
        images.map((image, index) => (
          <div key={index}>
            <img
              src={image.url}
              alt={`Product image ${index}`}
              style={{ width: "50%" }}
            />
          </div>
        ))}
    </Carousel>
  );
};

ProductCarousel.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      url: PropTypes.string.isRequired,
    })
  ),
};

export default ProductDetails;
