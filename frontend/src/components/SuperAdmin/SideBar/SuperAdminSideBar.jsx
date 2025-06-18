import React, { useState } from "react";
import "./SuperAdminSideBar.css";
import Logo from "../../Common/Logo/Logo";
import {
  DashboardOutlined,
  DollarOutlined,
  PlusCircleOutlined,
  SettingOutlined,
  UserAddOutlined,
  ProfileOutlined,
  EyeOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import { Link } from "react-router-dom";

const { Sider } = Layout;

const SuperAdminSideBar = () => {
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
        <Menu.Item key="SuperAdminDashboard" icon={<DashboardOutlined />}>
          <Link to="SuperAdminDashboard">Dashboard</Link>
        </Menu.Item>
        
        <Menu.Item key="Signup" icon={<UserAddOutlined />}>
          <Link to="Signup">Admin Register</Link>
        </Menu.Item>

        <Menu.SubMenu key="Payment" icon={<DollarOutlined />} title="Payment">
          <Menu.Item key="JobseekerPayments">
            <Link to="JobseekerPayments">Job Seeker Payment</Link>
          </Menu.Item>
          <Menu.Item key="JobPosterPayment">
            <Link to="JobPosterPayment">Job Poster Payment</Link>
          </Menu.Item>
        </Menu.SubMenu>

        <Menu.Item key="FinancialAdminRevenue" icon={<PlusCircleOutlined />}>
          <Link to="FinancialAdminRevenue">Revenue</Link>
        </Menu.Item>

        <Menu.SubMenu key="profile" icon={<ProfileOutlined />} title="Job Posters">
          <Menu.Item key="profile-requests">
            <Link to="profilerequests">Account Requests</Link>
          </Menu.Item>
          <Menu.Item key="view-active-profiles">
            <Link to="viewactiveprofiles">Active Profiles</Link>
          </Menu.Item>
          <Menu.Item key="view-declined-profiles">
            <Link to="viewdeclinedprofiles">Declined Profiles</Link>
          </Menu.Item>
          <Menu.Item key="deactivated-profiles">
            <Link to="deactivatedprofile">Deactivated Profiles</Link>
          </Menu.Item>
        </Menu.SubMenu>

        <Menu.SubMenu key="seeker-profile" icon={<ProfileOutlined />} title="Job Seekers">
          <Menu.Item key="seeker-profile-requests">
            <Link to="jobseekerrequests">Account Requests</Link>
          </Menu.Item>
          <Menu.Item key="seeker-view-active-profiles">
            <Link to="activejobseekers">Active Profiles</Link>
          </Menu.Item>
          <Menu.Item key="seeker-view-declined-profiles">
            <Link to="declinedjobseekers">Declined Profiles</Link>
          </Menu.Item>
          <Menu.Item key="seeker-deactivated-profiles">
            <Link to="deactivatedjobseekers">Deactivated Profiles</Link>
          </Menu.Item>
        </Menu.SubMenu>

        <Menu.SubMenu key="review" icon={<EyeOutlined />} title="Review">
          <Menu.Item key="see-review">
            <Link to="jobeekeravgratings">Job Seeker Ratings</Link>
          </Menu.Item>
          <Menu.Item key="review-hold">
            <Link to="jobposteravgratings">Job Poster Ratings</Link>
          </Menu.Item>
          <Menu.Item key="delete-review">
            <Link to="deletereview">Delete Review</Link>
          </Menu.Item>
        </Menu.SubMenu>
        <Menu.Item key="job-cancel-requests" icon={<CloseCircleOutlined />}>
          <Link to="jobcancelrequests">Job Cancel Requests</Link>
        </Menu.Item>

        <Menu.Item key="SuperAdminUserProfile" icon={<SettingOutlined />}>
          <Link to="SuperAdminUserProfile">Account Settings</Link>
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default SuperAdminSideBar;