// import React, { useState } from 'react';
// import { Routes, Route, Navigate, BrowserRouter } from 'react-router-dom';
// import Login from './component/Login';
// import ForgotPassword from './component/ForgotPassword';
// import EnterOtp from './component/EnterOtp';
// import ResetPassword from './component/ResetPassword';
// import Signup from './component/Signup.js';
// import Dashboard from './roles/admin/Dashboard/Dashboard';
// import ResidentManagement from './roles/admin/ResidentManagement/Residentmanagement';
// import OwnerForm from './roles/admin/ResidentManagement/OwnerForm';
// import FacilityManagement from './roles/admin/FacilityManagement/FacilityManagement';
// import CreateComplaint from './roles/admin/ComplaintTracking/CreateComplaint';
// import RequestTracking from './roles/admin/ComplaintTracking/RequestTracking';
// import VisitorsLogs from './roles/admin/SecurityManagement/VisitorsLogs';
// import SecurityProtocols from './roles/admin/SecurityManagement/SecurityProtocols';
// import SecurityGuard from './roles/admin/SecurityGuard/SecurityGuard';
// import Profile from './roles/admin/Profile/Profile';
// import EditProfile from './roles/admin/EditProfile.js';
// import FinancialManagementIncome from './roles/admin/FinancialManagement/FinancialManagementIncome';
// import FinancialManagementExp from './roles/admin/FinancialManagement/FinancialManagementExp.js';
// import FinancialManagementNote from './roles/admin/FinancialManagement/FinancialManagementNote';
// import FinancialManagementOtherIncome from './roles/admin/FinancialManagement/FinancialManagementOtherIncome';
// import Announcement from './roles/admin/Announcement';
// import VisitorsTracking from './roles/security/VisitorsTracking';
// import EmergencyManagement from './roles/security/EmergencyManagement';
// import EventParticipation from './roles/resident/Eventparticipate/EventParticipation';
// import ActivityParticipate from './roles/resident/Eventparticipate/ActivityParticipate';
// import PersonalDetail from './roles/resident/Personal Details/PersonalDetails';
// import TenantPersonalDetails from './roles/resident/Personal Details/TenentPersonalDetails';
// import SecurityProtocolsResident from './roles/resident/SecurityProtocolsResident';
// import ServiceComplaint from './roles/resident/Service and Complaint/ServiceComplaint';
// import RequestSubmission from './roles/resident/Service and Complaint/RequestSubmission';
// import MaintainanceInvoice from './roles/resident/Payment Portal/MaintainanceInvoice';
// import OtherIncomeInvoices from './roles/resident/Payment Portal/OtherIncome';
// import ViewInvoice from './roles/resident/ViewInvoice';
// import ChatLayout from './roles/resident/Chatapp/Access';
// import Polls from './roles/resident/Chatapp/Polls';
// import CommunitiesDiscussion from './roles/resident/CommumitiesDiscussion';
// import CommunityQuestion from './roles/resident/CommunityQuestion';
// import TenantForm from './roles/admin/ResidentManagement/TenantForm';
// import ProtectedRoute from './component/ProtectedRoute.js';
// import Unauthorized from './component/Unauthorized';

// function App() {
//   const [userRole, setUserRole] = useState(''); // Login pachi role set thase

