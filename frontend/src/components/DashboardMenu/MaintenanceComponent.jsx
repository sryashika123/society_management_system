import React, { useState } from 'react';
import { Button, Card, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const MaintenanceComponent = () => {
  // State to store the maintenance and penalty amounts
  const [maintenanceAmount, setMaintenanceAmount] = useState(0);
  const [penaltyAmount, setPenaltyAmount] = useState(0);

  return (
    <div className="d-flex align-items-center justify-content-between p-4 " style={{ backgroundColor: '#ffffff', borderRadius: '8px' }}>
      <Row>
        <Col>
          <Card className="shadow-sm" style={{ borderLeft: '4px solid green' , width: '250px'}}>
            <Card.Body>
              <Card.Title>Maintenance Amount</Card.Title>
              <h4 style={{ color: 'green' }}>₹ {maintenanceAmount}</h4>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card className="shadow-sm" style={{ borderLeft: '4px solid red', width: '250px' }}>
            <Card.Body>
              <Card.Title>Penalty Amount</Card.Title>
              <h4 style={{ color: 'red' }}>₹ {penaltyAmount}</h4>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Button
        variant="outline-none"
        className='mainColor2'
        style={{
          color: 'white',
          border: 'none',
          padding: '10px 20px',
          borderRadius: '8px',
        }}
        onClick={() => alert('Set Maintenance Clicked')}
      >
        Set Maintenance
      </Button>
    </div>
  );
};

export default MaintenanceComponent;