import React, { useState } from "react";
import ProductCard from "./ProductCard";
import { useNavigate } from "react-router-dom";
import "./styles.css"; // Your CSS file

const productsData = [
  {
    id: 1,
    name: "iPhone 14",
    price: 79999,
    rating: 4.5,
    category: "Electronics",
    image: "https://inventstore.in/wp-content/uploads/2023/09/2-2.webp", // Replace with actual URL
  },
  {
    id: 2,
    name: "Nike Air Max Sneakers",
    price: 4999,
    rating: 4.2,
    category: "Fashion",
    image: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/d130fcfa-7169-4172-8955-bf39cc544527/NIKE+VOMERO+18.png", // Replace with actual URL
  },
  {
    id: 3,
    name: "Samsung 55\" QLED TV",
    price: 35999,
    rating: 4.6,
    category: "Electronics",
    image: "https://images.samsung.com/is/image/samsung/p6pim/in/ua43t5410akxxl/gallery/in-fhd-t5310-ua43t5410akxxl-532972655?$1300_1038_PNG$", // Replace with actual URL
  },
  {
    id: 4,
    name: "Men's Leather Biker Jacket",
    price: 6999,
    rating: 4.3,
    category: "Fashion",
    image: "https://rukminim2.flixcart.com/image/850/1000/xif0q/jacket/c/u/j/xxl-no-classic-latest-fashion-black-biker-leather-jacket-for-men-original-imagtzbkwz4wjzwb.jpeg?q=90&crop=false", // Replace with actual URL
  },
  {
    id: 5,
    name: "Dell Inspiron 15 Laptop",
    price: 55999,
    rating: 4.4,
    category: "Electronics",
    image: "https://img-prod-cms-rt-microsoft-com.akamaized.net/cms/api/am/imageFileData/RW1geGv?ver=e834&q=90&m=6&h=705&w=1253&b=%23FFFFFFFF&f=jpg&o=f&p=140&aim=true", // Replace with actual URL
  },
  {
    id: 6,
    name: "Beats Studio3 Wireless Headphones",
    price: 19999,
    rating: 4.7,
    category: "Electronics",
    image: "https://media.wired.com/photos/66abec9ccb172c2e5de763bf/master/w_960,c_limit/Edifier-Stax-Spirit-S5-Headphones-Offwhite-Background-SOURCE-Amazon.jpg", // Replace with actual URL
  },
  {
    id: 7,
    name: "Apple Watch Series 7",
    price: 12999,
    rating: 4.5,
    category: "Electronics",
    image: "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/MYJ33ref_VW_34FR+watch-case-40-aluminum-starlight-nc-se_VW_34FR+watch-face-40-aluminum-starlight-se_VW_34FR?wid=752&hei=720&bgc=fafafa&trim=1&fmt=p-jpg&qlt=80&.v=L1VPMlk5ZkpkOVFZR3Fud25vckh4RStGZUJWLzNFUFVydllxZFp0d1M4NktoaXQwYi9wRGFOV2FsZVA1S1dYc3U0MnNvUmFpbmpuWFJpcHZlcmRSWXdScEJ3QjIyVnl6dGRLV0ozWGQvU3RmSGlnNkpTM1NGVHN6YWcySEw0THd4cVNUNDJadDNVSmRncE9SalAvZ24zZmdHMUt6VFlqa3BpV2VBOUNycGdrcDIxSk5peW5HTWQ0c004MmJwMkNtdGl6SHg4ZE5NYmlWSVQ5akRTdGpCYXdFcFI4ZnVKTUUyODRESjZvdEp1NA", // Replace with actual URL
  },
  {
    id: 8,
    name: "Unisex Plain Black T-Shirt",
    price: 499,
    rating: 4.1,
    category: "Fashion",
    image: "https://m.media-amazon.com/images/I/51ED3mVMiVL._AC_UY1100_.jpg", // Replace with actual URL
  },
  {
    id: 9,
    name: "Ray-Ban Aviator Sunglasses",
    price: 1999,
    rating: 4.3,
    category: "Fashion",
    image: "https://funkytradition.com/cdn/shop/files/0_2019-Fashion-Round-Sunglasses-Women-Brand-Designer-Luxury-Metal-Sun-Glasses-Classic-Retro-Outdoor-Eyewear-Oculos_0079d389-153f-48a8-8d3a-928126597c19.jpg?v=1723512244", // Replace with actual URL
  },
  {
    id: 10,
    name: "Nike Sports Backpack",
    price: 2999,
    rating: 4.4,
    category: "Accessories",
    image: "https://m.media-amazon.com/images/I/61uOVUFfX+L._AC_UF894,1000_QL80_.jpg", // Replace with actual URL
  },
  {
    id: 11,
    name: "Canon EOS Rebel T7 DSLR Camera",
    price: 40999,
    rating: 4.6,
    category: "Electronics",
    image: "https://cdn.mos.cms.futurecdn.net/GXHa4PWwDPx7tGQG9MDQvK.jpg", // Replace with actual URL
  },
  {
    id: 12,
    name: "PlayStation 5 Gaming Console",
    price: 49999,
    rating: 4.8,
    category: "Electronics",
    image: "https://oxygendigitalshop.com/media/cache/2500x0/catalog/product/2/6/267452_ipcrdh_1690603224.webp", // Replace with actual URL
  },
  {
    id: 13,
    name: "JBL Flip 5 Bluetooth Speaker",
    price: 6999,
    rating: 4.5,
    category: "Electronics",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQcnP8Qs4001soRYK8ETYQUUQBIuShrYSVBw&s", // Replace with actual URL
  },
  {
    id: 14,
    name: "Fitbit Charge 5 Fitness Tracker",
    price: 9999,
    rating: 4.4,
    category: "Electronics",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdNwf3zYkHPgf_dtqXxmxLS7LvSdbLRCqQhA&s", // Replace with actual URL
  },
  {
    id: 15,
    name: "Samsung Galaxy Tab S7",
    price: 45999,
    rating: 4.6,
    category: "Electronics",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTaY2LrEs62_Ni1XYL80oYhbFEMiaMe3G0qaA&s", // Replace with actual URL
  },
  {
    id: 16,
    name: "Apple AirPods Pro",
    price: 24999,
    rating: 4.7,
    category: "Electronics",
    image: "https://media.wired.com/photos/671577232009d044328f83e0/191:100/w_1280,c_limit/AirPods%20Pro%202%20Abstract%20Background%20102024%20SOURCE%20Apple.jpg", // Replace with actual URL
  },
  {
    id: 17,
    name: "Nixplay 10.1 Inch Smart Digital Photo Frame",
    price: 11999,
    rating: 4.5,
    category: "Electronics",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfkv53_JR8uC6nveu2IcIGPyEKx2kM64AK9w&s", // Replace with actual URL
  },
  {
    id: 18,
    name: "Philips Sonicare Electric Toothbrush",
    price: 5999,
    rating: 4.6,
    category: "Electronics",
    image: "https://m.media-amazon.com/images/I/51fKuOv-qLL.jpg", // Replace with actual URL
  },
  {
    id: 19,
    name: "Anker PowerCore 10000 Portable Charger",
    price: 1999,
    rating: 4.8,
    category: "Electronics",
    image: "https://media.wired.com/photos/6504b2a1afe02332db973557/master/w_960,c_limit/Ugreen_Power_Bank-SOURCE-Ugreen-Gear.jpg", // Replace with actual URL
  },
  {
    id: 20,
    name: "GoPro HERO9 Black 4K Action Camera",
    price: 34999,
    rating: 4.7,
    category: "Electronics",
    image: "https://m.media-amazon.com/images/I/61DcmQm2T+L.jpg", // Replace with actual URL
  },
  {
    id: 21,
    name: "Oculus Quest 2 VR Headset",
    price: 29999,
    rating: 4.6,
    category: "Electronics",
    image: "https://m.media-amazon.com/images/I/71A8gMWDq5L.jpg", // Replace with actual URL
  },
  {
    id: 22,
    name: "Amazon Echo Dot (4th Gen) Smart Speaker",
    price: 4499,
    rating: 4.5,
    category: "Electronics",
    image: "https://rukminim2.flixcart.com/image/850/1000/xif0q/speaker/smart-speaker/d/8/4/echo-dot-3rd-gen-new-and-improved-smart-speaker-black-alexa-original-imagd7qvg7xtnwsj.jpeg?q=20&crop=false", // Replace with actual URL
  },

];
const ProductsPerPage = 8;
const priceRanges = [
  { label: "All Prices", min: 0, max: 10000 },
  { label: "₹100 - ₹400", min: 100, max: 400 },
  { label: "₹400 - ₹1000", min: 400, max: 1000 },
  { label: "₹1000 - ₹5000", min: 1000, max: 5000 },
  { label: "₹5000 - ₹10000", min: 5000, max: 10000 },
];

