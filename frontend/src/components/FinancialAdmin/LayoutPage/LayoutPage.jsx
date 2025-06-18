import React from "react";
import "./LayoutPage.css";
import Header from "../../Common/AppHeader/Header";
import FinancialAdminSideBar from "../SideBar/AdminSideBar";
import { Outlet } from "react-router-dom";

const LayoutPage = () => {
  return (
    <div className="layout">
      <div className="header-box">
        <Header />
      </div>
      <div className="body">
        <div className="">
          <FinancialAdminSideBar />
        </div>
        <div className="content">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default LayoutPage;
