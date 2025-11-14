import { Table, Button, Modal, message } from 'antd';
import { useEffect, useState } from 'react';
import api from '../../services/api';
import ProductForm from './ProductForm';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [visible, setVisible] = useState(false);
  const [editing, setEditing] = useState(null);

  const load = () => api.get('/inventory').then(res => setProducts(res.data));

  useEffect(() => { load(); }, []);

  const handleSave = () => {
    load();
    setVisible(false);
    setEditing(null);
    message.success('Product saved');
  };

  const columns = [
    { title: 'Name', dataIndex: 'name' },
    { title: 'SKU', dataIndex: 'sku' },
    { title: 'Price', dataIndex: 'price', render: p => `$${p}` },
    { title: 'Stock', dataIndex: 'stock' },
    {
      title: 'Actions',
      render: (_, r) => (
        <>
          <Button size="small" onClick={() => { setEditing(r); setVisible(true); }}>Edit</Button>{' '}
          <Button danger size="small" onClick={() => api.delete(`/inventory/${r._id}`).then(load)}>Delete</Button>
        </>
      )
    }
  ];

  return (
    <>
      <div style={{ marginBottom: 16 }}>
        <Button type="primary" onClick={() => setVisible(true)}>Add Product</Button>
      </div>
      <Table dataSource={products} columns={columns} rowKey="_id" />

      <Modal title={editing ? "Edit Product" : "Add Product"} open={visible} onCancel={() => setVisible(false)} footer={null}>
        <ProductForm product={editing} onSuccess={handleSave} />
      </Modal>
    </>
  );
};

export default ProductList;