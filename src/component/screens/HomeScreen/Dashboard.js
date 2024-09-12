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
import SalesMGuruLogo from '../../assests/[removal.ai]_cb3f4ea9-6a22-43b6-858c-1c9a96b5d72a-whatsapp-image-2024-09-06-at-2-13-53-pm.png';
import 'antd/dist/reset.css';
import { useToken } from '../../../utility/hooks';

const { Sider, Content } = Layout;
const { SubMenu } = Menu;

const Dashboard = () => {
  const token = useToken()
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

  const CustomComponent =()=>{
    return <div>
      kjghkgkg
    </div>
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        width={250}
        style={{ position: 'fixed', height: '100vh' }}
      >
      <CustomComponent />
        <div style={{ padding: '20px', textAlign: 'center' }}>
          <img
            src={SalesMGuruLogo}
            alt="SalesMGuru Logo"
            style={{ width: collapsed ? '70%' : '70%', marginBottom: '5px' }}
          />
          <h6
            style={{
              width: collapsed ? '50%' : '70%',
              color: 'white',
              textAlign: 'center',
              position: 'relative',
              left: collapsed ? '' : '10px',
              fontSize: collapsed ? '15px' : '20px',
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
          <Menu.Item key="3" icon={<DesktopOutlined />}>
            <Link to="/dashboard/leads" style={{ textDecoration: 'none' }}>
              Masters
            </Link>
          </Menu.Item>

       
          <SubMenu key="sub1" icon={<UserOutlined />} title="User Management">
            <Menu.Item key="34">
              <Link to="/dashboard/admin" style={{ textDecoration: 'none' }}>
                Admin
              </Link>
            </Menu.Item>
            <Menu.Item key="5">
              <Link to="/dashboard/employee" style={{ textDecoration: 'none' }}>
                Employee
              </Link>
            </Menu.Item>
            <Menu.Item key="6">
              <Link to="/dashboard/dealer" style={{ textDecoration: 'none' }}>
                Dealer
              </Link>
            </Menu.Item>
          </SubMenu>

          <Menu.Item key="7" icon={<LogoutOutlined />}>
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
