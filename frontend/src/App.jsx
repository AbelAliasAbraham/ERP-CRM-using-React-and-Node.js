import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from 'antd';
import Header from './components/Layout/header';
import Sidebar from './components/Layout/Sidebar';
import Footer from './components/Layout/Footer';
import PrivateRoute from './components/PrivateRoute';
import Login from './pages/Auth/Login';
import Dashboard from './pages/Dashboard/Dashboard';
import CustomerList from './pages/Customers/CustomerList';
import ProductList from './pages/Inventory/ProductList';
import InvoiceList from './pages/Invoices/InvoiceList';
import EmployeeList from './pages/HR/EmployeeList';

const { Content } = Layout;

function App() {
  return (
    <Router>
      <Layout style={{ minHeight: '100vh' }}>
        <Header />
        <Layout>
          <Sidebar />
          <Layout style={{ padding: '0 24px 24px' }}>
            <Content
              style={{
                margin: '24px 16px 0',
                padding: 24,
                background: '#fff',
                minHeight: 280
              }}
            >
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
                <Route path="/customers" element={<PrivateRoute><CustomerList /></PrivateRoute>} />
                <Route path="/inventory" element={<PrivateRoute><ProductList /></PrivateRoute>} />
                <Route path="/invoices" element={<PrivateRoute><InvoiceList /></PrivateRoute>} />
                <Route path="/hr" element={<PrivateRoute><EmployeeList /></PrivateRoute>} />
              </Routes>
            </Content>
            <Footer />
          </Layout>
        </Layout>
      </Layout>
    </Router>
  );
}

export default App;