import React, { useState } from "react";
import { Container, Row, Col, Button, Table, Modal, Form } from "react-bootstrap";
import { FaEdit, FaEye, FaTrash } from "react-icons/fa";
import SideBar from "../Layouts/Sidebar";
import Avatar   from "../images/Avatar.png";

const RequestTable = () => {
  const [requests, setRequests] = useState([
      { id: 1, name: "Evelyn Harper", type: "Unethical Behavior", description: "Providing false information gvefwef fbf nfvbf nffvb nmffvbn m", date: "2023-06-01", unit: "A", number: "1001", priority: "Medium", status: "Pending" },
      { id: 2, name: "Esther Howard", type: "Preventive Measures", description: "Regular waste collection services", date: "2023-06-02", unit: "B", number: "1002", priority: "Low", status: "Open" },
  ]);
  const [showModal, setShowModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [editingRequest, setEditingRequest] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  const [newRequest, setNewRequest] = useState({
      name: "",
      type: "",
      description: "",
      date:"",
      unit: "",
      number: "",
      priority: "Medium",
      status: "Open",
  });

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);
  const handleView = (request) => {
      setSelectedRequest(request);
      setShowViewModal(true);
  };

  const handleCloseViewModal = () => setShowViewModal(false);

  const handleChange = (e) => {
      const { name, value } = e.target;
      setNewRequest((prev) => ({ ...prev, [name]: value }));
  };

  const radioStyle = {
      width: "113px",
      height: "41px",
      border: "1px solid #ccc",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: "5px",
      paddingTop: "10px",
      paddingRight: "15px",
      paddingBottom: "10px",
      paddingLeft: "15px"
  };

  const handleEdit = (request) => {
      setEditingRequest(request);
      setNewRequest(request);
      setShowEditModal(true);
  };

  const handleEditRequest = () => {
      if (!newRequest.name || !newRequest.type || !newRequest.description || !newRequest.date || !newRequest.unit || !newRequest.number) {
          setErrorMessage("Please fill in all the required fields.");
          return;
      }

      setRequests((prevRequests) =>
          prevRequests.map((request) =>
              request.id === editingRequest.id ? { ...newRequest, id: request.id } : request
          )
      );

      handleCloseEditModal();
  };

  const handleCloseEditModal = () => {
      setShowEditModal(false);
      setEditingRequest(null);
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
      alignItems: "center",
      justifyContent: "flex-start",
      gap: "10px",
  };
  
  const buttonStyle = {
      width: "175px",
      height: "51px",
      border: "1px",
      padding: "10px 55px",
      color: "#202224",
  };

  const titleStyle = { width: "371px", height: "40px", display: "flex", alignItems: "center", gap: "10px" };
  const contentStyle = { width: "371px", height: "316px", display: "flex", flexDirection: "column", gap: "25px", fontFamily: "Poppins, sans-serif" };
  const sectionStyle = { width: "285px", height: "70px", display: "flex", gap: "15px" };
  const smallTextStyle = { fontFamily: "Poppins", fontSize: "16px", fontWeight: "400", lineHeight: "24px", color: "#A7A7A7" };

  const handleDelete = (id) => {
      setRequests((prevRequests) => prevRequests.filter((request) => request.id !== id));
  };

  const badgeStyle = (priority) => {
      const baseStyle = {
          color: "white",
          width: "100px",
          height: "31px",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "50px",
      };

      if (priority === "High") return { ...baseStyle, backgroundColor: "#E74C3C" };
      if (priority === "Medium") return { ...baseStyle, backgroundColor: "#5678E9" };
      return { ...baseStyle, backgroundColor: "#39973D" };
  };

  const handleCreateRequest = () => {
      if (!newRequest.name || !newRequest.type || !newRequest.description || !newRequest.date || !newRequest.unit || !newRequest.number) {
          setErrorMessage("Please fill in all the required fields.");
          return;
      }

      setRequests([...requests, { ...newRequest, id: requests.length + 1 }]);
      handleCloseModal();
  };

  const statusBadgeStyle = (status) => {
      const baseStyle = {
          width: "100px",
          height: "31px",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "50px",
          color: "#333",
      };

      if (status === "Pending") return { ...baseStyle, backgroundColor: "#FFC3131A" };
      if (status === "Open") return { ...baseStyle, backgroundColor: "#5678E91A" };
      if (status === "Resolved") return { ...baseStyle, backgroundColor: "#39973D1A" };
      return { ...baseStyle, backgroundColor: "#f8f9fa" };
  };

  return (
    <Container fluid style={{ marginTop: "20px" }}>
        <Row className="py-4">
            <Col className="d-flex justify-content-between align-items-center">
                <h2>Requests</h2>
                <Button variant="warning" className="text-white mainColor2" onClick={handleShowModal}>
                    Create Request
                </Button>
            </Col>
        </Row>

        {/* Modal for Create Request Form */}

        <Modal show={showModal} onHide={handleCloseModal}>
            <Modal.Header closeButton>
                <Modal.Title>Create Request</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}

                <Form>
                    {['name', 'type', 'description', 'date', 'unit', 'number'].map((field) => (
                        <Form.Group controlId={field} key={field}>
                            <Form.Label>{`${field.charAt(0).toUpperCase() + field.slice(1)}`}</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder={`Enter ${field}`}
                                name={field}
                                value={newRequest[field]}
                                onChange={handleChange}
                            />
                        </Form.Group>
                    ))}

                    {['priority', 'status'].map((type) => (
                        <Col xs={12} key={type}>
                            <Form.Label>{`${type.charAt(0).toUpperCase() + type.slice(1)}`}</Form.Label>
                            <div className="d-flex justify-content-around">
                                {['High', 'Medium', 'Low'].map((level) => (
                                    <div style={radioStyle} key={level}>
                                        <Form.Check
                                            type="radio"
                                            label={level}
                                            name={type}
                                            value={level}
                                            checked={newRequest[type] === level}
                                            onChange={handleChange}
                                        />
                                    </div>
                                ))}
                            </div>
                        </Col>
                    ))}
                </Form>
            </Modal.Body>

            <Modal.Footer style={{ display: "flex", justifyContent: "space-between" }}>
                <Button variant="secondary" onClick={handleCloseModal} style={buttonStyle}>
                    Cancel
                </Button>
                <Button className="mainColor2" onClick={handleCreateRequest} style={buttonStyle}>
                    Create
                </Button>
            </Modal.Footer>
        </Modal>

        {/* Modal for view Request Form */}

        <Modal show={showViewModal} onHide={handleCloseViewModal} style={{ width: "410px", left: "755px", paddingTop: "20px", borderRadius: "15px 0px 0px 0px" }}>
            <Modal.Header closeButton>
                <Modal.Title style={titleStyle}>View Request</Modal.Title>
            </Modal.Header>
            <Modal.Body style={contentStyle}>
                {selectedRequest && (
                    <div>
                        <div style={sectionStyle}>
                            <img src={Avatar} alt="avatar" style={{ width: "70px", height: "70px", borderRadius: "50%", border: "3px solid #F4F4F4" }} />
                            <div style={{ marginTop: "10px" }}>
                                <h5 style={{ margin: 0 }}>{selectedRequest.name}</h5>
                                <span>Aug 5, 2024</span>
                            </div>
                        </div>

                        <div style={{ marginTop: "15px" }}>
                            <strong>Request Name</strong> <br />
                            <span>{selectedRequest.type}</span>
                        </div>
                        <div style={{ marginTop: "15px" }}>
                            <strong>Description</strong>
                            <p style={{ margin: 0 }}>{selectedRequest.description}</p>
                        </div>

                        <div style={{ marginTop: "15px" }}>
                            <strong>Request date</strong>
                            <p style={{ margin: 0 }}>{selectedRequest.date}</p>
                        </div>


                        <div className="d-flex justify-content-around">
                            <div style={{ width: "41px", height: "55px", textAlign: "center" }}>
                                <strong style={smallTextStyle}>Wing</strong>
                                <p style={{ border: "1px solid", borderRadius: "50%", width: "28px", height: "28px", display: "flex", alignItems: "center", justifyContent: "center", color: "skyblue" }}>{selectedRequest.unit}</p>
                            </div>

                            <div style={{ textAlign: "center" }}>
                                <strong style={smallTextStyle}>Unit</strong>
                                <p style={{ color: "#202224" }}>{selectedRequest.number}</p>
                            </div>

                            <div style={{ textAlign: "center" }}>
                                <strong style={smallTextStyle}>Priority</strong>
                                <p style={{ borderRadius: "50px", background: badgeStyle(selectedRequest.priority).backgroundColor, color: "white" }}>{selectedRequest.priority}</p>
                            </div>

                            <div style={{ textAlign: "center" }}>
                                <strong style={smallTextStyle}>Status</strong>
                                <p style={{ padding: "2px 10px", borderRadius: "50px", backgroundColor: statusBadgeStyle(selectedRequest.status).backgroundColor, color: statusBadgeStyle(selectedRequest.status).color }}>{selectedRequest.status}</p>
                            </div>
                        </div>
                    </div>
                )}
            </Modal.Body>
        </Modal>

        {/* Modal for Editing Request Form */}

        <Modal show={showEditModal} onHide={handleCloseEditModal}>
            <Modal.Header closeButton>
                <Modal.Title>Edit Request</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}

                    {/* Form Fields */}
                    {["name", "type", "description", "date", "unit", "number"].map((field) => (
                        <Form.Group key={field} controlId={field}>
                            <Form.Label>{field.charAt(0).toUpperCase() + field.slice(1)}</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder={`Enter ${field.charAt(0).toUpperCase() + field.slice(1)}`}
                                name={field}
                                value={newRequest[field]}
                                onChange={handleChange}
                            />
                        </Form.Group>
                    ))}

                    {/* Priority Radio Buttons */}
                    <Form.Label>Priority</Form.Label>
                    <div className="d-flex justify-content-around">
                        {["High", "Medium", "Low"].map((priority) => (
                            <Form.Check
                                key={priority}
                                type="radio"
                                label={priority}
                                name="priority"
                                value={priority}
                                checked={newRequest.priority === priority}
                                onChange={handleChange}
                            />
                        ))}
                    </div>

                    {/* Status Radio Buttons */}
                    <Form.Label>Status</Form.Label>
                    <div className="d-flex justify-content-around">
                        {["Open", "Pending", "Solved"].map((status) => (
                            <Form.Check
                                key={status}
                                type="radio"
                                label={status}
                                name="status"
                                value={status}
                                checked={newRequest.status === status}
                                onChange={handleChange}
                            />
                        ))}
                    </div>
                </Form>
            </Modal.Body>

            <Modal.Footer className="d-flex justify-content-between">
                <Button variant="secondary" onClick={handleCloseEditModal}>Cancel</Button>
                <Button onClick={handleEditRequest}>Save Changes</Button>
            </Modal.Footer>
        </Modal>

        {/* Requests Table */}
        <div style={{ border: "1px solid #ddd", borderRadius: "8px", boxShadow: "0px 0px 15px rgba(0, 0, 0, 0.1)", overflow: "hidden", padding: "20px" }}>
            <Table hover responsive>
                <thead style={{ background: "#5678E9", color: "#ffffff" }}>
                    <tr>
                        <th className="text-start">Requester Name</th>
                        <th>Request Name</th>
                        <th className="text-center">Description</th>
                        <th className="text-center">Request date</th>
                        <th className="text-center">Unit Number</th>
                        <th className="text-center">Priority</th>
                        <th className="text-center">Status</th>
                        <th className="text-center">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {requests.map((request) => (
                        <tr key={request.id}>
                            <td style={tableColumnStyle} className="text-start">
                                <div style={imageColumnStyle} className="text-center">
                                    <img
                                        src={Avatar}
                                        alt="avatar"
                                        className="rounded-circle"
                                        style={{ width: "30px", height: "30px" }}
                                    />
                                    {request.name}
                                </div>
                            </td>

                            <td>{request.type}</td>
                            <td style={{
                                ...tableColumnStyle,
                                width: "300px",
                                height: "24px",
                                top: "21px",
                                left: "465px",
                                fontSize: "16px",
                                lineHeight: "24px",
                                textAlign: "left",
                            }}>
                                {request.description}
                            </td>

                            <td style={{
                                ...tableColumnStyle,
                                width: "250px",
                                height: "24px",
                                top: "21px",
                                left: "465px",
                                fontSize: "16px",
                                lineHeight: "24px",
                               
                            }}>
                                {request.date}
                            </td>

                            <td className="text-center">
                                <div className="d-flex align-items-center justify-content-center gap-2">
                                    <div
                                        style={{
                                            border: "1px solid", borderRadius: "50%", width: "28px", height: "28px", display: "inline-flex", justifyContent: "center", alignItems: "center", color: "skyblue"
                                        }}
                                    >
                                        {request.unit}
                                    </div>
                                    <div>{request.number}</div>
                                </div>
                            </td>

                            <td className="text-center">
                                <span className="badge" style={badgeStyle(request.priority)}>
                                    {request.priority}
                                </span>
                            </td>
                            <td className="text-center">
                                <span className="badge" style={statusBadgeStyle(request.status)}>
                                    {request.status}
                                </span>
                            </td>
                            <td className="text-center">
                                <div className="d-flex align-items-center justify-content-center">
                                    <FaEye className="text-primary me-2" style={{ cursor: "pointer" }} onClick={() => handleView(request)} />
                                    <FaEdit
                                        className="text-success me-2"
                                        style={{ cursor: "pointer" }}
                                        onClick={() => handleEdit(request)}
                                    />
                                    <FaTrash className="text-danger" style={{ cursor: "pointer" }} onClick={() => handleDelete(request.id)} />
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    </Container>
);
}

const Dashboard2 = () => {
    return (
        <Container fluid className="p-0" style={{ maxWidth: "100%", overflowX: "hidden" }}>
            <Row className="m-0">
                <Col xs={2} className="p-0">
                    <SideBar />
                </Col>
                <Col xs={10} className="p-4" style={{ overflowX: "auto", minHeight: "100vh" }}>
                    <RequestTable />
                </Col>
            </Row>
        </Container>
    )
    
};



export default Dashboard2;