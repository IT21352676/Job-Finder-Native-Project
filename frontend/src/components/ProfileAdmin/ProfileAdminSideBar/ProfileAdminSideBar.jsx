import React, { useState } from "react";
import { Layout, Menu } from "antd";
import { Link } from "react-router-dom";
import {
  ProfileOutlined,
  EyeOutlined,
  SettingOutlined,
  DashboardOutlined,
  CloseCircleOutlined
} from "@ant-design/icons";
import Logo from "../../Common/Logo/Logo";
import "./ProfileAdminSideBar.css";

const { Sider } = Layout;

const ProfileAdminSideBar = () => {
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
      <Menu mode="inline" className="menu-bar" theme="dark">
        <Menu.Item key="ProfileAdminDashboard" icon={<DashboardOutlined />}>
          <Link to="ProfileAdminDashboard">Dashboard</Link>
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
        </Menu.SubMenu>

        <Menu.Item key="job-cancel-requests" icon={<CloseCircleOutlined />}>
          <Link to="jobcancelrequests">Job Cancel Requests</Link>
        </Menu.Item>

        <Menu.Item key="UserProfile" icon={<SettingOutlined />}>
          <Link to="UserProfile">Account Settings</Link>
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default ProfileAdminSideBar;