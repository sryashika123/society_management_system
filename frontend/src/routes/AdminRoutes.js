import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from '../component/ProtectedRoute';
import Dashboard from '../roles/admin/Dashboard/Dashboard';
import Profile from '../roles/admin/Profile/Profile';
import EditProfile from '../roles/admin/EditProfile';
import ResidentManagement from '../roles/admin/ResidentManagement/Residentmanagement';
import OwnerForm from '../roles/admin/ResidentManagement/OwnerForm';
import TenantForm from '../roles/admin/ResidentManagement/TenantForm';
import FacilityManagement from '../roles/admin/FacilityManagement/FacilityManagement';
import CreateComplaint from '../roles/admin/ComplaintTracking/CreateComplaint';
import RequestTracking from '../roles/admin/ComplaintTracking/RequestTracking';
import VisitorsLogs from '../roles/admin/SecurityManagement/VisitorsLogs';
import SecurityProtocols from '../roles/admin/SecurityManagement/SecurityProtocols';
import SecurityGuard from '../roles/admin/SecurityGuard/SecurityGuard';
import FinancialManagementIncome from '../roles/admin/FinancialManagement/FinancialManagementIncome';
import FinancialManagementExp from '../roles/admin/FinancialManagement/FinancialManagementExp';
import FinancialManagementNote from '../roles/admin/FinancialManagement/FinancialManagementNote';
import FinancialManagementOtherIncome from '../roles/admin/FinancialManagement/FinancialManagementOtherIncome';
import Announcement from '../roles/admin/Announcement';

const AdminRoutes = () => (
  <Routes>
    <Route path="/dashboard" element={<ProtectedRoute role="admin"><Dashboard /></ProtectedRoute>} />
    <Route path="/profile" element={<ProtectedRoute role="admin"><Profile /></ProtectedRoute>} />
    <Route path="/edit-profile" element={<ProtectedRoute role="admin"><EditProfile /></ProtectedRoute>} />
    <Route path="/resident-management" element={<ProtectedRoute role="admin"><ResidentManagement /></ProtectedRoute>} />
    <Route path="/owner-form" element={<ProtectedRoute role="admin"><OwnerForm /></ProtectedRoute>} />
    <Route path="/tenant-form" element={<ProtectedRoute role="admin"><TenantForm /></ProtectedRoute>} />
    <Route path="/facility-management" element={<ProtectedRoute role="admin"><FacilityManagement /></ProtectedRoute>} />
    <Route path="/create-complaint" element={<ProtectedRoute role="admin"><CreateComplaint /></ProtectedRoute>} />
    <Route path="/request-tracking" element={<ProtectedRoute role="admin"><RequestTracking /></ProtectedRoute>} />
    <Route path="/visitors-log" element={<ProtectedRoute role="admin"><VisitorsLogs /></ProtectedRoute>} />
    <Route path="/security-protocols" element={<ProtectedRoute role="admin"><SecurityProtocols /></ProtectedRoute>} />
    <Route path="/security-guard" element={<ProtectedRoute role="admin"><SecurityGuard /></ProtectedRoute>} />
    <Route path="/financial-maintenance" element={<ProtectedRoute role="admin"><FinancialManagementIncome /></ProtectedRoute>} />
    <Route path="/other-income" element={<ProtectedRoute role="admin"><FinancialManagementOtherIncome /></ProtectedRoute>} />
    <Route path="/expense" element={<ProtectedRoute role="admin"><FinancialManagementExp /></ProtectedRoute>} />
    <Route path="/note" element={<ProtectedRoute role="admin"><FinancialManagementNote /></ProtectedRoute>} />
    <Route path="/announcement" element={<ProtectedRoute role="admin"><Announcement /></ProtectedRoute>} />
  </Routes>
);

export default AdminRoutes;
