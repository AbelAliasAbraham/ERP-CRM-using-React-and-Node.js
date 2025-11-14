const Invoice = require('../models/Invoice');
const Product = require('../models/Product');
const Customer = require('../models/Customer');

exports.getStats = async (req, res) => {
  try {
    const [revenueResult, orders, customers, lowStock] = await Promise.all([
      Invoice.aggregate([
        { $match: { status: 'paid' } },
        { $group: { _id: null, total: { $sum: '$total' } } }
      ]),
      Invoice.countDocuments(),
      Customer.countDocuments(),
      Product.countDocuments({ stock: { $lt: 10 } })
    ]);

    res.json({
      revenue: revenueResult[0]?.total || 0,
      orders,
      customers,
      lowStock
    });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};