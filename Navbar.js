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
  Card,
  CardMedia,
  CardContent,
} from "@mui/material";
import {
  Search,
  ShoppingCart,
  AccountCircle,
  ExpandMore,
  Facebook,
  Twitter,
  Instagram,
  YouTube,
  CreditCard,
  Payment,
  LocalPhone,
  Email,
} from "@mui/icons-material";
import { styled } from "@mui/system";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

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

const HeroSection = styled(Box)({
  width: "100%",
  maxHeight: "300px",
  overflow: "hidden",
});

const PromotionalSection = styled(Box)({
  padding: "40px 0",
  textAlign: "center",
});

const Footer = styled(Box)({
  backgroundColor: "#172337",
  color: "white",
  padding: "40px 0",
  textAlign: "center",
  width: "100%",
  position: "relative",
  bottom: 0,
  left: 0,
});

const banners = [
  "https://static.vecteezy.com/system/resources/thumbnails/002/006/774/small/paper-art-shopping-online-on-smartphone-and-new-buy-sale-promotion-backgroud-for-banner-market-ecommerce-free-vector.jpg",
  "https://t3.ftcdn.net/jpg/04/65/46/52/360_F_465465254_1pN9MGrA831idD6zIBL7q8rnZZpUCQTy.jpg",
  "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/grocery-sale-retail-or-e-commerce-banner-ad-design-template-67720435bb809be27f46dfb1dd44c6fa_screen.jpg?ts=1606113265",
];

