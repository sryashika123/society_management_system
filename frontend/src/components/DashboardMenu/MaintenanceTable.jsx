import React, { useState } from 'react';
import { Table, Badge, Button, Nav } from 'react-bootstrap';

const MaintenanceTable = () => {
  const [activeTab, setActiveTab] = useState('maintenance');

  const handleSelect = (selectedTab) => {
    setActiveTab(selectedTab);
  };

  const maintenanceData = [
    {
      name: 'Cody Fisher',
      unitNumber: 'A',
      date: '10/02/2024',
      status: 'Tenant',
      phoneNumber: '92524 34522',
      amount: '₹ 1000',
      penalty: '--',
      paymentStatus: 'Pending',
      paymentMethod: 'Online'
    },
    {
      name: 'Esther Howard',
      unitNumber: 'B',
      date: '11/02/2024',
      status: 'Owner',
      phoneNumber: '92524 12365',
      amount: '₹ 1000',
      penalty: '250',
      paymentStatus: 'Done',
      paymentMethod: 'Cash'
    },
    // Additional rows...
  ];

  return (
    <div className="p-4">
      {/* Tabs for Maintenance and Other Income */}
      <Nav variant="tabs" activeKey={activeTab} onSelect={handleSelect} className="mb-3">
        <Nav.Item>
          <Nav.Link eventKey="maintenance" style={activeTab === 'maintenance' ? { background: 'linear-gradient(90deg, #FE512E 0%, #F09619 100%)', color: 'white' } : {}}>
            Maintenance
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="otherIncome" className='text-dark fw-bold' style={activeTab === 'otherIncome' ? { color: 'white', fontWeight: 'bold' } : {}}>
            Other Income
          </Nav.Link>
        </Nav.Item>
      </Nav>

      {/* Conditional Rendering of Table Based on Active Tab */}
      {activeTab === 'maintenance' && (
        <>
          <h4>Maintenance Details</h4>
          <Table responsive bordered hover className="mt-3" style={{ backgroundColor: '#f5f8ff', borderRadius: '8px' }}>
            <thead style={{ backgroundColor: '#e6eaf2' }}>
              <tr>
                <th>Name</th>
                <th>Unit Number</th>
                <th>Date</th>
                <th>Status</th>
                <th>Phone Number</th>
                <th>Amount</th>
                <th>Penalty</th>
                <th>Status</th>
                <th>Payment</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {maintenanceData.map((data, index) => (
                <tr key={index}>
                  <td>{data.name}</td>
                  <td><Badge bg="secondary">{data.unitNumber}</Badge></td>
                  <td>{data.date}</td>
                  <td>
                    <Badge pill bg={data.status === 'Tenant' ? 'danger' : 'primary'}>
                      {data.status}
                    </Badge>
                  </td>
                  <td>{data.phoneNumber}</td>
                  <td style={{ color: 'green' }}>{data.amount}</td>
                  <td style={{ color: data.penalty === '--' ? 'grey' : 'red' }}>{data.penalty}</td>
                  <td>
                    <Badge bg={data.paymentStatus === 'Pending' ? 'warning' : 'success'}>
                      {data.paymentStatus}
                    </Badge>
                  </td>
                  <td>
                    <Badge bg={data.paymentMethod === 'Online' ? 'info' : 'dark'}>
                      {data.paymentMethod}
                    </Badge>
                  </td>
                  <td>
                    <Button variant="outline-primary" size="sm">View</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      )}

      {/* Other Income Tab Content Placeholder */}
      {activeTab === 'otherIncome' && (
        <div>
          <h4>Other Income Details</h4>
          {/* Render any other income data table or content here */}
          <p>No other income records available at this time.</p>
        </div>
      )}
    </div>
  );
};

export default MaintenanceTable;