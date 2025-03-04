import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FlipkartNavBar from "./components/FlipkartNavBar";
import ProductList from "./components/ProductList";
import ProductCard from "./components/ProductCard";
import ProductDetails from "./components/ProductDetails";
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<FlipkartNavBar />} />
          <Route path="/nabvar" element={<FlipkartNavBar />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/products-card" element={<ProductCard />} />
          <Route path="/product/:id" element={<ProductDetails />} />
        </Routes>
    </Router>
  );
}

export default App;
