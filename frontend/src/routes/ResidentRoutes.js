import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from '../component/ProtectedRoute';
import Dashboard from '../roles/admin/Dashboard/Dashboard';
import EventParticipation from '../roles/resident/Eventparticipate/EventParticipation';
import ActivityParticipate from '../roles/resident/Eventparticipate/ActivityParticipate';
import PersonalDetail from '../roles/resident/Personal Details/PersonalDetails';
import TenantPersonalDetails from '../roles/resident/Personal Details/TenentPersonalDetails';
import SecurityProtocolsResident from '../roles/resident/SecurityProtocolsResident';
import ServiceComplaint from '../roles/resident/Service and Complaint/ServiceComplaint';
import RequestSubmission from '../roles/resident/Service and Complaint/RequestSubmission';
import MaintainanceInvoice from '../roles/resident/Payment Portal/MaintainanceInvoice';
import OtherIncomeInvoices from '../roles/resident/Payment Portal/OtherIncome';
import ViewInvoice from '../roles/resident/ViewInvoice';
import ChatLayout from '../roles/resident/Chatapp/Access';
import Polls from '../roles/resident/Chatapp/Polls';
import CommunitiesDiscussion from '../roles/resident/CommumitiesDiscussion';
import CommunityQuestion from '../roles/resident/CommunityQuestion';

const ResidentRoutes = () => (
  <Routes>
    <Route path="/dashboard" element={<ProtectedRoute role="resident"><Dashboard /></ProtectedRoute>} />
    <Route path="/events-and-participation" element={<ProtectedRoute role="resident"><EventParticipation /></ProtectedRoute>} />
    <Route path="/activity-and-participation" element={<ProtectedRoute role="resident"><ActivityParticipate /></ProtectedRoute>} />
    <Route path="/personal-details" element={<ProtectedRoute role="resident"><PersonalDetail /></ProtectedRoute>} />
    <Route path="/personal-details-tenant" element={<ProtectedRoute role="resident"><TenantPersonalDetails /></ProtectedRoute>} />
    <Route path="/resident-protocols" element={<ProtectedRoute role="resident"><SecurityProtocolsResident /></ProtectedRoute>} />
    <Route path="/service-and-complaint" element={<ProtectedRoute role="resident"><ServiceComplaint /></ProtectedRoute>} />
    <Route path="/request-and-submission" element={<ProtectedRoute role="resident"><RequestSubmission /></ProtectedRoute>} />
    <Route path="/maintenance-invoices" element={<ProtectedRoute role="resident"><MaintainanceInvoice /></ProtectedRoute>} />
    <Route path="/other-income-invoice" element={<ProtectedRoute role="resident"><OtherIncomeInvoices /></ProtectedRoute>} />
    <Route path="/view-invoice" element={<ProtectedRoute role="resident"><ViewInvoice /></ProtectedRoute>} />
    <Route path="/access" element={<ProtectedRoute role="resident"><ChatLayout /></ProtectedRoute>} />
    <Route path="/polls" element={<ProtectedRoute role="resident"><Polls /></ProtectedRoute>} />
    <Route path="/community-discussion" element={<ProtectedRoute role="resident"><CommunitiesDiscussion /></ProtectedRoute>} />
    <Route path="/community-question" element={<ProtectedRoute role="resident"><CommunityQuestion /></ProtectedRoute>} />
  </Routes>
);

export default ResidentRoutes;
