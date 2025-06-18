import React from "react";
import "./ProfileAdminLayoutPage.css";
import Header from "../../Common/AppHeader/Header";
import ProfileAdminSideBar from "../ProfileAdminSideBar/ProfileAdminSideBar";
import { Outlet } from "react-router-dom";

const ProfileAdminLayoutPage = () => {
  return (
    <div className="layout">
      <div className="header-box">
        <Header />
      </div>
      <div className="body">
        <div className="">
          <ProfileAdminSideBar />
        </div>
        <div className="content">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default ProfileAdminLayoutPage;
