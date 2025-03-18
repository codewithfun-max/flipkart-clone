import { useState } from 'react';
import ProductDetails from './ProductDetails';

const WriteReview = ({ onSubmit }) => {
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(0);

  const handleSubmit = () => {
    onSubmit({ user: 'User', comment, rating });
    setComment('');
    setRating(0);
  };

  return (
    <div>
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Write your review"
      />
      <ProductDetails onRate={setRating} />
      <button onClick={handleSubmit}>Submit Review</button>
    </div>
  );
};

export default WriteReview;
