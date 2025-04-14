import React, { useState, useEffect } from 'react';
import { BarChart, Bar, PieChart, Pie, Tooltip, XAxis, YAxis, Legend, ResponsiveContainer, Cell } from 'recharts';

import { Modal, Button, Table, Form } from 'react-bootstrap';

const mockOrders = [
  {
    id: 1,
    customer: 'John Doe',
    status: 'Pending',
    date: '2025-04-10',
    total: 2500,
    items: [{ name: 'iPhone 13', qty: 1, price: 2500 }],
  },
  {
    id: 2,
    customer: 'Jane Smith',
    status: 'Delivered',
    date: '2025-04-11',
    total: 1200,
    items: [{ name: 'Samsung Galaxy M12', qty: 1, price: 1200 }],
  },
  {
    id: 3,
    customer: 'Rahul Verma',
    status: 'Shipped',
    date: '2025-04-12',
    total: 799,
    items: [{ name: 'Boat Headphones', qty: 1, price: 799 }],
  },
  {
    id: 4,
    customer: 'Priya Sharma',
    status: 'Cancelled',
    date: '2025-04-10',
    total: 1499,
    items: [{ name: 'Noise Smartwatch', qty: 1, price: 1499 }],
  },
  {
    id: 5,
    customer: 'Aditya Mehta',
    status: 'Delivered',
    date: '2025-04-09',
    total: 45999,
    items: [{ name: 'MacBook Air M2', qty: 1, price: 45999 }],
  },
  {
    id: 6,
    customer: 'Sneha Rao',
    status: 'Pending',
    date: '2025-04-11',
    total: 599,
    items: [{ name: 'Mi Powerbank', qty: 1, price: 599 }],
  },
  {
    id: 7,
    customer: 'Amit Tiwari',
    status: 'Shipped',
    date: '2025-04-08',
    total: 24999,
    items: [{ name: 'Realme Laptop', qty: 1, price: 24999 }],
  },
  {
    id: 8,
    customer: 'Megha Kapoor',
    status: 'Delivered',
    date: '2025-04-07',
    total: 2199,
    items: [
      { name: 'HP Mouse', qty: 1, price: 599 },
      { name: 'HP Keyboard', qty: 1, price: 1600 },
    ],
  },
  {
    id: 9,
    customer: 'Kunal Joshi',
    status: 'Cancelled',
    date: '2025-04-05',
    total: 3200,
    items: [{ name: 'Redmi Watch', qty: 2, price: 1600 }],
  },
  {
    id: 10,
    customer: 'Ayesha Khan',
    status: 'Pending',
    date: '2025-04-12',
    total: 999,
    items: [{ name: 'JBL Mini Speaker', qty: 1, price: 999 }],
  },
];


const ManageOrders = () => {
  const [orders, setOrders] = useState([]);
  const [filteredStatus, setFilteredStatus] = useState('All');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData().then(() => setLoading(false)); // make sure setLoading is called
  }, []);
  
  
  const fetchData = async () => {
    setLoading(true);
    // your fetch logic...
    setLoading(false);
  };
  
  useEffect(() => {
    // Replace with your actual API call
    setOrders(mockOrders);
  }, []);

  const filteredOrders = filteredStatus === 'All'
    ? orders
    : orders.filter(order => order.status === filteredStatus);

  const statusOptions = ['All', 'Pending', 'Shipped', 'Delivered', 'Cancelled'];
  const getStatusColorHex = (status) => {
    switch (status) {
      case 'Pending': return '#f6c23e';   // Yellow
      case 'Shipped': return '#36b9cc';   // Blue
      case 'Delivered': return '#1cc88a'; // Green
      case 'Cancelled': return '#e74a3b'; // Red
      default: return '#6c757d';          // Gray
    }
  };
  
  
  const statusAnalytics = [
    { name: 'Pending', value: orders.filter(o => o.status === 'Pending').length },
    { name: 'Shipped', value: orders.filter(o => o.status === 'Shipped').length },
    { name: 'Delivered', value: orders.filter(o => o.status === 'Delivered').length },
    { name: 'Cancelled', value: orders.filter(o => o.status === 'Cancelled').length },
  ];

  const handleStatusChange = (id, newStatus) => {
    setOrders(prev =>
      prev.map(order => order.id === id ? { ...order, status: newStatus } : order)
    );
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Manage Orders</h2>

      {/* Analytics */}
{/* Analytics */}
<div className="row mb-4">
  <div className="col-md-6 mb-3">
    <div className="p-3 shadow rounded bg-white">
      <h5 className="text-center mb-3">Orders Overview (Bar Chart)</h5>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={statusAnalytics}>
          <XAxis dataKey="name" stroke="#555" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Legend />
          <Bar dataKey="value" fill="#4e73df" barSize={35} radius={[4, 4, 0, 0]} />

        </BarChart>
      </ResponsiveContainer>
    </div>
  </div>

  <div className="col-md-6 mb-3">
    <div className="p-3 shadow rounded bg-white">
      <h5 className="text-center mb-3">Orders by Status (Pie Chart)</h5>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
        <Pie
  data={statusAnalytics}
  cx="50%"
  cy="50%"
  labelLine={false}
  label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
  outerRadius={90}
  dataKey="value"
>
  {statusAnalytics.map((entry, index) => (
    <Cell key={`cell-${index}`} fill={getStatusColorHex(entry.name)} />
  ))}
</Pie>

          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  </div>
</div>


      {/* Filter */}
      <div className="mb-3">
        <Form.Select value={filteredStatus} onChange={(e) => setFilteredStatus(e.target.value)} style={{ width: '200px' }}>
          {statusOptions.map(status => (
            <option key={status} value={status}>{status}</option>
          ))}
        </Form.Select>
      </div>

      {/* Orders Table */}
      <Table bordered hover responsive>
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Customer</th>
            <th>Date</th>
            <th>Total (₹)</th>
            <th>Status</th>
            <th>Update Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredOrders.map(order => (
            <tr key={order.id}>
              <td>#{order.id}</td>
              <td>{order.customer}</td>
              <td>{order.date}</td>
              <td>₹{order.total}</td>
              <td>
                <span className={`badge bg-${getStatusColor(order.status)}`}>{order.status}</span>
              </td>
              <td>
                <Form.Select
                  value={order.status}
                  onChange={(e) => handleStatusChange(order.id, e.target.value)}
                  size="sm"
                >
                  {statusOptions.slice(1).map(status => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </Form.Select>
              </td>
              <td>
                <Button size="sm" onClick={() => { setSelectedOrder(order); setShowModal(true); }}>
                  View Details
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Order Details Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Order Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedOrder && (
            <>
              <p><strong>Customer:</strong> {selectedOrder.customer}</p>
              <p><strong>Date:</strong> {selectedOrder.date}</p>
              <p><strong>Status:</strong> {selectedOrder.status}</p>
              <p><strong>Total:</strong> ₹{selectedOrder.total}</p>
              <hr />
              <h6>Items:</h6>
              <ul>
                {selectedOrder.items.map((item, index) => (
                  <li key={index}>
                    {item.name} - {item.qty} x ₹{item.price}
                  </li>
                ))}
              </ul>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Close</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

const getStatusColor = (status) => {
  switch (status) {
    case 'Pending': return 'warning';
    case 'Shipped': return 'info';
    case 'Delivered': return 'success';
    case 'Cancelled': return 'danger';
    default: return 'secondary';
  }
};

export default ManageOrders;
