import React, { useState, useEffect } from 'react';
import { Button, Modal, Form, Table } from 'react-bootstrap';
import { FaPlus} from 'react-icons/fa';
import Sidebar from '../../../component/Layout/Sidebar';
import Avtar from "../../../assets/Avatar.png"
import Header from '../../../component/Layout/Navbar';
import Edit from "../../../assets/edit.png"
import View from "../../../assets/view.png"
import Delete from "../../../assets/delete.png"
import axios from 'axios';


export default function ComplaintTracking() {
  const [complaints, setComplaints] = useState([]);
  const [newComplaint, setNewComplaint] = useState({
    Complaint_name: '',
    Complainer_name: '',
    description: '',
    wing: '',
    unit: '',
    Priority: 'Medium',
    status: 'Open'
  });
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false); // State for view modal
  const [errorMessage, setErrorMessage] = useState('');

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
  

  const handleCreateComplaint = async () => {
    // Check for empty fields
    if (!newComplaint.Complaint_name || !newComplaint.Complainer_name || !newComplaint.description || !newComplaint.wing || !newComplaint.unit) {
      setErrorMessage('All fields are required.');
      return;
    }
  
    try {
      // Log the newComplaint object to ensure it's correct
      console.log(newComplaint);
  
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/users/v23/createComplaintsTracking`, newComplaint);
      
      // Log the response to check if it's correct
      console.log(response.data);
  
      // Add the new complaint to the list
      setComplaints([...complaints, response.data]);
  
      // Clear the newComplaint form
      setNewComplaint({ Complaint_name: '', Complainer_name: '', description: '', wing: '', unit: '', Priority: 'Medium', status: 'Open' });
  
      // Close the modal and reset the error message
      setShowCreateModal(false);
      setErrorMessage('');
    } catch (error) {
      // Log the error for debugging
      console.error(error);
  
      // Set the error message
      setErrorMessage('Failed to create complaint.');
    }
  };
  

  const handleEditComplaint = (complaint) => {
    setSelectedComplaint(complaint);
    setShowEditModal(true);
  };


  const handleViewComplaint = (complaint) => {
    setSelectedComplaint(complaint);
    setShowViewModal(true); // Show the view modal
  };


  const handleSave = async () => {
    if (!selectedComplaint.Complaint_name || !selectedComplaint.Complainer_name || !selectedComplaint.description || !selectedComplaint.wing || !selectedComplaint.unit) {
      setErrorMessage('All fields are required.');
      return;
    }
  
    try {
      // Log the selectedComplaint to ensure it's correctly populated
      console.log(selectedComplaint);
  
      // Send the PUT request to update the complaint
      const response = await axios.put(`${process.env.REACT_APP_API_URL}/users/v23/updateComplaintsTracking/${selectedComplaint._id}`, selectedComplaint);
  
      // Log the response data for debugging
      console.log(response.data);
  
      // Optionally, re-fetch the complaints list to ensure it's up to date
      const fetchComplaints = async () => {
        try {
          const result = await axios.get(`${process.env.REACT_APP_API_URL}/users/v23/viewComplaintsTracking`);
          setComplaints(result.data);  // Re-fetch complaints
        } catch (error) {
          setErrorMessage('Failed to load complaints.');
        }
      };
  
      // Re-fetch complaints after the update
      fetchComplaints();
  
      // Close the modal and reset error message
      setShowEditModal(false);
      setErrorMessage('');
    } catch (error) {
      console.error(error);
      setErrorMessage('Failed to update complaint.');
    }
  };
  

  const [deleteComplaintId, setDeleteComplaintId] = useState(null);
  const [showDeleteComplaint, setShowDeleteComplaint] = useState(false);


  const handleCloseDeleteModal = () => {
    setDeleteComplaintId(null);
    setShowDeleteComplaint(false);
  };
  const handleShowDelete = (ComplaintId) => {
    setDeleteComplaintId(ComplaintId);
    setShowDeleteComplaint(true);
  };

  const handleDelete = async () => {
    // Optimistically update the UI by removing the request from the state first
    setComplaints((prevComplaints) => prevComplaints.filter((complaints) => complaints._id !== deleteComplaintId));

    try {
      // Make the API call to delete the request from the backend
      const response = await axios.delete(`${process.env.REACT_APP_API_URL}/users/v23/deleteComplaintsTracking/${deleteComplaintId}`);
      console.log('Delete response:', response);

      // If deletion was unsuccessful, revert the optimistic update
      if (response.status !== 200) {
        // Optionally, you can add the request back to the state here
      }

      // Close the modal and clear the request ID
      setDeleteComplaintId(null);
    setShowDeleteComplaint(false);
    } catch (error) {
      console.error('Error deleting request:', error.response || error.message);

      // Revert the optimistic update if the delete operation fails
      setComplaints((prevComplaints) => [
        ...prevComplaints,
        prevComplaints.find((complaints) => complaints.id === deleteComplaintId)
      ]);

      // Optionally, show an error message to the user
    }
  };

  const getPriorityByStatus = (status) => {
    if (status === "Pending") return "Medium";
    if (status === "Open") return "Low";
    if (status === "Solve") return "High";
    return "Medium";
  };

  const badgeStyle = (Priority) => {
    if (Priority === "High") return { backgroundColor: "#E74C3C", color: "white" };
    if (Priority === "Medium") return { backgroundColor: "#5678E9", color: "white" };
    if (Priority === "Low") return { backgroundColor: "#39973D", color: "white" };
    return { backgroundColor: "#28a745", color: "white" };
  };

  const statusBadgeStyle = (status) => {
    if (status === "Pending") return { backgroundColor: " #FFC3131A", color: "#FFC313" };
    if (status === "Open") return { backgroundColor: "#5678E91A", color: "#5678E9" };
    if (status === "Solve") return { backgroundColor: "#39973D1A", color: "#39973D" };
    return { backgroundColor: "#f8f9fa", color: "black" };
  };

  const imageColumnStyle = {
    display: "flex",
    alignItems: "center", // Aligns the image and text horizontally
    justifyContent: "flex-start", // Ensures the content starts from the left
    gap: "10px", // Space between the image and the name
  };
  const tableColumnStyle = {
    whiteSpace: "normal",
    wordWrap: "break-word",
    padding: "15px",
    textAlign: "center",
    verticalAlign: "middle",
    maxWidth: "350px",
  };

 


  return (
    <div className="d-flex flex-column flex-md-row">
      <div className="flex-shrink-0">
        <Sidebar />
      </div>

      <div className="flex-grow-1 dashboard-bg " style={{ width: "1920px" }}>
        <Header />
        <div className=" container-fluid  p-4 " style={{ marginTop: "70px" ,width:"1620px",marginLeft:"300px" }}>


          <div className="table-responsive" style={{ border: "1px solid #ddd", borderRadius: "8px", boxShadow: "0px 0px 15px rgba(0, 0, 0, 0.1)", overflow: "hidden", backgroundColor: "#fff",padding:"5px", marginTop: "20px" }}>
            <div  className="d-flex flex-column flex-md-row justify-content-between align-items-center mt-2 mb-4">
              <h4 className="mb-0" style={{marginLeft:"20px"}}>Complaint Tracking</h4>
              
              <Button className="btn mainColor2 d-flex align-items-center justify-content-center"onClick={() => setShowCreateModal(true)}
                style={{ border: 'none' }}><FaPlus
                  style={{
                    fontSize: "18px",
                    borderRadius: "5px",
                    background: "rgba(255, 255, 255, 1)",
                    color: "#FE512E",
                    marginRight: "8px",
                  }}
                />Create Complaint</Button>
            </div>
            <Table striped hover responsive style={{ width: "1520px",marginLeft:"20px" }}>
              <thead className="bg-light">
                <tr className="rmHead">
                  <th className="text-start" style={{ padding: "10px", background: "rgb(185, 198, 242)" }}>Complainer Name</th>
                  <th className="text-start" style={{ padding: "10px", background: "rgb(185, 198, 242)" }}>Complaint Name</th>
                  <th className="text-center" style={{ padding: "10px", background: "rgb(185, 198, 242)" }}>Description</th>
                  <th className="text-center" style={{ padding: "10px", background: "rgb(185, 198, 242)" }}>Unit Number</th>
                  <th className="text-center" style={{ padding: "10px", background: "rgb(185, 198, 242)" }}>Priority</th>
                  <th className="text-center" style={{ padding: "10px", background: "rgb(185, 198, 242)" }}>Status</th>
                  <th className="text-center" style={{ padding: "10px", background: "rgb(185, 198, 242)" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {complaints.map((complaint) => (
                  <tr key={complaint.id}>
                    <td style={tableColumnStyle}>
                      <div style={imageColumnStyle} className="text-center">
                        <img
                          src={Avtar}
                          alt="avatar"
                          className="rounded-circle"
                          style={{
                            width: "40px", // Fixed width
                            height: "40px", // Fixed height
                            borderRadius: "36px", // Radius for rounding the image
                            border: "2px solid #F4F4F4", // Border with the desired color
                          }}
                        />
                        <span
                          style={{
                            fontFamily: "Poppins", // Apply Poppins font-family
                            fontSize: "16px", // Set font size to 16px
                            fontWeight: "500", // Set font weight to 500 (Medium)
                            lineHeight: "24px", // Set line height to 24px
                            textAlign: "left", // Align text to the left
                          }}
                        >
                          {complaint.Complaint_name}
                        </span>
                      </div>
                    </td>

                    <td style={{ padding: "15px", textAlign: "center", verticalAlign: "middle" }} className="text-start">
                      {complaint.Complainer_name}
                    </td>
                    <td style={{
                      ...tableColumnStyle,               // Presuming tableColumnStyle is a predefined style object
                      width: "250px",                    // Set the width of the element
                      height: "24px",                    // Set the height of the element
                      top: "21px",                       // Set the top positioning (ensure relative/absolute context)
                      left: "465px",                     // Set the left positioning (ensure relative/absolute context)
                      // Make the element fully transparent
                      fontFamily: "Poppins",             // Apply the Poppins font family
                      fontSize: "16px",                  // Set font size
                      fontWeight: "500",                 // Set font weight
                      lineHeight: "24px",                // Set line height
                      textAlign: "left",                 // Align text to the left
                      // Set background color
                      // Needed for positioning with top/left
                    }}>
                      {complaint.description}
                    </td>

                    <td style={{ padding: "15px", textAlign: "center", verticalAlign: "middle" }}>
                      <span style={{ border: "1px solid ", borderRadius: "50%", width: "28px", height: "28px", display: "inline-flex", justifyContent: "center", alignItems: "center", color: "skyblue" }}>
                        {complaint.wing}
                      </span>
                      <span style={{ fontFamily: "Poppins, sans-serif", fontWeight: "500", fontSize: "16px", lineHeight: "24px", marginLeft: "8px" }}>
                        {complaint.unit}
                      </span>
                    </td>
                    <td style={{ padding: "15px", textAlign: "center", verticalAlign: "middle" }}>
                      <span className="badge" style={{ ...badgeStyle(complaint.Priority), width: "100px", height: "31px", padding: "5px 12px", gap: "8px", borderRadius: "50px", display: "inline-flex", justifyContent: "center", alignItems: "center" }}>
                        {complaint.Priority}
                      </span>
                    </td>
                    <td style={{ padding: "15px", textAlign: "center", verticalAlign: "middle" }}>
                      <span style={{ ...statusBadgeStyle(complaint.status), width: "113px", height: "31px", padding: "5px 12px", gap: "5px", borderRadius: "50px", display: "inline-flex", justifyContent: "center", alignItems: "center" }}>
                        {complaint.status}
                      </span>
                    </td>
                    <td style={{ padding: "15px", textAlign: "center", verticalAlign: "middle" }}>
                      <div className="d-flex align-items-center justify-content-center">
                        <img src={Edit} className="text-success me-2" style={{ cursor: "pointer" }} onClick={() => handleEditComplaint(complaint)}/>
                        <img src={View} className="text-primary me-2" style={{ cursor: "pointer" }} onClick={() => handleViewComplaint(complaint)} />
                        <img src={Delete} className="text-danger" style={{ cursor: "pointer" }} onClick={() => handleShowDelete(complaint._id)} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </div>
      </div>

      {/* Create Complaint Modal */}
      <Modal show={showCreateModal} onHide={() => setShowCreateModal(false)} className='square-modal' centered>
        <Modal.Header closeButton>
          <Modal.Title>Create Complaint</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {errorMessage && (
            <div className="alert alert-danger">{errorMessage}</div>
          )}
          <Form>
            <Form.Group className='mt-2'>
              <Form.Label>Complainer Name<span className="text-danger">*</span></Form.Label>
              <Form.Control
                type="text"
                value={newComplaint.Complaint_name}
                onChange={(e) => setNewComplaint({ ...newComplaint, Complaint_name: e.target.value })}
              />
            </Form.Group>
            <Form.Group className='mt-2'>
              <Form.Label>Complaint Name<span className="text-danger">*</span></Form.Label>
              <Form.Control
                type="text"
                value={newComplaint.Complainer_name}
                onChange={(e) => setNewComplaint({ ...newComplaint, Complainer_name: e.target.value })}
              />
            </Form.Group>
            <Form.Group className='mt-2'>
              <Form.Label>Description<span className="text-danger">*</span></Form.Label>
              <Form.Control
                type="text"
                value={newComplaint.description}
                onChange={(e) => setNewComplaint({ ...newComplaint, description: e.target.value })}
              />
              <Form >
                <div className='d-flex justify-content-between'>


                  <Form.Group className='mt-2'>
                    <Form.Label>Wing<span className="text-danger">*</span></Form.Label>
                    <Form.Control
                      type="text"
                      value={newComplaint.wing}
                      onChange={(e) => setNewComplaint({ ...newComplaint, wing: e.target.value })}
                    />
                  </Form.Group>

                  <Form.Group className='mt-2'>
                    <Form.Label>Unit<span className="text-danger">*</span></Form.Label>
                    <Form.Control
                      type="text"
                      value={newComplaint.unit}
                      onChange={(e) => setNewComplaint({ ...newComplaint, unit: e.target.value })}
                    />
                  </Form.Group>
                </div>
              </Form>
            </Form.Group>
            <Form.Group className='mt-2'>
              <Form.Label >Priority<span className="text-danger">*</span></Form.Label>
              <div className="d-flex justify-content-around ">
                <div style={{ width: "113px", height: "41px", border: "1px solid #ccc", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "5px", paddingTop: "10px", paddingRight: "15px", paddingBottom: "10px", paddingLeft: "15px" }} >

                  <Form.Check
                    type="radio"
                    label="High"
                    className='radio-group'
                    name="Priority"
                    value="High"
                    checked={newComplaint.Priority === "High"}
                    onChange={(e) => setNewComplaint({ ...newComplaint, Priority: e.target.value })}
                  />
                </div>
                <div style={{ width: "113px", height: "41px", border: "1px solid #ccc", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "5px", paddingTop: "10px", paddingRight: "15px", paddingBottom: "10px", paddingLeft: "15px" }}>

                  <Form.Check
                    type="radio"
                    label="Medium"
                    className='radio-group'
                    name="Priority"
                    value="Medium"
                    checked={newComplaint.Priority === "Medium"}
                    onChange={(e) => setNewComplaint({ ...newComplaint, Priority: e.target.value })}
                  />
                </div>
                <div style={{ width: "113px", height: "41px", border: "1px solid #ccc", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "5px", paddingTop: "10px", paddingRight: "15px", paddingBottom: "10px", paddingLeft: "15px" }}>
                  <Form.Check
                    type="radio"
                    label="Low"
                    className='radio-group'
                    name="Priority"
                    value="Low"
                    checked={newComplaint.Priority === "Low"}
                    onChange={(e) => setNewComplaint({ ...newComplaint, Priority: e.target.value })}
                  />
                </div>
              </div>
            </Form.Group>

            <Form.Group className='mt-2'>
              <Form.Label>Status<span className="text-danger">*</span></Form.Label>
              <div className="d-flex justify-content-around">
                <div style={{ width: "113px", height: "41px", border: "1px solid #ccc", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "5px", paddingTop: "10px", paddingRight: "15px", paddingBottom: "10px", paddingLeft: "15px" }}>

                  <Form.Check
                    type="radio"
                    label="Open"
                    className='radio-group'
                    name="status"
                    value="Open"
                    checked={newComplaint.status === "Open"}
                    onChange={(e) => setNewComplaint({ ...newComplaint, status: e.target.value })}
                  />
                </div>
                <div style={{ width: "113px", height: "41px", border: "1px solid #ccc", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "5px", paddingTop: "10px", paddingRight: "15px", paddingBottom: "10px", paddingLeft: "15px" }}>


                  <Form.Check
                    type="radio"
                    label="Pending"
                    className='radio-group'
                    name="status"
                    value="Pending"
                    checked={newComplaint.status === "Pending"}
                    onChange={(e) => setNewComplaint({ ...newComplaint, status: e.target.value })}
                  />
                </div>
                <div style={{ width: "113px", height: "41px", border: "1px solid #ccc", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "5px", paddingTop: "10px", paddingRight: "15px", paddingBottom: "10px", paddingLeft: "15px" }}>

                  <Form.Check
                    type="radio"
                    label="Solve"
                    name="status"
                    className='radio-group'
                    value="Solve"
                    checked={newComplaint.status === "Solve"}
                    onChange={(e) => setNewComplaint({ ...newComplaint, status: e.target.value })}
                  />
                </div>
              </div>
            </Form.Group>

          </Form>
        </Modal.Body>
        <Modal.Footer style={{ display: "flex", justifyContent: "space-between" }}>
          <Button className='cancel' onClick={() => setShowCreateModal(false)} style={{ width: "175px", height: "51px", border: "1px solid #202224", padding: "10px 55px 10px 55px", background: "#FFFFFF", color: "#202224", }}>
            Cancel
          </Button>
          <Button className='save' onClick={handleCreateComplaint} style={{
            width: "175px", height: "51px", border: "1px", padding: "10px 55px 10px 55px", color: "#202224",

          }}>
            Create
          </Button>

        </Modal.Footer>
      </Modal>


      <Modal
        show={showViewModal}
        onHide={() => setShowViewModal(false)}
        style={{
          width: "410px",
          left: "755px",
          padding: "20px 0px 0px 0px",
          borderRadius: "15px 0px 0px 0px",
        }}
        className='square-modal' centered
      >
        <Modal.Header closeButton>
          <Modal.Title
            style={{
              width: "371px",
              height: "40px",
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            View Complaint
          </Modal.Title>

        </Modal.Header>
        <Modal.Body
          style={{
            width: "371px",
            height: "316px",
            display: "flex",
            flexDirection: "column",
            gap: "25px",
            fontFamily: "Poppins, sans-serif",
          }}
        >
          {selectedComplaint && (
            <div>
              <div style={{
                width: "285px",
                height: "70px",
                display: "flex",

                gap: "15px",
                fontFamily: "Poppins, sans-serif",
              }}>
                <img
                  src={Avtar}
                  alt="avatar"
                  // className="rounded-circle"
                  style={{
                    width: "70px",
                    height: "70px",
                    borderRadius: "50%", // Ensures a perfect circle
                    border: "3px solid #F4F4F4",
                  }}
                />
                <div
                  style={{

                    height: "70px",
                    gap: "0px",
                    marginTop: "10px"
                  }}
                >
                  <h5 style={{ margin: 0 }}>{selectedComplaint.Complaint_name}</h5>
                  <span style={{
                    color: "#A7A7A7",
                  }}>Aug 5, 2024</span>
                </div>

              </div>


              <div style={{

                height: "51px",
                gap: "3px",
                marginTop: "15px",
              }}>
                <strong style={{
                  color: "#A7A7A7",
                  fontWeight: "200"
                }}>Request Name</strong> <br />
                <span>{selectedComplaint.Complainer_name}</span>
              </div>
              <div style={{

                height: "75px",
                gap: "3px",
                marginTop: "15px",

              }}>
                <strong style={{
                  color: "#A7A7A7",
                  fontWeight: "200"
                }}>Description</strong>
                <p style={{ margin: 0 }}>{selectedComplaint.description}</p>
              </div>

              <div
                className="d-flex"
                style={{
                  width: "370.25px",
                  gap: "10px",



                  justifyContent: "space-around"
                }}
              >
                <div style={{
                  width: "41px",
                  height: "55px",
                  top: "166px",
                  gap: "3px",

                  // Ensures the "top" property works as expected
                }}>
                  <strong
                    style={{
                      fontFamily: "Poppins",
                      fontSize: "16px",
                      fontWeight: "400",
                      lineHeight: "24px",

                      textUnderlinePosition: "from-font",
                      textDecorationSkipInk: "none",
                      color: "#A7A7A7"
                    }}
                  >
                    Wing
                  </strong>

                  <p style={{ border: "1px solid ", borderRadius: "50%", width: "28px", height: "28px", display: "inline-flex", justifyContent: "center", alignItems: "center", color: "skyblue" }}>
                    {selectedComplaint.wing}
                  </p>

                </div>

                <div
                  style={{
                    width: "35px",
                    height: "51px",
                    top: "168px",
                    left: "89.25px",
                    gap: "3px",
                    textAlign: "center"
                    // Make sure the "top" and "left" properties work
                  }}
                >
                  <strong style={{
                    fontFamily: "Poppins",
                    fontSize: "16px",
                    fontWeight: "400",
                    lineHeight: "24px",

                    textUnderlinePosition: "from-font",
                    textDecorationSkipInk: "none",
                    color: "#A7A7A7"
                  }}>Unit</strong>
                  <p
                    style={{
                      fontFamily: "Poppins",
                      fontSize: "16px",
                      fontWeight: "400",
                      lineHeight: "24px",

                      textUnderlinePosition: "from-font",
                      textDecorationSkipInk: "none",
                      color: "#202224",
                      width: "35px",
                      height: "24px",
                      margin: "0"  // Set margin to 0 (instead of gap) as gap works only in flex/grid containers
                    }}
                  >
                    {selectedComplaint.unit}
                  </p>

                </div>

                <div
                  style={{
                    width: "86px",
                    height: "55px",
                    top: "166px",
                    left: "172.25px",
                    gap: "3px",
                    textAlign: "center",


                  }}
                >
                  <strong style={{
                    fontFamily: "Poppins",
                    fontSize: "16px",
                    fontWeight: "400",
                    lineHeight: "24px",

                    textUnderlinePosition: "from-font",
                    textDecorationSkipInk: "none",
                    color: "#A7A7A7",

                  }}>Priority</strong>
                  <p
                    style={{
                      textAlign: "center",
                      borderRadius: "50px",
                      background: badgeStyle(selectedComplaint.Priority).backgroundColor,
                      color: "white"
                    }}
                  >
                    {selectedComplaint.Priority}
                  </p>


                </div>

                <div style={{

                  gap: "3px",
                  textAlign: "center",


                }} >
                  <strong style={{
                    fontFamily: "Poppins",
                    fontSize: "16px",
                    fontWeight: "400",
                    lineHeight: "24px",

                    textUnderlinePosition: "from-font",
                    textDecorationSkipInk: "none",
                    color: "#A7A7A7"
                  }}>Status</strong>
                  <p
                    style={{
                      textAlign: "center",
                      padding: "2px 10px",
                      borderRadius: "50px",
                      backgroundColor: statusBadgeStyle(selectedComplaint.status).backgroundColor,
                      color: statusBadgeStyle(selectedComplaint.status).color
                    }}
                  >
                    {selectedComplaint.status}
                  </p>

                </div>
              </div>

            </div>

          )}
        </Modal.Body>

      </Modal>


      {/* edit model */}

      <Modal show={showEditModal} onHide={() => setShowEditModal(false)} className='square-modal'>
        <Modal.Header closeButton>
          <Modal.Title>Edit Complaint</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {errorMessage && (
            <div className="alert alert-danger">{errorMessage}</div>
          )}
          <Form>
            <Form.Group className='mt-2'>
              <Form.Label>Complainer Name<span className="text-danger">*</span></Form.Label>
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
              <Form.Label>Complaint Name<span className="text-danger">*</span></Form.Label>
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
              <Form.Label>Description<span className="text-danger">*</span></Form.Label>
              <Form.Control
                type="text"
                value={selectedComplaint?.description || ""}
                onChange={(e) =>
                  setSelectedComplaint((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
              />
            </Form.Group >
            <div className='d-flex justify-content-between'>


              <Form.Group className='mt-3'>
                <Form.Label>Wing<span className="text-danger">*</span></Form.Label>
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
                <Form.Label>Unit<span className="text-danger">*</span></Form.Label>
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
              <Form.Label>Priority<span className="text-danger">*</span></Form.Label>
              <div className="d-flex justify-content-around  " >

                {["High", "Medium", "Low"].map((Priority) => (
                  <Form.Check
                    style={{ border: "1px solid rgba(211, 211, 211, 1)", paddingLeft: "30px", paddingRight: "30px", borderRadius: "5px", paddingTop: "8px", paddingBottom: "8px" }}
                    type="radio"
                    label={Priority}
                    name="Priority"
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
              <Form.Label>Status<span className="text-danger">*</span></Form.Label>
              <div className="d-flex justify-content-around">
                {["Open", "Pending", "Solve"].map((status) => (
                  <Form.Check
                    style={{ border: "1px solid rgba(211, 211, 211, 1)", paddingLeft: "30px", paddingRight: "30px", paddingTop: "8px", paddingBottom: "8px", borderRadius: "5px" }}
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
        <Modal.Footer style={{ display: "flex", justifyContent: "space-between" }}>
          <Button style={{ width: "175px", height: "51px", border: "1px solid #202224", padding: "10px 55px 10px 55px", background: "#FFFFFF", color: "#202224", }} variant="secondary" onClick={() => setShowEditModal(false)}>
            Cancel
          </Button>
          <Button style={{
            width: "175px", height: "51px", border: "1px", padding: "10px 55px 10px 55px", color: "#202224",

          }} className='mainColor2' onClick={handleSave}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>


      <Modal show={showDeleteComplaint} onHide={handleCloseDeleteModal} centered className='square-modal'>
        <Modal.Header closeButton>
          <Modal.Title>Delete Request?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to delete this protocol?</p>
        </Modal.Body>
        <Modal.Footer style={{ display: "flex", justifyContent: "space-between" }}>
          <Button variant="secondary" style={{ width: "175px", height: "51px", border: "1px solid #202224", padding: "10px 55px 10px 55px", background: "#FFFFFF", color: "#202224", }}>
            Cancel
          </Button>
          <Button onClick={handleDelete} style={{
            width: "175px", height: "51px", border: "1px", padding: "10px 55px 10px 55px", color: "#202224", background: "rgba(231, 76, 60, 1)"
          }}>
            Delete
          </Button>

        </Modal.Footer>
      </Modal>
    </div>
  );
}
