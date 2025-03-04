import React from "react";
import { FaStar, FaShoppingCart } from "react-icons/fa";
import "./styles.css";

const ProductCard = ({ product, onclick }) => {
  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} loading="lazy" />
      <h3>{product.name}</h3>
      <p className="price">₹{product.price.toLocaleString()}</p>
      <p className="rating">
        <FaStar color="gold" /> {product.rating}
      </p>
      <button className="add-to-cart">
        <FaShoppingCart /> Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
