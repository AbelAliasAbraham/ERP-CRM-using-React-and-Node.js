import { Form, Input, Button } from 'antd';
import api from '../../services/api';

const CustomerForm = ({ customer, onSuccess }) => {
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    if (customer) {
      await api.put(`/customers/${customer._id}`, values);
    } else {
      await api.post('/customers', values);
    }
    onSuccess();
  };

  return (
    <Form form={form} initialValues={customer} onFinish={onFinish} layout="vertical">
      <Form.Item name="name" rules={[{ required: true }]}><Input /></Form.Item>
      <Form.Item name="email"><Input /></Form.Item>
      <Form.Item name="phone"><Input /></Form.Item>
      <Form.Item name="address"><Input.TextArea /></Form.Item>
      <Button type="primary" htmlType="submit" block>Save</Button>
    </Form>
  );
};

export default CustomerForm;