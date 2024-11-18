import React, { useState } from 'react';
import { Table, Modal, Nav } from 'react-bootstrap';
import { FaCheckCircle, FaClock, FaCreditCard, FaEye, FaHome, FaMoneyBillWave, FaUser } from 'react-icons/fa';
import OtherIncome from './OtherIncome';
import Avatar from "../../images/Avatar.png";
import viewIcon from "../../images/view.png";

const MaintenanceTable = () => {
  const [activeTab, setActiveTab] = useState('maintenance');
  const [selectedData, setSelectedData] = useState(null);


  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleViewDetails = (data) => {
    setSelectedData(data);
    setShow(true);
  };


  const handleSelect = (selectedTab) => {
    setActiveTab(selectedTab);
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
                          src={Avatar}
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
                        </div>&nbsp;
                        {/* Unit number without any special formatting */}
                        <div>{data.number}</div>
                      </div>
                    </td>

                    <td className="text-center">{data.date}</td>

                    <td className="text-center">
                      <span className="badge rounded-pill  " style={badgeStyle(data.status)}>
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
                      <span className="badge rounded-pill " style={PaymentbadgeStyle(data.paymentStatus)}>
                        {data.paymentStatus === "Pending" && <FaClock className="me-2" style={{ color: 'rgba(255, 195, 19, 1)' }} />}
                        {data.paymentStatus === "Done" && <FaCheckCircle className="me-2" style={{ color: 'rgba(57, 151, 61, 1)' }} />}
                        {data.paymentStatus}
                      </span>

                    </td>
                    <td className='text-center'>
                      <span className="badge rounded-pill " style={PaymentMethodbadgeStyle(data.paymentMethod)}>
                        {data.paymentMethod === "Online" && <FaCreditCard className="me-2" style={{ color: 'rgba(86, 120, 233, 1)' }} />}
                        {data.paymentMethod === "Cash" && <FaMoneyBillWave className="me-2" style={{ color: 'rgba(32, 34, 36, 1)' }} />}
                        {data.paymentMethod}
                      </span>

                    </td>
                    <td className="text-center">
                      <div className="d-flex align-items-center justify-content-center">
                        <img src={viewIcon} alt="View"
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

          {/* View Modal */}
          <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton style={{ borderBottom: 'none' }}>
              <Modal.Title >View Maintenance Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="d-flex align-items-center mb-3" style={imageColumnStyle}>
                <img
                  src={Avatar}
                  alt="Profile"
                  className="rounded-circle"
                  style={{ width: '60px', height: '60px' }}
                />
                <div className="ms-3">
                  <h5 className="mt-2 mb-0">{selectedData?.name}</h5>
                  <p className="text-muted mb-0" style={{ fontSize: '0.9rem' }}>{selectedData?.date}</p>
                </div>
              </div>
              <div className="d-flex justify-content-between mb-3">
                <div className="d-flex flex-column align-items-center">
                  <span className="text-muted">Wing</span>
                  <span
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
                  >{selectedData?.unit}</span>
                </div>
                <div className="d-flex flex-column align-items-center">
                  <span className="text-muted">Unit</span>
                  <span >{selectedData?.number}</span>
                </div>

                <div className="d-flex flex-column align-items-center">
                  <span className="text-muted">Status</span>
                  <div className="d-flex justify-content-center align-items-center">
                    <span className="badge rounded-pill " style={badgeStyle(selectedData?.status)}>
                      {selectedData?.status === "Tenant" && <FaUser className="me-2" style={{ color: 'rgba(236, 72, 153, 1)' }} />}
                      {selectedData?.status === "Owner" && <FaHome className="me-2" style={{ color: 'rgba(79, 70, 229, 1)' }} />}
                      {selectedData?.status}
                    </span>
                  </div>
                </div>

                <div className="d-flex flex-column align-items-center">
                  <span className="text-muted">Amount</span>
                  <span style={{ color: 'green' }}>{selectedData?.amount}</span>
                </div>
              </div>
              <div className="d-flex justify-content-between mb-3">
                <div className="d-flex flex-column align-items-center">
                  <span className="text-muted">Penalty</span>
                  <span className="badge rounded-pill" style={PaneltybadgeStyle(selectedData?.penalty)}>{selectedData?.penalty}</span>
                </div>
                <div className="d-flex flex-column align-items-center">
                  <span className="text-muted">Status</span>
                  <span className="badge rounded-pill " style={PaymentbadgeStyle(selectedData?.paymentStatus)}>
                    {selectedData?.paymentStatus === "Pending" && <FaClock className="me-2" style={{ color: 'rgba(255, 195, 19, 1)' }} />}
                    {selectedData?.paymentStatus === "Done" && <FaCheckCircle className="me-2" style={{ color: 'rgba(57, 151, 61, 1)' }} />}
                    {selectedData?.paymentStatus}
                  </span>
                </div>
                <div className="d-flex flex-column align-items-center">
                  <span className="mb-2">Payment</span>
                  <span className="badge rounded-pill " style={PaymentMethodbadgeStyle(selectedData?.paymentMethod)}>
                    {selectedData?.paymentMethod === "Online" && <FaCreditCard className="me-2" style={{ color: 'rgba(86, 120, 233, 1)' }} />}
                    {selectedData?.paymentMethod === "Cash" && <FaMoneyBillWave className="me-2" style={{ color: 'rgba(32, 34, 36, 1)' }} />}
                    {selectedData?.paymentMethod}
                  </span>
                </div>
              </div>
            </Modal.Body>

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