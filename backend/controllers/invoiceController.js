const Invoice = require('../models/Invoice');
const generateInvoicePDF = require('../utils/generateInvoicePDF');
const path = require('path');
const fs = require('fs');

exports.getAll = async (req, res) => {
  const invoices = await Invoice.find().populate('customer items.product');
  res.json(invoices);
};

exports.create = async (req, res) => {
  const { customer, items } = req.body;
  const total = items.reduce((sum, i) => sum + i.qty * i.price, 0);

  const invoice = new Invoice({ customer, items, total });
  await invoice.save();
  await invoice.populate('customer items.product');

  const pdfPath = path.join(__dirname, `../invoices/invoice-${invoice._id}.pdf`);
  await generateInvoicePDF(invoice, pdfPath);

  res.status(201).json({
    ...invoice.toObject(),
    pdfUrl: `/invoices/invoice-${invoice._id}.pdf`
  });
};

exports.getPDF = async (req, res) => {
  const filePath = path.join(__dirname, `../invoices/invoice-${req.params.id}.pdf`);
  if (fs.existsSync(filePath)) {
    res.sendFile(filePath);
  } else {
    res.status(404).json({ msg: 'PDF not found' });
  }
};