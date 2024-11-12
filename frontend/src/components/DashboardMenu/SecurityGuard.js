import React, { useState } from "react";
import { Container, Row, Col, Button, Table, Modal, Form, } from "react-bootstrap";
import { RiAddBoxFill } from "react-icons/ri";
import { FaCamera, FaEdit, FaEye, FaFemale, FaMale, FaMoon, FaSun, FaTrash, } from "react-icons/fa";
import { LuImagePlus } from "react-icons/lu"
import SideBar from "../Layouts/Sidebar";
import Avatar from "../images/Avatar.png";
import { useEffect } from "react";

const ComplaintTracking = () => {
    const [guards, setGuards] = useState([
        { id: 1, name: 'Brooklyn Simmons ', phone: '94564 96321', shift: 'Day', date: '2024-11-28', time: '2:45 PM', gender: 'Male' },
        { id: 2, name: 'Brooklyn Simmons', phone: '94564 96321', shift: 'Day', date: '2024-11-28', time: '2:45 PM', gender: 'Female' },
        { id: 3, name: 'Brooklyn Simmons', phone: '94564 96321', shift: 'Night', date: '2024-11-28', time: '2:45 PM', gender: 'Male' },
        { id: 4, name: 'Brooklyn Simmons', phone: '94564 96321', shift: 'Day', date: '2024-11-28', time: '2:45 PM', gender: 'Female' },
        { id: 5, name: 'Brooklyn Simmons', phone: '94564 96321', shift: 'Night', date: '2024-11-28', time: '2:45 PM', gender: 'Male' },
    ]);

    // Function to add a new guard (for demo)


    // Function to handle button click and show how useEffect might be used
    useEffect(() => {
        console.log('Guard list updated', guards);
    }, [guards]);

    const [showModal, setShowModal] = useState(false);
    const [showDeleteGuard, setShowDeleteGuard] = useState(false);
    const [deleteGuardId, setDeleteGuardId] = useState(null);
    const [showViewGuard, setShowViewGuard] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [editGuardId, setEditGuardId] = useState(null);
    const [guardData, setGuardData] = useState({ title: "", description: "", date: "", time: "" });
    const [newGuard, setNewGuard] = useState({
        name: '',
        phone: '',
        shift: 'Day',
        date: '',
        time: '',
        gender: '',
        photo: null,
        aadhaar: null,
    });

    const handleShowCreate = () => {
        setIsEdit(false);
        setEditGuardId(null);
        setNewGuard({
            name: '',
            phone: '',
            shift: 'Day',
            date: '',
            time: '',
            gender: '',
            photo: null,
            aadhaar: null,
        });
        setShowModal(true);
    };
    const handleShowEdit = (guard) => {
        setIsEdit(true);
        setEditGuardId(guard.id);
        setNewGuard(guard); // Load selected guard data for editing
        setShowModal(true);
    };
    const handleShowDelete = (guardId) => {
        setDeleteGuardId(guardId);
        setShowDeleteGuard(true);
    };

    const handleShowView = (guard) => {
        setGuardData(guard);
        setShowViewGuard(true);
    };

    const handleClose = () => {
        setShowModal(false);
        setShowViewGuard(false);
        setShowDeleteGuard(false); // Close the delete confirmation modal when handleClose is called

        setDeleteGuardId(null);
        setIsEdit(false);
        setNewGuard({
            name: '',
            phone: '',
            shift: 'Day',
            date: '',
            time: '',
            gender: '',
            photo: null,
            aadhaar: null,
        });
        setEditGuardId(null);
    };
    const handleDelete = () => {
        setGuards((prevGuards) =>
            prevGuards.filter((guard) => guard.id !== deleteGuardId)
        );
        setDeleteGuardId(null); // Clear the ID of the protocol to delete
        setShowDeleteGuard(false); // Close the delete confirmation modal
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setGuardData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSave = () => {
        if (isEdit && editGuardId) {
            setGuards((prevGuards) =>
                prevGuards.map((guard) =>
                    guard.id === editGuardId ? { ...guard, ...newGuard } : guard
                )
            );
        } else {
            const newId = guards.length + 1;
            const newEntry = { id: newId, ...newGuard };
            setGuards((prevGuards) => [...prevGuards, newEntry]);
        }
        handleClose();
    };
    const formatTime = (time) => {
        const [hours, minutes] = time.split(':');
        const date = new Date();
        date.setHours(hours);
        date.setMinutes(minutes);
        const formattedTime = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour24: true });
        setNewGuard({ ...newGuard, time: formattedTime.toUpperCase() });
    };


    const handleAddGuard = () => {
        if (newGuard.name && newGuard.phone && newGuard.shift && newGuard.date && newGuard.time && newGuard.gender) {
            setGuards([...guards, newGuard]); // Add the new guard to the guards array
            setShowModal(false); // Close the modal
        } else {
            alert("Please fill all the fields before adding the guard.");
        }
    };


    const handleFileChange = (e, field) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onloadend = () => {
            setNewGuard((prevState) => ({
                ...prevState,
                [field]: {
                    file,
                    preview: file.type.startsWith('image/') ? reader.result : null,
                },
            }));
        };

        if (file.type.startsWith('image/')) {
            reader.readAsDataURL(file);
        } else {
            setNewGuard((prevState) => ({
                ...prevState,
                [field]: { file, preview: null },
            }));
        }
    };


    return (
        <Container fluid style={{ marginTop: "20px" }}>
            <Row className="py-4">
                <Col className="d-flex justify-content-between align-items-center">
                    <h2>Security guard Details</h2>
                    <Button variant="warning" className="text-white mainColor2 d-flex align-items-center" onClick={setShowModal}>
                        <RiAddBoxFill className="me-2" style={{ height: "24px", width: "24px" }} />
                        Add Security
                    </Button>
                </Col>
            </Row>

            <Modal show={showViewGuard} onHide={handleClose} centered>
    <Modal.Header closeButton>
        <Modal.Title>View Security Protocols</Modal.Title>
    </Modal.Header>
    <Modal.Body>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px', fontFamily: 'Poppins', marginTop: '20px' }}>
            <img src={Avatar} alt="avatar" style={{ width: '70px', height: '70px', borderRadius: '50%', border: '3px solid #F4F4F4' }} />
            <p>{guardData.name}<br />{guardData.date}</p>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontFamily: 'Poppins' }}>
            <div style={{ textAlign: 'center' }}>
                <span>Select Shift</span>
                <span style={{
                    background: guardData.shift === 'Day' ? 'rgba(244, 244, 244, 1)' : 'rgba(79, 79, 79, 1)',
                    color: guardData.shift === 'Day' ? 'rgba(255, 147, 0, 1)' : 'rgba(255, 255, 255, 1)',
                    padding: '5px 15px',
                    borderRadius: '25px',
                    fontWeight: '500'
                }}>
                    {guardData.shift === 'Day' ? <FaSun /> : <FaMoon />}
                    {guardData.shift}
                </span>
            </div>

            <div style={{ textAlign: 'center' }}>
                <p>Shift Time</p>
                <div>{guardData.time}</div>
            </div>

            <div style={{ textAlign: 'center' }}>
                <span>Gender</span>
                <span style={{
                    background: guardData.gender === 'Male' ? 'rgba(33, 168, 228, 0.1)' : 'rgba(254, 118, 168, 0.1)',
                    color: guardData.gender === 'Male' ? 'rgba(86, 120, 233, 1)' : 'rgba(254, 118, 168, 1)',
                    padding: '5px 15px',
                    borderRadius: '25px',
                    fontWeight: '500'
                }}>
                    {guardData.gender === 'Male' ? <FaMale /> : <FaFemale />}
                    {guardData.gender}
                </span>
            </div>
        </div>
    </Modal.Body>
