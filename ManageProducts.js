import React, { useState, useEffect } from "react";
import { Button, Modal, Form, Toast, ToastContainer } from "react-bootstrap";
import { FaEdit, FaTrash, FaTag } from "react-icons/fa"; // Import icons
import "./styles.css"; // Import CSS file for custom styling
import axios from 'axios';
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const [isBulkDeleteMode, setIsBulkDeleteMode] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState([]);
  

  const [show, setShow] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [search, setSearch] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [sortBy, setSortBy] = useState("");
const [sortOrder, setSortOrder] = useState("asc");
const [darkMode, setDarkMode] = useState(false);
const toggleDarkMode = () => setDarkMode(!darkMode);

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    stock: "",
    category: "",
    imageUrl: "",
    imageFile: null, // <- if using file upload
  });
  const [categoryFilter, setCategoryFilter] = useState("");
const [stockFilter, setStockFilter] = useState("");

const [currentPage, setCurrentPage] = useState(1);
const itemsPerPage = 6; // Customize this as needed
const filteredProducts = products
  .filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase()) &&
    (categoryFilter === "" || product.category.toLowerCase().includes(categoryFilter.toLowerCase())) &&
    (stockFilter === "" || parseInt(product.stock) <= parseInt(stockFilter))
  );

const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
const sortedProducts = [...filteredProducts].sort((a, b) => {
  if (sortBy) {
    const valA = a[sortBy];
    const valB = b[sortBy];

    if (typeof valA === "string") {
      return sortOrder === "asc"
        ? valA.localeCompare(valB)
        : valB.localeCompare(valA);
    } else {
      return sortOrder === "asc" ? valA - valB : valB - valA;
    }
  }
  return 0;
});

const paginatedProducts = sortedProducts.slice(
  (currentPage - 1) * itemsPerPage,
  currentPage * itemsPerPage
);


  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Failed to fetch products", err));
  }, []);
  
// Delete product
const handleDelete = async (id) => {
  try {
    await axios.delete(`http://localhost:5000/api/products/${id}`);
    fetchProducts(); // Refresh product list after deletion
    setShowDeleteModal(false); // Close modal
  } catch (err) {
    console.error('Error deleting product:', err);
  }
};

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const [csvFile, setCsvFile] = useState(null);

  
  const handleSave = () => {
  const isEditing = editingProduct !== null;
  const method = isEditing ? "PUT" : "POST";
  const url = isEditing
    ? `http://localhost:5000/api/products/${products[editingProduct].id}`
    : "http://localhost:5000/api/products";

  const data = new FormData();
  data.append("name", formData.name);
  data.append("price", formData.price);
  data.append("stock", formData.stock || 0);
  data.append("category", formData.category);

  // Only append image if a new file was selected
  if (formData.imageFile) {
    data.append("image", formData.imageFile);
  }

  axios({
    method,
    url,
    data,
    headers: { "Content-Type": "multipart/form-data" }, // Important for file upload
  })
    .then(() => {
      fetchProducts(); // Refresh list
      setShowToast(true);
      handleClose();
    })
    .catch((err) => console.error("Error saving product", err));
};

const handleDeleteConfirm = (id) => {
  setDeleteIndex(id); // Store ID instead of index
  setShowDeleteModal(true);
};

