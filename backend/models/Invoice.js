const mongoose = require('mongoose');

const InvoiceSchema = new mongoose.Schema({
  customer: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true },
  items: [{
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    qty: { type: Number, required: true },
    price: { type: Number, required: true }
  }],
  total: { type: Number, required: true },
  status: { type: String, enum: ['draft', 'sent', 'paid'], default: 'draft' }
}, { timestamps: true });

module.exports = mongoose.model('Invoice', InvoiceSchema);