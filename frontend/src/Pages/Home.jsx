import React from 'react'
import SideBar from '../components/Layouts/Sidebar'
import { Route, Routes } from 'react-router-dom'
import ResidentDetails from '../components/DashboardMenu/ResidentDetails'
// import { Col, Row } from 'react-bootstrap'
// import SearchInput from '../components/Header/SearchInput'
import ResidentForm from '../components/DashboardMenu/ResidentForm'

const Home = () => {
  return (
    <div>

        <SideBar/>
        <Routes>
          <Route path='/residentmanagement' element={<ResidentDetails/>}/>
          {/* <Route path='/search' element={<SearchInput/>}/> */}
          <Route path='/addresidents' element={<ResidentForm/>}/>
        </Routes>
       
    </div>
  )
}

export default Home