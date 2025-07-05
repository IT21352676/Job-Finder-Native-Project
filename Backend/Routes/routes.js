const express = require("express");
const router = express.Router();
const app = express();
const http = require("http");

// OTP routes
const verifyOtp = require("../Functions/Common/otp/verifyOtp");
const sendMailOtp = require("../Functions/Common/otp/sendMailOtp");

router.post("/verifyOtp", (req, res) => {
  verifyOtp(req, res);
});

router.post("/sendMailOtp", (req, res) => {
  sendMailOtp(req, res);
});

//Signup Process
const requestOtp = require("../Functions/SuperAdmin/SignupOtp/emailverification");
const verifyEmail = require("../Functions/SuperAdmin/SignupOtp/verifyEmail");
const saveUserRouter = require("../Functions/SuperAdmin/AdminRegister/saveUser");

router.post("/requestOtp", (req, res) => {
  requestOtp(req, res);
});

router.post("/verifyEmail", (req, res) => {
  verifyEmail(req, res);
});

router.post("/resendOtp", (req, res) => {
  requestOtp(req, res);
});

router.post("/saveUser", (req, res) => {
  saveUserRouter(req, res);
});

// Test routes
const getData = require("../Functions/Test/getData");
const postData = require("../Functions/Test/postData");
const deleteData = require("../Functions/Test/deleteData");
const updateData = require("../Functions/Test/updateData");

router.get("/getData", (req, res) => {
  getData(req, res);
});

router.post("/addData", (req, res) => {
  postData(req, res);
});

router.delete("/deleteData", (req, res) => {
  deleteData(req, res);
});

router.put("/putData", (req, res) => {
  updateData(req, res);
});

// Super Admin routes
const adminRegister = require("../Functions/SuperAdmin/AdminRegister/register");
const FinancialAdminLogin = require("../Functions/FinancialAdmin/FinancialAdminLogin/FinancialAdminLogin");
const resetPassword = require("../Functions/Common/ResetPassword/ResetPassword");
const FetchAdminProfile = require("../Functions/Common/FetchAdminProfile/FetchAdminProfile");
const UpdateAdminProfile = require("../Functions/Common/UpdateAdminProfile/UpdateAdminProfile");
const updateAdminPassword = require("../Functions/Common/UpdateAdminPassword/UpdateAdminPassword");
const SuperAdminLogin = require("../Functions/SuperAdmin/SuperAdminLogin/SuperAdminLogin");
const adminCount = require("../Functions/SuperAdmin/AdminCount/AdminCount");
const jobCount = require("../Functions/SuperAdmin/JobCount/JobCount");
const GetAdminList = require("../Functions/SuperAdmin/GetAdminList/getAdminList");
const UpdateAdminStatus = require("../Functions/SuperAdmin/UpdateAdminStatus/UpdateAdminStatus");

router.post("/register", (req, res) => {
  adminRegister(req, res);
});

router.post("/financial-admin-login", (req, res) => {
  FinancialAdminLogin(req, res);
});

router.post("/super-admin-login", (req, res) => {
  SuperAdminLogin(req, res);
});

router.post("/reset-password", (req, res) => {
  resetPassword(req, res);
});

router.get("/get-admin-data", (req, res) => {
  FetchAdminProfile(req, res);
});

router.put("/update-admin", (req, res) => {
  UpdateAdminProfile(req, res);
});

router.put("/update-admin-password", (req, res) => {
  updateAdminPassword(req, res);
});

router.get("/get-admin-count", (req, res) => {
  adminCount(req, res);
});

router.get("/get-job-count", (req, res) => {
  jobCount(req, res);
});

router.get("/get-admin-list", (req, res) => {
  GetAdminList(req, res);
});

router.put("/update-admin-status", (req, res) => {
  UpdateAdminStatus(req, res);
});