const promotions = [
  { title: "Electronics", image: "https://miro.medium.com/v2/resize:fit:940/1*Otr7zJvU2IZVeevLOWUMpw.png" },
  { title: "Fashion", image: "https://www.shutterstock.com/image-photo/clothes-on-clothing-hanger-600nw-2338282257.jpg" },
  { title: "Home Essentials", image: "https://velanstore.com/wp-content/uploads/2024/07/home-needs-and-tools1-800x800.jpeg" },
];

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

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
  };

  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: "#2874F0" }}>
        <StyledToolbar>
          <Typography variant="h6" sx={{ cursor: "pointer" }}>Flipkart</Typography>
          <SearchBox>
            <InputBase placeholder="Search for products, brands and more..." sx={{ width: "300px" }} />
            <IconButton>
              <Search sx={{ color: "#2874F0" }} />
            </IconButton>
          </SearchBox>
          <Button color="inherit" endIcon={<ExpandMore />} onClick={handleCategoryClick}>Categories</Button>
          <Menu anchorEl={categoryEl} open={Boolean(categoryEl)} onClose={handleClose}>
            <MenuItem onClick={handleClose}>Electronics</MenuItem>
            <MenuItem onClick={handleClose}>Fashion</MenuItem>
            <MenuItem onClick={handleClose}>Home & Furniture</MenuItem>
            <MenuItem onClick={handleClose}>Sports</MenuItem>
          </Menu>
          {isLoggedIn ? (
            <Button color="inherit" startIcon={<AccountCircle />} endIcon={<ExpandMore />} onClick={handleLoginClick}>My Account</Button>
          ) : (
            <Button color="inherit" startIcon={<AccountCircle />} onClick={handleLoginClick}>Login</Button>
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
          <IconButton color="inherit">
            <ShoppingCart />
          </IconButton>
        </StyledToolbar>
      </AppBar>

      {/* Hero Section with Carousel */}
      <HeroSection>
        <Slider {...sliderSettings}>
          {banners.map((banner, index) => (
            <img key={index} src={banner} alt={`Banner ${index + 1}`} width="100%" height="auto" loading="lazy" />
          ))}
        </Slider>
      </HeroSection>

      {/* Promotional Section */}
          {/* Promotional Section */}
    <PromotionalSection>
      <Container>
        <Grid container spacing={3} justifyContent="center">
          {promotions.map((promo, index) => (
            <Grid item xs={12} sm={4} key={index}>
              <Card>
                <CardMedia component="img" height="200" image={promo.image} alt={promo.title} loading="lazy" />
                <CardContent>
                  <Typography variant="h6">{promo.title}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </PromotionalSection>

          {/* Footer Section */}
          <Footer sx={{ backgroundColor: "#172337", color: "white", padding: "50px 0" }}>
        <Container maxWidth="lg">
          <Grid container spacing={5}>
            {/* Column 1: About */}
            <Grid item xs={12} sm={3}>
              <Typography variant="h6" sx={{ fontWeight: "bold", marginBottom: "12px" }}>About</Typography>
              {["Contact Us", "About Us", "Careers", "Flipkart Stories", "Press", "Flipkart Wholesale"].map((text) => (
                <Typography key={text} variant="body2" sx={{ color: "#b0b0b0", cursor: "pointer", padding: "4px 0", "&:hover": { color: "#ffffff" } }}>
                  {text}
                </Typography>
              ))}
            </Grid>

            {/* Column 2: Help */}
            <Grid item xs={12} sm={3}>
              <Typography variant="h6" sx={{ fontWeight: "bold", marginBottom: "12px" }}>Help</Typography>
              {["Payments", "Shipping", "Cancellation", "Returns", "FAQ"].map((text) => (
                <Typography key={text} variant="body2" sx={{ color: "#b0b0b0", cursor: "pointer", padding: "4px 0", "&:hover": { color: "#ffffff" } }}>
                  {text}
                </Typography>
              ))}
            </Grid>

            {/* Column 3: Policy */}
            <Grid item xs={12} sm={3}>
              <Typography variant="h6" sx={{ fontWeight: "bold", marginBottom: "12px" }}>Policies</Typography>
              {["Return Policy", "Terms of Use", "Security", "Privacy", "Sitemap"].map((text) => (
                <Typography key={text} variant="body2" sx={{ color: "#b0b0b0", cursor: "pointer", padding: "4px 0", "&:hover": { color: "#ffffff" } }}>
                  {text}
                </Typography>
              ))}
            </Grid>

            {/* Column 4: Social & Payment */}
            <Grid item xs={12} sm={3} sx={{ textAlign: { xs: "center", sm: "left" } }}>
              <Typography variant="h6" sx={{ fontWeight: "bold", marginBottom: "12px" }}>Connect with Us</Typography>
              <Box sx={{ display: "flex", gap: 1, justifyContent: { xs: "center", sm: "flex-start" } }}>
                <IconButton sx={{ color: "#b0b0b0", "&:hover": { color: "#ffffff" } }}><Facebook /></IconButton>
                <IconButton sx={{ color: "#b0b0b0", "&:hover": { color: "#ffffff" } }}><Twitter /></IconButton>
                <IconButton sx={{ color: "#b0b0b0", "&:hover": { color: "#ffffff" } }}><Instagram /></IconButton>
                <IconButton sx={{ color: "#b0b0b0", "&:hover": { color: "#ffffff" } }}><YouTube /></IconButton>
              </Box>

              <Typography variant="h6" sx={{ fontWeight: "bold", marginTop: "20px" }}>Payment Methods</Typography>
              <Box sx={{ display: "flex", gap: 1, justifyContent: { xs: "center", sm: "flex-start" } }}>
                <CreditCard sx={{ fontSize: 30, color: "#b0b0b0", "&:hover": { color: "#ffffff" } }} />
                <Payment sx={{ fontSize: 30, color: "#b0b0b0", "&:hover": { color: "#ffffff" } }} />
              </Box>
            </Grid>
          </Grid>

          <Divider sx={{ my: 3, backgroundColor: "#ffffff40" }} />

          {/* Copyright & Legal */}
          <Typography variant="body2" sx={{ color: "#b0b0b0", textAlign: "center" }}>
            © 2025 Flipkart. All Rights Reserved. | Designed for learning purposes.
          </Typography>
        </Container>
      </Footer>


    </>
  );
};

export default Navbar;
