import { Layout } from 'antd';

const { Footer } = Layout;

export default () => (
  <Footer style={{ textAlign: 'center' }}>
    NexERP ©{new Date().getFullYear()}
  </Footer>
);