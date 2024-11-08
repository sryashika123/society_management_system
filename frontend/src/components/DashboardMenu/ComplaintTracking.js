import React, { useState } from "react";
import { Container, Row, Col, Button, Table, Modal, Form } from "react-bootstrap";
import { FaEdit, FaEye, FaTrash } from "react-icons/fa";
import SideBar from "../Layouts/Sidebar";

const ComplaintTable = () => {
    const [complaints, setComplaints] = useState([
        { id: 1, name: "Evelyn Harper", type: "Unethical Behavior", description: "Providing false information gvefwef fbf nfvbf nffvb nmffvbn m", unit: "A", number: "1001", priority: "Medium", status: "Pending" },
        { id: 2, name: "Esther Howard", type: "Preventive Measures", description: "Regular waste collection services", unit: "B", number: "1002", priority: "Low", status: "Open" },
    ]);
    const [showModal, setShowModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");


    // Form state
    const [newComplaint, setNewComplaint] = useState({
        name: "",
        type: "",
        description: "",
        unit: "",
        number: "",
        priority: "Medium",
        status: "Open",
    });


    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewComplaint((prev) => ({ ...prev, [name]: value }));
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




    const badgeStyle = (priority) => {
        const baseStyle = {
            color: "white",
            width: "100px",
            height: "31px",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "5px",
        };

        if (priority === "High") return { ...baseStyle, backgroundColor: "#E74C3C" };
        if (priority === "Medium") return { ...baseStyle, backgroundColor: "#5678E9" };
        return { ...baseStyle, backgroundColor: "#39973D" };
    };

    const handleCreateComplaint = () => {
        // Validate: Check if required fields are filled
        if (!newComplaint.name || !newComplaint.type || !newComplaint.description || !newComplaint.unit || !newComplaint.number) {
            setErrorMessage("Please fill in all the required fields.");
            return;
        }

        // If all fields are filled, add the new complaint
        setComplaints([...complaints, { ...newComplaint, id: complaints.length + 1 }]);
        handleCloseModal();
    };



    const statusBadgeStyle = (status) => {
        const baseStyle = {
            width: "100px",
            height: "31px",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "5px",
            color: "#333",
        };

        if (status === "Pending") return { ...baseStyle, backgroundColor: "#FFC3131A" };
        if (status === "Open") return { ...baseStyle, backgroundColor: "#5678E91A" };
        if (status === "Solved") return { ...baseStyle, backgroundColor: "#39973D1A" };
        return { ...baseStyle, backgroundColor: "#f8f9fa" };
    };

    return (
        <Container fluid style={{ marginTop: "20px" }}>
            <Row className="py-4">
                <Col className="d-flex justify-content-between align-items-center">
                    <h2>Complaints</h2>
                    <Button variant="warning" className="text-white mainColor2" onClick={handleShowModal}>
                        Create Complaint
                    </Button>
                </Col>
            </Row>

            {/* Modal for Create Complaint Form */}
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Create Complaint</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        {errorMessage && <div className="alert alert-danger">{errorMessage}</div>} {/* Display error message */}
                        {/* ...rest of your form */}
                        <Form.Group controlId="complainerName">
                            <Form.Label>Complainer Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter Name"
                                name="name"
                                value={newComplaint.name}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Form.Group controlId="complaintType">
                            <Form.Label>Complaint Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter Complaint Type"
                                name="type"
                                value={newComplaint.type}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Form.Group controlId="description">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter Description"
                                name="description"
                                value={newComplaint.description}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Form.Group controlId="unit">
                            <Form.Label>Unit</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter Unit"
                                name="unit"
                                value={newComplaint.unit}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Form.Group controlId="number">
                            <Form.Label>Unit Number</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter Unit Number"
                                name="number"
                                value={newComplaint.number}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        {/* Priority and Status with Radio Buttons */}
                        <Row>
                            <Col xs={12}>
                                <Form.Label>Priority</Form.Label>
                                <div className="d-flex justify-content-around " >
                                    <div style={{ width: "113px", height: "41px", border: "1px solid #ccc", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "5px", paddingTop: "10px", paddingRight: "15px", paddingBottom: "10px", paddingLeft: "15px" }} >
                                        <Form.Check
                                            type="radio"
                                            label="High"
                                            name="priority"
                                            value="High"
                                            checked={newComplaint.priority === "High"}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div style={{ width: "113px", height: "41px", border: "1px solid #ccc", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "5px", paddingTop: "10px", paddingRight: "15px", paddingBottom: "10px", paddingLeft: "15px" }}>
                                        <Form.Check
                                            type="radio"
                                            label="Medium"
                                            name="priority"
                                            value="Medium"
                                            checked={newComplaint.priority === "Medium"}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div style={{ width: "113px", height: "41px", border: "1px solid #ccc", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "5px", paddingTop: "10px", paddingRight: "15px", paddingBottom: "10px", paddingLeft: "15px" }}>
                                        <Form.Check
                                            type="radio"
                                            label="Low"
                                            name="priority"
                                            value="Low"
                                            checked={newComplaint.priority === "Low"}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                            </Col>


                            <Col xs={12}>
                                <Form.Label>Status</Form.Label>
                                <div className="d-flex justify-content-around">
                                    <div style={{ width: "113px", height: "41px", border: "1px solid #ccc", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "5px", paddingTop: "10px", paddingRight: "15px", paddingBottom: "10px", paddingLeft: "15px" }}>
                                        <Form.Check
                                            type="radio"
                                            label="Open"
                                            name="status"
                                            value="Open"
                                            checked={newComplaint.status === "Open"}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div style={{ width: "113px", height: "41px", border: "1px solid #ccc", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "5px", paddingTop: "10px", paddingRight: "15px", paddingBottom: "10px", paddingLeft: "15px" }}>
                                        <Form.Check
                                            type="radio"
                                            label="Pending"
                                            name="status"
                                            value="Pending"
                                            checked={newComplaint.status === "Pending"}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div style={{ width: "113px", height: "41px", border: "1px solid #ccc", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "5px", paddingTop: "10px", paddingRight: "15px", paddingBottom: "10px", paddingLeft: "15px" }}>
                                        <Form.Check
                                            type="radio"
                                            label="Solved"
                                            name="status"
                                            value="Solved"
                                            checked={newComplaint.status === "Solved"}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </Form>
                </Modal.Body>

                <Modal.Footer style={{ display: "flex", justifyContent: "space-between" }}>


                    <Button variant="secondary" onClick={handleCloseModal} style={{ width: "175px", height: "51px", border: "1px  #202224", padding: "10px 55px 10px 55px", background: "#FFFFFF", color: "#202224", }}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleCreateComplaint} style={{
                        width: "175px", height: "51px", border: "1px", padding: "10px 55px 10px 55px", background: "#F6F8FB", color: "#202224",

                    }}>
                        Create
                    </Button>

                </Modal.Footer>
            </Modal>


            {/* Complaints Table */}
            <div style={{ border: "1px solid #ddd", borderRadius: "8px", boxShadow: "0px 0px 15px rgba(0, 0, 0, 0.1)", overflow: "hidden", padding: "20px" }}>
                <Table hover responsive>
                    <thead style={{ background: "#5678E9", color: "#ffffff" }}>
                        <tr>
                            <th className="text-start">Complainer Name</th>
                            <th>Complaint Name</th>
                            <th className="text-center">Description</th>
                            <th className="text-center">Unit Number</th>
                            <th className="text-center">Priority</th>
                            <th className="text-center">Status</th>
                            <th className="text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {complaints.map((complaint) => (
                            <tr key={complaint.id}>
                                <td style={tableColumnStyle} className="text-start" >
                                    <div style={imageColumnStyle} className="text-center">
                                        <img
                                            src="https://via.placeholder.com/30"
                                            alt="avatar"
                                            className="rounded-circle"
                                            style={{ width: "30px", height: "30px" }}
                                        />
                                        {complaint.name}
                                    </div>
                                </td>

                                <td>{complaint.type}</td>
                                <td style={{
                                    ...tableColumnStyle,               // Presuming tableColumnStyle is a predefined style object
                                    width: "250px",                    // Set the width of the element
                                    height: "24px",                    // Set the height of the element
                                    top: "21px",                       // Set the top positioning (ensure relative/absolute context)
                                    left: "465px",                     // Set the left positioning (ensure relative/absolute context)
                                    fontSize: "16px",                  // Set font size
                                              // Set font weight
                                    lineHeight: "24px",                // Set line height
                                    textAlign: "left",                 // Align text to the left
                                    // Set background color
                                    // Needed for positioning with top/left
                                }}>
                                    {complaint.description}
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
                                            {complaint.unit}
                                        </div>
                                        {/* Unit number without any special formatting */}
                                        <div>{complaint.number}</div>

                                    </div>
                                </td>

                                <td className="text-center">
                                    <span className="badge" style={badgeStyle(complaint.priority)}>
                                        {complaint.priority}
                                    </span>
                                </td>
                                <td className="text-center">
                                    <span className="badge" style={statusBadgeStyle(complaint.status)}>
                                        {complaint.status}
                                    </span>
                                </td>
                                <td className="text-center">
                                    <div className="d-flex align-items-center justify-content-center">
                                        <FaEye className="text-primary me-2" style={{ cursor: "pointer" }} />
                                        <FaEdit className="text-success me-2" style={{ cursor: "pointer" }} />
                                        <FaTrash className="text-danger" style={{ cursor: "pointer" }} />
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
                    <ComplaintTable />
                </Col>
            </Row>
        </Container>
    );
};

export default Dashboard;
