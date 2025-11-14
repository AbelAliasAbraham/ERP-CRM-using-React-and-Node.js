const Customer = require('../models/Customer');

exports.getAll = async (req, res) => {
  const customers = await Customer.find().sort({ createdAt: -1 });
  res.json(customers);
};

exports.create = async (req, res) => {
  const customer = new Customer(req.body);
  await customer.save();
  res.status(201).json(customer);
};

exports.update = async (req, res) => {
  const customer = await Customer.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!customer) return res.status(404).json({ msg: 'Customer not found' });
  res.json(customer);
};

exports.delete = async (req, res) => {
  const customer = await Customer.findByIdAndDelete(req.params.id);
  if (!customer) return res.status(404).json({ msg: 'Customer not found' });
  res.json({ msg: 'Customer deleted' });
};