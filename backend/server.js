require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
const fs = require('fs');
const connectDB = require('./config/db');
const User = require('./models/User');
const bcrypt = require('bcryptjs');

const app = express();

// 1. Connect DB FIRST
connectDB().then(async () => {
  // 2. Create Admin AFTER DB is ready
  try {
    const admin = await User.findOne({ email: 'admin@nexerp.com' });
    if (!admin) {
      const hashed = await bcrypt.hash('password', 10);
      await User.create({
        name: 'Admin User',
        email: 'admin@nexerp.com',
        password: hashed,
        role: 'admin'
      });
      console.log('Admin created: admin@nexerp.com / password');
    } else {
      console.log('Admin already exists');
    }
  } catch (err) {
    console.error('Admin creation failed:', err);
  }
});

// Middleware
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// Invoices folder
const invoicesDir = path.join(__dirname, 'invoices');
if (!fs.existsSync(invoicesDir)) fs.mkdirSync(invoicesDir);
app.use('/invoices', express.static(invoicesDir));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/customers', require('./routes/customers'));
app.use('/api/inventory', require('./routes/inventory'));
app.use('/api/invoices', require('./routes/invoices'));
app.use('/api/hr', require('./routes/hr'));
app.use('/api/dashboard', require('./routes/dashboard'));

app.get('/', (req, res) => {
  res.json({ message: 'NexERP API v1.0 - Running' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});