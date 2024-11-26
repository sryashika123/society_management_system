import React from "react";
import { Route, Routes} from "react-router-dom";
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
import EventParticipation from "../component/Resident/EventParticipation";


const Home = () => {
  return <div>
    <Sidebar/>
    
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/dashboard" element={<Dashboard />} />
      
      <Route path="/residentmanagement" element={<ResidentManagement/>}/>
      <Route path="/residentForm" element={<ResidentForm/>}/>
      <Route path="/facility-management" element={<FacilityManagement/>}/>
      <Route path="/create-complaint" element={<CreateComplaint/>}/>
      <Route path="/request-tracking" element={<RequestTracking/>}/>
      <Route path="/visitors-log" element={<VisitorsLogs/>}/>
      <Route path="/security-protocols" element={<SecurityProtocols/>}/>
      <Route path="/security-guard" element={<SecurityGuard/>}/>
                <Route path="/profile" element={<Profile />} />
                <Route path="/EditProfile" element={<EditProfile />} />
                <Route path="/Financial-Maintenanace" element={<FinancialManagementIncome />} />
                <Route path="/Other-Income" element={<FinancialManagementOtherIncome />} />
                <Route path="/Expense" element={<FinancialManagementExp />} />
                <Route path="/Note" element={<FinancialManagementNote />} />
                <Route path="/announcement" element={<Announcement/>} />
                <Route path='/visitor-tracking' element={<VisitorsTracking/>}/>
          <Route path='/emergency-management' element={<EmergencyManagement/>}/>
          <Route path='/EventParticipation' element={<EventParticipation/>}/>

    </Routes>
  </div>;
};

export default Home;





