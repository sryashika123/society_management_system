import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import ResidentManagement from "../roles/admin/ResidentManagement/Residentmanagement";
import Sidebar from "../component/Layout/Sidebar";
// import ResidentForm from "../component/ResidentManagement/ResidentForm";
import FacilityManagement from "../roles/admin/FacilityManagement/FacilityManagement";
import CreateComplaint from "../roles/admin/ComplaintTracking/CreateComplaint";
import RequestTracking from "../roles/admin/ComplaintTracking/RequestTracking";
import VisitorsLogs from "../roles/admin/SecurityManagement/VisitorsLogs";  
import SecurityProtocols from "../roles/admin/SecurityManagement/SecurityProtocols";
import SecurityGuard from "../roles/admin/SecurityGuard/SecurityGuard";
import Dashboard from "../roles/admin/Dashboard/Dashboard";
import FinancialManagementIncome from "../roles/admin/FinancialManagement/FinancialManagementIncome";
import FinancialManagementExp from "../roles/admin/FinancialManagement/FinancialManagementExp";
import FinancialManagementNote from "../roles/admin/FinancialManagement/FinancialManagementNote";
import Profile from "../roles/admin/Profile/Profile";
import EditProfile from "../roles/admin/EditProfile";
import FinancialManagementOtherIncome from "../roles/admin/FinancialManagement/FinancialManagementOtherIncome";
import Announcement from "../roles/admin/Announcement";
import VisitorsTracking from "../roles/security/VisitorsTracking";
import EmergencyManagement from "../roles/security/EmergencyManagement";
import EventParticipation from "../roles/resident/Eventparticipate/EventParticipation";
import ActivityParticipate from "../roles/resident/Eventparticipate/ActivityParticipate";
import PersonalDetail from "../roles/resident/Personal Details/PersonalDetails";
import TenantPersonalDetails from "../roles/resident/Personal Details/TenentPersonalDetails";
import SecurityProtocolsResident from "../roles/resident/SecurityProtocolsResident";
import ServiceComplaint from "../roles/resident/Service and Complaint/ServiceComplaint";
import RequestSubmission from "../roles/resident/Service and Complaint/RequestSubmission";
import MaintainanceInvoice from "../roles/resident/Payment Portal/MaintainanceInvoice";
import OtherIncomeInvoices from "../roles/resident/Payment Portal/OtherIncome";
import ViewInvoice from "../roles/resident/ViewInvoice";
import ChatLayout from "../roles/resident/Chatapp/Access";
import Polls from "../roles/resident/Chatapp/Polls";
import OwnerForm from "../roles/admin/ResidentManagement/OwnerForm";
import TenantForm from "../roles/admin/ResidentManagement/TenantForm";
import CommunitiesDiscussion from "../roles/resident/CommumitiesDiscussion";
import CommunityQuestion from "../roles/resident/CommunityQuestion";


const Home = () => {
  const [userRole, setUserRole] = useState(''); // Login pachi role set thase

  return <div>
    <Sidebar />

    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/residentmanagement" element={<ResidentManagement />} />
      <Route path="/ownerform" element={<OwnerForm />} />
      <Route path="/facility-management" element={<FacilityManagement />} />
      <Route path="/create-complaint" element={<CreateComplaint />} />
      <Route path="/request-tracking" element={<RequestTracking />} />
      <Route path="/visitors-log" element={<VisitorsLogs />} />
      <Route path="/security-protocols" element={<SecurityProtocols />} />
      <Route path="/security-guard" element={<SecurityGuard />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/EditProfile" element={<EditProfile />} />
      <Route path="/Financial-Maintenanace" element={<FinancialManagementIncome />} />
      <Route path="/Other-Income" element={<FinancialManagementOtherIncome />} />
      <Route path="/Expense" element={<FinancialManagementExp />} />
      <Route path="/Note" element={<FinancialManagementNote />} />
      <Route path="/announcement" element={<Announcement />} />
      <Route path='/visitor-tracking' element={<VisitorsTracking />} />
      <Route path='/emergency-management' element={<EmergencyManagement />} />
      <Route path='/events-and-participation' element={<EventParticipation />} />
      <Route path='/activity-and-participation' element={<ActivityParticipate />} />
      <Route path='/personal-details' element={<PersonalDetail />} />
      <Route path='/personal-details-tenant' element={<TenantPersonalDetails />} />
      <Route path='/Resident-Protocols' element={<SecurityProtocolsResident />} />
      <Route path='/service-and-complaint' element={<ServiceComplaint />} />
      <Route path='/request-and-submission' element={<RequestSubmission />} />
      <Route path='/maintenance-invoices' element={<MaintainanceInvoice />} />
      <Route path='/other-income-nvoice' element={<OtherIncomeInvoices />} />
      <Route path='/view-invoice' element={<ViewInvoice />} />
      <Route path='/Access' element={<ChatLayout />} />
      <Route path='/Polls' element={<Polls />} />
      <Route path='/tenant-form' element={<TenantForm />} />
      <Route path='/Community-Discussion' element={<CommunitiesDiscussion />} />
      <Route path='/Community-Question' element={<CommunityQuestion />} />


    </Routes>
  </div>;
};



export default Home;





