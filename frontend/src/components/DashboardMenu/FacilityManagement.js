import React, { useState } from 'react';
import SideBar from '../Layouts/Sidebar';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BsThreeDotsVertical } from "react-icons/bs";
import { Button, Modal, Form } from 'react-bootstrap';

const FacilityManagement = () => {
  const [facilities, setFacilities] = useState([
    {
      title: "Parking Facilities",
      date: "01/01/2023",
      description: "The celebration of Ganesh Chaturthi involves the installation of clay idols of Ganesa."
    },
    {
      title: "Community Center",
      date: "01/01/2023",
      description: "The celebration of Ganesh Chaturthi involves the installation of clay idols of Ganesa."
    },
    {
      title: "Swimming Pool",
      date: "01/01/2023",
      description: "The celebration of Ganesh Chaturthi involves the installation of clay idols of Ganesa."
    },
    {
      title: "Parks and Green Spaces",
      date: "01/01/2023",
      description: "The celebration of Ganesh Chaturthi involves the installation of clay idols of Ganesa."
    }
  ]);

  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentFacility, setCurrentFacility] = useState(null);
  const [facilityData, setFacilityData] = useState({ title: "", date: "", description: "" });

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => {
    setShowModal(false);
    setIsEditing(false);
    setFacilityData({ title: "", date: "", description: "" });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFacilityData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveFacility = () => {
    if (isEditing) {
      const updatedFacilities = facilities.map((facility, index) =>
        index === currentFacility ? facilityData : facility
      );
      setFacilities(updatedFacilities);
    } else {
      setFacilities((prevFacilities) => [...prevFacilities, facilityData]);
    }
    handleCloseModal();
  };

  const handleEdit = (index) => {
    setCurrentFacility(index);
    setFacilityData(facilities[index]);
    setIsEditing(true);
    handleShowModal();
  };

  return (
    <div className="d-flex flex-column flex-md-row vh-100 main-content">
      <div className="col-12 col-md-3 flex-shrink-0" style={{ maxWidth: "300px" }}>
        <SideBar />
      </div>


      <div className="col p-4 flex-grow-1 d-flex flex-column align-items-center" style={{ borderRadius: "20px", backgroundColor: "#F6F8FB" }}>
      <div className="shadow p-4 rounded" style={{ width: "95%", backgroundColor: "#FFFFFF", borderRadius: "15px", boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)", marginTop: "20px" }}>
        
      <div className="d-flex justify-content-between align-items-center w-100 m-4">
          <h3>Facility Management</h3>
          <Button
            className="text-white mainColor2"
            onClick={() => {
              setIsEditing(false);
              setFacilityData({ title: "", date: "", description: "" });
              handleShowModal();
            }}

            style={{marginRight: "40px"}}
          >
            Create Facility
          </Button>
        </div>

        {/* Main container with shadow/border effect */}
        <div>
          <div className="row m-2">
            {facilities.map((facility, index) => (
              <div className="col-12 col-md-6 col-lg-3 mb-4" key={index}>
                <div className="card">
                  <div className="card-header" style={{ background: "#5678E9", color: "#FFFFFF" }}>
                    {facility.title}
                    <span
                      style={{ float: "right", marginTop: "5px", cursor: "pointer" }}
                      onClick={() => handleEdit(index)}
                    >
                      <BsThreeDotsVertical />
                    </span>
                  </div>
                  <div className="card-body">
                    <p className="card-title" style={{ fontSize: "12px", color: "gray" }}>
                      Upcoming Schedule Service Date: {facility.date}
                    </p>
                    <h5 className="card-title" style={{ fontSize: "15px", color: "gray" }}>Description</h5>
                    <p className="card-text" style={{ fontSize: "13px" }}>{facility.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        </div>

        <Modal show={showModal} onHide={handleCloseModal} centered>
          <Modal.Header closeButton>
            <Modal.Title>{isEditing ? "Edit Facility" : "Create Facility"}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="facilityTitle">
                <Form.Label>Facility Name</Form.Label>
                <Form.Control
                  type="text"
                  name="title"
                  placeholder="Enter Name"
                  value={facilityData.title}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group controlId="facilityDate" className="mt-3">
                <Form.Label>Schedule Service Date</Form.Label>
                <Form.Control
                  type="date"
                  name="date"
                  value={facilityData.date}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group controlId="facilityDescription" className="mt-3">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="description"
                  placeholder="Enter Description"
                  value={facilityData.description}
                  onChange={handleInputChange}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleSaveFacility}>
              Save
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default FacilityManagement;
