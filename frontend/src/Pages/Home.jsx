import React from 'react'
import SideBar from '../components/Layouts/Sidebar'
import { Route, Routes } from 'react-router-dom'
import ResidentDetails from '../components/DashboardMenu/ResidentDetails'
import Dashboard from '../components/DashboardMenu/Dashboard'
import ResidentForm from '../components/DashboardMenu/ResidentForm'
import FacilityManagement from '../components/DashboardMenu/FacilityManagement'
import ComplaintTracking from '../components/DashboardMenu/ComplaintTracking'
import RequestTracking from '../components/DashboardMenu/RequestTracking'
import VisitorLog from '../components/DashboardMenu/VisitorLog'
// import FinanceManagement from '../components/DashboardMenu/FinanceManagement'
import Income from '../components/DashboardMenu/FinancialManagement/Income'
import Expense from '../components/DashboardMenu/FinancialManagement/Expense'



const Home = () => {
  return (
    <div>

        <SideBar/>
        <Routes>
          <Route path='/residentmanagement' element={<ResidentDetails/>}/>
          <Route path='/dashboard' element={<Dashboard/>}/>
          <Route path='/addresidents' element={<ResidentForm/>}/>
          <Route path='/facility-management' element={<FacilityManagement/>}/>
          <Route path='/create-complaint' element={<ComplaintTracking/>}/>
          <Route path='/request-tracking' element={<RequestTracking/>}/>
          <Route path='/visitors-log' element={<VisitorLog/>}/>
          <Route path='/income' element={<Income/>}/>
          <Route path='/expenses' element={<Expense/>}/>
        </Routes>
    </div>
  )
}

export default Home