// Financial routes
const fetchFinancialData = require("../Functions/FinancialAdmin/FinancialFunctions/FetchFinancialData");
const FetchFinancialDataJobSeeker = require("../Functions/FinancialAdmin/FinancialFunctions/FetchFinancialDataJobSeeker");
const GetPaymetData = require("../Functions/FinancialAdmin/FinancialFunctions/GetPaymetData");
const getGroupedIncome = require("../Functions/FinancialAdmin/FinancialFunctions/GetGroupedIncome");
const getMonthlyIncome = require("../Functions/FinancialAdmin/FinancialFunctions/GetMonthlyIncome");
const GetMonthlyRevenue = require("../Functions/FinancialAdmin/FinancialFunctions/GetMonthlyRevenue");
const GetGroupedRevenue = require("../Functions/FinancialAdmin/FinancialFunctions/GetGroupedRevenue");
// const generateFinancialReport = require('../Functions/FinancialAdmin/GeneratePdf/GeneratePdf');

router.get("/getFinancialData", (req, res) => {
  fetchFinancialData(req, res);
});

router.get("/getFinancialDataJobSeeker", (req, res) => {
  FetchFinancialDataJobSeeker(req, res);
});

router.get("/paymentdata", (req, res) => {
  GetPaymetData(req, res);
});

router.get("/groupedincome", (req, res) => {
  getGroupedIncome(req, res);
});

router.get("/monthlyincome", (req, res) => {
  getMonthlyIncome(req, res);
});

router.get("/monthlyrevenue", (req, res) => {
  GetMonthlyRevenue(req, res);
});

router.get("/groupedrevenue", (req, res) => {
  GetGroupedRevenue(req, res);
});

// router.post('/generate-pdf', (req, res) => {
//   generateFinancialReport(req, res);
// });

//Profile Admin
const jobPosterRequests = require("../Functions/ProfileAdmin/JobPosterRequests/JobPosterRequests");
const declineRequest = require("../Functions/ProfileAdmin/DeclineRequest/DeclineRequest");
const acceptJobPosterRequest = require("../Functions/ProfileAdmin/AcceptJobPosterRequest/AcceptJobPosterRequest");
const declinedAccounts = require("../Functions/ProfileAdmin/DeclinedAccounts/DeclinedAccounts");
const activeAccounts = require("../Functions/ProfileAdmin/ActiveAccounts/ActiveAccounts");
const getHoldAccounts = require("../Functions/ProfileAdmin/GetHoldAccounts/GetHoldAccounts");
const activateAccount = require("../Functions/ProfileAdmin/ActivateAccount/ActivateAccount");
const deactivateAccount = require("../Functions/ProfileAdmin/DeactivateAccount/DeactivateAccount");
const declineJobSeekerRequest = require("../Functions/ProfileAdmin/DeclineJobSeekerRequest/DeclineJobSeekerRequest");
const jobSeekerRequests = require("../Functions/ProfileAdmin/JobSeekerRequests/JobSeekerRequests");
const acceptJobSeekerRequest = require("../Functions/ProfileAdmin/AcceptJobSeekerRequest/AcceptJobSeekerRequest");
const getActiveJobSeekers = require("../Functions/ProfileAdmin/GetActiveJobSeekers/GetActiveJobSeekers");
const getDeclinedJobSeekrs = require("../Functions/ProfileAdmin/GetDeclinedJobSeekers/GetDeclinedJobSeekers");
const getDeactivatedJobSeekers = require("../Functions/ProfileAdmin/GetDeactivatedJobSeekers/GetDeactivatedJobSeeker");
const activateJobSeeker = require("../Functions/ProfileAdmin/ActivateJobSeeker/ActivateJobSeeker");
const deactivateJobseeker = require("../Functions/ProfileAdmin/DeactivateJobSeeker/DeactivateJobSeeker");
const getJobPoterAvgRatings = require("../Functions/ProfileAdmin/GetJobPosterAvgRatings/GetJobPosterAvgRatings");
const getJobSeekerAvgRatings = require("../Functions/ProfileAdmin/GetJobSeekerRatings/GetJobSeekerAvgRatings");
const profileAdminLogin = require("../Functions/ProfileAdmin/ProfileAdminLogin/ProfileAdminLogin");
const countJPApprovedJobs = require("../Functions/ProfileAdmin/AJPCount/AJPCount");
const countJSApprovedJobs = require("../Functions/ProfileAdmin/AJSCount/AJSCount");
const countJPDeclinedJobs = require("../Functions/ProfileAdmin/DJPCount/DJPCount");
const countJSDeclinedJobs = require("../Functions/ProfileAdmin/DJSCount/DJSCount");
const countJobHandlingRequest = require("../Functions/ProfileAdmin/JobHandlingRequest/JobHandlingRequest");
const totalrequestCount = require("../Functions/ProfileAdmin/TotalProfileRequest/TotalProfileRequest");
const getJobCancelRequests = require("../Functions/ProfileAdmin/GetJobCancelRequests/GetJobCancelRequests");
const approveJobCancelRequest = require("../Functions/ProfileAdmin/ApproveJobCancelRequest/ApproveJobCancelRequest");
const rejectJobCancelRequest = require("../Functions/ProfileAdmin/RejectJobCancelRequest/RejectJobCancelRequest");

