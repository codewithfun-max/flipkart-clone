import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaTrash, FaShoppingCart } from "react-icons/fa";
import "./styles.css";

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchWishlist = () => {
      const storedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
      setWishlist(storedWishlist);
    };

    fetchWishlist();

    // ✅ Listen for localStorage changes and update wishlist dynamically
    window.addEventListener("storage", fetchWishlist);

    return () => {
      window.removeEventListener("storage", fetchWishlist);
    };
  }, []);


  const removeFromWishlist = (productId) => {
    const updatedWishlist = wishlist.filter((item) => item.id !== productId);
    setWishlist(updatedWishlist);
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
  };

  return (
    <div className="wishlist-container">
      <h2>My Wishlist</h2>
      {wishlist.length === 0 ? (
        <p>Your wishlist is empty.</p>
      ) : (
        <div className="wishlist-grid">
          {wishlist.map((product) => (
            <div key={product.id} className="wishlist-item">
              <img src={product.image} alt={product.name} loading="lazy" />
              <h3>{product.name}</h3>
              <p>₹{product.price.toLocaleString()}</p>
              <div className="wishlist-actions">
                <button onClick={() => removeFromWishlist(product.id)} className="remove-btn">
                  <FaTrash />
                </button>
                <button onClick={() => navigate(`/product/${product.id}`)} className="view-btn">
                  View Product
                </button>
                <button className="add-to-cart">
                  <FaShoppingCart />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
