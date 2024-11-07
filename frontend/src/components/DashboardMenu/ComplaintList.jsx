import React, { useState } from 'react';
import { Card, Table, Button, Dropdown, Badge, Modal, Image, Form, Col, Row } from 'react-bootstrap';
import { FaEdit, FaEye, FaTrash } from 'react-icons/fa';

// Reusable modal component for editing complaints
const EditComplaintModal = ({ show, handleClose, complaintData, onSave }) => {
    const [formData, setFormData] = useState({
        complainerName: complaintData ? complaintData.name : '',
        complaintName: complaintData ? complaintData.complaint : '',
        description: complaintData ? complaintData.description : '',
        wing: complaintData ? complaintData.wing : '',
        unit: complaintData ? complaintData.unit : '',
        priority: complaintData ? complaintData.priority : 'Medium',
        status: complaintData ? complaintData.status : 'Open',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);  // Send updated data to parent
        handleClose();     // Close the modal
    };


    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Edit Complaint</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit} className="p-3" style={{ color: '#202224', fontWeight: '500' }}>
                    <Form.Group controlId="complainerName" className="mb-2" >
                        <Form.Label>Complainer Name
                            <span className="text-danger">*</span>
                        </Form.Label>
                        <Form.Control
                            type="text"
                            name="complainerName"
                            value={formData.complainerName}
                            onChange={handleInputChange}
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId="complaintName" className="mb-3">
                        <Form.Label>Complaint Name
                            <span className="text-danger">*</span>
                        </Form.Label>
                        <Form.Control
                            type="text"
                            name="complaintName"
                            value={formData.complaintName}
                            onChange={handleInputChange}
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId="description" className="mb-3">
                        <Form.Label>Description
                            <span className="text-danger">*</span>
                        </Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={2}
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            required
                        />
                    </Form.Group>

                    <Row className="mb-3">
                        <Col>
                            <Form.Group controlId="wing">
                                <Form.Label>Wing
                                    <span className="text-danger">*</span>
                                </Form.Label>
                                <Form.Control
                                    type="text"
                                    name="wing"
                                    value={formData.wing}
                                    onChange={handleInputChange}
                                    required
                                />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId="unit">
                                <Form.Label>Unit
                                    <span className="text-danger">*</span>
                                </Form.Label>
                                <Form.Control
                                    type="text"
                                    name="unit"
                                    value={formData.unit}
                                    onChange={handleInputChange}
                                    required
                                />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Form.Group controlId="priority" className="mb-3">
                        <Form.Label>Priority
                            <span className="text-danger">*</span>
                        </Form.Label>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px' }}>
                            <Form.Check
                                inline
                                label="High"
                                type="radio"
                                name="priority"
                                value=" High"
                                checked={formData.priority === ' High'}
                                onChange={handleInputChange}
                                custom
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    padding: '10px',  // Padding around the entire radio button
                                    border: '1px solid #ddd',  // Border around the box
                                    borderRadius: '10px',  // Rounded corners for the box
                                    marginRight: '10px',  // Space between buttons
                                    marginBottom: '10px',  // Vertical margin
                                    backgroundColor: '#fff',  // Background color for the box
                                }}
                            >
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <input
                                        type="radio"
                                        name="priority"
                                        value="Medium"
                                        checked={formData.priority === 'Medium'}
                                        onChange={handleInputChange}
                                        style={{
                                            marginRight: '5px',  // Space between radio button and label
                                        }}
                                    />
                                    <span>High</span>  {/* Label text inside the box */}
                                </div>
                            </Form.Check>

                            <Form.Check
                                inline
                                label="Medium"
                                type="radio"
                                name="priority"
                                value="Medium"
                                checked={formData.priority === 'Medium'}
                                onChange={handleInputChange}
                                custom
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    padding: '10px',  // Padding around the entire radio button
                                    border: '1px solid #ddd',  // Border around the box
                                    borderRadius: '10px',  // Rounded corners for the box
                                    marginRight: '10px',  // Space between buttons
                                    marginBottom: '10px',  // Vertical margin
                                    backgroundColor: '#fff',  // Background color for the box
                                }}
                            >
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <input
                                        type="radio"
                                        name="priority"
                                        value="Medium"
                                        checked={formData.priority === 'Medium'}
                                        onChange={handleInputChange}
                                        style={{
                                            marginRight: '5px',  // Space between radio button and label
                                        }}
                                    />
                                    <span>Medium</span>  {/* Label text inside the box */}
                                </div>
                            </Form.Check>

                            <Form.Check
                                inline
                                label="Low"
                                type="radio"
                                name="priority"
                                value="Low"
                                checked={formData.priority === 'Low'}
                                onChange={handleInputChange}
                                custom
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    padding: '10px',  // Padding around the entire radio button
                                    border: '1px solid #ddd',  // Border around the box
                                    borderRadius: '10px',  // Rounded corners for the box
                                    marginRight: '10px',  // Space between buttons
                                    marginBottom: '10px',  // Vertical margin
                                    backgroundColor: '#fff',  // Background color for the box

                                }}
                            >
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <input
                                        type="radio"
                                        name="priority"
                                        value="Low"
                                        checked={formData.priority === 'Low'}
                                        onChange={handleInputChange}
                                        style={{
                                            marginRight: '5px',  // Space between radio button and label

                                        }}
                                    />
                                    <span>Low</span>  {/* Label text inside the box */}
                                </div>
                            </Form.Check>
                        </div>
                    </Form.Group>


                    <Form.Group controlId="status" className="mb-3">
                        <Form.Label>Status
                            <span className="text-danger">*</span>
                        </Form.Label>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px' }}>
                            <Form.Check
                                inline
                                label="Open"
                                type="radio"
                                name="status"
                                value="Open"
                                checked={formData.status === 'Open'}
                                onChange={handleInputChange}
                                style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    border: '1px solid #ddd',  // Border around the radio button
                                    borderRadius: '10px',      // Rounded corners for the box
                                    padding: '10px',           // Padding inside the box
                                    marginRight: '10px',       // Space between radio buttons
                                    marginBottom: '10px',      // Space below the radio button
                                    backgroundColor: '#fff',   // Background color for the box
                                }}
                            >
                                <input
                                    type="radio"
                                    name="status"
                                    value="Open"
                                    checked={formData.status === 'Open'}
                                    onChange={handleInputChange}
                                    style={{
                                        marginRight: '5px',  // Space between radio button and label
                                    }}
                                />
                                <span>Open</span>  {/* Label text inside the box */}
                            </Form.Check>

                            <Form.Check
                                inline
                                label="Pending"
                                type="radio"
                                name="status"
                                value="Pending"
                                checked={formData.status === 'Pending'}
                                onChange={handleInputChange}
                                style={{
                                    display: 'inline-flex',             // Ensure the radio button and label are inline
                                    alignItems: 'center',              // Vertically center the radio button and label
                                    justifyContent: 'center',          // Center the content in the box
                                    border: '1px solid #ddd',          // Border around the radio button and label
                                    borderRadius: '10px',              // Rounded corners for the box
                                    padding: '10px',                   // Padding inside the box
                                    marginRight: '10px',               // Space between buttons
                                    marginBottom: '10px',              // Vertical margin between radio buttons
                                    backgroundColor: '#fff',           // Background color for the box
                                }}
                            >
                                <input
                                    type="radio"
                                    name="status"
                                    value="Pending"
                                    checked={formData.status === 'Pending'}
                                    onChange={handleInputChange}
                                    style={{
                                        marginRight: '5px',  // Space between radio button and label
                                    }}
                                />
                                <span>Pending</span>  {/* Label text inside the box */}
                            </Form.Check>

                            <Form.Check
                                inline
                                label="Solve"
                                type="radio"
                                name="status"
                                value="Solve"
                                checked={formData.status === 'Solve'}
                                onChange={handleInputChange}
                                style={{
                                    display: 'inline-flex',             // Ensures radio button and label are inline
                                    alignItems: 'center',              // Vertically center the radio button and label
                                    justifyContent: 'center',          // Centers the content in the box
                                    border: '1px solid #ddd',          // Border around the radio button and label
                                    borderRadius: '10px',              // Rounded corners for the box
                                    padding: '10px',                   // Padding inside the box for space around radio button
                                    marginBottom: '10px',              // Vertical space between radio buttons
                                    backgroundColor: '#fff',           // Background color of the box
                                }}
                            >
                                <input
                                    type="radio"
                                    name="status"
                                    value="Solve"
                                    checked={formData.status === 'Solve'}
                                    onChange={handleInputChange}
                                    style={{
                                        marginRight: '5px',  // Space between radio button and label
                                    }}
                                />
                                <span>Solve</span>  {/* Label text inside the box */}
                            </Form.Check>

                        </div>

                    </Form.Group>

                    <div className="d-flex justify-content-between">
                        <button type="button" className="btn btn-outline-secondary"
                            style={{ width: '45%', borderRadius: '10px', marginBottom: '10px', marginLeft: '5px' }}
                            onClick={handleClose}>
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
                                marginBottom: '10px',
                                marginRight: '5px'
                            }}
                            data-bs-dismiss="modal"
                        >
                            Save
                        </button>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

