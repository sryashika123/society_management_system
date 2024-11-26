import React from 'react'
import { Route,  Routes } from 'react-router-dom'
import ResidentDetails from '../components/DashboardMenu/ResidentDetails'
import Dashboard from '../components/DashboardMenu/Dashboard'
import ResidentForm from '../components/DashboardMenu/ResidentForm'
import FacilityManagement from '../components/DashboardMenu/FacilityManagement'
import ComplaintTracking from '../components/DashboardMenu/ComplaintTracking'
import RequestTracking from '../components/DashboardMenu/RequestTracking'
import VisitorLog from '../components/DashboardMenu/VisitorLog'
// import FinanceManagement from '../components/DashboardMenu/FinanceManagement'
import Income from '../components/DashboardMenu/FinancialManagement/Income'
import SecurityProtocol from '../components/DashboardMenu/SecurityProtocol'
import SecurityGuard from '../components/DashboardMenu/SecurityGuard'
import Announcement from '../components/DashboardMenu/Announcement'
import Note from '../components/DashboardMenu/FinancialManagement/Notes/Note'
import Expense from '../components/DashboardMenu/FinancialManagement/Expenses/Expense'
import MainLayout from '../components/Layouts/MainLayout'





const Home = () => {
  return (
    <div>

        {/* <SideBar/> */}
        <MainLayout />
        <Routes>
          <Route path='/residentmanagement' element={<ResidentDetails />} />
          <Route path='/' element={<Dashboard />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/addresidents' element={<ResidentForm />} />
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


        </Routes>

    </div>
  )
}

export default Home