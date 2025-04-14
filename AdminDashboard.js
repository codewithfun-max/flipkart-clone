import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { Bar, Pie } from "react-chartjs-2";
import { FaShoppingCart, FaUsers, FaRupeeSign, FaBars, FaTimes,FaTachometerAlt, FaBox, FaSignOutAlt } from "react-icons/fa";
import "chart.js/auto";
import "./styles.css";
import ManageProducts from "./ManageProducts";
import { useNavigate } from "react-router-dom";
import ManageUsers from "./ManageUsers";
import ManageOrders from "./ManageOrders";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import { OverlayTrigger, Tooltip } from "react-bootstrap";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import ManageAdmins from "./ManageAdmins";


const AdminDashboard = () => {
 
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeSection, setActiveSection] = useState("dashboard"); // Track active section
  const [user, setUser] = useState(null);
const [loading, setLoading] = useState(true);

useEffect(() => {
  setTimeout(() => setLoading(false), 2000); // simulate API
}, []);

  useEffect(() => {
    // Example: Fetch user info from backend or localStorage
    const storedUser = JSON.parse(localStorage.getItem("user")); // Assuming this is where it's stored
    if (storedUser) {
      setUser(storedUser);
    } else {
      navigate("/admin/login"); // redirect if user not found
    }
  }, [navigate]);
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleSectionChange = (section) => {
    setActiveSection(section);
  };
  const handleLogout = () => {
    localStorage.removeItem("isAdminAuthenticated"); // Clear authentication
    localStorage.removeItem("user");
 
    navigate("/admin/login"); // Redirect to login
  };
  const productChartData = {
    labels: ["Electronics", "Clothing", "Home", "Beauty", "Toys"],
    datasets: [
      {
        data: [25, 40, 15, 10, 10],
        backgroundColor: ["#ff6384", "#36a2eb", "#ffce56", "#4bc0c0", "#9966ff"],
      },
    ],
  };

  const chartData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Orders",
        data: [10, 20, 15, 30, 25, 40],
        backgroundColor: "#007bff",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: { barPercentage: 0.6, categoryPercentage: 0.8 },
      y: { beginAtZero: true },
    },
  };
  useEffect(() => {
    // Simulate New Order Received every 10 seconds
    const orderInterval = setInterval(() => {
      toast.success("🛒 New Order Received!");
    }, 10000);
  
    // Simulate Low Stock Warning every 15 seconds
    const stockInterval = setInterval(() => {
      toast.warn("⚠️ Product stock is below threshold!");
    }, 15000);
  
    return () => {
      clearInterval(orderInterval);
      clearInterval(stockInterval);
    };
  }, []);
  
  return (
    <Container fluid>
      {/* Sidebar */}
      <div className={`admin-sidebar ${sidebarOpen ? "" : "closed"}`}>
        <button className="sidebar-toggle" onClick={toggleSidebar}>
          {sidebarOpen ? <FaTimes /> : <FaBars />}
        </button>
        {sidebarOpen && <h4>Admin Panel</h4>}
        <ul>
        <li onClick={() => handleSectionChange("dashboard")} className={activeSection === "dashboard" ? "active" : ""}>
    <FaTachometerAlt style={{ marginRight: "8px" }} /> Dashboard
  </li>
  <OverlayTrigger
  placement="top"
  overlay={<Tooltip>Manage Orders</Tooltip>}
>
  <li onClick={() => handleSectionChange("manageOrders")} className={activeSection === "manageOrders" ? "active" : ""}>
    <FaShoppingCart style={{ marginRight: "8px" }} /> Manage Orders
  </li>
</OverlayTrigger>

<OverlayTrigger placement="top" overlay={<Tooltip>Manage Products</Tooltip>}>
  <li onClick={() => handleSectionChange("manageProducts")} className={activeSection === "manageProducts" ? "active" : ""}>
    <FaBox style={{ marginRight: "8px" }} /> Manage Product
  </li>
</OverlayTrigger>

  <li onClick={() => handleSectionChange("manageAdmins")} className={activeSection === "manageAdmins" ? "active" : ""}>
  <FaUsers style={{ marginRight: "8px" }} /> Manage Admins
</li>
  <li onClick={handleLogout}>
    <FaSignOutAlt style={{ marginRight: "8px" }} /> Logout
  </li>

  <li
    onClick={() => handleSectionChange("manageuser")}
    className={activeSection === "manageuser" ? "active" : ""}
  >
    <FaUsers style={{ marginRight: "8px" }} /> Manage Users
  </li>


        </ul>
      </div>

      {/* Content */}
      <div className={`admin-content ${sidebarOpen ? "" : "shift"}`}>
        {activeSection === "dashboard" && (
          <>
            <h2>Dashboard</h2>

          <Row>
  {loading ? (
    [...Array(4)].map((_, index) => (
      <Col md={3} key={index}>
        <Skeleton height={100} />
      </Col>
    ))
  ) : (
    [
      { icon: <FaBox size={30} color="#007bff" />, title: "Total Products", value: "50" },
      { icon: <FaShoppingCart size={30} color="#28a745" />, title: "Total Orders", value: "120" },
      { icon: <FaUsers size={30} color="#dc3545" />, title: "Total Users", value: "200" },
      { icon: <FaRupeeSign size={30} color="#ffc107" />, title: "Total Revenue", value: "₹1,50,000" },
    ].map((item, index) => (
      <Col md={3} key={index}>
        <Card className="p-2 text-center shadow-sm" style={{ fontSize: "14px", borderRadius: "10px" }}>
          <div>{item.icon}</div>
          <h6 className="mt-1">{item.title}</h6>
          <p style={{ fontSize: "16px", fontWeight: "bold" }}>{item.value}</p>
        </Card>
      </Col>
    ))
  )}
</Row>

            <Card className="mt-4 p-3 border-0 shadow-none">
              <Row>
                <Col md={6}>
                  <h5 style={{ fontSize: "16px", textAlign: "left", marginLeft: "40%" }}>Product Categories</h5>
                  <div style={{ width: "300px", height: "250px", marginLeft: "20%", marginTop: "50px" }}>
                    <Pie data={productChartData} options={options} />
                  </div>
                </Col>

                <Col md={6}>
                  <h5 style={{ fontSize: "16px", marginLeft: "30%" }}>Order Statistics</h5>
                  <div style={{ width: "400px", height: "250px", marginRight: "15%", marginTop: "50px" }}>
                    <Bar data={chartData} options={options} />
                  </div>
                </Col>
              </Row>
            </Card>
          </>
        )}

        {/* Manage Products Section */}
        {activeSection === "manageProducts" && <ManageProducts />}
        {activeSection === "manageOrders" && <ManageOrders />}
        {activeSection === "manageAdmins" && <ManageAdmins />}
        {activeSection === "manageuser" && user?.role === "admin" && <ManageUsers />}
<ToastContainer position="top-right" autoClose={3000} />

      </div>
    </Container>
  );
};

export default AdminDashboard;
