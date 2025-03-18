import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Container, Alert } from "react-bootstrap";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const dummyUser = {
    email: "user@example.com",
    password: "password123",
    name: "John Doe",
  };

  const handleLogin = (e) => {
    e.preventDefault();
    
    console.log("Entered Email:", email);
    console.log("Entered Password:", password);
    
    const storedUser = JSON.parse(localStorage.getItem("user")) || dummyUser;
    
    console.log("Stored User Email:", storedUser.email);
    console.log("Stored User Password:", storedUser.password);
    
    // Trim email to prevent leading/trailing spaces
    if (email.trim() === storedUser.email && password === storedUser.password) {
      console.log("✅ Login Successful!");
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("user", JSON.stringify(storedUser));
      navigate("/");
    } else {
      console.log("❌ Invalid Credentials!");
      setError("Invalid email or password");
    }
  };
  

  return (
    <Container className="mt-5" style={{ maxWidth: "400px" }}>
      <h2 className="text-center">Login</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleLogin}>
        <Form.Group className="mb-3">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit" className="w-100">
          Login
        </Button>
      </Form>

      <div className="text-center mt-3">
        <a href="/forgot-password">Forgot Password?</a>
      </div>
    </Container>
  );
};

export default Login;
