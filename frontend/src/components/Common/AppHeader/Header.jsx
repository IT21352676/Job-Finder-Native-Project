import React, { useEffect, useState } from "react";
import axios from "axios";
import { UserOutlined, LogoutOutlined } from '@ant-design/icons';
import { Dropdown, Menu, Space, Button, Avatar } from "antd";
import "./Header.css";
import logo from '../../../Assets/Union.png';

const Header = () => {
  const [userData, setUserData] = useState({});
  const [dropdownVisible, setDropdownVisible] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      const email = sessionStorage.getItem("email");
      try {
        const response = await axios.get('http://localhost:8000/get-admin-data', { params: { email } });
        setUserData(response.data);
      } catch (error) {
        console.error("Error fetching user data", error);
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = () => {
    sessionStorage.clear();
    window.location.href = "/";
  };

  const menu = (
    <Menu className="user-menu">
      <Menu.Item key="1" className="user-menu-item">
        <UserOutlined /> {userData.FirstName} {userData.LastName}
      </Menu.Item>
      <Menu.Item key="2" className="user-menu-item">
        <strong>Role:</strong> {userData.AdminRole}
      </Menu.Item>
      <Menu.Item key="3" className="user-menu-item">
        <strong>Email:</strong> {userData.Email}
      </Menu.Item>
    </Menu>
  );

  return (
    <header className="header-container">
      <div className="logo">
        <img src={logo} alt="Company Logo" />
      </div>

      <div className="header-right">
        <Dropdown
          overlay={menu}
          visible={dropdownVisible}
          onVisibleChange={(flag) => setDropdownVisible(flag)}
          trigger={['click']}
        >
          <Space className="user-profile">
            <Avatar icon={<UserOutlined />} className="user-avatar" />
            <span className="user-name">{userData.FirstName} {userData.LastName}</span>
          </Space>
        </Dropdown>
        <Button
          type="primary"
          icon={<LogoutOutlined />}
          onClick={handleLogout}
          className="logout-button"
        >
          Logout
        </Button>
      </div>
    </header>
  );
};

export default Header;