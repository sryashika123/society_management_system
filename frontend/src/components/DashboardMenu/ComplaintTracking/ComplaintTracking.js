import React, { useState } from "react";
import { Container, Row, Col, Button, Table, Modal, Form } from "react-bootstrap";
import { FaEdit, FaEye, FaTrash } from "react-icons/fa";
import SideBar from "../../Layouts/Sidebar";
import Avatar   from "../../images/Avatar.png";

const ComplaintTable = () => {
    const [complaints, setComplaints] = useState([
        { id: 1, name: "Evelyn Harper", type: "Unethical Behavior", description: "Providing false information gvefwef fbf nfvbf nffvb nmffvbn m", unit: "A", number: "1001", priority: "Medium", status: "Pending" },
        { id: 2, name: "Esther Howard", type: "Preventive Measures", description: "Regular waste collection services", unit: "B", number: "1002", priority: "Low", status: "Open" },
    ]);
    const [showModal, setShowModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [showViewModal, setShowViewModal] = useState(false);
    const [selectedComplaint, setSelectedComplaint] = useState(null);
    const [editingComplaint, setEditingComplaint] = useState(null); // To store the complaint to be edited
    const [showEditModal, setShowEditModal] = useState(false); // To manage visibility of the Edit modal
    // To show error messages

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
    const handleView = (complaint) => {
        setSelectedComplaint(complaint);
        setShowViewModal(true);
    };

    const handleCloseViewModal = () => setShowViewModal(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewComplaint((prev) => ({ ...prev, [name]: value }));
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

    const handleEdit = (complaint) => {
        setEditingComplaint(complaint); // Store the complaint data
        setNewComplaint(complaint); // Populate the form with the complaint data
        setShowEditModal(true); // Show the Edit modal
    };
    const handleEditComplaint = () => {
        // Validate: Check if required fields are filled
        if (!newComplaint.name || !newComplaint.type || !newComplaint.description || !newComplaint.unit || !newComplaint.number) {
            setErrorMessage("Please fill in all the required fields.");
            return;
        }

        // If validation passes, update the complaint in the state
        setComplaints((prevComplaints) =>
            prevComplaints.map((complaint) =>
                complaint.id === editingComplaint.id ? { ...newComplaint, id: complaint.id } : complaint
            )
        );

        handleCloseEditModal(); // Close the modal after saving changes
    };

    const handleCloseEditModal = () => {
        setShowEditModal(false); // Close the modal
        setEditingComplaint(null); // Clear selected complaint data
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
    const buttonStyle = {
        width: "175px",
        height: "51px",
        border: "1px",
        padding: "10px 55px",
        color: "#202224",
    };

    const titleStyle = { width: "371px", height: "40px", display: "flex", alignItems: "center", gap: "10px" };
    const contentStyle = { width: "371px", height: "316px", display: "flex", flexDirection: "column", gap: "25px" };
    const sectionStyle = { width: "285px", height: "70px", display: "flex", gap: "15px" };
    const smallTextStyle = { fontFamily: "Poppins", fontSize: "16px", fontWeight: "400", lineHeight: "24px", color: "#A7A7A7" };

    const handleDelete = (id) => {
        setComplaints((prevComplaints) => prevComplaints.filter((complaint) => complaint.id !== id));
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
            borderRadius: "50px",
            color: "#333",
        };

        if (status === "Pending") return { ...baseStyle, backgroundColor: "#FFC3131A" };
        if (status === "Open") return { ...baseStyle, backgroundColor: "#5678E91A" };
        if (status === "Solved") return { ...baseStyle, backgroundColor: "#39973D1A" };
        return { ...baseStyle, backgroundColor: "#f8f9fa" };
    };

    return (
        <Container fluid style={{ marginTop: "20px" }}>
            <div className='bg-white ' style={{ border: "1px solid #ddd", borderRadius: "8px", boxShadow: "0px 0px 15px rgba(0, 0, 0, 0.1)", overflow: "hidden", padding: "20px" }}>
                <div className="d-flex justify-content-between align-items-center">
                    <h2>Complaints</h2>
                    <Button variant="warning" style={{ border:'none'}} className="text-white mainColor2" onClick={handleShowModal}>
                        Create Complaint
                    </Button>
                </div>
            

            {/* Modal for Create Complaint Form */}

            <Modal show={showModal} onHide={handleCloseModal} centered className='square-modal'>
                <Modal.Header closeButton style={{ borderBottom: 'none' }}>
                    <Modal.Title>Create Complaint</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}

                    <Form style={{ color: '#202224', fontWeight: '500' }}>
                        {['name', 'type', 'description', 'unit', 'number'].map((field) => (
                            <Form.Group controlId={field} key={field}>
                                <Form.Label>{`${field.charAt(0).toUpperCase() + field.slice(1)}`}</Form.Label>
                                <Form.Control
                                style={{marginBottom:'10px'}}
                                    type="text"
                                    placeholder={`Enter ${field}`}
                                    name={field}
                                    value={newComplaint[field]}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                        ))}

                        {['priority', 'status'].map((type) => (
                            <Col xs={12} key={type}>
                                <Form.Label>{`${type.charAt(0).toUpperCase() + type.slice(1)}`}</Form.Label>
                                <div className="d-flex justify-content-around ">
                                    {['High', 'Medium', 'Low'].map((level) => (
                                        <div style={radioStyle} key={level}>
                                            <Form.Check
                                                type="radio"
                                                label={level}
                                                name={type}
                                                value={level}
                                                checked={newComplaint[type] === level}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </Col>
                        ))}
                    </Form>
                </Modal.Body>

                <div className="d-flex justify-content-between">
                    <button type="button" className="btn btn-outline-secondary"
                        style={{ width: '45%', borderRadius: '10px', paddingTop: '10px', paddingBottom: '10px', marginBottom: '15px', marginLeft: '15px' }}
                        onClick={handleCloseModal}>
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="btn"
                        style={{
                            background: 'linear-gradient(90deg, #FE512E 0%, #F09619 100%)',
                            color: 'White',
                            width: '45%',
                            borderRadius: '10px',
                            marginBottom: '15px',
                            marginRight: '15px',
                            paddingTop: '10px',
                            paddingBottom: '10px',
                        }}
                        data-bs-dismiss="modal"
                        onClick={handleCreateComplaint}
                    >
                        Save
                    </button>
                </div>
            </Modal>


            {/* Modal for view Complaint Form */}

            <Modal show={showViewModal} onHide={handleCloseViewModal} className="square-modal" style={{ width: "410px", left: "755px", paddingTop: "20px", borderRadius: "15px 0px 0px 0px" , height:'100%' }}>
                <Modal.Header closeButton>
                    <Modal.Title style={titleStyle}>View Complaint</Modal.Title>
                </Modal.Header>
                <Modal.Body style={contentStyle}>
                    {selectedComplaint && (
                        <div>
                            <div style={sectionStyle}>
                                <img src={Avatar}alt="avatar" style={{ width: "70px", height: "70px", borderRadius: "50%", border: "3px solid #F4F4F4" }} />
                                <div style={{ marginTop: "10px" }}>
                                    <h5 style={{ margin: 0 }}>{selectedComplaint.name}</h5>
                                    <span>Aug 5, 2024</span>
                                </div>
                            </div>

                            <div style={{ marginTop: "15px" }}>
                                <strong>Request Name</strong> <br />
                                <span>{selectedComplaint.type}</span>
                            </div>
                            <div style={{ marginTop: "15px" }}>
                                <strong>Description</strong>
                                <p style={{ margin: 0 }}>{selectedComplaint.description}</p>
                            </div>

                            <div className="d-flex justify-content-around mt-2">
                                <div style={{ width: "41px", height: "55px", textAlign: "center" }}>
                                    <strong style={smallTextStyle}>Wing</strong>
                                    <p style={{ border: "1px solid", borderRadius: "50%", width: "28px", height: "28px", display: "flex", alignItems: "center", justifyContent: "center", color: "skyblue" }}>{selectedComplaint.unit}</p>
                                </div>

                                <div style={{ textAlign: "center" }}>
                                    <strong style={smallTextStyle}>Unit</strong>
                                    <p style={{ color: "#202224" }}>{selectedComplaint.number}</p>
                                </div>

                                <div style={{ textAlign: "center" }}>
                                    <strong style={smallTextStyle}>Priority</strong>
                                    <p style={{ borderRadius: "50px", width: "80px", height: "28px", background: badgeStyle(selectedComplaint.priority).backgroundColor, color: "white" }}>{selectedComplaint.priority}</p>
                                </div>

                                <div style={{ textAlign: "center" }}>
                                    <strong style={smallTextStyle}>Status</strong>
                                    <p style={{ padding: "2px 10px", borderRadius: "50px", backgroundColor: statusBadgeStyle(selectedComplaint.status).backgroundColor, color: statusBadgeStyle(selectedComplaint.status).color }}>{selectedComplaint.status}</p>
                                </div>
                            </div>
                        </div>
                    )}
                </Modal.Body>
            </Modal>

            {/* Modal for Editing Complaint Form */}

            <Modal show={showEditModal} onHide={handleCloseEditModal} centered className="square-modal">
                <Modal.Header closeButton style={{ borderBottom: 'none' }}>
                    <Modal.Title>Edit Complaint</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form style={{ color: '#202224', fontWeight: '500' }}>
                        {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}

                        {/* Form Fields */}
                        {["name", "type", "description", "unit", "number"].map((field) => (
                            <Form.Group key={field} controlId={field}>
                                <Form.Label style={{marginTop:'10px'}}>{field.charAt(0).toUpperCase() + field.slice(1)}</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder={`Enter ${field.charAt(0).toUpperCase() + field.slice(1)}`}
                                    name={field}
                                    value={newComplaint[field]}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                        ))}

                        {/* Priority Radio Buttons */}
                        <Form.Label>Priority</Form.Label>
                        <div className="d-flex justify-content-around">
                            {["High", "Medium", "Low"].map((priority) => (
                                <Form.Check
                                style={{marginBottom:'10px'}}
                                    key={priority}
                                    type="radio"
                                    label={priority}
                                    name="priority"
                                    value={priority}
                                    checked={newComplaint.priority === priority}
                                    onChange={handleChange}
                                />
                            ))}
                        </div>

                        {/* Status Radio Buttons */}
                        <Form.Label>Status</Form.Label>
                        <div className="d-flex justify-content-around">
                            {["Open", "Pending", "Solved"].map((status) => (
                                <Form.Check
                                style={{marginBottom:'10px'}}
                                    key={status}
                                    type="radio"
                                    label={status}
                                    name="status"
                                    value={status}
                                    checked={newComplaint.status === status}
                                    onChange={handleChange}
                                />
                            ))}
                        </div>
                    </Form>
                </Modal.Body>

                <div className="d-flex justify-content-between">
                    <button type="button" className="btn btn-outline-secondary"
                        style={{ width: '45%', borderRadius: '10px', paddingTop: '10px', paddingBottom: '10px', marginBottom: '15px', marginLeft: '15px' }}
                        onClick={handleCloseEditModal}>
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="btn"
                        style={{
                            background: 'linear-gradient(90deg, #FE512E 0%, #F09619 100%)',
                            color: 'White',
                            width: '45%',
                            borderRadius: '10px',
                            marginBottom: '15px',
                            marginRight: '15px',
                            paddingTop: '10px',
                            paddingBottom: '10px',
                        }}
                        data-bs-dismiss="modal"
                        onClick={handleEditComplaint}
                    >
                        Save
                    </button>
                </div>
            </Modal>



            {/* Complaints Table */}
            
                <Table responsive hover className="mt-3" style={{ backgroundColor: '#f5f8ff', borderRadius: '8px', border: "1px solid #ddd", boxShadow: "0px 0px 15px rgba(0, 0, 0, 0.1)", overflow: "hidden", padding: "20px" }}>
                    <thead style={{ background: "#5678E9", color: "#ffffff" }}>
                        <tr>
                            <th style={{ backgroundColor: 'rgb(185, 198, 242)' }} className="text-start">Complainer Name</th>
                            <th style={{ backgroundColor: 'rgb(185, 198, 242)' }}>Complaint Name</th>
                            <th style={{ backgroundColor: 'rgb(185, 198, 242)' }} className="text-center">Description</th>
                            <th style={{ backgroundColor: 'rgb(185, 198, 242)' }} className="text-center">Unit Number</th>
                            <th style={{ backgroundColor: 'rgb(185, 198, 242)' }} className="text-center">Priority</th>
                            <th style={{ backgroundColor: 'rgb(185, 198, 242)' }} className="text-center">Status</th>
                            <th style={{ backgroundColor: 'rgb(185, 198, 242)' }} className="text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {complaints.map((complaint) => (
                            <tr key={complaint.id}>
                                <td style={tableColumnStyle} className="text-start" >
                                    <div style={imageColumnStyle} className="text-center">
                                        <img
                                            src={Avatar}
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
                                    width: "300px",                    // Set the width of the element
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
                                    <div className="d-flex align-items-center justify-content-center gap-2">
                                        <div
                                            style={{
                                                border: "1px solid ", borderRadius: "50%", width: "28px", height: "28px", display: "inline-flex", justifyContent: "center", alignItems: "center", color: "skyblue"
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
                                        <FaEye className="text-primary me-2" style={{ cursor: "pointer" }} onClick={() => handleView(complaint)} />
                                        <FaEdit
                                            className="text-success me-2"
                                            style={{ cursor: "pointer" }}
                                            onClick={() => handleEdit(complaint)}
                                        />

                                        <FaTrash className="text-danger" style={{ cursor: "pointer" }} onClick={() => handleDelete(complaint.id)} />
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
        <Container fluid className="p-0 " style={{ maxWidth: "100%", overflowX: "hidden" }}>
            <Row className="m-0 main-content">
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
