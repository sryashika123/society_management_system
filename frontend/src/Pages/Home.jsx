import React from 'react'
import SideBar from '../components/Layouts/Sidebar'
import { Col, Row } from 'react-bootstrap'
import SearchInput from '../components/Header/SearchInput'

const Home = () => {
  return (
    <div>
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