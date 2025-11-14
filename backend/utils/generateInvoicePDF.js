const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

const generateInvoicePDF = (invoice, filePath) => {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument();
    const stream = fs.createWriteStream(filePath);
    doc.pipe(stream);

    doc.fontSize(20).text('INVOICE', { align: 'center' });
    doc.moveDown();
    doc.fontSize(12).text(`ID: ${invoice._id}`);
    doc.text(`Date: ${new Date(invoice.createdAt).toLocaleDateString()}`);
    doc.text(`Customer: ${invoice.customer.name}`);
    doc.moveDown();

    invoice.items.forEach(item => {
      doc.text(`${item.product.name} x${item.qty} @ $${item.price} = $${item.qty * item.price}`);
    });

    doc.moveDown();
    doc.fontSize(14).text(`Total: $${invoice.total}`, { align: 'right' });

    doc.end();

    stream.on('finish', () => resolve(filePath));
    stream.on('error', reject);
  });
};

module.exports = generateInvoicePDF;