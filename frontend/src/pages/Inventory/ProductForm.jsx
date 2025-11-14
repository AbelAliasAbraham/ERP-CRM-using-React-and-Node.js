import { Form, Input, InputNumber, Button } from 'antd';
import api from '../../services/api';

const ProductForm = ({ product, onSuccess }) => {
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    if (product) {
      await api.put(`/inventory/${product._id}`, values);
    } else {
      await api.post('/inventory', values);
    }
    onSuccess();
  };

  return (
    <Form form={form} initialValues={product} onFinish={onFinish} layout="vertical">
      <Form.Item name="name" rules={[{ required: true }]}><Input /></Form.Item>
      <Form.Item name="sku" rules={[{ required: true }]}><Input /></Form.Item>
      <Form.Item name="price" rules={[{ required: true }]}><InputNumber style={{ width: '100%' }} /></Form.Item>
      <Form.Item name="stock"><InputNumber style={{ width: '100%' }} /></Form.Item>
      <Form.Item name="supplier"><Input /></Form.Item>
      <Button type="primary" htmlType="submit" block>Save</Button>
    </Form>
  );
};

export default ProductForm;