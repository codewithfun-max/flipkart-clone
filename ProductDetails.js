import React, { useState } from "react";
import { useParams } from "react-router-dom";
import "./styles.css";
import Reviews from "./Reviews";
import { FaStar } from "react-icons/fa";
import { Button, Modal, Form } from "react-bootstrap";


const productsData = [
  { id: 1, name: "iPhone 14", price: 79999, rating: 4.5, category: "Electronics", image: "/images/iphone.jpg", description: "The latest iPhone 14 with A16 Bionic chip and 48MP camera." },
  { id: 2, name: "Nike Sneakers", price: 4999, rating: 4.2, category: "Fashion", image: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/d130fcfa-7169-4172-8955-bf39cc544527/NIKE+VOMERO+18.png", description: "Comfortable and stylish Nike running shoes." },
  { id: 3, name: "Samsung TV", price: 35999, rating: 4.6, category: "Electronics", image: "/images/tv.jpg", description: "Ultra HD Samsung Smart TV with amazing picture quality." },
];

const ProductDetails = () => {
  const [newReview, setNewReview] = useState({ name: "", rating: 5, comment: "" });
  const [showModal, setShowModal] = useState(false);
  const [reviews, setReviews] = useState([
    { name: "John Doe", rating: 5, comment: "Great product!" },
    { name: "Jane Smith", rating: 4, comment: "Value for money!" },
  ]);

  const { id } = useParams();
  const product = productsData.find((p) => p.id === parseInt(id));

  if (!product) {
    return <h2>Product not found</h2>;
  }

 
  

  const handleSubmitReview = () => {
    if (newReview.name && newReview.comment) {
      setReviews([...reviews, newReview]);
      setNewReview({ name: "", rating: 5, comment: "" });
      setShowModal(false);
    }
  };


  return (
    <div className="product-details">
      <img src={product.image} alt={product.name} className="details-image" />
      <div className="details-info">
        <h2>{product.name}</h2>
        <p>{product.description}</p>
        <p className="details-price">Price: ₹{product.price}</p>
        {/* Star Rating Display */}
      <div>
        {Array(5)
          .fill()
          .map((_, index) => (
            <FaStar key={index} color={index < 4 ? "gold" : "gray"} />
          ))}
      </div>

      {/* Reviews Section */}
      <Reviews reviews={reviews} />

      {/* Write a Review Button */}
      <Button variant="primary" onClick={() => setShowModal(true)} className="mt-3">
        Write a Review
      </Button>

      {/* Review Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Write a Review</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={newReview.name}
                onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Rating</Form.Label>
              <Form.Control
                as="select"
                value={newReview.rating}
                onChange={(e) => setNewReview({ ...newReview, rating: Number(e.target.value) })}
              >
                {[5, 4, 3, 2, 1].map((num) => (
                  <option key={num} value={num}>
                    {num} Stars
                  </option>
                ))}
              </Form.Control>
            </Form.Group>

            <Form.Group>
              <Form.Label>Comment</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={newReview.comment}
                onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSubmitReview}>
            Submit Review
          </Button>
        </Modal.Footer>
      </Modal>
    </div>

        <button className="add-to-cart-btn">Add to Cart</button>
      </div>
    
  );
};

export default ProductDetails;