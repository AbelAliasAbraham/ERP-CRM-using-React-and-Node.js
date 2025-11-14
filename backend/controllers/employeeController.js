const Employee = require('../models/Employee');

exports.getAll = async (req, res) => {
  const employees = await Employee.find();
  res.json(employees);
};

exports.create = async (req, res) => {
  const employee = new Employee(req.body);
  await employee.save();
  res.status(201).json(employee);
};

exports.update = async (req, res) => {
  const employee = await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!employee) return res.status(404).json({ msg: 'Employee not found' });
  res.json(employee);
};

exports.delete = async (req, res) => {
  const employee = await Employee.findByIdAndDelete(req.params.id);
  if (!employee) return res.status(404).json({ msg: 'Employee not found' });
  res.json({ msg: 'Employee deleted' });
};