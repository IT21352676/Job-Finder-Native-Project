import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

//pages
import AdminLayoutPage from './components/LayoutPage/LayoutPage';

import Dashboard from "./Pages/Dashboard/Dashboard";
import Notification from "./Pages/Notification/Notification";
import Payments from "./Pages/Payments/Payments";
import FinancialAdmins from "./Pages/Revenue/Revenue";
import LogHome from "./Pages/LogHome/LogHome";
import Signup from "./Pages/Signup/Signup";
import Verification from "./Pages/Verification/Verification";
import ForgotPassword from "./Pages/ForgotPassword/ForgotPassword";
import ChangePassword from "./Pages/ChangePassword/ChangePassword";
import FinancialAdminLogin from "./Pages/FinancialAdminLogin/FinancialAdminLogin";
import AdminProfile from "./Pages/AdminProfile/AdminProfile";

function App() {
    return (
        <Routes>
            <Route path="/" element={<LogHome />} />
            <Route path="/Dashboard" element={<Dashboard />} />
            <Route path="/LogHome" element={<LogHome />} />
            <Route path="/forgotpassword" element={<ForgotPassword />} />
            <Route path="/changepassword" element={<ChangePassword />} />
            <Route path="/financialadminloging" element={<FinancialAdminLogin />} />
            <Route path="/Signup" element={<Signup />} />
            <Route path="/Verification" element={<Verification /> } />                      
            <Route path="/Revenue" element={<FinancialAdmins />} />
            <Route path="/Notification" element={<Notification />} />
            <Route path="/Payments" element={<Payments />} />
            <Route path="/UserProfile" element={<AdminProfile/>}/> 

            <Route path='/profileadmin' element={<AdminLayoutPage />}/>                     
        </Routes>
    );
}

export default App;
