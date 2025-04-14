const express = require('express');
const cors = require('cors');
const app = express();
const path = require('path');
const adminRoutes = require("./routes/admins");
const usersRoutes = require('./routes/usersRoutes');
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));



app.use('/api/users', usersRoutes); // Route for user management



// 🛣️ Your routes
app.use(cors({
  origin: 'http://localhost:3000', // React frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));
// server.js or index.js
const productsRoutes = require('./routes/productsRoutes');


app.use('/api/products', productsRoutes); // ✅ Correct route

app.use("/api/admins", adminRoutes);



app.listen(5000, () => {
  console.log('Server is running on port 5000');
});