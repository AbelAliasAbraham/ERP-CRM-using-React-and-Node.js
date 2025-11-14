import { Table, Button, Modal, message } from 'antd';
import { useEffect, useState } from 'react';
import api from '../../services/api';
import CustomerForm from './CustomerForm';

const CustomerList = () => {
  const [customers, setCustomers] = useState([]);
  const [visible, setVisible] = useState(false);
  const [editing, setEditing] = useState(null);

  const load = () => api.get('/customers').then(res => setCustomers(res.data));

  useEffect(() => { load(); }, []);

  const handleSave = () => {
    load();
    setVisible(false);
    setEditing(null);
    message.success('Customer saved');
  };

  const handleDelete = async (id) => {
    await api.delete(`/customers/${id}`);
    load();
    message.success('Customer deleted');
  };

  const columns = [
    { title: 'Name', dataIndex: 'name' },
    { title: 'Email', dataIndex: 'email' },
    { title: 'Phone', dataIndex: 'phone' },
    {
      title: 'Actions',
      render: (_, record) => (
        <>
          <Button size="small" onClick={() => { setEditing(record); setVisible(true); }}>Edit</Button>{' '}
          <Button danger size="small" onClick={() => handleDelete(record._id)}>Delete</Button>
        </>
      )
    }
  ];

  return (
    <>
      <div style={{ marginBottom: 16 }}>
        <Button type="primary" onClick={() => setVisible(true)}>Add Customer</Button>
      </div>
      <Table dataSource={customers} columns={columns} rowKey="_id" />

      <Modal
        title={editing ? "Edit Customer" : "Add Customer"}
        open={visible}
        onCancel={() => { setVisible(false); setEditing(null); }}
        footer={null}
      >
        <CustomerForm customer={editing} onSuccess={handleSave} />
      </Modal>
    </>
  );
};

export default CustomerList;