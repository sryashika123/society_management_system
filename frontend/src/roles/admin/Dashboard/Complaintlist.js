import React, { useState } from 'react';
import { Card, Table, Button, Dropdown, Badge, Modal, Image, Form } from 'react-bootstrap';
import editIcon from "../../../assets/edit.png";
import viewIcon from "../../../assets/view.png";
import deleteIcon from "../../../assets/delete.png";
import axios from 'axios';
import { useEffect } from 'react';

// Reusable modal component for editing complaints

const ComplaintList = () => {
    const [complaints, setComplaints] = useState([

        {
            id: 1,
            Complaint_name: 'John Doe',
            Complainer_name: 'Unethical Behavior',
            date: '01/02/2024',
            Priority: 'Medium',
            status: 'Open',
            imageUrl: 'https://via.placeholder.com/40',
        },
        {
            id: 2,
            Complaint_name: 'Jane Smith',
            Complainer_name: 'Noise Disturbance',
            date: '02/02/2024',
            Priority: 'High',
            status: 'Pending',
            imageUrl: 'https://via.placeholder.com/40',
        },
        {
            id: 3,
            Complaint_name: 'Jane Smith',
            Complainer_name: 'Noise Disturbance',
            date: '02/02/2024',
            Priority: 'Low',
            status: 'Solve',
            imageUrl: 'https://via.placeholder.com/40',
        },
    ]);

    useEffect(() => {
        const fetchComplaints = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/users/v23/viewComplaintsTracking`);
                setComplaints(response.data); // Assuming response.data contains the complaints
            } catch (error) {
                setErrorMessage('Failed to load complaints.');
                console.error(error); // Log the error for debugging purposes
            }
        };

        fetchComplaints();
    }, []);

    const statusBadgeStyle = (status) => {
        if (status === "Pending") return { backgroundColor: " #FFC3131A", color: "#FFC313", fontWeight: '500' };
        if (status === "Open") return { backgroundColor: "#5678E91A", color: "#5678E9", fontWeight: '500' };
        if (status === "Solve") return { backgroundColor: "#39973D1A", color: "#39973D", fontWeight: '500' };
        return { backgroundColor: "#f8f9fa", color: "black" };
    };

    const [showViewModal, setShowViewModal] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [selectedComplaint, setSelectedComplaint] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");


    const [selectedPeriod, setSelectedPeriod] = useState(''); // To store selected period

    const handleView = (complaint) => {
        setSelectedComplaint(complaint);
        setShowViewModal(true);
    };

    const handleCloseViewModal = () => setShowViewModal(false);
    const handleCloseModal = () => setShowModal(false);

    const handleEdit = (complaint) => {
        setSelectedComplaint(complaint);  // Set the selected complaint for editing
        setShowModal(true);  // Open the modal
    };

    const handleSave = () => {
        if (!selectedComplaint.Complaint_name || !selectedComplaint.Complainer_name || !selectedComplaint.Priority || !selectedComplaint.status) {
            setErrorMessage("All fields are required.");
            return;
        }

        // Update complaints state with the new complaint data
        setComplaints((prevComplaints) =>
            prevComplaints.map((complaint) =>
                complaint.id === selectedComplaint.id ? selectedComplaint : complaint
            )
        );

        setShowModal(false);  // Close the modal after saving
        setErrorMessage("");  // Clear any error messages
    };

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleteIndex, setDeleteIndex] = useState(null);

    // Functions for delete modal
    const handleShowDeleteModal = (index) => {
        setDeleteIndex(index);
        setShowDeleteModal(true);
    };

    const handleCloseDeleteModal = () => {
        setShowDeleteModal(false);
        setDeleteIndex(null);
    };

    const confirmDelete = () => {
        if (deleteIndex !== null) {
            const updatedComplaint = complaints.filter((_, i) => i !== deleteIndex);
            setComplaints(updatedComplaint);
        }
        handleCloseDeleteModal();
    };

    return (
        <>
            <Card className="mb-4 shadow-sm" >
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

                {/* Table wrapped inside a div with class 'table-responsive' */}
                <div className="table-responsive custom-scrollbar" style={{
								overflowY: 'scroll', // Enable scroll for overflow content
								maxHeight: '29vh',   // Set max height for column
							}}>
                    <Table responsive >
                        <thead style={{ background: "#5678E9", color: "#ffffff" }}>
                            <tr>
                                <th style={{ backgroundColor: 'rgb(185, 198, 242)' }}>Complainer Name</th>
                                <th style={{ backgroundColor: 'rgb(185, 198, 242)' }}>Complaint Name</th>
                                <th className='text-center' style={{ backgroundColor: 'rgb(185, 198, 242)' }}>Date</th>
                                <th className='text-center' style={{ backgroundColor: 'rgb(185, 198, 242)' }}>Priority</th>
                                <th className='text-center' style={{ backgroundColor: 'rgb(185, 198, 242)' }}>Status</th>
                                <th className='text-center' style={{ backgroundColor: 'rgb(185, 198, 242)' }}>Action</th>
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
                                        {complaint.Complaint_name}
                                    </td>
                                    <td style={{ border: 'none' }}>{complaint.Complainer_name}</td>
                                    <td className='text-center' style={{ border: 'none' }}>{new Date(complaint.createdAt).toLocaleDateString('en-GB')}
                                    </td>
                                    <td className='text-center' style={{ border: 'none' }}>
                                        <Badge
                                            pill
                                            style={{ width: '80px', padding: '10px' }}
                                            bg={
                                                complaint.Priority === 'High'
                                                    ? 'danger'
                                                    : complaint.Priority === 'Medium'
                                                        ? 'primary'
                                                        : 'success'
                                            }
                                        >
                                            {complaint.Priority}
                                        </Badge>
                                    </td>
                                    <td style={{ padding: "15px", textAlign: "center", verticalAlign: "middle", borderBottom: 'none' }}>
                                        <span style={{ ...statusBadgeStyle(complaint.status), width: "80px", height: "31px", padding: "5px 12px", gap: "5px", borderRadius: "50px", display: "inline-flex", justifyContent: "center", alignItems: "center" }}>
                                            {complaint.status}
                                        </span>
                                    </td>
                                    <td style={{ padding: "15px", textAlign: "center", verticalAlign: "middle", borderBottom: 'none' }}>
                                        <div className="d-flex align-items-center justify-content-center">
                                            <img src={editIcon} className="text-success me-2" style={{ cursor: "pointer" }} onClick={() => handleEdit(complaint)} />
                                            <img src={viewIcon} className="text-primary me-2" style={{ cursor: "pointer" }} onClick={() => handleView(complaint)} />
                                            <img src={deleteIcon} className="text-danger" style={{ cursor: "pointer" }} onClick={() => handleShowDeleteModal(index)} />
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
            </Card>

            {/* View Complaint Modal */}
            < Modal show={showViewModal} onHide={handleCloseViewModal} centered className='square-modal'>
                <Modal.Header closeButton>
                    <Modal.Title>Complaint Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedComplaint && (
                        <div>
                            <h6>{selectedComplaint.Complaint_name}</h6>
                            <p><strong>Complaint:</strong> {selectedComplaint.Complainer_name}</p>
                            <p><strong>Date:</strong> {selectedComplaint.createdAt}</p>
                            <p><strong>Status:</strong> {selectedComplaint.status}</p>
                            <p><strong>Priority:</strong> {selectedComplaint.Priority}</p>
                        </div>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseViewModal}>Close</Button>
                </Modal.Footer>
            </Modal>

            {/* Edit Complaint Modal */}
            <Modal show={showModal} onHide={handleCloseModal} centered className='square-modal'>
                <Modal.Header closeButton style={{ borderBottom: 'none' }}>
                    <Modal.Title>Edit Complaint</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {errorMessage && (
                        <div className="alert alert-danger">{errorMessage}</div>
                    )}
                    <Form style={{ color: '#202224', fontWeight: '500' }}>
                        <Form.Group >
                            <Form.Label>Complainer Name
                                <span className='text-danger'>*</span>
                            </Form.Label>
                            <Form.Control
                                type="text"
                                value={selectedComplaint?.Complaint_name || ""}
                                onChange={(e) =>
                                    setSelectedComplaint((prev) => ({
                                        ...prev,
                                        Complaint_name: e.target.value,
                                    }))
                                }
                            />
                        </Form.Group>
                        <Form.Group className='mt-3'>
                            <Form.Label>Complaint Type
                                <span className='text-danger'>*</span>
                            </Form.Label>
                            <Form.Control
                                type="text"
                                value={selectedComplaint?.Complainer_name || ""}
                                onChange={(e) =>
                                    setSelectedComplaint((prev) => ({
                                        ...prev,
                                        Complainer_name: e.target.value,
                                    }))
                                }
                            />
                        </Form.Group>
                        <Form.Group className='mt-3'>
                            <Form.Label>Date
                                <span className='text-danger'>*</span>
                            </Form.Label>
                            <Form.Control
                                type="date"
                                value={selectedComplaint?.createdAt || ""}
                                onChange={(e) =>
                                    setSelectedComplaint((prev) => ({
                                        ...prev,
                                        createdAt: e.target.value,
                                    }))
                                }
                            />
                        </Form.Group>

                        <div className='d-flex justify-content-between'>
                            <Form.Group className='mt-3'>
                                <Form.Label>Wing
                                    <span className='text-danger'>*</span>
                                </Form.Label>
                                <Form.Control
                                    type="text"
                                    value={selectedComplaint?.wing || ""}
                                    onChange={(e) =>
                                        setSelectedComplaint((prev) => ({
                                            ...prev,
                                            wing: e.target.value,
                                        }))
                                    }
                                />
                            </Form.Group>
                            <Form.Group className='mt-3'>
                                <Form.Label>Unit
                                    <span className='text-danger'>*</span>
                                </Form.Label>
                                <Form.Control
                                    type="text"
                                    value={selectedComplaint?.unit || ""}
                                    onChange={(e) =>
                                        setSelectedComplaint((prev) => ({
                                            ...prev,
                                            unit: e.target.value,
                                        }))
                                    }
                                />
                            </Form.Group>
                        </div>

                        <Form.Group className='mt-3'>
                            <Form.Label>Priority
                                <span className='text-danger'>*</span>
                            </Form.Label>
                            <div className="d-flex justify-content-around  " >

                                {["High", "Medium", "Low"].map((Priority) => (
                                    <Form.Check
                                        style={{ border: "1px solid rgba(211, 211, 211, 1)", paddingLeft: "30px", paddingRight: "30px", borderRadius: "5px", paddingTop: "8px", paddingBottom: "8px" }}
                                        type="radio"
                                        label={Priority}
                                        name="priority"
                                        value={Priority}
                                        checked={selectedComplaint?.Priority === Priority}
                                        onChange={(e) =>
                                            setSelectedComplaint((prev) => ({
                                                ...prev,
                                                Priority: e.target.value,
                                            }))
                                        }
                                        key={Priority}
                                    />

                                ))}

                            </div>
                        </Form.Group>
                        <Form.Group className='mt-3'>
                            <Form.Label>Status
                                <span className='text-danger'>*</span>
                            </Form.Label>
                            <div className="d-flex justify-content-around">
                                {["Open", "Pending", "Solve"].map((status) => (
                                    <Form.Check
                                        style={{ border: "1px solid rgba(211, 211, 211, 1)", paddingLeft: "30px", paddingRight: "30px", borderRadius: "5px", paddingTop: "8px", paddingBottom: "8px" }}
                                        type="radio"
                                        label={status}
                                        name="status"
                                        value={status}
                                        checked={selectedComplaint?.status === status}
                                        onChange={(e) =>
                                            setSelectedComplaint((prev) => ({
                                                ...prev,
                                                status: e.target.value,
                                            }))
                                        }
                                        key={status}
                                    />
                                ))}
                            </div>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer style={{ display: "flex", justifyContent: "space-between", borderTop: "none" }}>
                    <Button style={{ width: "175px", height: "51px", border: "1px solid #202224", padding: "10px 55px 10px 55px", background: "#FFFFFF", color: "#202224", }} variant="secondary" onClick={handleCloseModal}>
                        Cancel
                    </Button>
                    <Button style={{
                        width: "175px", height: "51px", border: "1px", padding: "10px 55px 10px 55px", color: "#202224",

                    }} className='mainColor2' onClick={handleSave}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal className='custom-modal' show={showDeleteModal} onHide={handleCloseDeleteModal} centered>
                <Modal.Header>
                    <Modal.Title className='Modal-Title'>Delete Number?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p className='Form-p mb-0'>Are you sure you want to delete this?</p>
                </Modal.Body>
                <Modal.Footer className='d-flex justify-content-between'>
                    <Button variant="secondary" className='btn cancle  mt-2' onClick={handleCloseDeleteModal}>Cancel</Button>
                    <Button variant="danger" className='btn delete' onClick={confirmDelete}>Delete</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default ComplaintList;