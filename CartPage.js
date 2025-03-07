import React, { useContext } from "react";
import { CartContext } from "./CartContext";
import { FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./styles.css"; // Import the new CSS file

const CartPage = () => {
  const { cart, removeFromCart, updateQuantity } = useContext(CartContext);

  // Calculate Total Price
  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="cart-container">
      <h2>Your Shopping Cart</h2>

      {cart.length === 0 ? (
        <p className="empty-cart">
          Your cart is empty. <Link to="/products" className="shop-link">Continue Shopping</Link>
        </p>
      ) : (
        <>
          <div className="cart-items">
            {cart.map((item) => (
              <div key={item.id} className="cart-item">
                <img src={item.image} alt={item.name} className="cart-image" />
                
                <div className="cart-item-details">
                  <h3>{item.name}</h3>
                  <p className="cart-price">₹{item.price.toLocaleString()}</p>
                  
                  <div className="cart-quantity">
                    <button className="quantity-btn" onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                    <span className="quantity">{item.quantity}</span>
                    <button className="quantity-btn" onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                  </div>
                </div>

                <button className="remove-btn" onClick={() => removeFromCart(item.id)}>
                  <FaTrash />
                </button>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h3>Total: ₹{totalPrice.toLocaleString()}</h3>
            <Link to="/checkout" className="checkout-btn">Proceed to Checkout</Link>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;
