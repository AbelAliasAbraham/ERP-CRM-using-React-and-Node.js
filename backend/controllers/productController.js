const Product = require('../models/Product');

exports.getAll = async (req, res) => {
  const products = await Product.find();
  res.json(products);
};

exports.create = async (req, res) => {
  const { sku } = req.body;
  if (await Product.findOne({ sku })) {
    return res.status(400).json({ msg: 'SKU already exists' });
  }
  const product = new Product(req.body);
  await product.save();
  res.status(201).json(product);
};

exports.update = async (req, res) => {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!product) return res.status(404).json({ msg: 'Product not found' });
  res.json(product);
};

exports.delete = async (req, res) => {
  const product = await Product.findByIdAndDelete(req.params.id);
  if (!product) return res.status(404).json({ msg: 'Product not found' });
  res.json({ msg: 'Product deleted' });
};