const ComplaintList = () => {
    const [complaints, setComplaints] = useState([
        {
            name: 'John Doe',
            complaint: 'Unethical Behavior',
            date: '01/02/2024',
            priority: 'Medium',
            status: 'Open',
            imageUrl: 'https://via.placeholder.com/40',
        },
        {
            name: 'Jane Smith',
            complaint: 'Noise Disturbance',
            date: '02/02/2024',
            priority: 'High',
            status: 'Resolved',
            imageUrl: 'https://via.placeholder.com/40',
        },
        {
            name: 'Jane Smith',
            complaint: 'Noise Disturbance',
            date: '02/02/2024',
            priority: 'Low',
            status: 'Resolved',
            imageUrl: 'https://via.placeholder.com/40',
        },
    ]);

    const [showViewModal, setShowViewModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedComplaint, setSelectedComplaint] = useState(null);

    const [selectedPeriod, setSelectedPeriod] = useState(''); // To store selected period

    const handleView = (complaint) => {
        setSelectedComplaint(complaint);
        setShowViewModal(true);
    };

    const handleEdit = (complaint) => {
        setSelectedComplaint(complaint);
        setShowEditModal(true);
    };

    const handleCloseViewModal = () => setShowViewModal(false);
    const handleCloseEditModal = () => setShowEditModal(false);

    const handleSaveEdit = (updatedComplaint) => {
        const updatedComplaints = complaints.map((c) =>
            c.date === updatedComplaint.date ? updatedComplaint : c
        );
        setComplaints(updatedComplaints);
        setShowEditModal(false);
    };

    const handleDelete = (index) => {
        setComplaints(complaints.filter((_, i) => i !== index));
    };

    return (
        <>
            <Card className="mb-4">
                <Card.Header style={{ background: 'white', display: 'flex', justifyContent: 'space-between' }}>
                    <div style={{ marginTop: '15px' }}>Complaint List</div>

                    {/* React Bootstrap Dropdown with Radio Buttons */}
                    <Dropdown className="d-inline-flex">
                        <Dropdown.Toggle
                            id="dropdownMenuButton"
                            className="d-flex align-items-center"
                            style={{ background: 'white', border: '1px solid #ced4da', color: 'black' }}
                        >
                            Month
                        </Dropdown.Toggle>

                        <Dropdown.Menu aria-labelledby="dropdownMenuButton">
                            <Dropdown.Item as="button">
                                <Form.Check
                                    type="radio"
                                    id="last-week"
                                    label="Last Week"
                                    checked={selectedPeriod === 'Last Week'}
                                    onChange={() => setSelectedPeriod('Last Week')}
                                />
                            </Dropdown.Item>
                            <Dropdown.Item as="button">
                                <Form.Check
                                    type="radio"
                                    id="last-month"
                                    label="Last Month"
                                    checked={selectedPeriod === 'Last Month'}
                                    onChange={() => setSelectedPeriod('Last Month')}
                                />
                            </Dropdown.Item>
                            <Dropdown.Item as="button">
                                <Form.Check
                                    type="radio"
                                    id="last-year"
                                    label="Last Year"
                                    checked={selectedPeriod === 'Last Year'}
                                    onChange={() => setSelectedPeriod('Last Year')}
                                />
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Card.Header>
                <Table responsive>
                    <thead>
                        <tr>
                            <th style={{ background: 'rgb(141, 165, 245)' }}>Complainer Name</th>
                            <th style={{ background: 'rgb(141, 165, 245)' }}>Complaint Name</th>
                            <th style={{ background: 'rgb(141, 165, 245)' }}>Date</th>
                            <th style={{ background: 'rgb(141, 165, 245)' }}>Priority</th>
                            <th style={{ background: 'rgb(141, 165, 245)' }}>Status</th>
                            <th style={{ background: 'rgb(141, 165, 245)' }}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {complaints.map((complaint, index) => (
                            <tr key={index}>
                                <td className="d-flex align-items-center" style={{ border: 'none' }}>
                                    <Image
                                        src={complaint.imageUrl}
                                        roundedCircle
                                        width={40}
                                        height={40}
                                        className="me-3"
                                    />
                                    {complaint.name}
                                </td>
                                <td style={{ border: 'none' }}>{complaint.complaint}</td>
                                <td style={{ border: 'none' }}>{complaint.date}</td>
                                <td style={{ border: 'none' }}>
                                    <Badge
                                        pill
                                        style={{ width: '80px', padding: '10px' }}
                                        bg={
                                            complaint.priority === 'High'
                                                ? 'danger'
                                                : complaint.priority === 'Medium'
                                                    ? 'primary'
                                                    : 'success'
                                        }
                                    >
                                        {complaint.priority}
                                    </Badge>
                                </td>
                                <td style={{ border: 'none' }}>{complaint.status}</td>
                                <td style={{ border: 'none' }}>
                                    <Button variant="success" size="sm" className="me-2" onClick={() => handleEdit(complaint)}>
                                        <FaEdit />
                                    </Button>
                                    <Button variant="info" size="sm" className="me-2" onClick={() => handleView(complaint)}>
                                        <FaEye />
                                    </Button>
                                    <Button variant="danger" size="sm" onClick={() => handleDelete(index)}>
                                        <FaTrash />
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Card>

            {/* View Complaint Modal */}
            <Modal show={showViewModal} onHide={handleCloseViewModal} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Complaint Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedComplaint && (
                        <div>
                            <h6>{selectedComplaint.name}</h6>
                            <p><strong>Complaint:</strong> {selectedComplaint.complaint}</p>
                            <p><strong>Date:</strong> {selectedComplaint.date}</p>
                            <p><strong>Status:</strong> {selectedComplaint.status}</p>
                            <p><strong>Priority:</strong> {selectedComplaint.priority}</p>
                        </div>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseViewModal}>Close</Button>
                </Modal.Footer>
            </Modal>

            {/* Edit Complaint Modal */}
            <EditComplaintModal
                show={showEditModal}
                handleClose={handleCloseEditModal}
                complaintData={selectedComplaint}
                onSave={handleSaveEdit}
            />
        </>
    );
};

export default ComplaintList;
