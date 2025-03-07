import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { FaStar, FaShoppingCart, FaHeart } from "react-icons/fa";
import { CartContext } from "../components/CartContext";
import "./styles.css";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { cart, addToCart, updateQuantity } = useContext(CartContext);
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const storedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    setWishlist(storedWishlist);
  }, []);

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  const toggleWishlist = (product) => {
    const isWishlisted = wishlist.some((item) => item.id === product.id);
    if (isWishlisted) {
      setWishlist(wishlist.filter((item) => item.id !== product.id));
    } else {
      setWishlist([...wishlist, product]);
    }
  };

  const handleAddToCart = () => {
    const existingProduct = cart.find((item) => item.id === product.id);
    if (existingProduct) {
      updateQuantity(product.id, existingProduct.quantity + 1);
    } else {
      addToCart({ ...product, quantity: 1 });
    }
  };

  const isWishlisted = wishlist.some((item) => item.id === product.id);
  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} loading="lazy" />
      <h3>{product.name}</h3>
      <p className="price">₹{product.price.toLocaleString()}</p>
      <p className="rating">
        <FaStar color="gold" /> {product.rating}
      </p>

      <div className="product-actions">
        <button className="add-to-cart" onClick={() => addToCart(product)}>
          <FaShoppingCart />
        </button>
        <button className="view-product" onClick={() => navigate(`/product/${product.id}`)}>
          View product
        </button>
        <button className="wishlist-btn" onClick={() => toggleWishlist(product)}>
          <FaHeart color={wishlist.some((item) => item.id === product.id) ? "red" : "#fffff"} />
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
