import React, { useState } from "react";
import { Container, Row, Col, Table } from "react-bootstrap";
import SideBar from "../Layouts/Sidebar";
import Avatar from "../images/Avatar.png";

const VisitorTable = () => {
    const [visitors] = useState([  
        { id: 1, name: "Evelyn Harper", type: "Unethical Behavior", PhoneNumber: "8160107674", Date: "01/02/2024", unit:"A", number: "1001", Time: "10:00 AM" },
        { id: 2, name: "Esther Howard", type: "Preventive Measures", PhoneNumber: "8160089150", Date: "02/02/2024", unit:"B", number: "1002", Time: "10:00 AM" },
    ]);

    return (
        <Container fluid style={{ marginTop: "20px" }}>
            <div className='bg-white' style={{ border: "1px solid #ddd", borderRadius: "8px", boxShadow: "0px 0px 15px rgba(0, 0, 0, 0.1)", overflow: "hidden", padding: "20px" }}>
                <div className="d-flex justify-content-between align-items-center">
                    <h2>Visitor Logs</h2>
                </div>
            

            {/* Visitor Table */}
          
               <Table style={{ border: "1px solid #ddd", borderRadius: "8px", boxShadow: "0px 0px 15px rgba(0, 0, 0, 0.1)", overflow: "hidden", padding: "20px" , marginTop: "20px" }} >
              <thead style={{ background: "#5678E9", color: "#ffffff" }}>
                <tr className="text-start">
                  <th style={{backgroundColor: 'rgb(185, 198, 242)'}}>Visitor Name</th>
                  <th  style={{backgroundColor: 'rgb(185, 198, 242)'}}>Phone Number</th>
                  <th className="text-center"  style={{backgroundColor: 'rgb(185, 198, 242)'}}>Date</th>
                  <th className="text-center"  style={{backgroundColor: 'rgb(185, 198, 242)'}}>Unit Number</th>
                  <th className="text-center"  style={{backgroundColor: 'rgb(185, 198, 242)'}}>Time</th>
                </tr>
              </thead>
              <tbody >
                {visitors.map((visitors) => (
                  <tr key={visitors.id} className="text-start">
                    <td style={{ padding: "15px" }}>
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "start" }}>
                        <img
                          src={Avatar}
                          alt="avatar"
                          className="rounded-circle"
                          style={{ width: "30px", height: "30px", marginRight: "10px" }}
                        />
                        {visitors.name}
                      </div>
                    </td>
                    <td style={{ verticalAlign: "middle" }}>{visitors.PhoneNumber}</td>
                    <td style={{ verticalAlign: "middle" }} className="text-center">{visitors.Date}</td>
                    <td style={{ verticalAlign: "middle" }} className="text-center">
                      {/* Unit in a round circle */}
                      <div className="d-flex align-items-center justify-content-center gap-2">
                        <div
                          style={{
                            border: "1px solid ", borderRadius: "50%", width: "28px", height: "28px", display: "inline-flex", justifyContent: "center", alignItems: "center", color: "skyblue", verticalAlign: "middle"
                          }}
                        >
                          {visitors.unit}
                        </div>
                        {/* Unit number without any special formatting */}
                        <div>{visitors.number}</div>

                      </div>
                    </td>
                    <td style={{ verticalAlign: "middle" }} className="text-center">
                      <div
                        style={{
                          width: "100px",
                          height: "34px",
                          padding: "5px 15px",
                          gap: "10px",
                          borderRadius: "50px",
                          background: "#F6F8FB",
                          color: "#4F4F4F",
                          display: "inline-block", // Ensures width and height are applied properly
                        }}
                      >
                        {visitors.Time}
                      </div>
                    </td>

                  </tr>
                ))}
              </tbody>
            </Table>
            
            </div>
        </Container>
    );
};

const Dashboard = () => {
    return (
        <Container fluid className="p-0" style={{ maxWidth: "100%", overflowX: "hidden" }}>
            <Row className="m-0">
                <Col xs={2} className="p-0">
                    <SideBar />
                </Col>
                <Col xs={10} className="p-4" style={{ overflowX: "auto", minHeight: "100vh" }}>
                    <VisitorTable />
                </Col>
            </Row>
        </Container>
    );
};

export default Dashboard;
