import { Layout, Menu } from 'antd';
import {
  UserOutlined,
  ApartmentOutlined,
  DashboardOutlined,
} from '@ant-design/icons';
import { Outlet, useNavigate } from 'react-router-dom';
import { useState } from 'react';

const { Header, Sider, Content } = Layout;

export default function DashboardLayout() {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);

  const menuItems = [
    {
      key: 'dashboard',
      icon: <DashboardOutlined />,
      label: 'Dashboard',
      onClick: () => navigate('/')
    },
    {
      key: 'companies',
      icon: <ApartmentOutlined />,
      label: 'Companies',
      onClick: () => navigate('/companies')
    },
    {
      key: 'users',
      icon: <UserOutlined />,
      label: 'Users',
      onClick: () => navigate('/users')
    },
  ];

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={value => setCollapsed(value)}>
        <div style={{ height: 32, margin: 16, color: '#fff', textAlign: 'center', fontWeight: 'bold' }}>
          Admin
        </div>
        <Menu theme="dark" mode="inline" items={menuItems} />
      </Sider>
      <Layout>
        <Header style={{ background: '#fff', padding: 0, paddingLeft: 16, fontSize: 18 }}>
          Company-User Management
        </Header>
        <Content style={{ margin: '16px' }}>
          <div style={{ padding: 24, background: '#fff', borderRadius: 8 }}>
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}