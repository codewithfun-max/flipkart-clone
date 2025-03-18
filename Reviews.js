import React from "react";
import { FaStar } from "react-icons/fa";

const Reviews = ({ reviews }) => {
  return (
    <div className="mt-4">
      <h4>Customer Reviews</h4>
      {reviews.length === 0 ? <p>No reviews yet. Be the first to review!</p> : null}

      {reviews.map((review, index) => (
        <div key={index} className="border p-3 mb-2">
          <h5>{review.name}</h5>
          <div>
            {Array(5)
              .fill()
              .map((_, idx) => (
                <FaStar key={idx} color={idx < review.rating ? "gold" : "gray"} />
              ))}
          </div>
          <p>{review.comment}</p>
        </div>
      ))}
    </div>
  );
};

export default Reviews;
