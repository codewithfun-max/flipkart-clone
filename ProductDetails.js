import React from "react";
import { useParams } from "react-router-dom";
import "./styles.css";

const productsData = [
  { id: 1, name: "iPhone 14", price: 79999, rating: 4.5, category: "Electronics", image: "/images/iphone.jpg", description: "The latest iPhone 14 with A16 Bionic chip and 48MP camera." },
  { id: 2, name: "Nike Sneakers", price: 4999, rating: 4.2, category: "Fashion", image: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/d130fcfa-7169-4172-8955-bf39cc544527/NIKE+VOMERO+18.png", description: "Comfortable and stylish Nike running shoes." },
  { id: 3, name: "Samsung TV", price: 35999, rating: 4.6, category: "Electronics", image: "/images/tv.jpg", description: "Ultra HD Samsung Smart TV with amazing picture quality." },
];

const ProductDetails = () => {
  const { id } = useParams();
  const product = productsData.find((p) => p.id === parseInt(id));

  if (!product) {
    return <h2>Product not found</h2>;
  }

  return (
    <div className="product-details">
      <img src={product.image} alt={product.name} className="details-image" />
      <div className="details-info">
        <h2>{product.name}</h2>
        <p>{product.description}</p>
        <p className="details-price">Price: ₹{product.price}</p>
        <button className="add-to-cart-btn">Add to Cart</button>
      </div>
    </div>
  );
};

export default ProductDetails;
