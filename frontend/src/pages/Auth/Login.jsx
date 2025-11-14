import { Form, Input, Button, Card, message } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';
import api from '../../services/api';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const onFinish = async (values) => {
    try {
      // Send ONLY email + password
      const res = await api.post('/auth/login', {
        email: values.email.trim(),
        password: values.password
      });

      localStorage.setItem('token', res.data.token);
      message.success('Login successful!');
      navigate(from, { replace: true });
    } catch (err) {
      const msg = err.response?.data?.msg || 'Invalid email or password';
      message.error(msg);
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: '100px auto' }}>
      <Card title="NexERP Login">
        <Form onFinish={onFinish} layout="vertical">
          <Form.Item
            name="email"
            rules={[
              { required: true, message: 'Enter email' },
              { type: 'email', message: 'Invalid email' }
            ]}
          >
            <Input placeholder="Email" size="large" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Enter password' }]}
          >
            <Input.Password placeholder="Password" size="large" />
          </Form.Item>

          <Button type="primary" htmlType="submit" block size="large">
            Login
          </Button>
        </Form>

        <p style={{ textAlign: 'center', marginTop: 16, color: '#888' }}>
          <small>admin@nexerp.com / password</small>
        </p>
      </Card>
    </div>
  );
};

export default Login;