</Modal>

<Modal show={showDeleteGuard} onHide={handleClose} centered>
    <Modal.Header closeButton>
        <Modal.Title>Delete Protocol?</Modal.Title>
    </Modal.Header>
    <Modal.Body>
        <p>Are you sure you want to delete this protocol?</p>
    </Modal.Body>
    <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>Cancel</Button>
        <Button onClick={handleDelete} style={{ background: '#FF0000', color: 'white' }}>Delete</Button>
    </Modal.Footer>
</Modal>

<Modal show={showModal} onHide={handleClose} centered>
    <Modal.Header closeButton>
        <Modal.Title>{isEdit ? 'Edit Security' : 'Add Security'}</Modal.Title>
    </Modal.Header>
    <Modal.Body>
        <div style={{ display: 'flex', marginBottom: '20px' }}>
            <label htmlFor="photo-upload">
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer'
                }}>
                    <div style={{
                        width: '50px',
                        height: '50px',
                        borderRadius: '50%',
                        background: 'rgba(211, 211, 211, 1)',
                        overflow: 'hidden',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginRight: '10px'
                    }}>
                        {newGuard.photo?.preview ? (
                            <img src={newGuard.photo.preview} alt="Uploaded" style={{ width: '100%', height: '100%' }} />
                        ) : (
                            <FaCamera style={{ color: 'rgba(255, 255, 255, 1)', fontSize: '16px' }} />
                        )}
                    </div>
                    <div>Add Photo</div>
                </div>
            </label>
            <input
                id="photo-upload"
                type="file"
                onChange={(e) => handleFileChange(e, 'photo')}
                accept="image/png, image/jpeg"
                style={{ display: 'none' }}
            />
        </div>

        <Form>
            <Form.Group controlId="formName">
                <Form.Label>Full Name</Form.Label>
                <Form.Control
                    type="text"
                    value={newGuard.name}
                    onChange={(e) => setNewGuard({ ...newGuard, name: e.target.value })}
                />
            </Form.Group>

            <Form.Group controlId="formPhone">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control
                    type="text"
                    value={newGuard.phone}
                    onChange={(e) => setNewGuard({ ...newGuard, phone: e.target.value })}
                />
            </Form.Group>

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Form.Group controlId="formGender">
                    <Form.Label>Gender</Form.Label>
                    <Form.Select
                        value={newGuard.gender}
                        onChange={(e) => setNewGuard({ ...newGuard, gender: e.target.value })}
                    >
                        <option>Select Gender</option>
                        <option>Male</option>
                        <option>Female</option>
                    </Form.Select>
                </Form.Group>

                <Form.Group controlId="formShift">
                    <Form.Label>Shift</Form.Label>
                    <Form.Select
                        value={newGuard.shift}
                        onChange={(e) => setNewGuard({ ...newGuard, shift: e.target.value })}
                    >
                        <option>Select Shift</option>
                        <option>Day</option>
                        <option>Night</option>
                    </Form.Select>
                </Form.Group>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Form.Group controlId="formDate">
                    <Form.Label>Shift Date</Form.Label>
                    <Form.Control
                        type="date"
                        value={newGuard.date}
                        onChange={(e) => setNewGuard({ ...newGuard, date: e.target.value })}
                    />
                </Form.Group>

                <Form.Group controlId="formTime">
                    <Form.Label>Shift Time</Form.Label>
                    <Form.Control
                        type="time"
                        value={newGuard.time}
                        onChange={(e) => formatTime(e.target.value)}
                    />
                </Form.Group>
            </div>

            <Form.Group controlId="formAadhaar">
                <Form.Label>Upload Aadhaar Card</Form.Label>
                <div style={{
                    border: '2px dashed rgba(211, 211, 211, 1)',
                    borderRadius: '8px',
                    padding: '20px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column',
                    cursor: 'pointer'
                }}>
                    <label htmlFor="aadhaar-upload">
                        <LuImagePlus style={{ fontSize: '24px', marginBottom: '8px', width: '40px', height: '50px', color: 'rgba(167, 167, 167, 1)' }} />
                        <div>Upload a file <span>or drag and drop</span></div>
                    </label>
                    <input
                        id="aadhaar-upload"
                        type="file"
                        onChange={(e) => handleFileChange(e, 'aadhaar')}
                        accept="image/png, image/jpeg, application/pdf"
                        style={{ display: 'none' }}
                    />
                    {newGuard.aadhaar && (
                        <div style={{ marginTop: '15px', textAlign: 'center' }}>
                            {newGuard.aadhaar.preview && newGuard.aadhaar.file.type.startsWith('image/') ? (
                                <img src={newGuard.aadhaar.preview} alt="Aadhaar Preview" style={{ width: '80px', height: '80px', objectFit: 'cover' }} />
                            ) : (
                                <div>{newGuard.aadhaar.file.name}</div>
                            )}
                        </div>
                    )}
                </div>
            </Form.Group>
        </Form>
    </Modal.Body>
    <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>Cancel</Button>
        <Button style={{ backgroundColor: '#007bff', color: 'white' }} onClick={handleSave}>
            {isEdit ? 'Create' : 'Create'}
        </Button>
    </Modal.Footer>
