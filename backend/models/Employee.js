const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: String,
  position: String,
  salary: Number,
  hireDate: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('Employee', EmployeeSchema);