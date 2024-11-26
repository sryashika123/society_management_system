import React, { useState, useEffect } from "react";
import { Table, Button, Badge, Modal, Form } from "react-bootstrap";
import { FaEdit, FaEye } from "react-icons/fa";
import SideBar from "../Layouts/Sidebar";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import Avatar   from "../images/Avatar.png";

const ResidentTable = () => {
  const [residents, setResidents] = useState([
    { id: 1, name: "Evelyn Harper", unitNumber: "1001", unitStatus: "Occupied", residentStatus: "Tenant", phone: "97587 85828", members: 1, vehicles: 2 },
    { id: 2, name: "", unitNumber: "1002", unitStatus: "Vacate", residentStatus: "", phone: "", members: "-", vehicles: "-" },
    { id: 3, name: "Evelyn Harper", unitNumber: "1003", unitStatus: "Occupied", residentStatus: "Owner", phone: "97587 85828", members: 1, vehicles: 4 },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [currentResident, setCurrentResident] = useState({});
  const [unitStatus, setUnitStatus] = useState("");
  const [residentStatus, setResidentStatus] = useState("");  // Added state for resident status
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedResident, setSelectedResident] = useState(null); // Added state for viewing resident

  const handleEditClick = (resident) => {
    setCurrentResident(resident);
    setUnitStatus(resident.unitStatus); // Set the initial unit status from the resident
    setResidentStatus(resident.unitStatus === "Occupied" ? (resident.residentStatus || "Tenant") : "--"); // Set resident status based on unit status
    setShowModal(true);
  };

  const handleSave = () => {
    // Update the resident's unit status and resident status as needed
    const updatedResidents = residents.map((resident) =>
      resident.id === currentResident.id ? { ...resident, unitStatus, residentStatus } : resident
    );
    setResidents(updatedResidents);
    setShowModal(false);
  };

  const handleCancel = () => {
    setShowModal(false);
  };

  const handleView = (resident) => {
    setSelectedResident(resident);
    setShowViewModal(true); // Show view modal
  };

  const handleCloseViewModal = () => {
    setShowViewModal(false);
    setSelectedResident(null);
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

  // Update resident status automatically when unit status changes
  useEffect(() => {
    if (unitStatus === "Occupied") {
      setResidentStatus("Tenant"); // Or use any logic to set "Owner" based on some condition
    } else {
      setResidentStatus("--");
    }
  }, [unitStatus]);

  return (
    <div className="d-flex flex-column flex-md-row vh-100">
      <div className="col-12 col-md-3 flex-shrink-0" style={{ maxWidth: "300px" }}>
        <SideBar />
      </div>

      <div className="col-12 col-md-9 p-4 flex-grow-1">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2>Resident Tenant and Owner Details</h2>
          <Link to="/home/addresidents">
            <Button className="mainColor2">Add New Resident Details</Button>
          </Link>
        </div>
<div  style={{ border: "1px solid #ddd", borderRadius: "8px", boxShadow: "0px 0px 15px rgba(0, 0, 0, 0.1)", overflow: "hidden", padding: "20px" }}>
        <Table responsive="sm"  hover className="text-center">
          <thead  >
            <tr >
              <th style={{backgroundColor: 'rgb(185, 198, 242)'}} className="text-start">Full Name</th>
              <th style={{backgroundColor: 'rgb(185, 198, 242)'}}>Unit Number</th>
              <th style={{backgroundColor: 'rgb(185, 198, 242)'}}>Unit Status</th>
              <th style={{backgroundColor: 'rgb(185, 198, 242)'}}>Resident Status</th>
              <th style={{backgroundColor: 'rgb(185, 198, 242)'}}>Phone Number</th>
              <th style={{backgroundColor: 'rgb(185, 198, 242)'}}>Member</th>
              <th style={{backgroundColor: 'rgb(185, 198, 242)'}}>Vehicle</th>
              <th style={{backgroundColor: 'rgb(185, 198, 242)'}}>Action</th>
            </tr>
          </thead>
          <tbody>
            {residents.map((resident) => (
              <tr key={resident.id}>
                <td style={tableColumnStyle} className="text-start" >
                                    <div style={imageColumnStyle} className="text-center">
                                        <img
                                            src={Avatar}
                                            alt="avatar"
                                            className="rounded-circle"
                                            style={{ width: "30px", height: "30px" }}
                                        />
                                        {resident.name}
                                    </div>
                                </td>
                <td>{resident.unitNumber}</td>
                <td>
                  <Badge bg={resident.unitStatus === "Occupied" ? "success" : "secondary"}>
                    {resident.unitStatus}
                  </Badge>
                </td>
                <td>
                  <Badge bg={resident.residentStatus === "Tenant" ? "danger" : "primary"}>
                    {resident.residentStatus || "--"}
                  </Badge>
                </td>
                <td>{resident.phone || "--"}</td>
                <td>{resident.members}</td>
                <td>{resident.vehicles}</td>
                <td>
                  <button className="btn btn-success me-2" onClick={() => handleEditClick(resident)}>
                    <FaEdit />
                  </button>
                  <button className="btn btn-info" onClick={() => handleView(resident)}>
                    <FaEye />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
</div>
        {/* Edit Modal */}
        <Modal show={showModal} onHide={handleCancel} centered>
          <Modal.Header closeButton>
            <Modal.Title>Update Resident Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group>
                <div className="flex-container">
                  <div className="radio-input-field me-2">
                    <Form.Check
                      type="radio"
                      label="Occupied"
                      name="unitStatus"
                      value="Occupied"
                      checked={unitStatus === "Occupied"}
                      onChange={(e) => setUnitStatus(e.target.value)}
                    />
                  </div>
                  <div className="radio-input-field">
                    <Form.Check
                      type="radio"
                      label="Vacate"
                      name="unitStatus"
                      value="Vacate"
                      checked={unitStatus === "Vacate"}
                      onChange={(e) => setUnitStatus(e.target.value)}
                    />
                  </div>
                </div>
                <Form.Text className="text-muted">
                  By selecting, you agree to choose <strong>{unitStatus}</strong>.
                </Form.Text>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button className="btn btn-secondary" onClick={handleCancel}>
              Cancel
            </Button>
            <Button onClick={handleSave} className="mainColor2">
              Save
            </Button>
          </Modal.Footer>
        </Modal>

        {/* View Modal */}
        <Modal show={showViewModal} onHide={handleCloseViewModal} centered>
          <Modal.Header closeButton>
            <Modal.Title>Resident Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {selectedResident && (
              <>
                <p><strong>Name:</strong> {selectedResident.name || "-"}</p>
                <p><strong>Unit Number:</strong> {selectedResident.unitNumber}</p>
                <p><strong>Unit Status:</strong> {selectedResident.unitStatus}</p>
                <p><strong>Resident Status:</strong> {selectedResident.residentStatus || "--"}</p>
                <p><strong>Phone Number:</strong> {selectedResident.phone || "--"}</p>
                <p><strong>Members:</strong> {selectedResident.members}</p>
                <p><strong>Vehicles:</strong> {selectedResident.vehicles}</p>
              </>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button className="btn btn-secondary" onClick={handleCloseViewModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default ResidentTable;