router.get("/jobposterrequests", (req, res) => {
  jobPosterRequests(req, res);
});

router.put("/declinerequest/:id", (req, res) => {
  declineRequest(req, res);
});

router.put("/acceptrequest/:id", (req, res) => {
  acceptJobPosterRequest(req, res);
});

router.get("/declinedaccounts", (req, res) => {
  declinedAccounts(req, res);
});

router.get("/activeaccounts", (req, res) => {
  activeAccounts(req, res);
});

router.get("/getholdedaccounts", (req, res) => {
  getHoldAccounts(req, res);
});

router.put("/activateaccount/:id", (req, res) => {
  activateAccount(req, res);
});

router.put("/deactivateaccount/:id", (req, res) => {
  deactivateAccount(req, res);
});

router.get("/getjobseekerrequests", (req, res) => {
  jobSeekerRequests(req, res);
});

router.put("/declinejobseeker/:id", (req, res) => {
  declineJobSeekerRequest(req, res);
});

router.put("/acceptjobseekerrequest/:id", (req, res) => {
  acceptJobSeekerRequest(req, res);
});

router.get("/activejobseerkers", (req, res) => {
  getActiveJobSeekers(req, res);
});

router.get("/declinedjobseerkers", (req, res) => {
  getDeclinedJobSeekrs(req, res);
});

router.get("/getdeactivatedseekers", (req, res) => {
  getDeactivatedJobSeekers(req, res);
});

router.put("/activateseeker/:id", (req, res) => {
  activateJobSeeker(req, res);
});

router.put("/deactivateseeker/:id", (req, res) => {
  deactivateJobseeker(req, res);
});

router.get("/job-poster-avg-ratings", (req, res) => {
  getJobPoterAvgRatings(req, res);
});

router.get("/job-seeker-avg-ratings", (req, res) => {
  getJobSeekerAvgRatings(req, res);
});

router.post("/profile-admin-login", (req, res) => {
  profileAdminLogin(req, res);
});

router.get("/approved-jobposters-count", (req, res) => {
  countJPApprovedJobs(req, res);
});

router.get("/approved-jobseekers-count", (req, res) => {
  countJSApprovedJobs(req, res);
});

router.get("/declined-jobposters-count", (req, res) => {
  countJPDeclinedJobs(req, res);
});

router.get("/declined-jobseekers-count", (req, res) => {
  countJSDeclinedJobs(req, res);
});

router.get("/jobhandlingrequest", (req, res) => {
  countJobHandlingRequest(req, res);
});

router.get("/totalrequestCount", (req, res) => {
  totalrequestCount(req, res);
});

router.get("/job-cancel-requests", (req, res) => {
  getJobCancelRequests(req, res);
});

router.put("/approve-job-cancel-request", (req, res) => {
  approveJobCancelRequest(req, res);
});

router.delete("/reject-job-cancel-request", (req, res) => {
  rejectJobCancelRequest(req, res);
});

// AI features routes

const generateJobRecommendations = require("../Functions/AIFeatures/JobRecommendation");
const generateUserRecommendations = require("../Functions/AIFeatures/UserRecommendation");

router.post("/job-recommandation", (req, res) => {
  generateJobRecommendations(req, res);
});

router.post("/user-recommandation", (req, res) => {
  generateUserRecommendations(req, res);
});

module.exports = router;
