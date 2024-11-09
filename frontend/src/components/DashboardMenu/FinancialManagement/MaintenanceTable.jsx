import React, { useState } from 'react';
import { Table, Modal, Nav, Button } from 'react-bootstrap';
import { FaCheckCircle, FaClock, FaCreditCard, FaEye, FaHome, FaMoneyBillWave, FaUser } from 'react-icons/fa';
import OtherIncome from './OtherIncome';

const MaintenanceTable = () => {
  const [activeTab, setActiveTab] = useState('maintenance');

  const [showModal, setShowModal] = useState(false);
  const [selectedData, setSelectedData] = useState(null);

  const handleSelect = (selectedTab) => {
    setActiveTab(selectedTab);
  };

  const handleViewDetails = (data) => {
    setSelectedData(data);
    setShowModal(true);
  };

  const maintenanceData = [
    {
      name: 'Cody Fisher',
      unit: "A",
      number: "1001",
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
      unit: "B",
      number: "1002",
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

  const badgeStyle = (status) => {
    const baseStyle = {
      color: "white",
      width: "100px",
      height: "31px",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: "5px",
    };
    if (status === "Tenant") return { ...baseStyle, color: 'rgba(236, 72, 153, 1)', backgroundColor: 'rgba(255, 241, 248, 1)' };
    if (status === "Owner") return { ...baseStyle, color: 'rgba(79, 70, 229, 1)', backgroundColor: "rgba(241, 240, 255, 1)" };
    return { ...baseStyle, backgroundColor: "#39973D" };
  };

  const PaneltybadgeStyle = (penalty) => {
    const baseStyle = {
      color: "white",
      width: "60px",
      height: "31px",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: "5px",
    };
    if (penalty === "250") return { ...baseStyle, color: 'white', backgroundColor: 'rgba(231, 76, 60, 1)' };
    return { ...baseStyle, color: "grey" };
  };

  const PaymentbadgeStyle = (paymentStatus) => {
    const baseStyle = {
      color: "white",
      width: "100px",
      height: "31px",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: "5px",
    };

    if (paymentStatus === "Pending") return { ...baseStyle, color: 'rgba(255, 195, 19, 1)', backgroundColor: "rgba(255, 195, 19, 0.1)" };
    if (paymentStatus === "Done") return { ...baseStyle, color: 'rgba(57, 151, 61, 1)', backgroundColor: "rgba(57, 151, 61, 0.1)" };
    return { ...baseStyle, backgroundColor: "#39973D" };
  };

  const PaymentMethodbadgeStyle = (paymentMethod) => {
    const baseStyle = {
      color: "white",
      width: "100px",
      height: "31px",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: "5px",
    };

    if (paymentMethod === "Online") return { ...baseStyle, color: 'rgba(86, 120, 233, 1)', backgroundColor: "rgba(86, 120, 233, 0.1)" };
    if (paymentMethod === "Cash") return { ...baseStyle, color: 'rgba(32, 34, 36, 1)', backgroundColor: "rgba(32, 34, 36, 0.05)" };
    return { ...baseStyle, backgroundColor: "#39973D" };
  };

  const tableColumnStyle = {
    whiteSpace: "normal",
    wordWrap: "break-word",
    padding: "15px",
    textAlign: "center",
    verticalAlign: "middle",
    maxWidth: "350px",
  };

  const imageColumnStyle = {
    display: "flex",
    alignItems: "center", // Aligns the image and text horizontally
    justifyContent: "flex-start", // Ensures the content starts from the left
    gap: "10px", // Space between the image and the name
  };

  return (
    <div className="p-4" >
      {/* Tabs for Maintenance and Other Income */}
      <Nav variant="tabs" activeKey={activeTab} onSelect={handleSelect}>
        <Nav.Item>
          <Nav.Link
            eventKey="maintenance"
            className="bg-white"
            style={{
              background: activeTab === 'maintenance' ? 'linear-gradient(90deg, #FE512E 0%, #F09619 100%)' : '',
              color: activeTab === 'maintenance' ? 'white' : 'black', // Conditional text color
              fontWeight: activeTab === 'maintenance' ? 'normal' : '500', // fontWeight 500 when not active as well
            }}
            onClick={() => setActiveTab('maintenance')}
          >
            Maintenance
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            eventKey="otherIncome"
            className="bg-white"
            style={{
              background: activeTab === 'otherIncome' ? 'linear-gradient(90deg, #FE512E 0%, #F09619 100%)' : '',
              color: activeTab === 'otherIncome' ? 'white' : 'black', // Conditional text color
              fontWeight: activeTab === 'otherIncome' ? 'normal' : '500', // fontWeight 500 when not active as well
            }}
            onClick={() => setActiveTab('otherIncome')}
          >
            Other Income
          </Nav.Link>
        </Nav.Item>

      </Nav>

      {/* Conditional Rendering of Table Based on Active Tab */}
      {activeTab === 'maintenance' && (
        <>
          <div className='bg-white'>
            <h4 className='pt-3 ps-3'>Maintenance Details</h4>
            <Table responsive hover className="mt-3 " style={{ backgroundColor: '#f5f8ff', borderRadius: '8px', border: "1px solid #ddd", boxShadow: "0px 0px 15px rgba(0, 0, 0, 0.1)", overflow: "hidden", padding: "20px" }}>
              <thead style={{ color: "#ffffff" }}>
                <tr >
                  <th style={{ backgroundColor: 'rgb(185, 198, 242)' }} className="text-start">Name</th>
                  <th style={{ backgroundColor: 'rgb(185, 198, 242)' }} className='text-center'>Unit Number</th>
                  <th style={{ backgroundColor: 'rgb(185, 198, 242)' }} className="text-center">Date</th>
                  <th style={{ backgroundColor: 'rgb(185, 198, 242)' }} className="text-center">Status</th>
                  <th style={{ backgroundColor: 'rgb(185, 198, 242)' }} className="text-center">Phone Number</th>
                  <th style={{ backgroundColor: 'rgb(185, 198, 242)' }} className="text-center">Amount</th>
                  <th style={{ backgroundColor: 'rgb(185, 198, 242)' }} className="text-center">Penalty</th>
                  <th style={{ backgroundColor: 'rgb(185, 198, 242)' }} className="text-center">Status</th>
                  <th style={{ backgroundColor: 'rgb(185, 198, 242)' }} className="text-center">Payment</th>
                  <th style={{ backgroundColor: 'rgb(185, 198, 242)' }} className="text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {maintenanceData.map((data, index) => (
                  <tr key={index}>
                    <td style={tableColumnStyle} className="text-start" >
                      <div style={imageColumnStyle} className="text-center">
                        <img
                          src="https://via.placeholder.com/30"
                          alt="avatar"
                          className="rounded-circle"
                          style={{ width: "40px", height: "40px" }}
                        />
                        {data.name}
                      </div>
                    </td>

                    <td className="text-center">
                      {/* Unit in a round circle */}
                      <div className="d-flex align-items-center justify-content-center">
                        <div
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            justifyContent: "center",
                            width: "30px", // Set the width of the circle
                            height: "30px", // Set the height of the circle
                            borderRadius: "50%", // This makes the div a circle
                            backgroundColor: "#5678E9", // Circle background color
                            color: "#fff", // Text color
                            fontWeight: "bold", // Makes the unit text bold

                          }}
                        >
                          {data.unit}
                        </div>
                        {/* Unit number without any special formatting */}
                        <div>{data.number}</div>
                      </div>
                    </td>

                    <td className="text-center">{data.date}</td>

                    <td className="text-center">
                      <span className="badge rounded-pill d-flex align-items-center " style={badgeStyle(data.status)}>
                        {data.status === "Tenant" && <FaUser className="me-2" style={{ color: 'rgba(236, 72, 153, 1)' }} />}
                        {data.status === "Owner" && <FaHome className="me-2" style={{ color: 'rgba(79, 70, 229, 1)' }} />}
                        {data.status}
                      </span>

                    </td>

                    <td className='text-center'>{data.phoneNumber}</td>
                    <td className='text-center' style={{ color: 'green' }}>{data.amount}</td>
                    <td className="text-center">
                      <span className="badge rounded-pill" style={PaneltybadgeStyle(data.penalty)}>
                        {data.penalty}
                      </span>
                    </td>

                    <td className="text-center">
                      <span className="badge rounded-pill d-flex align-items-center" style={PaymentbadgeStyle(data.paymentStatus)}>
                        {data.paymentStatus === "Pending" && <FaClock className="me-2" style={{ color: 'rgba(255, 195, 19, 1)' }} />}
                        {data.paymentStatus === "Done" && <FaCheckCircle className="me-2" style={{ color: 'rgba(57, 151, 61, 1)' }} />}
                        {data.paymentStatus}
                      </span>

                    </td>
                    <td className='text-center'>
                      <span className="badge rounded-pill d-flex align-items-center" style={PaymentMethodbadgeStyle(data.paymentMethod)}>
                        {data.paymentMethod === "Online" && <FaCreditCard className="me-2" style={{ color: 'rgba(86, 120, 233, 1)' }} />}
                        {data.paymentMethod === "Cash" && <FaMoneyBillWave className="me-2" style={{ color: 'rgba(32, 34, 36, 1)' }} />}
                        {data.paymentMethod}
                      </span>

                    </td>
                    <td className="text-center">
                      <div className="d-flex align-items-center justify-content-center">
                        <FaEye
                          className="text-success me-2"
                          style={{ cursor: "pointer", backgroundColor: 'rgba(246, 248, 251, 1)', color: 'rgba(86, 120, 233, 1)', borderRadius: '5px' }}
                          onClick={() => handleViewDetails(data)}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>

          <Modal show={showModal} onHide={() => setShowModal(false)}>
            <Modal.Header closeButton>
              <Modal.Title>Details for {selectedData?.name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {selectedData && (
                <>
                  <p><strong>Name:</strong> {selectedData.name}</p>
                  <p><strong>Unit:</strong> {selectedData.unit} - {selectedData.number}</p>
                  <p><strong>Date:</strong> {selectedData.date}</p>
                  <p><strong>Status:</strong> {selectedData.status}</p>
                  <p><strong>Phone Number:</strong> {selectedData.phoneNumber}</p>
                  <p><strong>Amount:</strong> {selectedData.amount}</p>
                  <p><strong>Penalty:</strong> {selectedData.penalty}</p>
                  <p><strong>Payment Status:</strong> {selectedData.paymentStatus}</p>
                  <p><strong>Payment Method:</strong> {selectedData.paymentMethod}</p>
                </>
              )}
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setShowModal(false)}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>

        </>
      )}

      {/* Other Income Tab Content Placeholder */}
      {activeTab === 'otherIncome' && (
        <OtherIncome />
      )}
    </div>
  );
};

export default MaintenanceTable;