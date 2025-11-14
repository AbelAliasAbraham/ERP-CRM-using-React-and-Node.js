import { Row, Col, Card, Statistic } from 'antd';
import { useEffect, useState } from 'react';
import api from '../../services/api';

const Dashboard = () => {
  const [stats, setStats] = useState({});

  useEffect(() => {
    api.get('/dashboard').then(res => setStats(res.data));
  }, []);

  return (
    <div>
      <h1 style={{ marginBottom: 24 }}>Dashboard</h1>
      <Row gutter={16}>
        <Col span={6}>
          <Card>
            <Statistic title="Total Revenue" value={stats.revenue || 0} prefix="$" precision={2} />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic title="Active Orders" value={stats.orders || 0} />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic title="Customers" value={stats.customers || 0} />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Low Stock Items"
              value={stats.lowStock || 0}
              valueStyle={{ color: stats.lowStock > 0 ? '#cf1322' : '#3f8600' }}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;