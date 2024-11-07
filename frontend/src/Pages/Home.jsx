import React from 'react'
import SideBar from '../components/Layouts/Sidebar'
import { Route, Routes } from 'react-router-dom'
import ResidentDetails from '../components/DashboardMenu/ResidentDetails'
import Dashboard from '../components/DashboardMenu/Dashboard'
import ResidentForm from '../components/DashboardMenu/ResidentForm'
import FacilityManagement from '../components/DashboardMenu/FacilityManagement'


const Home = () => {
  return (
    <div>

        <SideBar/>
        <Routes>
          <Route path='/residentmanagement' element={<ResidentDetails/>}/>
          <Route path='/dashboard' element={<Dashboard/>}/>
          <Route path='/addresidents' element={<ResidentForm/>}/>
          <Route path='/facility-management' element={<FacilityManagement/>}/>
        </Routes>
    </div>
  )
}

export default Home