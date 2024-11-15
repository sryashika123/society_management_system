import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import NavbarComponent from './Navbar';

const MainLayout = () => {
  const location = useLocation();

  // Check if the current path is the dashboard page
  const isDashboard = location.pathname === '/home/dashboard';

  return (
    <Row>
      {/* Sidebar - col-2 */}
      <Col xs={2} className="bg-light">
        <Sidebar />
      </Col>

      {/* Main Content - col-10 */}
      <Col xs={10}>
        {/* Conditionally render Header for dashboard, NavbarComponent for other pages */}
        {isDashboard ? <Header /> : <NavbarComponent />}
        {/* Main content goes here */}
      </Col>
    </Row>
  );
};

export default MainLayout;
