import React, { useState } from "react";
import { Container, Row, Col, Table, Button, Modal } from "react-bootstrap";
import SideBar from "../Layouts/Sidebar";
import { FaEdit, FaEye, FaTrash } from "react-icons/fa";

const SecurityProtocol = () => {
  const [protocols, setProtocols] = useState([
    { id: 1, Title: "Evelyn Harper", Description: "Unethical Behavior", Date: "01/02/2024", Time: "10:00 AM" },
    { id: 2, Title: "Esther Howard", Description: "Preventive Measures", Date: "02/02/2024", Time: "10:00 AM" },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState(""); // Track if it's 'create', 'view', or 'edit'
  const [selectedProtocol, setSelectedProtocol] = useState(null);

  const handleShow = (type, protocol = null) => {
    setModalType(type);
    setSelectedProtocol(protocol);
    setShowModal(true);
  };
  const handleClose = () => {
    setShowModal(false);
    setSelectedProtocol(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectedProtocol((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    if (modalType === "edit") {
      setProtocols((prevProtocols) =>
        prevProtocols.map((p) =>
          p.id === selectedProtocol.id ? selectedProtocol : p
        )
      );
    } else if (modalType === "create") {
      const newId = protocols.length + 1;
      const currentDate = new Date().toLocaleDateString();
      const currentTime = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }).toUpperCase();
      const newEntry = {
        id: newId,
        ...selectedProtocol,
        Date: currentDate,
        Time: currentTime,
      };
      setProtocols((prevProtocols) => [...prevProtocols, newEntry]);
    }
    handleClose();
  };

  const handleDelete = (id) => {
    setProtocols((prevProtocols) => prevProtocols.filter((protocol) => protocol.id !== id));
  };

  return (
    <Container fluid style={{ marginTop: "20px" }}>
      <div className='bg-white' style={{ border: "1px solid #ddd", borderRadius: "8px", boxShadow: "0px 0px 15px rgba(0, 0, 0, 0.1)", overflow: "hidden", padding: "20px" }}>
        <div className="d-flex justify-content-between align-items-center">
          <h2>Security Protocol</h2>
          <Button className="btn mainColor2" onClick={() => handleShow("create")}>
            Create Protocols
          </Button>
      </div>

      <Modal show={showModal} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            {modalType === "view"
              ? "View Protocol"
              : modalType === "edit"
              ? "Edit Protocol"
              : "Create Protocol"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
  {modalType === "view" ? (
    selectedProtocol && (
      <div>
        <p><strong>Title:</strong> <br/> {selectedProtocol.Title}</p>
        <p><strong>Description:</strong> <br/> {selectedProtocol.Description}</p>
        <div className="d-flex gap-5">
        <p><strong>Date:</strong> {selectedProtocol.Date}</p>
        <p><strong>Time:</strong> {selectedProtocol.Time}</p>
        </div>
      </div>
    )
  ) : (
    <div>
      <label>Title</label>
      <input
        type="text"
        placeholder="Enter Title"
        name="Title"
        value={selectedProtocol?.Title || ""}
        onChange={handleChange}
        className="form-control"
        required
      />
      <label>Description</label>
      <textarea
        rows={3}
        placeholder="Enter Description"
        name="Description"
        value={selectedProtocol?.Description || ""}
        onChange={handleChange}
        className="form-control"
        required
      ></textarea>
      {modalType === "edit" && (
        <>
          <label>Date</label>
          <input
            type="text"
            placeholder="Enter Date"
            name="Date"
            value={selectedProtocol?.Date || ""}
            onChange={handleChange}
            className="form-control"
          />
          <label>Time</label>
          <input
            type="text"
            placeholder="Enter Time"
            name="Time"
            value={selectedProtocol?.Time || ""}
            onChange={handleChange}
            className="form-control"
          />
        </>
      )}
    </div>
  )}
</Modal.Body>

        {modalType !== "view" && (
          <Modal.Footer>
            <Button onClick={handleClose} style={{ background: "#FFFFFF", color: "#202224" }}>
              Cancel
            </Button>
            <Button onClick={handleSave} className="mainColor2">
              Save
            </Button>
          </Modal.Footer>
        )}
      </Modal>

      
        <Table hover responsive  style={{ border: "1px solid #ddd", borderRadius: "8px", boxShadow: "0px 0px 15px rgba(0, 0, 0, 0.1)", overflow: "hidden", padding: "20px" , marginTop: "20px" }}>
          <thead style={{ background: "#5678E9", color: "#ffffff" }}>
            <tr>
              <th style={{ backgroundColor: "rgb(185, 198, 242)" }}>Title</th>
              <th style={{ backgroundColor: "rgb(185, 198, 242)" }}>Description</th>
              <th style={{ backgroundColor: "rgb(185, 198, 242)" }} className="text-center">Date</th>
              <th style={{ backgroundColor: "rgb(185, 198, 242)" }} className="text-center">Time</th>
              <th style={{ backgroundColor: "rgb(185, 198, 242)" }} className="text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {protocols.map((protocol) => (
              <tr key={protocol.id}>
                <td>{protocol.Title}</td>
                <td style={{ width: "300px" }}>{protocol.Description}</td>
                <td className="text-center">{protocol.Date}</td>
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
                        {protocol.Time}
                      </div>
                    </td>
                <td className="text-center">
                  <div className="d-flex align-items-center justify-content-center">
                    <FaEye className="text-primary me-2" style={{ cursor: "pointer" }} onClick={() => handleShow("view", protocol)} />
                    <FaEdit className="text-success me-2" style={{ cursor: "pointer" }} onClick={() => handleShow("edit", protocol)} />
                    <FaTrash className="text-danger" style={{ cursor: "pointer" }} onClick={() => handleDelete(protocol.id)} />
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
        <Col xs={10} className="p-4">
          <SecurityProtocol />
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
