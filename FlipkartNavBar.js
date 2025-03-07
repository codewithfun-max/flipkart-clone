import React, { useState, useContext } from "react";
import { FaHeart, FaShoppingCart } from "react-icons/fa";
import { CartContext } from "../components/CartContext";
import { Navbar, Nav, Form, FormControl, Button, Container, Row, Col } from "react-bootstrap";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import { Link } from "react-router-dom";
import "slick-carousel/slick/slick-theme.css";
import "./styles.css";
import { useNavigate } from "react-router-dom";


const FlipkartNavBar = ({product}) => {
  const navigate = useNavigate();

    const [cartCount, setCartCount] = useState(3); // Replace with actual cart count from state
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
  };
  const { cart } = useContext(CartContext);
  const { addToCart } = useContext(CartContext);


  return (
    <>
      {/* Navbar */}
      <Navbar bg="primary" variant="dark" expand="lg" className="px-4">
        <Navbar.Brand href="#" className="fw-bold">
          Flipkart
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Form className="d-flex mx-auto w-50">
            <FormControl type="search" placeholder="Search for products, brands and more" className="me-2" />
            <Button variant="warning">Search</Button>
          </Form>
          <Nav>
            <Nav.Link href="#">Login</Nav.Link>
            <Nav.Link href="#">Become a Seller</Nav.Link>
            <Link to="/cart" className="cart-icon">
        <FaShoppingCart />
        {cart.length > 0 && <span className="cart-count">{cart.length}</span>}
      </Link>
            <Nav.Link onClick={() => navigate("/wishlist")}>
  <FaHeart className="wishlist-icon" /> Wishlist
</Nav.Link>


          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <div className="hero-container">
      {/* Banner Carousel */}
      <Slider {...settings} className="banner-slider">
        <div>
          <img src="https://t4.ftcdn.net/jpg/02/49/50/15/360_F_249501541_XmWdfAfUbWAvGxBwAM0ba2aYT36ntlpH.jpg" alt="Sale Banner" className="banner-image" />
        </div>
        <div>
          <img src="https://img.freepik.com/premium-psd/black-friday-sale-social-media-post-instagram-post-web-banner-facebook-cover-template_220443-1074.jpg?semt=ais_hybrid" alt="Electronics Offer" className="banner-image" />
        </div>
        <div>
          <img src="https://www.shutterstock.com/image-vector/3d-shopping-sale-promotion-banner-260nw-2056851833.jpg" alt="Fashion Sale" className="banner-image" />
        </div>
      </Slider>

      {/* Promotional Cards */}
      <div className="promo-section">
        <div className="promo-card">
          <img src="https://i.gadgets360cdn.com/large/1200x800_7_1681881931663.png" alt="Electronics" />
          <p>Electronics Deals</p>
        </div>
        <div className="promo-card">
          <img src="https://i.ytimg.com/vi/Nnmb6l7ugag/maxresdefault.jpg" alt="Fashion" />
          <p>Latest Fashion</p>
        </div>
        <div className="promo-card">
          <img src="https://cdn.vox-cdn.com/thumbor/XjsBf1Kxn7OeIV16PU-3VbHTY0E=/0x0:1800x1160/1200x0/filters:focal(0x0:1800x1160):no_upscale()/cdn.vox-cdn.com/uploads/chorus_asset/file/8616869/SummerHomeEssentials_Indoor_numbers.jpg" alt="Home Essentials" />
          <p>Home Essentials</p>
        </div>
        <div className="promo-card">
          <img src="https://www.imarcgroup.com/blogs/files/9c231125-5ad6-47d8-b27e-649a7bd7d3cf4146405b7d604dd685dd58481e293e0canyjson_converter.webp" alt="Appliances" />
          <p>Best Appliances</p>
        </div>
      </div>
      <p>Find the best deals on Electronics, Fashion, and more!</p>
      <button className="view-products-btn" onClick={() => navigate("/products")}>
        View Products
      </button>
    </div>
   
     {/* Floating Cart Icon */}
      <div className="floating-cart">
        <button className="cart-button" >
          <FaShoppingCart size={24} />
        </button>
      </div>
      {/* Footer */}
      <footer className="bg-dark text-white pt-4 pb-2">
      <Container>
        <Row>
          {/* About Section */}
          <Col md={2} sm={6}>
            <h6 className="fw-bold">ABOUT</h6>
            <ul className="list-unstyled">
              <li><a href="#" className="text-white text-decoration-none">Contact Us</a></li>
              <li><a href="#" className="text-white text-decoration-none">About Us</a></li>
              <li><a href="#" className="text-white text-decoration-none">Careers</a></li>
              <li><a href="#" className="text-white text-decoration-none">Flipkart Stories</a></li>
              <li><a href="#" className="text-white text-decoration-none">Press</a></li>
            </ul>
          </Col>

          {/* Help Section */}
          <Col md={2} sm={6}>
            <h6 className="fw-bold">HELP</h6>
            <ul className="list-unstyled">
              <li><a href="#" className="text-white text-decoration-none">Payments</a></li>
              <li><a href="#" className="text-white text-decoration-none">Shipping</a></li>
              <li><a href="#" className="text-white text-decoration-none">Cancellation</a></li>
              <li><a href="#" className="text-white text-decoration-none">Returns</a></li>
              <li><a href="#" className="text-white text-decoration-none">FAQ</a></li>
            </ul>
          </Col>

          {/* Consumer Policy */}
          <Col md={2} sm={6}>
            <h6 className="fw-bold">CONSUMER POLICY</h6>
            <ul className="list-unstyled">
              <li><a href="#" className="text-white text-decoration-none">Return Policy</a></li>
              <li><a href="#" className="text-white text-decoration-none">Terms of Use</a></li>
              <li><a href="#" className="text-white text-decoration-none">Security</a></li>
              <li><a href="#" className="text-white text-decoration-none">Privacy</a></li>
              <li><a href="#" className="text-white text-decoration-none">Sitemap</a></li>
            </ul>
          </Col>

          {/* Social Section */}
          <Col md={2} sm={6}>
            <h6 className="fw-bold">SOCIAL</h6>
            <ul className="list-unstyled">
              <li><a href="#" className="text-white text-decoration-none">Facebook</a></li>
              <li><a href="#" className="text-white text-decoration-none">Twitter</a></li>
              <li><a href="#" className="text-white text-decoration-none">YouTube</a></li>
              <li><a href="#" className="text-white text-decoration-none">Instagram</a></li>
            </ul>
          </Col>

          {/* Mail Us */}
          <Col md={2} sm={6}>
            <h6 className="fw-bold">Mail Us</h6>
            <p className="small">Flipkart Internet Private Limited, <br/> Buildings Alyssa, <br/> Bengaluru, Karnataka, <br/> India - 560103</p>
          </Col>

          {/* Registered Address */}
          <Col md={2} sm={6}>
            <h6 className="fw-bold">Registered Office Address</h6>
            <p className="small">Flipkart Internet Private Limited, <br/> Buildings Alyssa, <br/> Bengaluru, Karnataka, <br/> India - 560103</p>
          </Col>
        </Row>

        {/* Bottom Bar */}
        <hr className="bg-light" />
        <Row className="text-center">
          <Col md={6} className="text-start">
            <p className="mb-0 small">© 2025 Flipkart Clone. All Rights Reserved.</p>
          </Col>
          <Col md={6} className="text-end">
            <p className="mb-0 small">
              <a href="#" className="text-white text-decoration-none">Terms & Conditions</a> | 
              <a href="#" className="text-white text-decoration-none"> Privacy Policy</a>
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
    

    </>
  );
};

export default FlipkartNavBar;
