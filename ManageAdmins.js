import React, { useState, useEffect } from "react";
import axios from "axios";
import { Modal, Button, Table, Form, Badge, OverlayTrigger, Tooltip } from "react-bootstrap";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { FaEdit, FaUserSlash } from "react-icons/fa";

toast.configure();

const ManageAdmins = () => {
  const [admins, setAdmins] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newAdmin, setNewAdmin] = useState({
    name: "",
    email: "",
    password: "",
    role: "Product Manager",
  });

  useEffect(() => {
    fetchAdmins();
  }, []);

  const fetchAdmins = async () => {
    try {
      const res = await axios.get("/api/admins");
      setAdmins(res.data);
    } catch (err) {
      toast.error("Failed to fetch admins");
    }
  };

  const handleAddAdmin = async () => {
    try {
      await axios.post("/api/admins", newAdmin);
      toast.success("Admin added successfully!");
      setShowModal(false);
      fetchAdmins();
    } catch (err) {
      toast.error("Error adding admin");
    }
  };

  const handleStatusChange = async (id, status) => {
    const newStatus = status === "Active" ? "Inactive" : "Active";
    try {
      await axios.put(`/api/admins/${id}`, { status: newStatus, role: null });
      toast.info(`Admin status changed to ${newStatus}`);
      fetchAdmins();
    } catch (err) {
      toast.error("Status update failed");
    }
  };

  return (
    <div className="p-3">
      <h4>Manage Admins</h4>
      <Button variant="primary" onClick={() => setShowModal(true)}>Add New Admin</Button>

      <Table striped bordered hover className="mt-3">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {admins.map((admin) => (
            <tr key={admin.id}>
              <td>{admin.name}</td>
              <td>{admin.email}</td>
              <td>
                {admin.role === "Super Admin" ? (
                  <Badge bg="danger">🔒 Super Admin</Badge>
                ) : (
                  admin.role
                )}
              </td>
              <td>
                <Badge bg={admin.status === "Active" ? "success" : "secondary"}>
                  {admin.status}
                </Badge>
              </td>
              <td>
                <OverlayTrigger placement="top" overlay={<Tooltip>Edit Admin</Tooltip>}>
                  <Button size="sm" variant="outline-info" className="me-2">
                    <FaEdit />
                  </Button>
                </OverlayTrigger>
                <OverlayTrigger placement="top" overlay={<Tooltip>Toggle Status</Tooltip>}>
                  <Button
                    size="sm"
                    variant="outline-danger"
                    onClick={() => handleStatusChange(admin.id, admin.status)}
                  >
                    <FaUserSlash />
                  </Button>
                </OverlayTrigger>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal to Add Admin */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Admin</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={newAdmin.name}
                onChange={(e) => setNewAdmin({ ...newAdmin, name: e.target.value })}
              />
            </Form.Group>

            <Form.Group className="mt-2">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={newAdmin.email}
                onChange={(e) => setNewAdmin({ ...newAdmin, email: e.target.value })}
              />
            </Form.Group>

            <Form.Group className="mt-2">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                value={newAdmin.password}
                onChange={(e) => setNewAdmin({ ...newAdmin, password: e.target.value })}
              />
            </Form.Group>

            <Form.Group className="mt-2">
              <Form.Label>Role</Form.Label>
              <Form.Select
                value={newAdmin.role}
                onChange={(e) => setNewAdmin({ ...newAdmin, role: e.target.value })}
              >
                <option>Super Admin</option>
                <option>Product Manager</option>
                <option>Order Manager</option>
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
          <Button variant="primary" onClick={handleAddAdmin}>Add Admin</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ManageAdmins;
