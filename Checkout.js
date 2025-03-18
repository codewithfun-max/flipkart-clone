import React, { useState, useContext } from "react";
import { Card, Form, Button, Container, Row, Col } from "react-bootstrap";
import { CartContext } from "../components/CartContext"; // Assuming you're using useContext for the cart

const Checkout = () => {
    const { cart = [] } = useContext(CartContext);

  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phone: "",
    paymentMethod: "Credit Card",
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleOrder = () => {
    alert("Order Placed Successfully!");
  };

  return (
    <Container className="mt-5">
      <Row>
        {/* Checkout Form Section */}
        <Col md={7}>
          <Card className="p-4">
            <h3>Checkout Details</h3>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter your name"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Address</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="Enter your address"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="Enter phone number"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Payment Method</Form.Label>
                <Form.Select name="paymentMethod" value={formData.paymentMethod} onChange={handleInputChange}>
                  <option>Credit Card</option>
                  <option>Debit Card</option>
                  <option>UPI</option>
                  <option>Cash on Delivery</option>
                </Form.Select>
              </Form.Group>
            </Form>
          </Card>
        </Col>

        {/* Order Summary Section */}
        <Col md={5}>
          <Card className="p-4">
            <h3>Order Summary</h3>
            {cart.length === 0 ? (
  <p>Your cart is empty</p>
) : (
  cart.map((item, index) => (
    <div key={index} className="d-flex justify-content-between border-bottom pb-2 mb-2">
      <span>{item.name} (x{item.quantity})</span>
      <span>₹{item.price * item.quantity}</span>
    </div>
  ))
)}

<h4 className="mt-3">Total: ₹{cart.reduce((acc, item) => acc + item.price * item.quantity, 0)}</h4>

            <Button className="mt-3 w-100" variant="success" onClick={handleOrder}>
              Place Order
            </Button>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Checkout;
