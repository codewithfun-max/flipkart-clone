import React, { useState, useEffect } from "react";
import { Button, Modal, Form, Toast, ToastContainer } from "react-bootstrap";
import { FaEdit, FaTrash, FaTag } from "react-icons/fa"; // Import icons
import "./styles.css"; // Import CSS file for custom styling

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const [show, setShow] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [search, setSearch] = useState("");
  const [formData, setFormData] = useState({ name: "", price: "", category: "", imageUrl: "" });
  const [showToast, setShowToast] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);


  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem("products")) || [];
    setProducts(storedProducts);
  }, []);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSave = () => {
    let updatedProducts;
    if (editingProduct !== null) {
      updatedProducts = products.map((product, index) =>
        index === editingProduct ? formData : product
      );
    } else {
      updatedProducts = [...products, formData];
    }
    setProducts(updatedProducts);
    localStorage.setItem("products", JSON.stringify(updatedProducts));
    setShowToast(true);
    handleClose();
  };
  const handleDeleteConfirm = (index) => {
    setDeleteIndex(index);
    setShowDeleteModal(true);
  };
  const handleDelete = () => {
    if (deleteIndex !== null) {
      const updatedProducts = products.filter((_, i) => i !== deleteIndex);
      setProducts(updatedProducts);
      localStorage.setItem("products", JSON.stringify(updatedProducts));
      setShowDeleteModal(false);
      setShowSuccessPopup(true);
      setTimeout(() => setShowSuccessPopup(false), 2000); // Auto-hide after 2s
    }
  };

  const handleShow = (index = null) => {
    setEditingProduct(index);
    setFormData(index !== null ? products[index] : { name: "", price: "", category: "", imageUrl: "" });
    setShow(true);
  };

  const handleClose = () => setShow(false);

  return (
    <div className="mp-container p-4">
      <h2 className="mp-title mb-4">Manage Products</h2>
      
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

      <div className="mp-products-list">
        {products
          .filter((product) => product.name.toLowerCase().includes(search.toLowerCase()))
          .map((product, index) => (
            <div key={index} className="mp-product-card">
              <img 
                src={product.imageUrl || "https://via.placeholder.com/100"} 
                alt={product.name} 
                className="mp-product-image" 
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
                <FaTrash className="mp-action-icon delete" onClick={() => handleDeleteConfirm(index)} title="Delete" />

              </div>
            </div>
          ))}
      </div>

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
              <Form.Label className="mp-form-label">Category</Form.Label>
              <Form.Control type="text" name="category" value={formData.category} onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label className="mp-form-label">Image URL</Form.Label>
              <Form.Control type="text" name="imageUrl" value={formData.imageUrl} onChange={handleChange} />
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
          <Button variant="danger" onClick={handleDelete}>
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
