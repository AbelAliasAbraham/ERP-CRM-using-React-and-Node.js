import { Form, Input, InputNumber, Button } from 'antd';
import api from '../../services/api';

const EmployeeForm = ({ employee, onSuccess }) => {
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    if (employee) {
      await api.put(`/hr/${employee._id}`, values);
    } else {
      await api.post('/hr', values);
    }
    onSuccess();
  };

  return (
    <Form form={form} initialValues={employee} onFinish={onFinish} layout="vertical">
      <Form.Item name="name" rules={[{ required: true }]}><Input /></Form.Item>
      <Form.Item name="email"><Input /></Form.Item>
      <Form.Item name="position"><Input /></Form.Item>
      <Form.Item name="salary"><InputNumber style={{ width: '100%' }} /></Form.Item>
      <Button type="primary" htmlType="submit" block>Save</Button>
    </Form>
  );
};

export default EmployeeForm;