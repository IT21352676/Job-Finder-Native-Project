import React, { useState } from "react";
import "./AdminSideBar.css";
import Logo from "../../Common/Logo/Logo";
import {
  DashboardOutlined,
  DollarOutlined,
  PlusCircleOutlined,
  BellOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import { Link } from "react-router-dom";

const { Sider } = Layout;

const FinancialAdminSideBar = () => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={toggleCollapsed}
      width={220}
      className="custom-sider"
    >
      <div className="logo-container">
        <Logo />
      </div>
      <Menu mode="inline" className="menu-bar">
        <Menu.Item key="dashboard" icon={<DashboardOutlined />}>
          <Link to="dashboard">Dashboard</Link>
        </Menu.Item>
        
        <Menu.SubMenu key="Payment" icon={<DollarOutlined />} title="Payment">
          <Menu.Item key="JobseekerPayments">
            <Link to="JobseekerPayments">Job Seeker Payment</Link>
          </Menu.Item>
          <Menu.Item key="JobPosterPayment">
            <Link to="JobPosterPayment">Job Poster Payment</Link>
          </Menu.Item>
        </Menu.SubMenu>

        <Menu.Item key="Revenue" icon={<PlusCircleOutlined />}>
          <Link to="Revenue">Revenue</Link>
        </Menu.Item>

        <Menu.Item key="Notification" icon={<BellOutlined />}>
          <Link to="Notification">Notification</Link>
        </Menu.Item>

        <Menu.Item key="UserProfile" icon={<SettingOutlined />}>
          <Link to="UserProfile">Account Settings</Link>
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default FinancialAdminSideBar;