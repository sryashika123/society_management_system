import React, { useEffect, useState } from 'react';
import { Button, Modal, Form, Table } from 'react-bootstrap';
import { FaEdit, FaEye, FaPlus, FaTrash } from 'react-icons/fa';
import Sidebar from '../../../component/Layout/Sidebar';
// import Avtar from "../assets/Avatar.png";
import Header from '../../../component/Layout/Navbar';
import Edit from "../../../assets/edit.png"
import View from "../../../assets/view.png"
import Delete from "../../../assets/delete.png"
import axios from 'axios';

export default function SecurityProtocols() {
  const [protocols, setProtocols] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editProtocolId, setEditProtocolId] = useState(null);
  const [deleteProtocolId, setDeleteProtocolId] = useState(null);
  const [protocolData, setProtocolData] = useState({ title: "", description: "", date: "", time: "" });

 // Fetch protocols
 const fetchProtocols = () => {
  axios
    .get(`${process.env.REACT_APP_API_URL}/users/v8/get_security_protocol`)
    .then((response) => setProtocols(response.data))
    .catch((error) => console.error("Error fetching protocols:", error));
};

useEffect(() => {
  fetchProtocols();
}, []);


  const handleShowCreate = () => {
    setIsEdit(false);
    setProtocolData({ title: "", description: "", date: "", time: "" });
    setShowModal(true);
  };

  const handleShowEdit = (protocol) => {
    setIsEdit(true);
    setEditProtocolId(protocol._id);
    setProtocolData(protocol);
    setShowModal(true);
  };

  const handleShowView = (protocol) => {
    setProtocolData(protocol);
    setShowViewModal(true);
  };

  const handleShowDelete = (protocolId) => {
    setDeleteProtocolId(protocolId);
    setShowDeleteModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    setShowViewModal(false);
    setShowDeleteModal(false); // Close the delete confirmation modal when handleClose is called
    setProtocolData({ title: "", description: "", date: "", time: "" });
    setDeleteProtocolId(null); // Clear the ID of the protocol to delete
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProtocolData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    if (isEdit) {
      console.log("Edit Protocol ID:", editProtocolId);
      axios
        .put(`${process.env.REACT_APP_API_URL}/users/v8/update_security_protocol/${editProtocolId}`, protocolData)
        .then(() => {
          console.log("Protocol updated successfully");
          fetchProtocols();
          handleClose();
        })
        .catch((error) => console.error("Error updating protocol:", error));
    } else {
      axios
        .post(`${process.env.REACT_APP_API_URL}/users/v8/create_security_protocol`, protocolData)
        .then(() => {
          console.log("Protocol created successfully");
          fetchProtocols();
          handleClose();
        })
        .catch((error) => console.error("Error creating protocol:", error));
    }
  };
  
  

  const handleDelete = () => {
    axios.delete(`${process.env.REACT_APP_API_URL}/users/v8/delete_security_protocol/${deleteProtocolId}`)
      .then((response) => {
        setProtocols((prevProtocols) =>
          prevProtocols.filter((protocol) => protocol._id !== deleteProtocolId)
        );
        handleClose();
      })
      .catch((error) => console.error("There was an error deleting the protocol!", error));
  };

  return (
    <div className="d-flex flex-column flex-md-row">
      <div className="flex-shrink-0" >
        <Sidebar />
      </div>

      <div className="flex-grow-1 dashboard-bg" style={{ width:"1920px"  }}>
        <Header />
        <div className="container-fluid  p-4" style={{ marginTop: "70px", width: "1620px", marginLeft:"300px" }}>


          {/* Modal for creating or editing a protocol */}
          <Modal show={showModal} onHide={handleClose} centered className='square-modal'>
            <Modal.Header closeButton>
              <Modal.Title>{isEdit ? "Edit Security Protocol" : "Create Security Protocol"}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group controlId="formTitle">
                  <Form.Label>Title<span className="text-danger">*</span></Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Title"
                    name="title"
                    value={protocolData.title}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="formDescription" className="mt-3">
                  <Form.Label>Description<span className="text-danger">*</span></Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Enter Description"
                    name="description"
                    value={protocolData.description}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group className="d-flex gap-3 mt-3">
                  <div className="flex-fill">
                    <Form.Label>Date<span className="text-danger">*</span></Form.Label>
                    <Form.Control
                      type="date"
                      name="date"
                      value={protocolData.date}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="flex-fill">
                    <Form.Label>Time<span className="text-danger">*</span></Form.Label>
                    <Form.Control
                      type="time"
                      name="time"
                      value={protocolData.time}
                      onChange={handleChange}
                      required
                    />
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
                Save
              </Button>
            </Modal.Footer>
          </Modal>


          <Modal show={showDeleteModal} onHide={handleClose} centered className='square-modal'>
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
              <Button onClick={handleDelete} style={{
                width: "175px", height: "51px", border: "1px", padding: "10px 55px 10px 55px", color: "#202224", background: "rgba(231, 76, 60, 1)"
              }}>
                Delete
              </Button>

            </Modal.Footer>
          </Modal>
          {/* View-only modal for displaying protocol details */}
          <Modal show={showViewModal} onHide={handleClose} centered className='square-modal'>
            <Modal.Header closeButton>
              <Modal.Title>View Security Protocols</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p>Title<br />
                <strong style={{
                  fontSize: "16px",
                  fontWeight: "600",
                  lineHeight: "24px",
                  textAlign: "left",
                  textUnderlinePosition: "from-font",
                  textDecorationSkipInk: "none",
                  color: "black",
                }}>
                  {protocolData.title}
                </strong>

              </p>
              <p> Description<br />
                <strong style={{
                  fontSize: "16px",
                  fontWeight: "600",
                  lineHeight: "24px",
                  textAlign: "left",
                  textUnderlinePosition: "from-font",
                  textDecorationSkipInk: "none",
                  color: "black",
                }}>{protocolData.description}</strong>
              </p>
              <div className="d-flex" style={{ gap: "70px" }}>
                <div>
                  <p>Date</p>
                  <strong style={{

                    fontSize: "16px",
                    fontWeight: "600",
                    lineHeight: "24px",
                    textAlign: "left",
                    textUnderlinePosition: "from-font",
                    textDecorationSkipInk: "none",
                    color: "black",
                  }}> {new Date(protocolData.date).toLocaleDateString('en-GB')}</strong>
                </div>
                <div>
                  <p>Time</p>
                  <strong style={{
                    fontSize: "16px",
                    fontWeight: "600",
                    lineHeight: "24px",
                    textAlign: "left",
                    textUnderlinePosition: "from-font",
                    textDecorationSkipInk: "none",
                    color: "black",
                  }}>{protocolData.time}</strong>
                </div>
              </div>
            </Modal.Body>

          </Modal>

          <div className="table-responsive"
            style={{
              border: "1px solid #ddd",
              borderRadius: "8px",
              boxShadow: "0px 0px 15px rgba(0, 0, 0, 0.1)",
              overflow: "hidden",
              backgroundColor: "#fff",
              padding: "20px",
              marginTop: "20px",
            }}>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h4 className="mb-0">Security Protocols</h4>
              <Button className="btn mainColor2 d-flex align-items-center justify-content-center" onClick={handleShowCreate}
                style={{ border: 'none' }}><FaPlus
                  style={{
                    fontSize: "18px",
                    borderRadius: "5px",
                    background: "rgba(255, 255, 255, 1)",
                    color: "#FE512E",
                    marginRight: "8px",
                  }}
                />Create Protocols</Button>
            </div>
            <Table hover responsive style={{ width: "1520px" }}>
              <thead style={{ background: "#5678E9", color: "#ffffff" }}>
                <tr className="text-start">
                  <th style={{ background: "rgb(185, 198, 242)", width: "280px" }}>Title</th>
                  <th style={{ background: "rgb(185, 198, 242)", width: "350px" }} className="text-start">Description</th>
                  <th style={{ background: "rgb(185, 198, 242)" }} className="text-center">Date</th>
                  <th style={{ background: "rgb(185, 198, 242)" }} className="text-center">Time</th>
                  <th style={{ background: "rgb(185, 198, 242)" }} className="text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {protocols.map((protocol) => (
                  <tr key={protocol.id} className="text-start">
                    <td style={{ padding: "15px" }}>
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "start" }}>
                        {protocol.title}
                      </div>
                    </td>
                    <td style={{ verticalAlign: "middle", width: "300px" }}>{protocol.description}</td>
                    <td style={{ verticalAlign: "middle" }} className="text-center"> {new Date(protocol.date).toLocaleDateString('en-GB')}</td>
                    <td style={{ verticalAlign: "middle" }} className="text-center">
                      <div className="d-flex align-items-center justify-content-center gap-2">
                        <div
                          style={{
                            width: "100px",
                            height: "34px",
                            padding: "5px 15px",
                            gap: "10px",
                            borderRadius: "50px",
                            background: "#F6F8FB",
                            color: "#4F4F4F",
                            display: "inline-block",
                          }}
                        >
                          {protocol.time}
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: "15px", textAlign: "center", verticalAlign: "middle" }}>
                      <div className="d-flex align-items-center justify-content-center">
                        <img src={Edit}
                          className="text-success me-2"
                          style={{ cursor: "pointer" }}
                          onClick={() => handleShowEdit(protocol)}
                        />
                        <img src={View}
                          className="text-primary me-2"
                          style={{ cursor: "pointer" }}
                          onClick={() => handleShowView(protocol)}
                        />
                        <img src={Delete} className="text-danger" style={{ cursor: "pointer" }} onClick={() => handleShowDelete(protocol._id)} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
}
