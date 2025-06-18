import { Route, Routes } from "react-router-dom";

//Common
import LogHome from "../../Pages/LogHome/LogHome";
import ForgotPassword from "../../Pages/Common/ForgotPassword/ForgotPassword";
import AdminProfile from "../../Pages/Common/AdminProfile/AdminProfile";
import LayoutPage from "../FinancialAdmin/LayoutPage/LayoutPage";

//Financial Admin
import Dashboard from "../../Pages/FinancialAdmin/Dashboard/Dashboard";
import Revenue from "../../Pages/FinancialAdmin/Revenue/Revenue";
import FinancialAdminLogin from "../../Pages/FinancialAdmin/FinancialAdminLogin/FinancialAdminLogin";

//Super Admin
import Signup from "../../Pages/SuperAdmin/Signup/Signup";
import Verification from "../../Pages/SuperAdmin/SignupVerification/SignupVerification";
import SuperAdminDashboard from "../../Pages/SuperAdmin/Dashboard/SuperAdminDashboard";
import SuperAdminLogin from "../../Pages/SuperAdmin/SuperAdminLogin/SuperAdminLogin";
import SuperAdminLayoutPage from "../SuperAdmin/LayoutPage/LayoutPage";

//Profile Admin
import ProfileAdminLayoutPage from '../ProfileAdmin/ProfileAdminLayoutPage/ProfileAdminLayoutPage';
import ProfileRequests from '../../Pages/ProfileAdmin/ProfileRequests/ProfileRequests';
import DeactivatedAccounts from '../../Pages/ProfileAdmin/DeactivatedAccounts/DeactivatedAccounts';
import ActiveViewComponent from '../../Pages/ProfileAdmin/ActiveViewComponent/ActiveViewComponent ';
import DeclinedViewComponent from '../../Pages/ProfileAdmin/DeclinedViewComponent/DeclinedViewComponent ';
import JobSeekerProfileRequests from '../../Pages/ProfileAdmin/JobSeekerProfileRequests/JobSeekerProfileRequests'
import JobSeekerActiveProfiles from '../../Pages/ProfileAdmin/JobSeekerActiveProfiles/JobSeekerActiveProfiles';
import JobSeekerDeclinedProfiles from '../../Pages/ProfileAdmin/JobSeekerDeclinedProfiles/JobSeekerDeclinedProfiles';
import JobSeekerDeactivatedProfiles from '../../Pages/ProfileAdmin/JobSeekerDeactivatedProfiles/JobSeekerDeactivatedProfiles';
import JobPosterRatings from '../../Pages/ProfileAdmin/JobPosterRatings/JobPosterRatings';
import JobSeekerRatings from '../../Pages/ProfileAdmin/JobSeekerRatings/JobSeekerRatings';
import ProfileAdminLogin from '../../Pages/ProfileAdmin/ProfileAdminLogin/ProfileAdminLogin';
import ProfileAdminDashboard from "../../Pages/ProfileAdmin/Dashboard/Dashboard";
import JobPosterPayment from "../../Pages/FinancialAdmin/Payments/JobPosterPayment";
import JobSeekerPayments from "../../Pages/FinancialAdmin/Payments/JobSeekerPayments";
import JobCancelRequests from "../../Pages/ProfileAdmin/JobCancelRequests/JobCancelRequests";


function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<LogHome />} />
            <Route path="/LogHome" element={<LogHome />} />
            <Route path="/forgotpassword" element={<ForgotPassword />} />
            <Route path="/financialadminloging" element={<FinancialAdminLogin />} />
            <Route path="/financialAdmin" element={<LayoutPage />}>
                <Route path="Dashboard" element={<Dashboard />} />
                <Route path="Revenue" element={<Revenue />} />
                <Route path="JobPosterPayment" element={<JobPosterPayment />} />
                <Route path="JobSeekerPayments" element={<JobSeekerPayments />} />               
                <Route path="UserProfile" element={<AdminProfile />} />
            </Route>

            <Route path="/SuperAdminLogin" element={<SuperAdminLogin />} />
            <Route path="/SuperAdmin" element={<SuperAdminLayoutPage />}>
                <Route path="SuperAdminDashboard" element={<SuperAdminDashboard />} />
                <Route path="SuperAdminUserProfile" element={<AdminProfile />} />
                <Route path="FinancialAdminRevenue" element={<Revenue />} />
                <Route path="JobPosterPayment" element={<JobPosterPayment />} />
                <Route path="JobSeekerPayments" element={<JobSeekerPayments />} /> 
                <Route path="Signup" element={<Signup />} />
                <Route path="Verification" element={<Verification />} />
                <Route path='profilerequests' element={<ProfileRequests />} />
                <Route path='jobeekeravgratings' element={<JobSeekerRatings />} />
                <Route path='jobposteravgratings' element={<JobPosterRatings />} />
                <Route path='viewactiveprofiles' element={<ActiveViewComponent />} />
                <Route path='viewdeclinedprofiles' element={<DeclinedViewComponent />} />
                <Route path='deactivatedprofile' element={<DeactivatedAccounts />} />
                <Route path='jobseekerrequests' element={<JobSeekerProfileRequests />} />
                <Route path='activejobseekers' element={<JobSeekerActiveProfiles />} />
                <Route path='declinedjobseekers' element={<JobSeekerDeclinedProfiles />} />
                <Route path='deactivatedjobseekers' element={<JobSeekerDeactivatedProfiles />} />
                <Route path='jobcancelrequests' element={<JobCancelRequests/>} />
                
            </Route>

            <Route path='/ProfileAdminLogin' element={<ProfileAdminLogin />}/>
            <Route path='/profileadmin' element={<ProfileAdminLayoutPage />}>
                <Route path='ProfileAdminDashboard' element={<ProfileAdminDashboard />} />
                <Route path='UserProfile' element={<AdminProfile />} />
                <Route path='profilerequests' element={<ProfileRequests />} />
                <Route path='jobeekeravgratings' element={<JobSeekerRatings />} />
                <Route path='jobposteravgratings' element={<JobPosterRatings />} />
                <Route path='viewactiveprofiles' element={<ActiveViewComponent />} />
                <Route path='viewdeclinedprofiles' element={<DeclinedViewComponent />} />
                <Route path='deactivatedprofile' element={<DeactivatedAccounts />} />
                <Route path='jobseekerrequests' element={<JobSeekerProfileRequests />} />
                <Route path='activejobseekers' element={<JobSeekerActiveProfiles />} />
                <Route path='declinedjobseekers' element={<JobSeekerDeclinedProfiles />} />
                <Route path='deactivatedjobseekers' element={<JobSeekerDeactivatedProfiles />} />
                <Route path='jobcancelrequests' element={<JobCancelRequests/>} />
            </Route>

        </Routes>
    );
}

export default AppRoutes;
