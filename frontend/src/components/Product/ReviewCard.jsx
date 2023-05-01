import ReactStars from "react-rating-stars-component";
const ReviewCard = ({ review }) => {
  const options = {
    edit: false,
    color: "rgba(20,20,20,0.1)",
    activeColor: "tomato",
    value: review.rating,
    size: window.innerWidth < 600 ? 20 : 25,
    isHalf: true,
  };
  return (
    <div className="reviewCard">
      <img
        src={
          "https://raw.githubusercontent.com/meabhisingh/mernProjectEcommerce/master/frontend/src/images/Profile.png"
        }
        alt="user"
      />
      <p>{review.name}</p>
      <ReactStars {...options} />
      <span>{review.comment}</span>
    </div>
  );
};

export default ReviewCard;
