import React, { useEffect, useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { Layout, Menu, Button } from 'antd';
import {
  UserOutlined,
  PieChartOutlined,
  DesktopOutlined,
  LogoutOutlined,
  TeamOutlined,
} from '@ant-design/icons';
import { useSelector } from 'react-redux';
import SalesMGuruLogo from '../../assests/WhatsApp Image 2024-09-06 at 2.13.53 PM.jpeg';
import 'antd/dist/reset.css';

const { Sider, Content } = Layout;
const { SubMenu } = Menu;

const Dashboard = () => {
  const [collapsed, setCollapsed] = useState(false); 
  const user = useSelector((state) => state.authLogin);
  const navigate = useNavigate();

  useEffect(() => {
    console.log(user);
  }, [user]);

  const handleLogout = () => {
    localStorage.removeItem('username');
    navigate('/login');
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        width={250}
        style={{ position: 'fixed', height: '100vh' }}
      >
      
        <div style={{ padding: '20px', textAlign: 'center' }}>
          <img
            src={SalesMGuruLogo}
            alt="SalesMGuru Logo"
            style={{ width: collapsed ? '70%' : '100%', marginBottom: '10px' }}
          />
          <h6
            style={{
              width: collapsed ? '50%' : '80%',
              color: 'white',
              textAlign: 'center',
              position: 'relative',
              left: collapsed ? '' : '10px',
              fontSize: collapsed ? '15px' : '30px',
            }}
          >
            MGuru
          </h6>
        </div>

        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          style={{ border: 'none' }} 
        >
          <Menu.Item key="1" icon={<PieChartOutlined />}>
            <Link to="/dashboard/listdashboard" style={{ textDecoration: 'none' }}>
              Dashboard
            </Link>
          </Menu.Item>

          <Menu.Item key="2" icon={<DesktopOutlined />}>
            <Link to="/dashboard/leads" style={{ textDecoration: 'none' }}>
              Leads
            </Link>
          </Menu.Item>

          {/* User Management as a SubMenu */}
          <SubMenu key="sub1" icon={<UserOutlined />} title="User Management">
            <Menu.Item key="3">
              <Link to="/dashboard/admin" style={{ textDecoration: 'none' }}>
                Admin
              </Link>
            </Menu.Item>
            <Menu.Item key="4">
              <Link to="/dashboard/employee" style={{ textDecoration: 'none' }}>
                Employee
              </Link>
            </Menu.Item>
            <Menu.Item key="5">
              <Link to="/dashboard/dealer" style={{ textDecoration: 'none' }}>
                Dealer
              </Link>
            </Menu.Item>
          </SubMenu>

          <Menu.Item key="6" icon={<LogoutOutlined />}>
            <Button type="link" onClick={handleLogout} style={{ color: 'white', padding: 0, textDecoration: 'none' }}>
              Logout
            </Button>
          </Menu.Item>
        </Menu>
      </Sider>

      <Layout style={{ marginLeft: collapsed ? 80 : 250 }}>
        <Content style={{ margin: '16px', padding: '24px', background: '#fff', minHeight: 280 }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
