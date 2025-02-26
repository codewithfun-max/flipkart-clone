import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  InputBase,
  IconButton,
  Menu,
  MenuItem,
  Button,
  Box,
  Container,
  Grid,
  Divider,
} from "@mui/material";
import { Search, ShoppingCart, AccountCircle, ExpandMore } from "@mui/icons-material";
import { styled } from "@mui/system";

const StyledToolbar = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between",
});

const SearchBox = styled("div")({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "#f1f3f6",
  padding: "5px 5px",
  borderRadius: "4px",
  width:"400px"
});

const Footer = styled(Box)({
  backgroundColor: "#172337",
  color: "white",
  padding: "40px 0",
  textAlign: "center",
  width: "100%",
  position: "fixed",
  bottom: 0,
  left: 0,
  boxShadow: "0 -2px 10px rgba(0, 0, 0, 0.2)",
});

const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [categoryEl, setCategoryEl] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLoginClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCategoryClick = (event) => {
    setCategoryEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setCategoryEl(null);
  };

  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: "#2874F0" }}>
        <StyledToolbar>
          {/* Logo */}
          <Typography variant="h6" sx={{ cursor: "pointer" }}>Flipkart</Typography>

          {/* Search Bar */}
          <SearchBox>
            <InputBase placeholder="Search for products, brands and more..." sx={{ width: "300px" }} />
            <IconButton>
              <Search sx={{ color: "#2874F0" }} />
            </IconButton>
          </SearchBox>

          {/* Categories Dropdown */}
          <Button
            color="inherit"
            endIcon={<ExpandMore />}
            onClick={handleCategoryClick}
          >
            Categories
          </Button>
          <Menu anchorEl={categoryEl} open={Boolean(categoryEl)} onClose={handleClose}>
            <MenuItem onClick={handleClose}>Electronics</MenuItem>
            <MenuItem onClick={handleClose}>Fashion</MenuItem>
            <MenuItem onClick={handleClose}>Home & Furniture</MenuItem>
            <MenuItem onClick={handleClose}>Sports</MenuItem>
          </Menu>

          {/* Login Dropdown */}
          {isLoggedIn ? (
            <Button
              color="inherit"
              startIcon={<AccountCircle />}
              endIcon={<ExpandMore />}
              onClick={handleLoginClick}
            >
              My Account
            </Button>
          ) : (
            <Button
              color="inherit"
              startIcon={<AccountCircle />}
              onClick={handleLoginClick}
            >
              Login
            </Button>
          )}
          <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
            {isLoggedIn ? (
              <>
                <MenuItem onClick={handleClose}>My Profile</MenuItem>
                <MenuItem onClick={handleClose}>Orders</MenuItem>
                <MenuItem onClick={handleClose}>Wishlist</MenuItem>
                <MenuItem onClick={handleClose}>Logout</MenuItem>
              </>
            ) : (
              <>
                <MenuItem onClick={handleClose}>Login</MenuItem>
                <MenuItem onClick={handleClose}>Sign Up</MenuItem>
              </>
            )}
          </Menu>

          {/* Cart Icon */}
          <IconButton color="inherit">
            <ShoppingCart />
          </IconButton>
        </StyledToolbar>
      </AppBar>

      {/* Footer Section */}
      <Footer>
        <Container>
          <Grid container spacing={3} justifyContent="center">
            <Grid item xs={12} sm={3}>
              <Typography variant="h6">About Us</Typography>
              <Typography variant="body2">Company Info</Typography>
              <Typography variant="body2">Careers</Typography>
              <Typography variant="body2">Press</Typography>
              <Typography variant="body2">Investor Relations</Typography>
            </Grid>
            <Grid item xs={12} sm={3}>
              <Typography variant="h6">Customer Care</Typography>
              <Typography variant="body2">Help Center</Typography>
              <Typography variant="body2">Returns</Typography>
              <Typography variant="body2">Shipping Info</Typography>
              <Typography variant="body2">Track Order</Typography>
            </Grid>
            <Grid item xs={12} sm={3}>
              <Typography variant="h6">Policies</Typography>
              <Typography variant="body2">Privacy Policy</Typography>
              <Typography variant="body2">Terms & Conditions</Typography>
              <Typography variant="body2">Security</Typography>
              <Typography variant="body2">Payment Options</Typography>
            </Grid>
            <Grid item xs={12} sm={3}>
              <Typography variant="h6">Social Media</Typography>
              <Typography variant="body2">Facebook</Typography>
              <Typography variant="body2">Twitter</Typography>
              <Typography variant="body2">Instagram</Typography>
              <Typography variant="body2">YouTube</Typography>
            </Grid>
          </Grid>
          <Divider sx={{ backgroundColor: "#ffffff30", margin: "20px 0" }} />
          <Typography variant="body2">© 2025 Flipkart Clone. All rights reserved.</Typography>
          <Typography variant="body2">Secure Payment Options Available</Typography>
        </Container>
      </Footer>
    </>
  );
};

export default Navbar;
