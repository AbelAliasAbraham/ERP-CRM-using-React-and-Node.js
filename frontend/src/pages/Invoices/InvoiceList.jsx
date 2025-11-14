import { Table, Button } from 'antd';
import { useEffect, useState } from 'react';
import api from '../../services/api';

const InvoiceList = () => {
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    api.get('/invoices').then(res => setInvoices(res.data));
  }, []);

  const columns = [
    { title: 'ID', dataIndex: '_id' },
    { title: 'Customer', render: (_, r) => r.customer?.name },
    { title: 'Total', dataIndex: 'total', render: t => `$${t}` },
    { title: 'Status', dataIndex: 'status' },
    {
      title: 'PDF',
      render: (_, r) => (
        <Button type="link" href={`${import.meta.env.VITE_API_URL}${r.pdfUrl}`} target="_blank">
          Download
        </Button>
      )
    }
  ];

  return (
    <>
      <h1>Invoices</h1>
      <Table dataSource={invoices} columns={columns} rowKey="_id" />
    </>
  );
};

export default InvoiceList;