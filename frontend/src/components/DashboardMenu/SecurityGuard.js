import React, { useState } from "react";
import { Container, Row, Col, Button, Table, Modal, Form } from "react-bootstrap";
import { RiAddBoxFill } from "react-icons/ri";
import { FaCamera, FaClock, FaEdit, FaEye, FaFemale, FaMale, FaMoon, FaSun, FaTrash, } from "react-icons/fa";
import { LuImagePlus } from "react-icons/lu"
import SideBar from "../Layouts/Sidebar";
import Avatar from "../images/Avatar.png";
import { useEffect } from "react";


const ComplaintTracking = () => {
    const [guards, setGuards] = useState([
        { name: 'Brooklyn Simmons ', phone: '94564 96321', shift: 'Day', date: '10/02/2024', time: '2:45 PM', gender: 'Male' },
        { name: 'Brooklyn Simmons', phone: '94564 96321', shift: 'Day', date: '10/02/2024', time: '2:45 PM', gender: 'Female' },
        { name: 'Brooklyn Simmons', phone: '94564 96321', shift: 'Night', date: '10/02/2024', time: '2:45 PM', gender: 'Male' },
        { name: 'Brooklyn Simmons', phone: '94564 96321', shift: 'Day', date: '10/02/2024', time: '2:45 PM', gender: 'Female' },
        { name: 'Brooklyn Simmons', phone: '94564 96321', shift: 'Night', date: '10/02/2024', time: '2:45 PM', gender: 'Male' },
    ]);

    // Function to add a new guard (for demo)
    // Function to handle button click and show how useEffect might be used
    useEffect(() => {
        console.log('guard list updated', guards);
    }, [guards]);

    const [showModal, setShowModal] = useState(false);
    const [newguard, setNewguard] = useState({
        name: '',
        phone: '',
        shift: 'Day',
        date: '',
        time: '',
        gender: '',
        photo: null,
        aadhaar: null,
    });

    const [editingguardIndex, setEditingguardIndex] = useState(null); // To track the index of the guard being edited


    useEffect(() => {
        console.log('guard list updated', guards);
    }, [guards]);

    const formatTime = (time) => {
        const [hours, minutes] = time.split(':');
        const date = new Date();
        date.setHours(hours);
        date.setMinutes(minutes);
        const formattedTime = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour24: true });
        setNewguard({ ...newguard, time: formattedTime.toUpperCase() });
    };

    const handleAddguard = () => {
        if (newguard.name && newguard.phone && newguard.shift && newguard.date && newguard.time && newguard.gender) {
            if (editingguardIndex !== null) {
                // Update the existing guard data
                const updatedguards = [...guards];
                updatedguards[editingguardIndex] = newguard;
                setGuards(updatedguards);
            } else {
                // Add a new guard
                setGuards([...guards, newguard]);
            }
            setShowModal(false); // Close the modal
            setEditingguardIndex(null); // Reset editing state
        } else {
            alert("Please fill all the fields before adding or editing the guard.");
        }
    };

    const handleFileChange = (e, field) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        if (field === 'aadhaar' || field === 'photo') {
            reader.onloadend = () => {
                setNewguard((prevState) => ({
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
                setNewguard((prevState) => ({
                    ...prevState,
                    [field]: { file, preview: null },
                }));
            }
        } else {
            setNewguard((prevState) => ({
                ...prevState,
                [field]: file,
            }));
        }
    };

    // const handleEditguard = (index) => {
    //     const guard = guards[index];
    //     setNewguard(guard);
    //     setEditingguardIndex(index); // Set the index of the guard being edited
    //     setShowModal(true); // Show the modal for editing
    // };

    return (
       <> 
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
            {/* Modal for Create guard Form */}
            <Modal show={showModal} onHide={() => setShowModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Add Security</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/* Add Photo Section */}
                    <div className="text-start" style={{ display: 'flex', marginBottom: '20px' }}>
                        <label htmlFor="photo-upload" style={{ cursor: 'pointer', textAlign: 'center' }}>
                            <div
                                style={{
                                    display: 'flex',             // Use flex layout for the row
                                    flexDirection: 'row',        // Align the image and text horizontally (side by side)
                                    alignItems: 'center',        // Vertically center the content
                                    justifyContent: 'center',    // Center the content horizontally
                                    textAlign: 'center',
                                }}
                            >
                                <div
                                    style={{
                                        width: "50px",
                                        height: "50px",
                                        borderRadius: "50%",
                                        background: "rgba(211, 211, 211, 1)",
                                        overflow: "hidden",
                                        display: "flex",             // Ensure flex layout for the circle
                                        alignItems: "center",       // Center the image inside the circle
                                        justifyContent: "center",   // Center the image inside the circle
                                        border: "2px solid #ddd",
                                        marginRight: "10px",        // Add some spacing between the image and text
                                    }}
                                >
                                    {newguard.photo?.preview ? (
                                        <img
                                            src={newguard.photo.preview}  // Access preview here
                                            alt="Uploaded"
                                            style={{
                                                width: "100%",
                                                height: "100%",
                                                objectFit: "cover",
                                                borderRadius: "50%",        // Keep the circle shape
                                            }}
                                        />
                                    ) : (
                                        <div style={{
                                            color: "rgba(255, 255, 255, 1)",
                                            fontSize: "16px"
                                        }}><FaCamera /></div>
                                    )}
                                </div>
                                <div style={{ color: "#007bff" }}>Add Photo</div>
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
                    {/* Form Fields */}
                    <Form>
                        <Form.Group controlId="formName" className="mb-3">
                            <Form.Label>Full Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter Full Name"
                                value={newguard.name}
                                onChange={(e) => setNewguard({ ...newguard, name: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group controlId="formPhone" className="mb-3">
                            <Form.Label>Phone Number</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="+91"
                                value={newguard.phone}
                                onChange={(e) => setNewguard({ ...newguard, phone: e.target.value })}
                            />
                        </Form.Group>
                        <div className="d-flex justify-content-between mb-3">
                            {/* Gender field */}
                            <Form.Group controlId="formGender" style={{ width: "210px" }}>
                                <Form.Label>Gender</Form.Label>
                                <Form.Select
                                    value={newguard.gender}
                                    onChange={(e) => setNewguard({ ...newguard, gender: e.target.value })}
                                >
                                    <option>Select Gender</option>
                                    <option>Male</option>
                                    <option>Female</option>
                                </Form.Select>
                            </Form.Group>
                            {/* Shift field */}
                            <Form.Group controlId="formShift" style={{ width: "210px" }}>
                                <Form.Label>Shift</Form.Label>
                                <Form.Select
                                    value={newguard.shift}
                                    onChange={(e) => setNewguard({ ...newguard, shift: e.target.value })}
                                >
                                    <option>Select Shift</option>
                                    <option>Day</option>
                                    <option>Night</option>
                                </Form.Select>
                            </Form.Group>
                        </div>
                        <div className="d-flex mb-3" style={{ justifyContent: 'space-between' }}>
                            {/* Shift Date */}
                            <Form.Group controlId="formDate" style={{ width: "210px" }}>
                                <Form.Label>Shift Date</Form.Label>
                                <Form.Control
                                    type="date"
                                    value={newguard.date}
                                    onChange={(e) => setNewguard({ ...newguard, date: e.target.value })}
                                />
                            </Form.Group>
                            {/* Shift Time */}
                            <Form.Group controlId="formTime" style={{ width: "210px" }} >
                                <Form.Label>Shift Time</Form.Label>
                                <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                                    <Form.Control
                                        type="text"
                                        placeholder="HH:MM AM/PM"
                                        value={newguard.time}
                                        onFocus={(e) => (e.target.type = 'time')}  // Change input type to 'time' on focus
                                        onBlur={(e) => {
                                            if (!e.target.value) e.target.type = 'text'; // Change back to 'text' if no value
                                            else formatTime(e.target.value); // Apply time formatting
                                        }}
                                        onChange={(e) => setNewguard({ ...newguard, time: e.target.value })}
                                        style={{ paddingLeft: '35px' }} // Padding to accommodate the icon
                                    />
                                    <FaClock style={{ position: 'absolute', left: '10px', color: '#007bff', pointerEvents: 'none' }} />
                                </div>
                            </Form.Group>
                        </div>
                        {/* Aadhaar Card Upload Section */}
                        <Form.Group controlId="formAadhaar" className=" mt-4">
                            <Form.Label>Upload Aadhaar Card</Form.Label>
                            <div className='text-center'
                                style={{
                                    border: "2px dashed rgba(211, 211, 211, 1)",
                                    borderRadius: "8px",
                                    padding: "20px",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    flexDirection: "column",
                                    cursor: "pointer"
                                }}
                            >
                                <label htmlFor="aadhaar-upload" style={{ cursor: 'pointer', color: '#007bff' }}>
                                    <LuImagePlus className='text-center'
                                        style={{
                                            fontSize: '24px',      // Size of the icon
                                            marginBottom: '8px',   // Bottom margin
                                            width: '40px',         // Icon width
                                            height: '50px',        // Icon height
                                            top: '4px',            // Top offset
                                            left: '8px',           // Left offset
                                            color: " rgba(167, 167, 167, 1)",// Ensure position is relative to the container
                                            gap: '0px',
                                            // No gap between elementsr
                                        }}
                                    />
                                    <div>Upload a file <span style={{ color: "black" }}>or drag and drop</span></div>
                                </label>
                                <small className="text-muted">PNG, JPG, GIF, PDF up to 10MB</small>
                                <input
                                    id="aadhaar-upload"
                                    type="file"
                                    onChange={(e) => handleFileChange(e, 'aadhaar')}
                                    accept="image/png, image/jpeg, application/pdf"
                                    style={{ display: 'none' }}
                                />

                                {/* Display file preview or name */}
                                {newguard.aadhaar && (
                                    <div style={{ marginTop: '15px', textAlign: 'center' }}>
                                        {newguard.aadhaar.preview && newguard.aadhaar.file.type.startsWith('image/') ? (
                                            <img
                                                src={newguard.aadhaar.preview}
                                                alt="Aadhaar Preview"
                                                style={{ width: '80px', height: '80px', borderRadius: '8px', objectFit: 'cover' }}
                                            />
                                        ) : (
                                            <div>{newguard.aadhaar.file.name}</div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer style={{ display: "flex", justifyContent: "space-between" }}>
                    <Button
                        variant="secondary"
                        style={{
                            width: "175px",
                            height: "51px",
                            border: "1px solid #202224",
                            padding: "10px 55px 10px 55px",
                            background: "#FFFFFF",
                            color: "#202224"
                        }}
                        onClick={() => setShowModal(false)} // Close modal when Cancel is clicked
                    >
                        Cancel
                    </Button>
                    <Button
                        className="mainColor2"
                        style={{
                            width: "175px",
                            height: "51px",
                            border: "1px",
                            padding: "10px 55px 10px 55px",
                            color: "#202224"
                        }}
                        onClick={handleAddguard}>
                        Create
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
                                <td style={{ verticalAlign: "middle", width: "300px" }}>
                                    <div className="d-flex align-items-center gap-2">
                                        <img
                                            src={Avatar}
                                            alt="avatar"
                                            className="rounded-circle"
                                            style={{
                                                width: "40px",
                                                height: "40px",
                                                borderRadius: "36px",
                                                border: "2px solid #F4F4F4",
                                            }}
                                        />
                                        <span
                                            style={{
                                                fontSize: "16px",

                                                lineHeight: "24px",
                                                textAlign: "left",
                                            }}
                                        >
                                            {guard.name}
                                        </span>
                                    </div>
                                </td>
                                <td>{guard.phone}</td>
                                <td className='text-center'>
                                    {guard.shift === 'Day' ? (
                                        <span
                                            style={{
                                                display: "inline-flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                width: "113px",
                                                height: "31px",
                                                textAlign: "center",
                                                fontFamily: "Poppins",
                                                borderRadius: "50px",
                                                background: "rgba(244, 244, 244, 1)",
                                                color: "rgba(255, 147, 0, 1)", // Text and icon color
                                                fontSize: "16px", // Optional for font size
                                                fontWeight: "500", // Optional for font weight
                                            }}
                                            role="img"
                                            aria-label="Day"
                                        >
                                            <FaSun style={{ marginRight: "5px" }} />
                                            Day
                                        </span>
                                    ) : (
                                        <span
                                            style={{
                                                display: "inline-flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                fontFamily: "Poppins",
                                                width: "113px",
                                                height: "31px",
                                                borderRadius: "50px",
                                                background: "rgba(79, 79, 79, 1)",  // Dark background
                                                color: "rgba(255, 255, 255, 1)",    // White text and icon color
                                                fontSize: "16px",                   // Optional font size
                                                fontWeight: "500",                  // Optional font weight
                                            }}
                                            role="img"
                                            aria-label="Night"
                                        >
                                            <FaMoon style={{ marginRight: "5px" }} />
                                            Night
                                        </span>
                                    )}
                                </td>
                                <td className="text-center">
                                    {guard.date}
                                </td>
                                <td className="text-center"> {guard.time}</td>
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
                                <td className="text-center">
                                    <div className="d-flex align-items-center justify-content-center">
                                        <FaEye className="text-primary me-2" style={{ cursor: "pointer" }} />
                                        <FaEdit
                                            className="text-success me-2"
                                            style={{ cursor: "pointer" }}
                                        />

                                        <FaTrash className="text-danger" style={{ cursor: "pointer" }} />
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        </Container>
        </>
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
