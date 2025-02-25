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
  backgroundColor: "#f1f3f6",
  padding: "5px 10px",
  borderRadius: "4px",
});

const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [categoryEl, setCategoryEl] = useState(null);

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
        <Button
          color="inherit"
          startIcon={<AccountCircle />}
          endIcon={<ExpandMore />}
          onClick={handleLoginClick}
        >
          Login
        </Button>
        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
          <MenuItem onClick={handleClose}>My Profile</MenuItem>
          <MenuItem onClick={handleClose}>Orders</MenuItem>
          <MenuItem onClick={handleClose}>Wishlist</MenuItem>
          <MenuItem onClick={handleClose}>Logout</MenuItem>
        </Menu>

        {/* Cart Icon */}
        <IconButton color="inherit">
          <ShoppingCart />
        </IconButton>
      </StyledToolbar>
    </AppBar>
  );
};

export default Navbar;
