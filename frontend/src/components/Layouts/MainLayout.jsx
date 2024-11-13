import React from 'react';
import { Row, Col } from 'react-bootstrap';
import Header from './Header';
import Sidebar from './Sidebar';

const MainLayout = () => {
  return (
 
      <Row>
        {/* Sidebar - col-2 */}
        <Col xs={2} className="bg-light">
         <Sidebar />
        </Col>

        {/* Main Content - col-10 */}
        <Col xs={10}>
          <Header />
          {/* Main content goes here */}
        </Col>
      </Row>
    
  );
};

export default MainLayout;
