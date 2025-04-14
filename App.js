import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FlipkartNavBar from "./components/FlipkartNavBar";
import ProductList from "./components/ProductList";
import { CartProvider } from "./components/CartContext"; 
import Wishlist from "./components/Wishlist";
import CartPage from "./components/CartPage";
import ProductDetails from "./components/ProductDetails";
import Login from "./components/Login";
import Signup from "./components/Signup";
import OrderHistory from "./components/OrderHistory";
import Checkout from "./components/Checkout";
import AdminDashboard from "./components/AdminDashboard";
import ManageProducts from "./components/ManageProducts";
import AdminLogin from "./components/AdminLogin";
import PrivateRoute from "./components/PrivateRoute";
import "bootstrap/dist/css/bootstrap.min.css";
import ManageUsers from "./components/ManageUsers";
import ManageOrders from "./components/ManageOrders";
import ManageAdmins from "./components/ManageAdmins";

function App() {
  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/" element={<FlipkartNavBar />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/orders" element={<OrderHistory />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          
          {/* Protect Admin Routes */}
          <Route path="/admin" element={<PrivateRoute><AdminDashboard /></PrivateRoute>} />
          <Route path="/admin/products" element={<PrivateRoute><ManageProducts /></PrivateRoute>} />
          <Route path="/admin/orders" element={<PrivateRoute><ManageOrders/></PrivateRoute>} />
          <Route path="/admin/users" element={<PrivateRoute><ManageUsers/></PrivateRoute>} />
          <Route path="/admin/admins" element={<PrivateRoute><ManageAdmins/></PrivateRoute>} />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
