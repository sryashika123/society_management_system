import React from 'react'
import SideBar from '../components/Layouts/Sidebar'
import { Route, Routes } from 'react-router-dom'
import ResidentDetails from '../components/DashboardMenu/ResidentDetails'
import Dashboard from '../components/DashboardMenu/Dashboard'
import ResidentForm from '../components/DashboardMenu/ResidentForm'


const Home = () => {
  return (
    <div>

        <SideBar/>
        <Routes>
          <Route path='/residentmanagement' element={<ResidentDetails/>}/>
          <Route path='/dashboard' element={<Dashboard/>}/>
        </Routes>
        

          {/* <Route path='/search' element={<SearchInput/>}/> */}
          <Route path='/addresidents' element={<ResidentForm/>}/>
        </Routes>
    </div>
  )
}

export default Home