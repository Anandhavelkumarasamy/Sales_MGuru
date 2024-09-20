import React, { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { Layout, Menu, Button } from "antd";
import {
  UserOutlined,
  PieChartOutlined,
  DesktopOutlined,
  LogoutOutlined,
  FundViewOutlined,
} from "@ant-design/icons";
import SalesMGuruLogo from "../../assests/[removal.ai]_cb3f4ea9-6a22-43b6-858c-1c9a96b5d72a-whatsapp-image-2024-09-06-at-2-13-53-pm.png";
import "antd/dist/reset.css";
import { useToken } from "../../../utility/hooks";

const { Sider, Content } = Layout;
const { SubMenu } = Menu;

const Dashboard = () => {
  const token = useToken();
  const [collapsed, setCollapsed] = useState(false);
  const [openKeys, setOpenKeys] = useState<string[]>([]);

  const navigate = useNavigate();
  const usertype = sessionStorage.getItem("userType");
  console.log(usertype, "hjjkfdslkjldfs");

  useEffect(() => {
    console.log(token);
    const savedOpenKeys = sessionStorage.getItem("dropdown_openKeys");
    console.log(savedOpenKeys, "savedopenkeysss");
    if (savedOpenKeys) {
      setOpenKeys(JSON.parse(savedOpenKeys));
    }
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem("username");
    navigate("/login");
  };

  const onOpenChange = (keys: string[]) => {
    console.log(keys, "opennn");
    setOpenKeys(keys);
    sessionStorage.setItem("dropdown_openKeys", JSON.stringify(keys));
  };
  const handleSelect = ({ key }: { key: string }) => {
    sessionStorage.setItem("select_key", key);
  };
  const selection = sessionStorage.getItem("select_key") ?? "1";

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        width={250}
        style={{ position: "fixed", height: "100vh" }}
        breakpoint="md"
        collapsedWidth={80}
        onBreakpoint={(broken) => {
          setCollapsed(broken);
        }}
      >
        <div style={{ padding: "20px", textAlign: "center" }}>
          <img
            src={SalesMGuruLogo}
            alt="SalesMGuru Logo"
            style={{ width: collapsed ? "70%" : "70%", marginBottom: "5px" }}
          />
        </div>

        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[selection]}
          openKeys={openKeys}
          onOpenChange={onOpenChange}
          style={{ border: "none" }}
          onSelect={handleSelect}
        >
          <Menu.Item key="1" icon={<PieChartOutlined />}>
            <Link
              to="/dashboard/listdashboard"
              style={{ textDecoration: "none" }}
            >
              Dashboard
            </Link>
          </Menu.Item>

          <Menu.Item key="2" icon={<DesktopOutlined />}>
            <Link to="/dashboard/leads" style={{ textDecoration: "none" }}>
              Leads
            </Link>
          </Menu.Item>

          <SubMenu key="sub1" icon={<FundViewOutlined />} title="Masters">
            <Menu.Item key="3">
              <Link
                to="/dashboard/mastercategory"
                style={{ textDecoration: "none" }}
              >
                Category
              </Link>
            </Menu.Item>
            <Menu.Item key="4">
              <Link
                to="/dashboard/masterenquiry"
                style={{ textDecoration: "none" }}
              >
                Enquiry
              </Link>
            </Menu.Item>
            <Menu.Item key="5">
              <Link
                to="/dashboard/masterrequirements"
                style={{ textDecoration: "none" }}
              >
                Requirements
              </Link>
            </Menu.Item>
          </SubMenu>

          <SubMenu key="sub2" icon={<UserOutlined />} title="User Management">
            {/* High Priority (usertype === "1") can see all */}
            {usertype === "1" && (
              <>
                <Menu.Item key="6">
                  <Link
                    to="/dashboard/admin"
                    style={{ textDecoration: "none" }}
                  >
                    Admin
                  </Link>
                </Menu.Item>
                <Menu.Item key="7">
                  <Link
                    to="/dashboard/employee"
                    style={{ textDecoration: "none" }}
                  >
                    Employee
                  </Link>
                </Menu.Item>
                <Menu.Item key="8">
                  <Link
                    to="/dashboard/dealer"
                    style={{ textDecoration: "none" }}
                  >
                    Dealer
                  </Link>
                </Menu.Item>
              </>
            )}

            {/* Admin (usertype === "2") can see Dealer and Employee */}
            {usertype === "2" && (
              <>
                <Menu.Item key="7">
                  <Link
                    to="/dashboard/employee"
                    style={{ textDecoration: "none" }}
                  >
                    Employee
                  </Link>
                </Menu.Item>
                <Menu.Item key="8">
                  <Link
                    to="/dashboard/dealer"
                    style={{ textDecoration: "none" }}
                  >
                    Dealer
                  </Link>
                </Menu.Item>
              </>
            )}

            {/* Dealer (usertype === "3") can only see Employee */}
            {usertype === "3" && (
              <Menu.Item key="7">
                <Link
                  to="/dashboard/employee"
                  style={{ textDecoration: "none" }}
                >
                  Employee
                </Link>
              </Menu.Item>
            )}
          </SubMenu>

          <Menu.Item key="9" icon={<LogoutOutlined />}>
            <Button
              type="link"
              onClick={handleLogout}
              style={{ color: "white", padding: 0, textDecoration: "none" }}
            >
              Logout
            </Button>
          </Menu.Item>
        </Menu>
      </Sider>

      <Layout style={{ marginLeft: collapsed ? 80 : 250 }}>
        <Content
          style={{
            margin: "16px",
            padding: "24px",
            background: "#fff",
            minHeight: 280,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