const ProductList = () => {
  const [filteredProducts, setFilteredProducts] = useState(productsData);
  const [sortOption, setSortOption] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPriceRange, setSelectedPriceRange] = useState(priceRanges[0]); // Default to 'All'

  const navigate = useNavigate();

  // Filter products based on the selected price range
  const filterProducts = () => {
    const { min, max } = selectedPriceRange;

    const updatedProducts = productsData.filter(
      (product) => product.price >= min && product.price <= max
    );

    setFilteredProducts(updatedProducts);
    setCurrentPage(1); // Reset to first page after filtering
  };

  // Filter products by category
  const handleFilter = (category) => {
    const newProducts =
      category === "All"
        ? productsData
        : productsData.filter((product) => product.category === category);

    setFilteredProducts(newProducts);
    setCurrentPage(1); // Reset to first page when filtering
  };

  // Sort products
  const handleSort = (option) => {
    const sortedProducts = [...filteredProducts];

    if (option === "lowToHigh") {
      sortedProducts.sort((a, b) => a.price - b.price);
    } else if (option === "highToLow") {
      sortedProducts.sort((a, b) => b.price - a.price);
    }

    setFilteredProducts(sortedProducts);
    setSortOption(option);
  };

  // Pagination logic
  const totalPages = Math.ceil(filteredProducts.length / ProductsPerPage);
  const indexOfLastProduct = currentPage * ProductsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - ProductsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  return (
    <div className="container">
      <h2 className="section-title">Explore Our Products</h2>

      {/* Filters & Sorting Section */}
      <div className="filters">
        <button className="filter-btn" onClick={() => handleFilter("All")}>All</button>
        <button className="filter-btn" onClick={() => handleFilter("Electronics")}>Electronics</button>
        <button className="filter-btn" onClick={() => handleFilter("Fashion")}>Fashion</button>

        {/* Sort By Dropdown */}
        <select className="sort-dropdown" onChange={(e) => handleSort(e.target.value)} value={sortOption}>
          <option value="">Sort By</option>
          <option value="lowToHigh">Price: Low to High</option>
          <option value="highToLow">Price: High to Low</option>
        </select>

        {/* Price Range Dropdown */}
          <select
            id="priceRange"
            value={selectedPriceRange.label}
            onChange={(e) => {
              const selectedRange = priceRanges.find((range) => range.label === e.target.value);
              setSelectedPriceRange(selectedRange);
            }}
          >
            {priceRanges.map((range, index) => (
              <option key={index} value={range.label}>
                {range.label}
              </option>
            ))}
          </select>
          <button className="apply-btn" onClick={filterProducts}>Apply</button>
        </div>
    

      {/* Product Grid */}
      <div className="product-grid">
        {currentProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Pagination */}
      <div className="pagination">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className={`page-btn ${currentPage === 1 ? "disabled" : ""}`}
        >
          Previous
        </button>
        <span>Page {currentPage} of {totalPages}</span>
        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className={`page-btn ${currentPage === totalPages ? "disabled" : ""}`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ProductList;