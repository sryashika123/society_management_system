import React from "react";
import { Route, Routes } from "react-router-dom";
import ResidentManagement from "../component/ResidentManagement/Residentmanagement";
import Sidebar from "../component/Layout/Sidebar";
import ResidentForm from "../component/ResidentManagement/ResidentForm";
import FacilityManagement from "../component/FacilityManagement/FacilityManagement";
import CreateComplaint from "../component/ComplaintTracking/CreateComplaint";
import RequestTracking from "../component/ComplaintTracking/RequestTracking";
import VisitorsLogs from "../component/SecurityManagement/VisitorsLogs";
import SecurityProtocols from "../component/SecurityManagement/SecurityProtocols";
import SecurityGuard from "../component/SecurityGuard/SecurityGuard";
import Dashboard from "../component/Dashboard/Dashboard";
import FinancialManagementIncome from "../component/FinancialManagement/FinancialManagementIncome";
import FinancialManagementExp from "../component/FinancialManagement/FinancialManagementExp";
import FinancialManagementNote from "../component/FinancialManagement/FinancialManagementNote";
import Profile from "../component/Profile/Profile";
import EditProfile from "../component/EditProfile";
import FinancialManagementOtherIncome from "../component/FinancialManagement/FinancialManagementOtherIncome";
import Announcement from "../component/Announcement";
import VisitorsTracking from "../component/Security/VisitorsTracking";
import EmergencyManagement from "../component/Security/EmergencyManagement";
import EventParticipation from "../component/Resident/Eventparticipate/EventParticipation";
import ActivityParticipate from "../component/Resident/Eventparticipate/ActivityParticipate";
import PersonalDetail from "../component/Resident/PersonalDetails";
import TenantPersonalDetails from "../component/Resident/TenentPersonalDetails";
import SecurityProtocolsResident from "../component/Resident/SecurityProtocolsResident";
import ServiceComplaint from "../component/Resident/ServiceComplaint";
import RequestSubmission from "../component/Resident/RequestSubmission";
import MaintainanceInvoice from "../component/Resident/MaintainanceInvoice";
import OtherIncomeInvoices from "../component/Resident/OtherIncome";
import ViewInvoice from "../component/Resident/ViewInvoice";
import ChatLayout from "../component/Resident/Chatapp/Access";
import Polls from "../component/Resident/Polls";


const Home = () => {
  return <div>
    <Sidebar />

    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/dashboard" element={<Dashboard />} />

      <Route path="/residentmanagement" element={<ResidentManagement />} />
      <Route path="/residentForm" element={<ResidentForm />} />
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
      <Route path='/Access' element={<ChatLayout/>}/>
      <Route path='/Polls' element={<Polls />} />

    </Routes>
  </div>;
};

export default Home;





