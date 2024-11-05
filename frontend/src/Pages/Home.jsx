import React from 'react'
import SideBar from '../components/Layouts/Sidebar'
import { Route, Routes } from 'react-router-dom'
import ResidentDetails from '../components/DashboardMenu/ResidentDetails'
import { Col, Row } from 'react-bootstrap'
import SearchInput from '../components/Header/SearchInput'

const Home = () => {
  return (
    <div>

        <SideBar/>
        <Routes>
          <Route path='/residentmanagement' element={<ResidentDetails/>}/>
        </Routes>
        <Row>
          <Col md={2}>
            <SideBar />
          </Col>
          <Col md={10} style={{backgroundColor: 'white'}}>
            <SearchInput />
          </Col>
        </Row>   
    </div>
  )
}

export default Home