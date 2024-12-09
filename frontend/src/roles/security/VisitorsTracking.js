import React, { useEffect, useState } from "react";
import Sidebar from "../../component/Layout/Sidebar";
import Header from "../../component/Layout/Navbar";
import { Button, Table, Form, Modal } from "react-bootstrap";
import Avtar from "../../assets/Avatar.png";
import { FaPlus } from "react-icons/fa";
import axios from "axios";

function VisitorsTracking() {
  const [details, setDetails] = useState([

  ]);

  const [showModal, setShowModal] = useState(false);

  // Form inputs
  const [newVisitor, setNewVisitor] = useState({
    Name: "",
    Phone_number: "",
    date: "",
    Wing: "",
    Unit_number: "",
    time: "",
  });

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => {
    setShowModal(false);
    setNewVisitor({
      Name: "",
      Phone_number: "",
      date: "",
      Wing: "",
      Unit_number: "",
      time: "",
    });
  };

  // Handle form field changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewVisitor({ ...newVisitor, [name]: value });
  };

  const fetchVisitorDetails = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/users/v9/getVisitorTracking`);
      setDetails(response.data);
    } catch (error) {
      console.error("Error fetching visitor details:", error);
    }
  };

  // Fetch visitor details from the API
  useEffect(() => {
    fetchVisitorDetails();
  }, []);

  // Handle save button click
  const handleSaveDetails = async () => {
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/users/v9/createVisitorTracking`, newVisitor);
      setShowModal(false);
      fetchVisitorDetails(); // Refresh data after saving
    } catch (error) {
      console.error("Error saving visitor details:", error);
    }
  };

  return (
    <div className="d-flex flex-column flex-md-row dashboard-bg">
      <div className="flex-shrink-0">
        <Sidebar />
      </div>

      <div className="flex-grow-1" style={{ width: "1920px" }}>
        <Header />

        <div className="container-fluid p-4" style={{ marginTop: "70px", width: "1620px", marginLeft: "300px" }}>
          <div
            className="table-responsive"
            style={{
              border: "1px solid #ddd",
              borderRadius: "8px",
              boxShadow: "0px 0px 15px rgba(0, 0, 0, 0.1)",
              overflow: "hidden",
              backgroundColor: "#fff",
              padding: "20px",
              marginTop: "20px",
            }}
          >
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h4 className="mb-0">Visitors Tracking</h4>
              <div className="d-flex gap-3 align-items-center justify-content-center">
                <select
                  style={{ height: "50px", }}
                  className="month-btn rounded-2 d-flex align-items-center justify-content-center bg-light text-dark"
                >
                  <option>Last week</option>
                  <option>Last month</option>
                  <option>Last year</option>
                </select>

                <Button
                  className="btn mainColor2 d-flex align-items-center justify-content-center p-2"
                  style={{ height: "50px", marginBottom: "5px", border: "none" }}
                  onClick={handleOpenModal}
                >
                  <FaPlus
                    style={{
                      fontSize: "18px",
                      borderRadius: "5px",
                      background: "rgba(255, 255, 255, 1)",
                      color: "#FE512E",
                      marginRight: "8px",
                    }}
                  />
                  Add Visiter details
                </Button>
              </div>
            </div>
            <Table hover responsive>
              <thead style={{ background: "rgb(185, 198, 242)", color: "black" }}>
                <tr className="text-start" style={{ height: '50px' }}>
                  <th style={{ background: "rgb(185, 198, 242)" }}>Visitor Name</th>
                  <th style={{ background: "rgb(185, 198, 242)" }}>Phone Number</th>
                  <th style={{ background: "rgb(185, 198, 242)" }}>Date</th>
                  <th style={{ background: "rgb(185, 198, 242)" }} className="text-center">Unit Number</th>
                  <th style={{ background: "rgb(185, 198, 242)" }} className="text-center">Time</th>
                </tr>
              </thead>
              <tbody>
                {details.map((detail, index) => (
                  <tr key={index} className="text-start" style={{ height: '70px' }}>
                    <td style={{ paddingTop: "15px", paddingBottom: "15px" }}>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "start",
                        }}
                      >
                        <img
                          src={Avtar}
                          alt="avatar"
                          className="rounded-circle"
                          style={{ width: "30px", height: "30px", marginRight: "10px" }}
                        />
                        {detail?.Name || "N/A"} {/* Fallback to "N/A" if Name is undefined */}
                      </div>
                    </td>
                    <td style={{ verticalAlign: "middle" }}>{detail?.Phone_number || "N/A"}</td>
                    <td style={{ verticalAlign: "middle" }}> {new Date(detail?.date).toLocaleDateString('en-GB')}
                    </td>
                    <td style={{ verticalAlign: "middle" }} className="text-center">
                      <div className="d-flex align-items-center justify-content-center gap-2">
                        <div
                          style={{
                            border: "1px solid ",
                            borderRadius: "50%",
                            width: "28px",
                            height: "28px",
                            display: "inline-flex",
                            justifyContent: "center",
                            alignItems: "center",
                            color: "skyblue",
                            verticalAlign: "middle",
                          }}
                        >
                          {detail?.Wing || "N/A"}
                        </div>
                        <div>{detail?.Unit_number || "N/A"}</div>
                      </div>
                    </td>
                    <td style={{ verticalAlign: "middle" }} className="text-center">
                      <div
                        style={{
                          width: "92px",
                          height: "34px",
                          padding: "5px 15px",
                          gap: "10px",
                          borderRadius: "50px",
                          background: "#F6F8FB",
                          color: "#4F4F4F",
                          display: "inline-block",
                        }}
                      >
                        {detail?.time || "N/A"}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>

            </Table>
          </div>
        </div>
      </div>
      {/* Modal Component */}
      <Modal show={showModal} onHide={handleCloseModal} centered className="square-modal">
        <Modal.Header style={{ border: "none" }} closeButton>
          <Modal.Title>Add Visitor Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {/* Visitor Name */}
            <Form.Group className="mb-3" controlId="formVisitorName">
              <Form.Label>
                Visitor Name<span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Name"
                name="Name"
                value={newVisitor.Name}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            {/* Phone Number */}
            <Form.Group className="mb-3" controlId="formPhoneNumber">
              <Form.Label>
                Phone Number<span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Phone Number"
                name="Phone_number"
                value={newVisitor.Phone_number}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <div className="d-flex gap-2">
              {/* Wing */}
              <Form.Group className="mb-3" controlId="formWing">
                <Form.Label>
                  Wing<span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Wing"
                  name="Wing"
                  value={newVisitor.Wing}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>

              {/* Unit Number */}
              <Form.Group className="mb-3" controlId="formUnitNumber">
                <Form.Label>
                  Unit Number<span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Unit Number"
                  name="Unit_number"
                  value={newVisitor.Unit_number}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>
            </div>

            <div className="d-flex gap-2">
              {/* Date */}
              <Form.Group controlId="formDate">
                <Form.Label>
                  Date<span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                  style={{ width: "180px" }}
                  type="date"
                  name="date"
                  value={newVisitor.date}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>

              {/* Time */}
              <Form.Group controlId="formTime">
                <Form.Label>
                  Time<span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                  style={{ width: "180px" }}
                  type="time"
                  name="time"
                  value={newVisitor.time}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>
            </div>
          </Form>
        </Modal.Body>
        <Modal.Footer style={{ border: "none" }}>
          <Button
            style={{
              width: "175px",
              height: "51px",
              border: "1px solid #202224",
              background: "#FFFFFF",
              color: "#202224",
            }}
            onClick={handleCloseModal}
            variant="secondary"
          >
            Cancel
          </Button>
          <Button
            style={{
              width: "175px",
              height: "51px",
              border: "1px",
              color: "#FFFFFF",

            }}
            className="save"
            onClick={handleSaveDetails}
          >
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default VisitorsTracking;