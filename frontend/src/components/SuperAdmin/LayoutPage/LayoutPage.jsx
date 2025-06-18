import React from "react";
import "./LayoutPage.css";
import Header from "../../../components/Common/AppHeader/Header";
import AdminSideBar from "../SideBar/SuperAdminSideBar";
import { Outlet } from "react-router-dom";

const SuperAdminLayoutPage = () => {
  return (
    <div className="layout">
      <div className="header-box">
        <Header />
      </div>
      <div className="body">
        <div className="">
          <AdminSideBar />
        </div>
        <div className="content">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default SuperAdminLayoutPage;
