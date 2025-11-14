import { Layout, Menu } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  DashboardOutlined,
  TeamOutlined,
  ShoppingCartOutlined,
  FileTextOutlined,
  UserOutlined
} from '@ant-design/icons';

const { Sider } = Layout;

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const items = [
    { key: '/', label: 'Dashboard', icon: <DashboardOutlined /> },
    { key: '/customers', label: 'Customers', icon: <TeamOutlined /> },
    { key: '/inventory', label: 'Inventory', icon: <ShoppingCartOutlined /> },
    { key: '/invoices', label: 'Invoices', icon: <FileTextOutlined /> },
    { key: '/hr', label: 'HR', icon: <UserOutlined /> }
  ];

  return (
    <Sider width={200}>
      <Menu
        mode="inline"
        selectedKeys={[location.pathname]}
        items={items}
        onClick={({ key }) => navigate(key)}
        style={{ height: '100%', borderRight: 0 }}
      />
    </Sider>
  );
};

export default Sidebar;