//   const renderRoutes = () => {
//     switch (userRole) {
//       case 'admin':
//         return (
//           <Routes>
//             <Route path="/dashboard" element={<ProtectedRoute role="admin"><Dashboard /></ProtectedRoute>} />
//             <Route path="/profile" element={<ProtectedRoute role="admin"><Profile /></ProtectedRoute>} />
//             <Route path="/EditProfile" element={<ProtectedRoute role="admin"><EditProfile /></ProtectedRoute>} />
//             <Route path="/residentmanagement" element={<ProtectedRoute role="admin"><ResidentManagement /></ProtectedRoute>} />
//             <Route path="/ownerform" element={<ProtectedRoute role="admin"><OwnerForm /></ProtectedRoute>} />
//             <Route path='/tenant-form' element={<ProtectedRoute role="admin"><TenantForm /></ProtectedRoute>} />
//             <Route path="/facility-management" element={<ProtectedRoute role="admin"><FacilityManagement /></ProtectedRoute>} />
//             <Route path="/create-complaint" element={<ProtectedRoute role="admin"><CreateComplaint /></ProtectedRoute>} />
//             <Route path="/request-tracking" element={<ProtectedRoute role="admin"><RequestTracking /></ProtectedRoute>} />
//             <Route path="/visitors-log" element={<ProtectedRoute role="admin"><VisitorsLogs /></ProtectedRoute>} />
//             <Route path="/security-protocols" element={<ProtectedRoute role="admin"><SecurityProtocols /></ProtectedRoute>} />
//             <Route path="/security-guard" element={<ProtectedRoute role="admin"><SecurityGuard /></ProtectedRoute>} />
//             <Route path="/Financial-Maintenanace" element={<ProtectedRoute role="admin"><FinancialManagementIncome /></ProtectedRoute>} />
//             <Route path="/Other-Income" element={<ProtectedRoute role="admin"><FinancialManagementOtherIncome /></ProtectedRoute>} />
//             <Route path="/Expense" element={<ProtectedRoute role="admin"><FinancialManagementExp /></ProtectedRoute>} />
//             <Route path="/Note" element={<ProtectedRoute role="admin"><FinancialManagementNote /></ProtectedRoute>} />
//             <Route path="/announcement" element={<ProtectedRoute role="admin"><Announcement /></ProtectedRoute>} />
//           </Routes>
//         );
//       case 'resident':
//         return (
//           <Routes>
//             <Route path="/dashboard" element={<ProtectedRoute role="resident"><Dashboard /></ProtectedRoute>} />
//             <Route path='/events-and-participation' element={<ProtectedRoute role="resident"><EventParticipation /></ProtectedRoute>} />
//             <Route path='/activity-and-participation' element={<ProtectedRoute role="resident"><ActivityParticipate /></ProtectedRoute>} />
//             <Route path='/personal-details' element={<ProtectedRoute role="resident"><PersonalDetail /></ProtectedRoute>} />
//             <Route path='/personal-details-tenant' element={<ProtectedRoute role="resident"><TenantPersonalDetails /></ProtectedRoute>} />
//             <Route path='/Resident-Protocols' element={<ProtectedRoute role="resident"><SecurityProtocolsResident /></ProtectedRoute>} />
//             <Route path='/service-and-complaint' element={<ProtectedRoute role="resident"><ServiceComplaint /></ProtectedRoute>} />
//             <Route path='/request-and-submission' element={<ProtectedRoute role="resident"><RequestSubmission /></ProtectedRoute>} />
//             <Route path='/maintenance-invoices' element={<ProtectedRoute role="resident"><MaintainanceInvoice /></ProtectedRoute>} />
//             <Route path='/other-income-nvoice' element={<ProtectedRoute role="resident"><OtherIncomeInvoices /></ProtectedRoute>} />
//             <Route path='/view-invoice' element={<ProtectedRoute role="resident"><ViewInvoice /></ProtectedRoute>} />
//             <Route path='/Access' element={<ProtectedRoute role="resident"><ChatLayout /></ProtectedRoute>} />
//             <Route path='/Polls' element={<ProtectedRoute role="resident"><Polls /></ProtectedRoute>} />
//             <Route path='/Community-Discussion' element={<ProtectedRoute role="resident"><CommunitiesDiscussion /></ProtectedRoute>} />
//             <Route path='/Community-Question' element={<ProtectedRoute role="resident"><CommunityQuestion /></ProtectedRoute>} />
//           </Routes>
//         );
//       case 'security':
//         return (
//           <Routes>
//             <Route path='/visitor-tracking' element={<ProtectedRoute role="security"><VisitorsTracking /></ProtectedRoute>} />
//             <Route path="/emergency-management" element={<ProtectedRoute role="security"><EmergencyManagement /></ProtectedRoute>} />
//           </Routes>
//         );
//       default:
//         return (
//           <Route path="*" element={<Navigate to="/" />} />
//         );
//     }
//   };

//   return (
//     <BrowserRouter> {/* Only one BrowserRouter at the root level */}
//       <Routes>
//         <Route path="/" element={<Login />} />
//         <Route path="/signup" element={<Signup />} />
//         <Route path="/forgot-password" element={<ForgotPassword />} />
//         <Route path="/enter-otp" element={<EnterOtp />} />
//         <Route path="/reset-password" element={<ResetPassword />} />
//         <Route path="/unauthorized" element={<Unauthorized />} />
//         {renderRoutes()}
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;


// import React, { useState } from 'react';
// import { Routes, Route, Navigate, BrowserRouter } from 'react-router-dom';
// import Login from './component/Login';
// import Signup from './component/Signup';
// import ForgotPassword from './component/ForgotPassword';
// import EnterOtp from './component/EnterOtp';
// import ResetPassword from './component/ResetPassword';
// import Unauthorized from './component/Unauthorized';
// import ProtectedRoute from './component/ProtectedRoute';

// // Importing Routes for Each Role
// import AdminRoutes from './routes/AdminRoutes';
// import ResidentRoutes from './routes/ResidentRoutes';
// import SecurityRoutes from './routes/SecurityRoutes';

// function App() {
//   const [userRole, setUserRole] = useState(''); // Store user role after login

//   // Function to determine role-based routes
//   const renderRoleBasedRoutes = () => {
//     switch (userRole) {
//       case 'admin':
//         return <AdminRoutes />;
//       case 'resident':
//         return <ResidentRoutes />;
//       case 'security':
//         return <SecurityRoutes />;
//       default:
//         return <Route path="*" element={<Navigate to="/" />} />;
//     }
//   };

//   return (
//     <BrowserRouter>
//       <Routes>
//         {/* Public Routes */}
//         <Route path="/" element={<Login />} />
//         <Route path="/signup" element={<Signup />} />
//         <Route path="/forgot-password" element={<ForgotPassword />} />
//         <Route path="/enter-otp" element={<EnterOtp />} />
//         <Route path="/reset-password" element={<ResetPassword />} />
//         <Route path="/unauthorized" element={<Unauthorized />} />

//         {/* Role-Based Routes */}
//         {renderRoleBasedRoutes()}
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;

import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './component/Login';
import ForgotPassword from './component/ForgotPassword'; // Create this component
import 'bootstrap/dist/css/bootstrap.min.css';
import EnterOtp from './component/EnterOtp';
import ResetPassword from './component/ResetPassword';
import Home from './pages/Home';
import Signup from './component/Signup.js'
function App() {
  return (
    <div className="d-flex">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route element={<Signup />} path='/signup' />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/enter-otp" element={<EnterOtp />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/home/*" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
