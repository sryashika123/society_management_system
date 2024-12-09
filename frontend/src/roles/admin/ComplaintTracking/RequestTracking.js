import React, { useEffect, useState } from 'react';
import { Button, Modal, Form, Table } from 'react-bootstrap';
import { FaPlus } from 'react-icons/fa';
import Sidebar from '../../../component/Layout/Sidebar';
import Avtar from "../../../assets/Avatar.png"
import Header from '../../../component/Layout/Navbar';
import Edit from "../../../assets/edit.png"
import View from "../../../assets/view.png"
import Delete from "../../../assets/delete.png"
import axios from 'axios';

export default function RequestTracking() {
  const [requests, setRequests] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newRequest, setNewRequest] = useState({
    Requester_Name: "",
    Request_name: "",
    Request_Date: "",
    unit: "",
    wing: "",
    Priority: "Medium",
    status: "Open",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [showViewModal, setShowViewModal] = useState(false);

  const formatDate = (date) => {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, '0'); // Ensures two digits for day
    const month = String(d.getMonth() + 1).padStart(2, '0'); // getMonth() is 0-based
    const year = d.getFullYear();

    return `${day}-${month}-${year}`;
  };



  useEffect(() => {
    // Fetch requests from the backend when the component is mounted
    axios.get(`${process.env.REACT_APP_API_URL}/users/v7/getRequestTracking`)
      .then(response => {
        setRequests(response.data);
      })
      .catch(error => {
        console.error("Error fetching requests:", error);
      });
  }, []);


  const handleEdit = (request) => {
    setSelectedRequest(request);
    setShowModal(true);
  };

  const handleCloseModal = () => setShowModal(false);
  

  const handleSave = () => {
    if (!selectedRequest.Requester_Name || !selectedRequest.Request_name || !selectedRequest.Request_Date || !selectedRequest.unit || !selectedRequest.wing) {
      setErrorMessage("All fields are required.");
      return;
    }

    axios.put(`${process.env.REACT_APP_API_URL}/users/v7/updateRequestTracking/${selectedRequest._id}`, selectedRequest)
      .then((response) => {
        axios.get(`${process.env.REACT_APP_API_URL}/users/v7/getRequestTracking`)
          .then((updatedRequestsResponse) => {
            setRequests(updatedRequestsResponse.data); // Update the state with the new data
            setShowModal(false); // Close the modal
            setErrorMessage(""); // Clear any error messages
          })
          .catch((error) => {
            console.error('Error fetching updated requests:', error);
          });
      })
      .catch((error) => {
        console.error("Error updating request:", error);
        setErrorMessage("An error occurred while updating the request.");
      });
  };

  const handleView = (request) => {
    setSelectedRequest(request);
    setShowViewModal(true);
  };

  const handleCloseViewModal = () => setShowViewModal(false);


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

  const handleShowCreateModal = () => setShowCreateModal(true);
  const handleCloseCreateModal = () => setShowCreateModal(false);

  const handleCreateRequest = () => {
    if (!newRequest.Requester_Name || !newRequest.Request_name || !newRequest.Request_Date || !newRequest.unit || !newRequest.wing) {
      setErrorMessage("All fields are required.");
      return;
    }

    axios.post(`${process.env.REACT_APP_API_URL}/users/v7/createRequestTracking`, newRequest)
      .then(response => {
        setRequests([...requests, response.data]);
        setNewRequest({
          Requester_Name: "",
          Request_name: "",
          Request_Date: "",
          unit: "",
          wing: "",
          Priority: "Medium",
          status: "Open",
        });
        setShowCreateModal(false);
        setErrorMessage("");
      })
      .catch(error => {
        console.error("Error creating request:", error);
        setErrorMessage("An error occurred while creating the request.");
      });
  };


  const [deleteRequestId, setDeleteRequestId] = useState(null);
  const [showDeleteRequest, setShowDeleteRequest] = useState(false);

  const handleCloseDeleteModal = () => {
    setDeleteRequestId(null);
    setShowDeleteRequest(false);
  };
  const handleShowDelete = (RequestId) => {
    setDeleteRequestId(RequestId);
    setShowDeleteRequest(true);
  };

  const handleDelete = async () => {
    // Optimistically update the UI by removing the request from the state first
    setRequests((prevRequests) => prevRequests.filter((request) => request._id !== deleteRequestId));

    try {
      // Make the API call to delete the request from the backend
      const response = await axios.delete(`${process.env.REACT_APP_API_URL}/users/v7/deleteRequestTracking/${deleteRequestId}`);
      console.log('Delete response:', response);

      // If deletion was unsuccessful, revert the optimistic update
      if (response.status !== 200) {
        // Optionally, you can add the request back to the state here
      }

      // Close the modal and clear the request ID
      setDeleteRequestId(null);
      setShowDeleteRequest(false);
    } catch (error) {
      console.error('Error deleting request:', error.response || error.message);

      // Revert the optimistic update if the delete operation fails
      setRequests((prevRequests) => [
        ...prevRequests,
        prevRequests.find((request) => request.id === deleteRequestId)
      ]);

      // Optionally, show an error message to the user
    }
  };




  const imageColumnStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: "10px",
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
      <div className="flex-shrink-0" >
        <Sidebar />
      </div>

      <div className="flex-grow-1 dashboard-bg" style={{ width: "1920px" }}>
        <Header />
        <div className="container-fluid  p-4" style={{ marginTop: "70px", marginLeft: "300px", width: "1620px" }}>


          <div className="table-responsive" style={{ border: "1px solid #ddd", borderRadius: "8px", boxShadow: "0px 0px 15px rgba(0, 0, 0, 0.1)", overflow: "hidden", backgroundColor: "#fff", padding: "5px", marginTop: "20px" }}>
            <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mt-2 mb-4">
              <h4 className="mb-0" style={{ marginLeft: "20px" }}>Request Tracking</h4>
              <Button className="btn mainColor2 d-flex align-items-center justify-content-center" style={{ marginRight: "20px", border: 'none' }} onClick={handleShowCreateModal}>
                <FaPlus
                  style={{
                    fontSize: "18px",
                    borderRadius: "5px",
                    background: "rgba(255, 255, 255, 1)",
                    color: "#FE512E",
                    marginRight: "8px",
                  }}
                />Create Request</Button>
            </div>
            <Table striped hover responsive style={{ width: "1520px", marginLeft: "20px" }}>
              <thead className="bg-light">
                <tr className="rmHead ">
                  <th className="text-start" style={{ padding: "10px", background: "rgb(185, 198, 242)" }}>Requester Name</th>
                  <th className="text-start" style={{ padding: "10px", background: "rgb(185, 198, 242)" }}>Request Name</th>
                  {/* <th className="text-start" style={{ padding: "10px", background: "rgb(185, 198, 242)" }}>Description</th> */}
                  <th className="text-center" style={{ padding: "10px", background: "rgb(185, 198, 242)" }}>Request Date</th>
                  <th className="text-center" style={{ padding: "10px", background: "rgb(185, 198, 242)" }}>Unit Number</th>
                  <th className="text-center" style={{ padding: "10px", background: "rgb(185, 198, 242)" }}>Priority</th>
                  <th className="text-center" style={{ padding: "10px", background: "rgb(185, 198, 242)" }}>Status</th>
                  <th className="text-center" style={{ padding: "10px", background: "rgb(185, 198, 242)" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {requests.map((request) => (
                  <tr key={request._id}>
                    <td style={tableColumnStyle}>
                      <div style={imageColumnStyle} className="text-center">
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
                          {request.Requester_Name}
                        </span>
                      </div>
                    </td>

                    <td style={{ textAlign: "center", verticalAlign: "middle" }} className="text-start">
                      {request.Request_name}
                    </td>
                    {/* <td style={{
                  ...tableColumnStyle,
                width:"200px",
                  height: "24px",
                  top: "21px",
                  fontFamily: "Poppins",
                  fontSize: "16px",
                  fontWeight: "500",
                  lineHeight: "24px",
                  textAlign: "left",
                }}>
                  {request.description}
                </td> */}

                    <td style={{ padding: "15px", textAlign: "center", verticalAlign: "middle", width: "150px" }} className="text-center">
                      {formatDate(request.Request_Date)}
                    </td>
                    <td style={{ padding: "15px", textAlign: "center", verticalAlign: "middle" }}>
                      <span style={{ border: "1px solid ", borderRadius: "50%", width: "28px", height: "28px", display: "inline-flex", justifyContent: "center", alignItems: "center", color: "skyblue" }}>
                        {request.wing}
                      </span>
                      <span style={{ fontFamily: "Poppins, sans-serif", fontWeight: "500", fontSize: "16px", lineHeight: "24px", marginLeft: "8px" }}>
                        {request.unit}
                      </span>


                    </td>
                    <td style={{ padding: "15px", textAlign: "center", verticalAlign: "middle" }}>
                      <span className="badge" style={{ ...badgeStyle(request.Priority), width: "100px", height: "31px", padding: "5px 12px", gap: "8px", borderRadius: "50px", display: "inline-flex", justifyContent: "center", alignItems: "center" }}>
                        {request.Priority}
                      </span>
                    </td>
                    <td style={{ padding: "15px", textAlign: "center", verticalAlign: "middle" }}>
                      <span style={{ ...statusBadgeStyle(request.status), width: "113px", height: "31px", padding: "5px 12px", gap: "5px", borderRadius: "50px", display: "inline-flex", justifyContent: "center", alignItems: "center" }}>
                        {request.status}
                      </span>
                    </td>
                    <td style={{ padding: "15px", textAlign: "center", verticalAlign: "middle" }}>
                      <div className="d-flex align-items-center justify-content-center">
                        <img src={Edit} className="text-success me-2" style={{ cursor: "pointer" }} onClick={() => handleEdit(request)} />
                        <img src={View} className="text-primary me-2" style={{ cursor: "pointer" }} onClick={() => handleView(request)} />
                        <img src={Delete} className="text-danger" style={{ cursor: "pointer" }} onClick={() => handleShowDelete(request._id)} />
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
      <Modal show={showCreateModal} onHide={handleCloseCreateModal} className='square-modal' centered>
        <Modal.Header closeButton>
          <Modal.Title>Create Request</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {errorMessage && (
            <div className="alert alert-danger">{errorMessage}</div>
          )}
          <Form>
            <Form.Group className='mt-2'>
              <Form.Label>Requester Name<span className="text-danger">*</span></Form.Label>
              <Form.Control
                type="text"
                value={newRequest.Requester_Name}
                onChange={(e) => setNewRequest({ ...newRequest, Requester_Name: e.target.value })}
              />
            </Form.Group>
            <Form.Group className='mt-2'>
              <Form.Label>Request Name<span className="text-danger">*</span></Form.Label>
              <Form.Control
                type="text"
                value={newRequest.Request_name}
                onChange={(e) => setNewRequest({ ...newRequest, Request_name: e.target.value })}
              />
            </Form.Group>
            <Form.Group className='mt-2'>
              <Form.Label>Description<span className="text-danger">*</span></Form.Label>
              <Form.Control
                type="text"

              />
              <Form.Group className='mt-2'>
                <Form.Label>Request Date<span className="text-danger">*</span></Form.Label>
                <Form.Control
                  type="date"
                  value={newRequest.Request_Date}
                  onChange={(e) => setNewRequest({ ...newRequest, Request_Date: e.target.value })}
                />
              </Form.Group>
              <Form>
                <div className='d-flex gap-2'>
                  <Form.Group className='mt-2'>
                    <Form.Label>Wing<span className="text-danger">*</span></Form.Label>
                    <Form.Control
                      type="text"
                      value={newRequest.wing}
                      onChange={(e) => setNewRequest({ ...newRequest, wing: e.target.value })}
                    />
                  </Form.Group>

                  <Form.Group className='mt-2'>
                    <Form.Label>Unit</Form.Label>
                    <Form.Control
                      type="number"
                      value={newRequest.unit}
                      onChange={(e) => {
                        const value = e.target.value;
                        // Ensure the value is a valid number
                        if (!isNaN(value)) {
                          setNewRequest({ ...newRequest, unit: value });
                        }
                      }}
                    />
                  </Form.Group>
                </div>
              </Form>
            </Form.Group>
            <Form.Group className='mt-2'>
              <Form.Label>Priority<span className="text-danger">*</span></Form.Label>
              <div className="d-flex justify-content-around">
                <div style={{ width: "113px", height: "41px", border: "1px solid #ccc", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "5px", paddingTop: "10px", paddingRight: "15px", paddingBottom: "10px", paddingLeft: "15px" }}>
                  <Form.Check
                    type="radio"
                    className='radio-group'
                    label="High"
                    name="Priority"
                    value="High"
                    checked={newRequest.Priority === "High"}
                    onChange={(e) => setNewRequest({ ...newRequest, Priority: e.target.value })}
                  />
                </div>
                <div style={{ width: "113px", height: "41px", border: "1px solid #ccc", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "5px", paddingTop: "10px", paddingRight: "15px", paddingBottom: "10px", paddingLeft: "15px" }}>
                  <Form.Check
                    type="radio"
                    label="Medium"
                    className='radio-group'
                    name="Priority"
                    value="Medium"
                    checked={newRequest.Priority === "Medium"}
                    onChange={(e) => setNewRequest({ ...newRequest, Priority: e.target.value })}
                  />
                </div>
                <div style={{ width: "113px", height: "41px", border: "1px solid #ccc", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "5px", paddingTop: "10px", paddingRight: "15px", paddingBottom: "10px", paddingLeft: "15px" }}>
                  <Form.Check
                    type="radio"
                    label="Low"
                    className='radio-group'
                    name="Priority"
                    value="Low"
                    checked={newRequest.Priority === "Low"}
                    onChange={(e) => setNewRequest({ ...newRequest, Priority: e.target.value })}
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
                    checked={newRequest.status === "Open"}
                    onChange={(e) => setNewRequest({ ...newRequest, status: e.target.value })}
                  />
                </div>
                <div style={{ width: "113px", height: "41px", border: "1px solid #ccc", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "5px", paddingTop: "10px", paddingRight: "15px", paddingBottom: "10px", paddingLeft: "15px" }}>
                  <Form.Check
                    type="radio"
                    label="Pending"
                    className='radio-group'
                    name="status"
                    value="Pending"
                    checked={newRequest.status === "Pending"}
                    onChange={(e) => setNewRequest({ ...newRequest, status: e.target.value })}
                  />
                </div>
                <div style={{ width: "113px", height: "41px", border: "1px solid #ccc", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "5px", paddingTop: "10px", paddingRight: "15px", paddingBottom: "10px", paddingLeft: "15px" }}>
                  <Form.Check
                    type="radio"
                    label="Solve"
                    className='radio-group'
                    name="status"
                    value="Solve"
                    checked={newRequest.status === "Solve"}
                    onChange={(e) => setNewRequest({ ...newRequest, status: e.target.value })}
                  />
                </div>
              </div>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer style={{ display: "flex", justifyContent: "space-between" }}>
          <Button variant="secondary" onClick={handleCloseCreateModal} style={{ width: "175px", height: "51px", border: "1px solid #202224", padding: "10px 55px 10px 55px", background: "#FFFFFF", color: "#202224" }}>
            Cancel
          </Button>
          <Button className="save" onClick={handleCreateRequest} style={{
            width: "175px", height: "51px", border: "1px", padding: "10px 55px 10px 55px", color: "#202224"
          }}>
            Create
          </Button>
        </Modal.Footer>
      </Modal>


      <Modal
        show={showViewModal}
        onHide={handleCloseViewModal}
        style={{
          width: "410px",
          left: "755px",
          padding: "20px 0px 0px 0px",
          borderRadius: "15px 0px 0px 0px",
        }}
        centered
        className='square-modal'
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
            View Request
          </Modal.Title>
        </Modal.Header>
        <Modal.Body
          style={{
            width: "371px",
            display: "flex",
            flexDirection: "column",
            gap: "25px",
            fontFamily: "Poppins, sans-serif",
          }}
        >
          {selectedRequest && (
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
                  <h5 style={{ margin: 0 }}>{selectedRequest.Requester_Name}</h5>
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
                <span>{selectedRequest.Request_name}</span>
              </div>


              <div style={{
                height: "51px",
                gap: "3px",

              }}>
                <strong style={{
                  color: "#A7A7A7",
                  fontWeight: "200"
                }}>Request Date</strong> <br />
                <span>{formatDate(selectedRequest.Request_Date)}</span>
              </div>

              <div
                className="d-flex"
                style={{
                  width: "370.25px",
                  gap: "10px",
                  justifyContent: "space-around",
                  marginTop: "20px"
                }}
              >
                <div style={{
                  width: "41px",
                  height: "55px",
                  top: "166px",
                  gap: "3px",
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
                    {selectedRequest.wing}
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
                      margin: "0"
                    }}
                  >
                    {selectedRequest.unit}
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
                      background: badgeStyle(selectedRequest.Priority).backgroundColor,
                      color: badgeStyle(selectedRequest.status).color
                    }}
                  >
                    {selectedRequest.Priority}
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
                      backgroundColor: statusBadgeStyle(selectedRequest.status).backgroundColor,
                      color: statusBadgeStyle(selectedRequest.status).color
                    }}
                  >
                    {selectedRequest.status}
                  </p>
                </div>
              </div>
            </div>
          )}
        </Modal.Body>
      </Modal>


      {/* edit model */}

      <Modal show={showModal} onHide={handleCloseModal}  
       centered  className='square-modal'  > 
        <Modal.Header closeButton>
          <Modal.Title>Edit Request</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {errorMessage && (
            <div className="alert alert-danger">{errorMessage}</div>
          )}
          <Form>
            <Form.Group className='mt-2'>
              <Form.Label>Requester Name<span className="text-danger">*</span></Form.Label>
              <Form.Control
                type="text"
                value={selectedRequest?.Requester_Name || ""}
                onChange={(e) =>
                  setSelectedRequest((prev) => ({
                    ...prev,
                    Requester_Name: e.target.value,
                  }))
                }
              />
            </Form.Group>
            <Form.Group className='mt-2'>
              <Form.Label>Request Name<span className="text-danger">*</span></Form.Label>
              <Form.Control
                type="text"
                value={selectedRequest?.Request_name || ""}
                onChange={(e) =>
                  setSelectedRequest((prev) => ({
                    ...prev,
                    Request_name: e.target.value,
                  }))
                }
              />
            </Form.Group>


            <Form.Group className='mt-2'>
              <Form.Label>Request Date<span className="text-danger">*</span></Form.Label>
              <Form.Control
                type="date"
                value={selectedRequest?.Request_Date || ""}
                onChange={(e) =>
                  setSelectedRequest((prev) => ({
                    ...prev,
                    Request_Date: e.target.value,
                  }))
                }
              />
            </Form.Group>
            <div className='d-flex gap-2'>
              <Form.Group className='mt-2'>
                <Form.Label>Wing</Form.Label>
                <Form.Control
                  type="text"
                  value={selectedRequest?.wing || ""}
                  onChange={(e) =>
                    setSelectedRequest((prev) => ({
                      ...prev,
                      wing: e.target.value,
                    }))
                  }
                />
              </Form.Group>
              <Form.Group className='mt-2'>
                <Form.Label>Unit<span className="text-danger">*</span></Form.Label>
                <Form.Control
                  type="text"
                  value={selectedRequest?.unit || ""}
                  onChange={(e) =>
                    setSelectedRequest((prev) => ({
                      ...prev,
                      unit: e.target.value,
                    }))
                  }
                />
              </Form.Group>
            </div>
            <Form.Group className='mt-2'>
              <Form.Label>Priority<span className="text-danger">*</span></Form.Label>
              <div className="d-flex justify-content-around">
                {["High", "Medium", "Low"].map((Priority) => (
                  <Form.Check
                    type="radio"
                    style={{ border: "1px solid rgba(211, 211, 211, 1)", paddingLeft: "30px", paddingTop: "8px", paddingBottom: "8px", paddingRight: "30px", borderRadius: "5px" }}
                    label={Priority}
                    name="Priority"
                    value={Priority}
                    checked={selectedRequest?.Priority === Priority}
                    onChange={(e) =>
                      setSelectedRequest((prev) => ({
                        ...prev,
                        Priority: e.target.value,
                      }))
                    }
                    key={Priority}
                  />
                ))}
              </div>
            </Form.Group>
            <Form.Group className='mt-2'>
              <Form.Label>Status<span className="text-danger">*</span></Form.Label>
              <div className="d-flex justify-content-around">
                {["Open", "Pending", "Solve"].map((status) => (
                  <Form.Check
                    type="radio"
                    style={{ border: "1px solid rgba(211, 211, 211, 1)", paddingLeft: "30px", paddingTop: "8px", paddingBottom: "8px", paddingRight: "30px", borderRadius: "5px" }}
                    label={status}
                    name="status"
                    value={status}
                    checked={selectedRequest?.status === status}
                    onChange={(e) =>
                      setSelectedRequest((prev) => ({
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
          <Button style={{ width: "175px", height: "51px", border: "1px solid #202224", padding: "10px 55px", background: "#FFFFFF", color: "#202224" }} variant="secondary" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button style={{ width: "175px", height: "51px", padding: "10px 55px", color: "#202224" }} className="mainColor2" onClick={handleSave}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showDeleteRequest} onHide={handleCloseDeleteModal} centered className='square-modal'>
        <Modal.Header closeButton>
          <Modal.Title>Delete Request?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to delete this protocol?</p>
        </Modal.Body>
        <Modal.Footer style={{ display: "flex", justifyContent: "space-between" }}>
          <Button variant="secondary" style={{ width: "175px", height: "51px", border: "1px solid #202224", padding: "10px 55px 10px 55px", background: "#FFFFFF", color: "#202224", }} onClick={handleCloseModal}>
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