</Modal>


            <div style={{ border: "1px solid #ddd", borderRadius: "8px", boxShadow: "0px 0px 15px rgba(0, 0, 0, 0.1)", overflow: "hidden", padding: "20px" }}>
                <Table hover responsive>
                    <thead style={{ background: "#5678E9", color: "#ffffff" }}>
                        <tr>
                            <th className="text-start">Security guard Name</th>
                            <th>Phone Number</th>
                            <th className="text-center">Select Shift</th>
                            <th className="text-center">Select Date</th>
                            <th className="text-center">Shift Time</th>
                            <th className="text-center">Gender</th>
                            <th className="text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {guards.map((guard) => (
                            <tr key={guard.id}>
                                <td className="d-flex align-items-center gap-2">
                                    <img src={Avatar} alt="avatar" className="rounded-circle" style={{ width: "40px", height: "40px", borderRadius: "36px", border: "2px solid #F4F4F4" }} />
                                    <span style={{ fontSize: "16px", lineHeight: "24px", textAlign: "left" }}>{guard.name}</span>
                                </td>
                                <td>{guard.phone}</td>
                                <td className="text-center">
                                    <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: "113px", height: "31px", borderRadius: "50px", background: guard.shift === 'Day' ? "rgba(244, 244, 244, 1)" : "rgba(79, 79, 79, 1)", color: guard.shift === 'Day' ? "rgba(255, 147, 0, 1)" : "rgba(255, 255, 255, 1)", fontSize: "16px", fontWeight: "500" }}>
                                        {guard.shift === 'Day' ? <FaSun className="me-1" /> : <FaMoon className="me-1" />}
                                        {guard.shift}
                                    </span>
                                </td>
                                <td className="text-center">{guard.date}</td>
                                <td className="text-center">{guard.time}</td>
                                <td className='text-center' style={{ verticalAlign: "middle" }}>
                      <span
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          justifyContent: "center",
                          width: "113px",
                          height: "31px",
                          padding: "5px 12px",
                          gap: "5px",
                          borderRadius: "50px",
                          fontFamily: "Poppins",
                          background:
                            guard.gender === "Male" ? "rgba(33, 168, 228, 0.1)" : "rgba(254, 118, 168, 0.1)",
                          color:
                            guard.gender === "Male" ? "rgba(86, 120, 233, 1)" : "rgba(254, 118, 168, 1)",
                          fontSize: "16px",
                          fontWeight: "500",
                        }}
                      >
                        {guard.gender === "Male" ? <FaMale /> : <FaFemale />}
                        {guard.gender}
                      </span>
                    </td>
                                <td className='text-center' style={{ verticalAlign: "middle" }}>
                                    <div className="d-flex align-items-center justify-content-center">
                                        <FaEdit className="text-success me-2" style={{ cursor: "pointer" }} onClick={() => handleShowEdit(guard)} />
                                        <FaEye className="text-primary me-2" style={{ cursor: "pointer" }} onClick={() => handleShowView(guard)} />
                                        <FaTrash className="text-danger" style={{ cursor: "pointer" }} onClick={() => handleShowDelete(guard.id)} />
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
                    <ComplaintTracking />
                </Col>
            </Row>
        </Container>
    );

};
export default Dashboard;


