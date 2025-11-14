const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
require('dotenv').config();
const connectDB = require('../config/db');

connectDB();

const seedAdmin = async () => {
  await User.deleteMany({});
  const hashed = await bcrypt.hash('password', 10);
  await User.create({
    name: 'Admin User',
    email: 'abel@nexerp.com',
    password: 'Ann@2001',
    role: 'admin'
  });
  console.log('Admin user created: admin@nexerp.com / password');
  process.exit();
};

seedAdmin();