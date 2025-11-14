import { Table, Button, Modal, message } from 'antd';
import { useEffect, useState } from 'react';
import api from '../../services/api';
import EmployeeForm from './EmployeeForm';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [visible, setVisible] = useState(false);
  const [editing, setEditing] = useState(null);

  const load = () => api.get('/hr').then(res => setEmployees(res.data));

  useEffect(() => { load(); }, []);

  const handleSave = () => {
    load();
    setVisible(false);
    setEditing(null);
    message.success('Employee saved');
  };

  const columns = [
    { title: 'Name', dataIndex: 'name' },
    { title: 'Email', dataIndex: 'email' },
    { title: 'Position', dataIndex: 'position' },
    { title: 'Salary', dataIndex: 'salary', render: s => s ? `$${s}` : '-' },
    {
      title: 'Actions',
      render: (_, r) => (
        <>
          <Button size="small" onClick={() => { setEditing(r); setVisible(true); }}>Edit</Button>{' '}
          <Button danger size="small" onClick={() => api.delete(`/hr/${r._id}`).then(load)}>Delete</Button>
        </>
      )
    }
  ];

  return (
    <>
      <div style={{ marginBottom: 16 }}>
        <Button type="primary" onClick={() => setVisible(true)}>Add Employee</Button>
      </div>
      <Table dataSource={employees} columns={columns} rowKey="_id" />

      <Modal title={editing ? "Edit Employee" : "Add Employee"} open={visible} onCancel={() => setVisible(false)} footer={null}>
        <EmployeeForm employee={editing} onSuccess={handleSave} />
      </Modal>
    </>
  );
};

export default EmployeeList;