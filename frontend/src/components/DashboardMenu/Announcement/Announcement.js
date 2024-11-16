import React, { useState, useEffect, useRef } from 'react';
import SideBar from '../../Layouts/Sidebar';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BsThreeDotsVertical } from "react-icons/bs";
import { Button, Modal, Form } from 'react-bootstrap';

const FacilityManagement = () => {
  const [facilities, setFacilities] = useState([
    {
      title: "Community Initiatives",
      date: "01/01/2023",
      Time: "10:15 AM",
      description: "The celebration of Ganesh Chaturthi involves the installation of clay idols of Ganesa."
    },
    {
      title: "Community Initiatives",
      date: "01/01/2023",
      Time: "10:15 AM",
      description: "The celebration of Ganesh Chaturthi involves the installation of clay idols of Ganesa."
    },
    {
      title: "Community Initiatives",
      date: "01/01/2023",
      Time: "10:15 AM",
      description: "The celebration of Ganesh Chaturthi involves the installation of clay idols of Ganesa."
    },
    {
      title: "Community Initiatives",
      date: "01/01/2023",
      Time: "10:15 AM",
      description: "The celebration of Ganesh Chaturthi involves the installation of clay idols of Ganesa."
    },
    {
      title: "Community Initiatives",
      date: "01/01/2023",
      Time: "10:15 AM",
      description: "The celebration of Ganesh Chaturthi involves the installation of clay idols of Ganesa."
    },
    {
      title: "Community Initiatives",
      date: "01/01/2023",
      Time: "10:15 AM",
      description: "The celebration of Ganesh Chaturthi involves the installation of clay idols of Ganesa."
    },
    // Additional facilities can be added here
  ]);

  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isViewing, setIsViewing] = useState(false);
  const [currentFacility, setCurrentFacility] = useState(null);
  const [facilityData, setFacilityData] = useState({ title: "", date: "", description: "" });
  const [dropdownOpenIndex, setDropdownOpenIndex] = useState(null); // Track the open dropdown menu index
  const dropdownRef = useRef(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null);

  const handleShowModal = () => setShowModal(true);

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
      const updatedNotes = facilities.filter((_, i) => i !== deleteIndex);
      setFacilities(updatedNotes);
    }
    handleCloseDeleteModal();
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setIsEditing(false);
    setIsViewing(false);
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

  const handleView = (index) => {
    setCurrentFacility(index);
    setFacilityData(facilities[index]);
    setIsViewing(true);
    handleShowModal();
  };



  const toggleDropdown = (index) => {
    setDropdownOpenIndex(dropdownOpenIndex === index ? null : index);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownOpenIndex(null);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="d-flex flex-column flex-md-row vh-100 main-content">
      <div className="col-12 col-md-3 flex-shrink-0" style={{ maxWidth: "300px" }}>
        <SideBar />
      </div>

      <div className="col p-4 flex-grow-1 d-flex flex-column align-items-center" style={{ borderRadius: "20px", backgroundColor: "#F6F8FB" }}>
        <div className="shadow p-4 rounded" style={{ width: "95%", backgroundColor: "#FFFFFF", borderRadius: "15px", boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)", marginTop: "20px" }}>
          <div className="d-flex justify-content-between align-items-center w-100 m-4">
            <h3 >Announcement</h3>
            <Button
              className="text-white mainColor2"
              onClick={() => {
                setIsEditing(false);
                setFacilityData({ title: "", date: "", description: "" });
                handleShowModal();
              }}
              style={{ marginRight: "40px", border: 'none' }}
            >
              Create Announcement
            </Button>
          </div>

          <div >
            <div className="row m-2">
              {facilities.map((facility, index) => (
                <div className="col-12 col-md-6 col-lg-3 mb-4" key={index}>
                  <div className="card">
                    <div className="card-header" style={{ background: "#5678E9", color: "#FFFFFF", position: "relative" }}>
                      {facility.title}
                      <span
                        onClick={() => toggleDropdown(index)}
                        style={{ float: "right", cursor: "pointer" }}
                      >
                        <BsThreeDotsVertical className='mt-1' />
                      </span>
                      {dropdownOpenIndex === index && (
                        <div
                          ref={dropdownRef}
                          className="dropdown-menu show"
                          style={{
                            position: "absolute",
                            top: "100%",
                            right: 0,
                            boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)"
                          }}
                        >
                          <button className="dropdown-item" onClick={() => handleView(index)}>View</button>
                          <button className="dropdown-item" onClick={() => handleEdit(index)}>Edit</button>
                          <button className="dropdown-item" onClick={() => handleShowDeleteModal(index)}>Delete</button>
                        </div>
                      )}
                    </div>
                    <div className="card-body">
                      <p className="card-title" style={{ fontSize: "12px" }}>
                        Announcement Date: <span className="float-end" style={{ fontWeight: "bold" }}>{facility.date}</span>
                      </p>
                      <p className="card-title" style={{ fontSize: "12px" }}>
                        Announcement Time: <span className="float-end" style={{ fontWeight: "bold" }}>{facility.Time}</span>
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

        <Modal show={showModal} onHide={handleCloseModal} centered className='square-modal'>
          <Modal.Header closeButton style={{ borderBottom: "none" }}>
            <Modal.Title>{isEditing ? "Edit Facility" : isViewing ? "View Facility" : "Create Facility"}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form style={{ color: '#202224', fontWeight: '500' }}>
              <Form.Group controlId="facilityTitle">
                <Form.Label>Facility Name</Form.Label>
                <Form.Control
                  type="text"
                  name="title"
                  placeholder="Enter Name"
                  value={facilityData.title}
                  onChange={handleInputChange}
                  disabled={isViewing}
                />
              </Form.Group>
              <Form.Group controlId="facilityDescription" className="mt-3">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={2}
                  name="description"
                  placeholder="Enter Description"
                  value={facilityData.description}
                  onChange={handleInputChange}
                  disabled={isViewing}
                />
              </Form.Group>

              <div className='d-flex ' style={{ justifyContent: "space-between" }}>
                <Form.Group controlId="facilityDate" className="mt-3 col-5" >
                  <Form.Label>Announcement Date</Form.Label>
                  <Form.Control
                    type="date"
                    name="date"
                    value={facilityData.date}
                    onChange={handleInputChange}
                    disabled={isViewing}
                  />
                </Form.Group>
                <Form.Group controlId="formTime" className="mt-3 col-5">
                  <Form.Label>Announcement Time</Form.Label>
                  <Form.Control
                    type="time"
                    name="time"
                    value={facilityData.Time}
                    onChange={handleInputChange}
                    disabled={isViewing}
                  />
                </Form.Group>
              </div>

            </Form>
          </Modal.Body>
          <div className="d-flex justify-content-between">
            <button type="button" className="btn btn-outline-secondary"
              style={{ width: '45%', borderRadius: '10px', paddingTop: '10px', paddingBottom: '10px', marginBottom: '15px', marginLeft: '15px' }}
            >
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
              onClick={handleSaveFacility}
            >
              Save
            </button>
          </div>
        </Modal>

        <Modal className='custom-modal' show={showDeleteModal} onHide={handleCloseDeleteModal} centered>

          <Modal.Title className='Modal-Title px-3 pt-3'>Delete Number?</Modal.Title>

          <Modal.Body>
            <p className='Form-p mb-0'>Are you sure you want to delete this Security?</p>
          </Modal.Body>

          <div className="d-flex justify-content-between">
            <button type="button" className="btn btn-outline-secondary"
              style={{ width: '45%', borderRadius: '10px', paddingTop: '10px', paddingBottom: '10px', marginBottom: '15px', marginLeft: '15px' }}
              onClick={handleShowDeleteModal}>
              Cancel
            </button>
            <button
              type="submit"
              className="btn"
              style={{
                background: 'rgba(231, 76, 60, 1)',
                color: 'White',
                width: '45%',
                borderRadius: '10px',
                marginBottom: '15px',
                marginRight: '15px',
                paddingTop: '10px',
                paddingBottom: '10px',
              }}
              data-bs-dismiss="modal"
              onClick={confirmDelete}
            >
              Delete
            </button>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default FacilityManagement;
