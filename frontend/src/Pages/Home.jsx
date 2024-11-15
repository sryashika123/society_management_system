import React from 'react'
import { Route,  Routes } from 'react-router-dom'
import ResidentDetails from '../components/DashboardMenu/ResidentManagement/ResidentDetails'
import Dashboard from '../components/DashboardMenu/Dashboard/Dashboard'
import ResidentForm from '../components/DashboardMenu/ResidentManagement/ResidentForm'
import FacilityManagement from '../components/DashboardMenu/Facility/FacilityManagement'
import ComplaintTracking from '../components/DashboardMenu/ComplaintTracking/ComplaintTracking'
import RequestTracking from '../components/DashboardMenu/ComplaintTracking/RequestTracking'
import VisitorLog from '../components/DashboardMenu/SecurityManagement/VisitorLog'
// import FinanceManagement from '../components/DashboardMenu/FinanceManagement'
import Income from '../components/DashboardMenu/FinancialManagement/Income'
import SecurityProtocol from '../components/DashboardMenu/SecurityManagement/SecurityProtocol'
import SecurityGuard from '../components/DashboardMenu/SecurityGuard/SecurityGuard'
import Announcement from '../components/DashboardMenu/Announcement/Announcement'
import Note from '../components/DashboardMenu/FinancialManagement/Notes/Note'
import Expense from '../components/DashboardMenu/FinancialManagement/Expenses/Expense'
import MainLayout from '../components/Layouts/MainLayout'
import Profile from '../components/DashboardMenu/Profile/Profile'
import EditProfile from '../components/DashboardMenu/Profile/EditProfile'





const Home = () => {
  return (
    <div>

        {/* <SideBar/> */}
        <MainLayout />
        <Routes>
          <Route path='/residentmanagement' element={<ResidentDetails />} />
          <Route path='/' element={<Dashboard />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/residentForm' element={<ResidentForm />} />
          <Route path='/facility-management' element={<FacilityManagement />} />
          <Route path='/create-complaint' element={<ComplaintTracking />} />
          <Route path='/request-tracking' element={<RequestTracking />} />
          <Route path='/visitors-log' element={<VisitorLog />} />
          <Route path='/income' element={<Income />} />
          <Route path='/expenses' element={<Expense />} />
          <Route path='/note' element={<Note />} />
          <Route path='/security-protocols' element={<SecurityProtocol />} />
          <Route path='/security-guard' element={< SecurityGuard />} />
          <Route path='/announcement' element={<Announcement />} />
          <Route path ='/profile' element={<Profile/>}/>
          <Route path="/EditProfile" element={<EditProfile />} />



        </Routes>

    </div>
  )
}

export default Home