const handleFileChange = (e) => {
    setCsvFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!csvFile) {
      alert("Please select a CSV file.");
      return;
    }

    const formData = new FormData();
    formData.append("file", csvFile);

    try {
      await axios.post("http://localhost:5000/api/products/import", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("CSV uploaded successfully!");
      fetchProducts(); // Refresh product list
    } catch (err) {
      console.error("Error uploading CSV:", err);
      alert("Failed to upload CSV.");
    }
  };
  const handleCheckboxChange = (productId) => {
    setSelectedProducts((prevSelected) =>
      prevSelected.includes(productId)
        ? prevSelected.filter((id) => id !== productId)
        : [...prevSelected, productId]
    );
  };
  
  const isSelected = (id) => selectedProducts.includes(id);
  
  const handleDeleteSelected = async () => {
    if (selectedProducts.length === 0) return;
    const confirm = window.confirm(`Delete ${selectedProducts.length} selected product(s)?`);
    if (!confirm) return;
  
    try {
      await axios.post("http://localhost:5000/api/products/delete-multiple", {
        ids: selectedProducts,
      });
      fetchProducts();
      setSelectedProducts([]);
      setIsBulkDeleteMode(false); // <-- Exit bulk mode
      setShowSuccessPopup(true);
      setTimeout(() => setShowSuccessPopup(false), 3000);
    } catch (err) {
      console.error("Error deleting selected products:", err);
    }
  };
  
  

  // Fetch products
  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortOrder("asc");
    }
  };
  

  const fetchProducts = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/products');
      setProducts(res.data);
    } catch (err) {
      console.error('Error fetching products:', err);
    }
  };

  

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        imageFile: file, // store file
        imageUrl: URL.createObjectURL(file), // for preview only
      }));
    }
  };
  

  const handleShow = (index = null) => {
    setEditingProduct(index);
    setFormData(index !== null ? products[index] : { name: "", price: "", category: "", imageUrl: "" });
    setShow(true);
  };

  const handleClose = () => setShow(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData().then(() => setLoading(false)); // make sure setLoading is called
  }, []);
  
  
  const fetchData = async () => {
    setLoading(true);
    // your fetch logic...
    setLoading(false);
  };
  
  
  return (
    <div className={`mp-container p-4 ${darkMode ? "dark-mode" : ""}`}>
      <h2 className="mp-title mb-4">Manage Products</h2>
      <Button
  variant={darkMode ? "light" : "dark"}
  onClick={toggleDarkMode}
  className="ms-auto"
>
  {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
</Button>

      <div className="mp-header d-flex align-items-center gap-2 mb-3">
        <Form.Control
          type="text"
          placeholder="Search Products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="mp-search-input"
        />
        <Button variant="primary" onClick={() => handleShow()} className="mp-add-btn">
          + Add Product
        </Button>
      </div>
      <div className="d-flex gap-2 mb-3 flex-wrap align-items-center">
  <Form.Control
    type="text"
    placeholder="🔍 Name"
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    style={{ maxWidth: "150px" }}
  />
  <Form.Control
    type="text"
    placeholder="📁 Category"
    value={categoryFilter}
    onChange={(e) => setCategoryFilter(e.target.value)}
    style={{ maxWidth: "140px" }}
  />
  <Form.Control
    type="number"
    placeholder="📦 Max Stock"
    value={stockFilter}
    onChange={(e) => setStockFilter(e.target.value)}
    style={{ maxWidth: "120px" }}
  />
  <Button variant="outline-secondary" onClick={() => {
    setSearch('');
    setCategoryFilter('');
    setStockFilter('');
  }} style={{ height: "38px" }}>
    Reset
  </Button>
</div>

<div className="mb-2 d-flex gap-2">
  {!isBulkDeleteMode ? (
    <Button variant="outline-danger" onClick={() => setIsBulkDeleteMode(true)}>
      🗑 Delete
    </Button>
  ) : (
    <>
      <Button variant="danger" onClick={handleDeleteSelected}>
        Delete Selected ({selectedProducts.length})
      </Button>
      <Button variant="secondary" onClick={() => {
        setIsBulkDeleteMode(false);
        setSelectedProducts([]);
      }}>
        Cancel
      </Button>
    </>
  )}
</div>
  
<div className="d-flex gap-2 mb-3 flex-wrap align-items-center">
  <Button variant="outline-primary" onClick={() => handleSort("price")}>
    Sort by Price {sortBy === "price" ? (sortOrder === "asc" ? "↑" : "↓") : ""}
  </Button>
  <Button variant="outline-primary" onClick={() => handleSort("stock")}>
    Sort by Stock {sortBy === "stock" ? (sortOrder === "asc" ? "↑" : "↓") : ""}
  </Button>
  <Button variant="outline-primary" onClick={() => handleSort("category")}>
    Sort by Category {sortBy === "category" ? (sortOrder === "asc" ? "↑" : "↓") : ""}
  </Button>
  <Button variant="outline-primary" onClick={() => handleSort("dateAdded")}>
    Sort by Date {sortBy === "dateAdded" ? (sortOrder === "asc" ? "↑" : "↓") : ""}
  </Button>
</div>
{loading ? (
  <Skeleton count={5} height={40} />
) : (
<div className="mp-products-list">
  {paginatedProducts.map((product, index) => (
    
    <div key={index} className="mp-product-card">
     {isBulkDeleteMode && (
  <div style={{ position: "absolute", top: 8, left: 8 }}>
    <input
      type="checkbox"
      checked={isSelected(product.id)}
      onChange={() => handleCheckboxChange(product.id)}
    />
  </div>
)}


      <img 
        src={`http://localhost:5000${product.image}`} 
        alt={product.name} 
        className="mp-product-image"
        onError={(e) => { 
          e.target.onerror = null;
          e.target.src = "http://localhost:5000/uploads/default.jpg"; 
        }}
      />
      <div className="mp-product-info">
        <h4 className="mp-product-name">
          <FaTag className="mp-tag-icon" /> {product.name}
        </h4>
        <p className="mp-product-price">₹{product.price}</p>
        <p className="mp-product-category">{product.category}</p>
      </div>
      <div className="mp-actions">
        <FaEdit className="mp-action-icon edit" onClick={() => handleShow(index)} title="Edit" />
        <FaTrash className="mp-action-icon delete" onClick={() => handleDeleteConfirm(product.id)} title="Delete" />
      </div>
    </div>
  ))}
</div>
)}
<div className="d-flex justify-content-center mt-3">
  <Button
    variant="secondary"
    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
    disabled={currentPage === 1}
    className="me-2"
  >
    ⬅ Prev
  </Button>
  <span className="align-self-center">Page {currentPage} of {totalPages}</span>
  <Button
    variant="secondary"
    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
    disabled={currentPage === totalPages}
    className="ms-2"
  >
    Next ➡
  </Button>
</div>

<Form.Group controlId="formFile" className="mb-3">
        <Form.Label>Upload CSV File</Form.Label>
        <Form.Control type="file" accept=".csv" onChange={handleFileChange} />
      </Form.Group>
      <Button onClick={handleUpload} variant="primary">
        Upload CSV
      </Button>
      {/* Add/Edit Product Modal with animation */}
      <Modal show={show} onHide={handleClose} centered className="fade mp-modal">
        <Modal.Header closeButton className="mp-modal-header">
          <Modal.Title>{editingProduct !== null ? "Edit Product" : "Add Product"}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="mp-modal-body">
          <Form>
            <Form.Group className="mb-2">
              <Form.Label className="mp-form-label">Product Name</Form.Label>
              <Form.Control type="text" name="name" value={formData.name} onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label className="mp-form-label">Price (₹)</Form.Label>
              <Form.Control type="number" name="price" value={formData.price} onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-2">
  <Form.Label className="mp-form-label">Stock</Form.Label>
  <Form.Control
    type="number"
    name="stock"
    value={formData.stock}
    onChange={handleChange}
/>
</Form.Group>
            <Form.Group className="mb-2">
              <Form.Label className="mp-form-label">Category</Form.Label>
              <Form.Control type="text" name="category" value={formData.category} onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-2">
  <Form.Label className="mp-form-label">Upload Image</Form.Label>
  <Form.Control type="file" accept="image/*" onChange={handleImageChange} />
  {formData.imageUrl && (
    <img
      src={formData.imageUrl}
      alt="Preview"
      style={{ marginTop: "10px", maxWidth: "100px", borderRadius: "8px" }}
    />
  )}
</Form.Group>

          </Form>
        </Modal.Body>
        <Modal.Footer className="mp-modal-footer">
          <Button variant="danger" onClick={handleClose}>Cancel</Button>
          <Button variant="success" onClick={handleSave}>Save Product</Button>
        </Modal.Footer>
      </Modal>

      {/* Toast Notification */}
      <ToastContainer position="top-end" className="p-3">
        <Toast onClose={() => setShowToast(false)} show={showToast} delay={3000} autohide bg="success">
          <Toast.Body className="text-white">✅ Product saved successfully!</Toast.Body>
        </Toast>
      </ToastContainer>

      {/* Delete Confirmation Modal with Fade-in Animation */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} centered className="fade-in">
        <Modal.Header closeButton>
          <Modal.Title>⚠️ Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-danger fw-bold">
          Are you sure you want to delete this product? This action is irreversible.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={() => handleDelete(deleteIndex)}>
  Delete
</Button>


        </Modal.Footer>
      </Modal>
{/* Animated Success Message Pop-up */}
{showSuccessPopup && (
        <div className="success-popup fade-in">
          ✅ Product deleted successfully!
        </div>
      )}
    </div>
  );
};

export default ManageProducts;
