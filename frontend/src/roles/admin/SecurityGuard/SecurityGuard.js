import React, { useState, useEffect } from 'react';
import { Button, Table, Modal, Form } from 'react-bootstrap';
import { FaCamera, FaFemale, FaImage, FaMale, FaMoon, FaPlus, FaSun, FaTrash, FaUpload } from 'react-icons/fa';
import Sidebar from '../../../component/Layout/Sidebar';
import Avtar from "../../../assets/Avatar.png";
import { LuImagePlus } from 'react-icons/lu';
import Header from '../../../component/Layout/Navbar';
import View from "../../../assets/view.png"
import Delete from "../../../assets/delete.png"
import Edit from "../../../assets/edit.png"
import axios from 'axios';

export default function SecurityGaurd() {
  const [guards, setGuards] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showViewGuard, setShowViewGuard] = useState(false); // For view modal
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [guardData, setGuardData] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [newGuard, setNewGuard] = useState({
    Full_name: '',
    Phone_number: '',
    gender: '',
    shift: 'Day',
    Shift_Date: '',
    Shift_time: '',
    Security_Gard_Image: null,
    Aadhar_card: null,
  });

  const [editGuardId, setEditGuardId] = useState(null);
  // const [viewGuardData, setViewGuardData] = useState(null);
  const [guardToDelete, setGuardToDelete] = useState(null);

  // Fetch guards list from API
  useEffect(() => {
    fetchGuardData()
      .then(data => setGuardData(data))
      .catch(error => console.log("Error fetching data:", error));
  }, []);

  const fetchGuardData = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/users/v10/getSecuritygaurd`);
      setGuards(response.data);
    } catch (error) {
      console.error('Error fetching guards:', error);
    }
  };
  // Show modal for creating or editing guard
  const handleShowCreate = () => {
    setIsEdit(false);
    setNewGuard({
      Full_name: '',
      Phone_number: '',
      gender: '',
      shift: 'Day',
      Shift_Date: '',
      Shift_time: '',
      Security_Gard_Image: null,
      Aadhar_card: null,
    });
    setShowModal(true);
  };

  const handleShowEdit = (guard) => {
    setIsEdit(true);
    setEditGuardId(guard._id);  // Ensure this ID is set
    setNewGuard(guard);  // Pre-fill the form with the selected guard's data
    setShowModal(true);
  };
  

  // Show the view modal for guard details
  const handleShowView = (guard) => {
    setGuardData(guard); // Set the selected guard's data
    setShowViewGuard(true); // Open the modal
  };

  // Show the delete confirmation modal
  const handleShowDelete = (guard) => {
    setGuardToDelete(guard);    // Store the guard to be deleted
    setShowDeleteModal(true);   // Show the delete modal
  };




  const handleClose = () => {
    setShowModal(false);
    setShowViewGuard(false);
    setGuardData(null);
    setShowDeleteConfirm(false); // Close the delete confirmation modal
    setNewGuard({
      Full_name: '',
      Phone_number: '',
      gender: '',
      shift: 'Day',
      Shift_Date: '',
      Shift_time: '',
      Security_Gard_Image: null,
      Aadhar_card: null,
    });
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewGuard((prev) => ({ ...prev, [name]: value }));
  };
  // Handle file changes (for image uploads)
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Create a preview for images
      const preview = file.type.startsWith("image/") ? URL.createObjectURL(file) : null;
      setNewGuard((prev) => ({
        ...prev,
        Aadhar_card: {
          file: file,
          preview: preview,
        },
      }));
    }
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0]; // Get the uploaded file

    if (file) {
      // Generate a preview for image files
      const preview = file.type.startsWith("image/") ? URL.createObjectURL(file) : null;
      setNewGuard((prev) => ({
        ...prev,
        Security_Gard_Image: {
          file: file,
          preview: preview, // Store the preview URL
        },
      }));
    }
  };

  const handleEdit = (guardId) => {
    setIsEdit(true);  // Indicate that this is an edit action
    const selectedGuard = guards.find(guard => guard._id === guardId);  // Fetch the guard data
    setNewGuard(selectedGuard);  // Set the form data to the selected guard's data
    setShowModal(true);  // Open the modal
  };


  // Handle saving new guard or editing an existing one
  const handleSave = async (e) => {
    const formData = new FormData();
    formData.append('Full_name', newGuard.Full_name);
    formData.append('Phone_number', newGuard.Phone_number);
    formData.append('gender', newGuard.gender);
    formData.append('shift', newGuard.shift);
    formData.append('Shift_Date', newGuard.Shift_Date);
    formData.append('Shift_time', newGuard.Shift_time);

    // Append the Aadhar Card and Security Guard Image files
    if (newGuard.Aadhar_card) {
      formData.append('Aadhar_card', newGuard.Aadhar_card.file); // Ensure it's the file object
    }

    if (newGuard.Security_Gard_Image) {
      formData.append('Security_Gard_Image', newGuard.Security_Gard_Image.file); // Ensure it's the file object
    }

    e.preventDefault();

    try {
      if (isEdit && editGuardId) {
        // Update existing guard
        await axios.put(`${process.env.REACT_APP_API_URL}/users/v10/updateSecuritygaurd/${editGuardId}`, formData);
      } else {
        // Create new guard
        await axios.post(`${process.env.REACT_APP_API_URL}/users/v10/createSecuritygaurd`, formData);
      }
  
      // Close the modal and reset states after successful operation
      setShowModal(false);
      setIsEdit(false);
      setEditGuardId(null);  // Reset the edit ID to prevent leftover state
      setNewGuard({
        Full_name: '',
        Phone_number: '',
        gender: '',
        shift: 'Day',
        Shift_Date: '',
        Shift_time: '',
        Security_Gard_Image: null,
        Aadhar_card: null,
      });
  
      // Refresh the guard list after operation
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/users/v10/getSecuritygaurd`);
      setGuards(response.data);
    } catch (error) {
      console.error('Error saving guard:', error.response || error);
      alert('Error saving guard: ' + (error.response?.data?.message || error.message));
    }
  };


  const handleDeleteConfirmation = async () => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/users/v10/deleteSecuritygaurd/${guardToDelete}`);
      setShowDeleteModal(false);
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/users/v10/getSecuritygaurd`);
      setGuards(response.data);
    } catch (error) {
      console.error("Error deleting guard:", error);
    }
  };

  // Handle Delete
  const handleDelete = (guardId) => {
    setGuardToDelete(guardId);
    setShowDeleteModal(true); // Show the delete confirmation modal
  };

  function formatDate(dateString) {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
    const year = date.getFullYear();
  
    return `${day}/${month}/${year}`;
  }

  return (
    <div className="d-flex flex-column flex-md-row">
      <div className="flex-shrink-0" >
        <Sidebar />
      </div>

      <div className="flex-grow-1 dashboard-bg" style={{ width: "1920px" }}>
        <Header />
        <div className="container-fluid  p-4" style={{ marginTop: "70px", width: "1620px", marginLeft: "300px" }}>



          <div className="table-responsive" style={{ border: "1px solid #ddd", borderRadius: "8px", boxShadow: "0px 0px 15px rgba(0, 0, 0, 0.1)", overflow: "hidden", backgroundColor: "#fff", padding: "20px", marginTop: "20px" }}>
            <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mb-4">
              <h4 className="mb-0">Security Guard Details</h4>
              <Button className="btn mainColor2 d-flex align-items-center justify-content-center" onClick={handleShowCreate}
                style={{ border: 'none' }}>
                <FaPlus
                  style={{
                    fontSize: "18px",
                    borderRadius: "5px",
                    background: "rgba(255, 255, 255, 1)",
                    color: "#FE512E",
                    marginRight: "8px",
                  }}
                />
                Add Security
              </Button>
            </div>
            <Table striped responsive style={{ width: "1520px", marginLeft: "8px" }}>
              <thead>
                <tr>
                  <th
                    style={{
                      background: "rgb(185, 198, 242)",
                      fontSize: "15px",
                      fontWeight: "700",
                      width: "200px"
                    }}
                  >
                    Security Guard Name
                  </th>

                  <th style={{ background: "rgb(185, 198, 242)", fontSize: "15px" }} className='text-center'>Phone Number</th>
                  <th style={{ background: "rgb(185, 198, 242)", fontSize: "15px" }} className='text-center'>Select Shift</th>
                  <th style={{ background: "rgb(185, 198, 242)", fontSize: "15px" }} className='text-center'>Shift Date</th>
                  <th style={{ background: "rgb(185, 198, 242)", fontSize: "15px" }} className='text-center'>Shift Time</th>
                  <th style={{ background: "rgb(185, 198, 242)", fontSize: "15px" }} className='text-center'>Gender</th>
                  <th style={{ background: "rgb(185, 198, 242)", fontSize: "15px" }} className='text-center'>Action</th>
                </tr>
              </thead>
              <tbody>
                {guards.map((guard, index) => (
                  <tr key={index}>
                    <td style={{ verticalAlign: "middle", width: "220px" }}>
                      <div >
                        <img
                          src={Avtar}
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
                            fontFamily: "Poppins",
                            fontSize: "16px",
                            fontWeight: "500",
                            lineHeight: "24px",
                            textAlign: "left",
                          }}
                        >
                          {guard?.Full_name || 'No name available'}
                        </span>
                      </div>
                    </td>
                    <td className='text-center' style={{ fontFamily: "Poppins", verticalAlign: "middle" }}>{guard.Phone_number}</td>
                    <td className='text-center' style={{ verticalAlign: "middle" }}>
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
                    <td className="text-center" style={{ fontFamily: "Poppins", verticalAlign: "middle" }}>
                      {guard.Shift_Date ? formatDate(guard.Shift_Date) : 'Shift Date not available'}
                    </td>
                    <td style={{ verticalAlign: "middle" }} className="text-center">
                      <div className="d-flex align-items-center justify-content-center gap-2">
                        <div
                          style={{
                            width: "100px",
                            height: "34px",
                            padding: "5px 15px",
                            gap: "10px",
                            fontFamily: "Poppins",
                            borderRadius: "50px",
                            background: "#F6F8FB",
                            color: "#4F4F4F",
                            display: "inline-block",
                          }}
                        >
                          {guard?.Shift_time || 'No time available'}
                        </div>
                      </div>
                    </td>
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
                        <img src={Edit} className="text-success me-2" style={{ cursor: "pointer" }} onClick={() => handleShowEdit(guard)} />
                        <img src={View} className="text-primary me-2" style={{ cursor: "pointer" }} onClick={() => handleShowView(guard)} />
                        <img src={Delete} className="text-danger" style={{ cursor: "pointer" }} onClick={() => handleDelete(guard._id)} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>

            <Modal show={showViewGuard} onHide={handleClose} centered className='square-modal'>
              <Modal.Header closeButton>
                <Modal.Title style={{
                  width: "371px",
                  height: "40px",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                }}>
                  View Security Protocols
                </Modal.Title>
              </Modal.Header>

              <Modal.Body>
                {guardData ? (  // Ensure guardData exists
                  <>
                    <div style={{
                      width: "285px",
                      height: "70px",
                      display: "flex",
                      textAlign: "start",
                      gap: "15px",
                      fontFamily: "Poppins, sans-serif",
                    }}>
                      <img
                        src={guardData.Avatar || Avtar}  // Use guard's avatar if available, else default
                        alt="avatar"
                        style={{
                          width: "70px",
                          height: "70px",
                          borderRadius: "50%", // Ensures a perfect circle
                          border: "3px solid #F4F4F4",
                        }}
                      />

                      <p style={{ margin: 0 }}>
                        {guardData.Full_name || 'Name not available'}<br />
                        {guardData.Shift_Date || 'Shift Date not available'}
                      </p>
                    </div>

                    <div style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center", // Centers vertically
                      width: "100%", // Adjusts width for space distribution
                      fontFamily: "Poppins, sans-serif",
                      marginTop: "20px"
                    }}>

                      {/* Shift */}
                      <div style={{
                        textAlign: "center",
                        display: "flex",
                        flexDirection: "column", // Stacks items vertically
                        gap: "0px", // Removes any gap between elements
                        alignItems: "center",
                      }}>
                        <span>Select Shift</span>
                        {guardData.shift === 'Day' ? (
                          <span
                            style={{
                              display: "inline-flex",
                              alignItems: "center",
                              justifyContent: "center",
                              width: "113px",
                              height: "31px",
                              fontFamily: "Poppins",
                              borderRadius: "50px",
                              background: "rgba(244, 244, 244, 1)",
                              color: "rgba(255, 147, 0, 1)",
                              fontSize: "16px",
                              fontWeight: "500",
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
                      </div>

                      {/* Shift Time */}
                      <div className="align-items-center justify-content-center">
                        <p className="mb-0 text-center">Shift Time</p>
                        <div className="text-center"
                          style={{
                            width: "100px",
                            height: "34px",
                            padding: "5px 15px",
                            fontWeight: "500",
                            borderRadius: "50px",
                            background: "#F6F8FB",
                            color: "#4F4F4F",
                            display: "inline-block",
                          }}
                        >
                          {guardData.Shift_time || 'Time not available'}
                        </div>
                      </div>

                      {/* Gender */}
                      <div style={{ textAlign: "center" }}>
                        <span style={{ display: "block", marginBottom: "0" }}>Gender</span>
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
                              guardData.gender === "Male" ? "rgba(33, 168, 228, 0.1)" : "rgba(254, 118, 168, 0.1)",
                            color:
                              guardData.gender === "Male" ? "rgba(86, 120, 233, 1)" : "rgba(254, 118, 168, 1)",
                            fontSize: "16px",
                            fontWeight: "500",
                          }}
                        >
                          {guardData.gender === "Male" ? <FaMale /> : <FaFemale />}
                          {guardData.gender}
                        </span>
                      </div>

                      {/* Security Guard Image
                      <div>
                        {guardData.Security_Gard_Image && (
                          <img src={guardData.Security_Gard_Image} alt="Guard" style={{ width: '100px' }} />
                        )}
                      </div> */}

                    </div>
                  </>
                ) : (
                  <div>Loading guard data...</div>  // Fallback content in case guardData is null or undefined
                )}
              </Modal.Body>
            </Modal>



            <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} centered className='square-modal'>
              <Modal.Header closeButton>
                <Modal.Title>Delete Protocol?</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <p>Are you sure you want to delete this protocol?</p>
              </Modal.Body>
              <Modal.Footer style={{ display: "flex", justifyContent: "space-between" }}>
                <Button variant="secondary" onClick={handleClose} style={{ width: "175px", height: "51px", border: "1px solid #202224", padding: "10px 55px 10px 55px", background: "#FFFFFF", color: "#202224", }}>
                  Cancel
                </Button>
                <Button onClick={handleDeleteConfirmation} style={{
                  width: "175px", height: "51px", border: "1px", padding: "10px 55px 10px 55px", color: "#202224", background: "rgba(231, 76, 60, 1)"
                }}>
                  Delete
                </Button>

              </Modal.Footer>
            </Modal>

            {/* Add Security Modal */}
            <Modal show={showModal} onHide={handleClose} centered className='square-modal'>
              <Modal.Header >
                <Modal.Title>{isEdit ? 'Edit Security' : 'Add Security'}</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                {/* Add Photo Section */}
                <div className="text-start" style={{ display: 'flex', marginBottom: '20px' }}>
                  <label htmlFor="photo-upload" style={{ cursor: 'pointer', textAlign: 'center' }}>
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
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
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          border: "2px solid #ddd",
                          marginRight: "10px",
                        }}
                      >
                        {newGuard.Security_Gard_Image?.preview ? (
                          <img
                            src={newGuard.Security_Gard_Image.preview}
                            alt="Uploaded"
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                              borderRadius: "50%",
                            }}
                          />
                        ) : (
                          <FaCamera style={{ color: "rgba(255, 255, 255, 1)", fontSize: "16px" }} />
                        )}
                      </div>
                      <div style={{ color: "#007bff" }}>Add Photo</div>
                    </div>
                  </label>
                  <input
                    id="photo-upload"
                    type="file"
                    onChange={handlePhotoUpload} // Call the handler on file change
                    accept="image/png, image/jpeg"
                    style={{ display: 'none' }}
                  />
                </div>

                {/* Form Fields */}
                <Form>
                  <Form.Group controlId="formName" className="mb-3">
                    <Form.Label>Full Name<span className="text-danger">*</span></Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Full Name"
                      value={newGuard.Full_name}
                      onChange={(e) => setNewGuard({ ...newGuard, Full_name: e.target.value })}
                    />
                  </Form.Group>

                  <Form.Group controlId="formPhone" className="mb-3">
                    <Form.Label>Phone Number<span className="text-danger">*</span></Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="+91"
                      value={newGuard.Phone_number}
                      onChange={(e) => setNewGuard({ ...newGuard, Phone_number: e.target.value })}
                    />
                  </Form.Group>

                  <div className="d-flex justify-content-between mb-3">
                    <Form.Group controlId="formGender" style={{ width: "210px" }}>
                      <Form.Label>Gender<span className="text-danger">*</span></Form.Label>
                      <Form.Select
                        value={newGuard.gender}
                        onChange={(e) => setNewGuard({ ...newGuard, gender: e.target.value })}
                      >
                        <option>Select Gender</option>
                        <option>Male</option>
                        <option>Female</option>
                      </Form.Select>
                    </Form.Group>

                    <Form.Group controlId="formShift" style={{ width: "210px" }}>
                      <Form.Label>Shift<span className="text-danger">*</span></Form.Label>
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

                  <div className="d-flex mb-3" style={{ justifyContent: 'space-between' }}>
                    <Form.Group controlId="formDate" style={{ width: "210px" }}>
                      <Form.Label>Shift Date<span className="text-danger">*</span></Form.Label>
                      <Form.Control
                        type="date"
                        value={newGuard.Shift_Date}
                        onChange={(e) => setNewGuard({ ...newGuard, Shift_Date: e.target.value })}
                      />
                    </Form.Group>

                    <Form.Group controlId="formTime" style={{ width: "210px" }}>
                      <Form.Label>
                        Shift Time<span className="text-danger">*</span>
                      </Form.Label>
                      <Form.Control
                        type="time"
                        value={newGuard.Shift_time}
                        onChange={(e) => {
                          
                          setNewGuard((prev) => ({ ...prev, Shift_time: e.target.value })); // Update state
                        }}
                      />
                    </Form.Group>


                  </div>

                  {/* Aadhaar Card Upload Section */}
                  <Form.Group controlId="formAadhaar" className="mt-4">
                    <Form.Label>
                      Upload Aadhaar Card<span className="text-danger">*</span>
                    </Form.Label>
                    <div
                      className="text-center"
                      style={{
                        border: "2px dashed rgba(211, 211, 211, 1)",
                        borderRadius: "8px",
                        padding: "20px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        flexDirection: "column",
                        cursor: "pointer",
                      }}
                    >
                      <label
                        htmlFor="aadhaar-upload"
                        style={{ cursor: "pointer", color: "#007bff" }}
                      >
                        <LuImagePlus
                          className="text-center"
                          style={{
                            fontSize: "24px",
                            marginBottom: "8px",
                            width: "40px",
                            height: "50px",
                            top: "4px",
                            left: "8px",
                            color: " rgba(167, 167, 167, 1)",
                            gap: "0px",
                          }}
                        />
                        <div>
                          Upload a file <span style={{ color: "black" }}>or drag and drop</span>
                        </div>
                      </label>
                      <small className="text-muted">PNG, JPG, GIF, PDF up to 10MB</small>
                      <input
                        id="aadhaar-upload"
                        type="file"
                        onChange={handleFileChange}
                        accept="image/png, image/jpeg, application/pdf"
                        style={{ display: "none" }}
                      />
                      {/* Display file preview or name */}
                      {newGuard.Aadhar_card && (
                        <div style={{ marginTop: "15px", textAlign: "center" }}>
                          {newGuard.Aadhar_card.preview ? (
                            <img
                              src={newGuard.Aadhar_card.preview}
                              alt="Aadhaar Preview"
                              style={{
                                width: "80px",
                                height: "80px",
                                borderRadius: "8px",
                                objectFit: "cover",
                              }}
                            />
                          ) : (
                             <div>{newGuard.Aadhar_card?.file?.name || 'No file selected'}</div>
                          )}
                        </div>
                      )}
                    </div>
                  </Form.Group>

                </Form>
              </Modal.Body>
              <Modal.Footer style={{ display: "flex", justifyContent: "space-between" }}>
                <Button style={{ width: "175px", height: "51px", border: "1px solid #202224", padding: "10px 55px 10px 55px", background: "#FFFFFF", color: "#202224", }} variant="secondary" onClick={handleClose}>
                  Cancel
                </Button>
                <Button style={{
                  width: "175px", height: "51px", border: "1px", padding: "10px 55px 10px 55px", color: "#202224",

                }} className='save' onClick={handleSave}>
                  {isEdit ? 'Update' : 'Create'}
                </Button>
              </Modal.Footer>
            </Modal>

          </div>
        </div>
      </div>
    </div>
  );
}