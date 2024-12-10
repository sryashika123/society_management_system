import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Card, Button, Modal, Form } from "react-bootstrap";
import { BsThreeDotsVertical } from "react-icons/bs";
import Sidebar from "../../../component/Layout/Sidebar";
import { FaPlus } from "react-icons/fa";
import Header from "../../../component/Layout/Navbar";
import axios from "axios";

const FacilityCard = ({ title, Service_date, description, onEdit }) => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className="col-12 col-md-6 col-lg-3 mb-4 position-relative">
      <Card className="shadow-sm h-100">
        <Card.Header
          className="text-white d-flex justify-content-between align-items-center"
          style={{ background: "#5678E9" }}
        >
          {title}
          <BsThreeDotsVertical
            onClick={() => setShowMenu(!showMenu)}
            style={{ cursor: "pointer" }}
          />
        </Card.Header>
        <Card.Body>
          <p className="card-text" style={{ fontSize: "13px", color: "gray" }}>
            <strong>Upcoming Schedule Service Date:</strong> {new Date(Service_date).toLocaleDateString("en-GB")}
          </p>

          <h5 className="card-title" style={{ fontSize: "15px", color: "gray" }}>
            Description
          </h5>
          <p className="card-text" style={{ fontSize: "13px" }}>{description}</p>
        </Card.Body>

        {showMenu && (
          <div
            className="position-absolute bg-white border rounded shadow-sm p-2"
            style={{
              top: "40px",
              right: "10px",
              zIndex: 10,
            }}
            onClick={() => setShowMenu(false)}
          >
            <div
              className="dropdown-item"
              onClick={onEdit}
              style={{ cursor: "pointer" }}
            >
              Edit
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};

const FacilityManagement = () => {
  const [facilities, setFacilities] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [facilityData, setFacilityData] = useState({
    Name: "",
    Service_date: "",
    description: "",
    Remind_before: "",
  });
  const [validationError, setValidationError] = useState("");

  useEffect(() => {
    loadFacilities();
  }, []);

  const loadFacilities = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/users/v14/getFacility`);
      setFacilities(response.data);
    } catch (error) {
      console.error("Error fetching facilities:", error);
    }
  };

  const handleSave = async () => {
    const { Name, Service_date, description, Remind_before } = facilityData;

    if (!Name || !Service_date || !description || !Remind_before) {
      setValidationError("All fields are required.");
      return;
    }

    try {
      if (isEditing) {
        const id = facilities[editIndex]._id;
        await axios.put(
          `${process.env.REACT_APP_API_URL}/users/v14/updateFacility/${id}`,
          facilityData
        );
      } else {
        await axios.post(`${process.env.REACT_APP_API_URL}/users/v14/createFacility`, facilityData);
      }
      loadFacilities();
      handleCloseModal();
    } catch (error) {
      console.error("Error saving facility:", error);
    }
  };

  const handleEdit = (index) => {
    setFacilityData(facilities[index]);
    setEditIndex(index);
    setIsEditing(true);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setFacilityData({ Name: "", Service_date: "", description: "", Remind_before: "" });
    setIsEditing(false);
    setEditIndex(null);
    setValidationError("");
  };

  return (
    <div className="d-flex flex-column flex-md-row">
      <div className="flex-shrink-0">
        <Sidebar />
      </div>
      <div className="dashboard-bg" style={{ width: "1920px" }}>
        <Header />
        <div
          className="container-fluid bg-white rounded shadow-sm p-4"
          style={{ marginTop: "120px", width: "1550px", marginLeft: "330px" }}
        >
          <div className="d-flex" style={{ justifyContent: "space-between" }}>
            <h3>Facility Management</h3>
            <Button
              className="text-white mainColor2"
              onClick={() => {
                setIsEditing(false);
                setShowModal(true);
              }}
              style={{ border: "none" }}
            >
              <FaPlus
                style={{
                  fontSize: "18px",
                  borderRadius: "5px",
                  background: "rgba(255, 255, 255, 1)",
                  color: "#FE512E",
                  marginRight: "8px",
                }}
              />
              Create Facility
            </Button>
          </div>

          <div className="row mt-3">
            {facilities.map((facility, index) => (
              <FacilityCard
                key={index}
                title={facility.Name}
                Service_date={facility.Service_date}
                description={facility.description}
                onEdit={() => handleEdit(index)}
              />
            ))}
          </div>
        </div>

        <Modal show={showModal} onHide={handleCloseModal} centered className="square-modal">
          <Modal.Header closeButton>
            <Modal.Title>{isEditing ? "Edit Facility" : "Create Facility"}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="facilityName">
                <Form.Label>
                  Facility Name<span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Name"
                  value={facilityData.Name}
                  onChange={(e) =>
                    setFacilityData({ ...facilityData, Name: e.target.value })
                  }
                />
              </Form.Group>
              <Form.Group controlId="facilityDescription" className="mt-3">
                <Form.Label>
                  Description<span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Enter Description"
                  value={facilityData.description}
                  onChange={(e) =>
                    setFacilityData({ ...facilityData, description: e.target.value })
                  }
                />
              </Form.Group>
              <Form.Group controlId="facilityDate" className="mt-3">
                <Form.Label>Schedule Service Date</Form.Label>
                <Form.Control
                  type="date"
                  value={facilityData.Service_date}
                  onChange={(e) =>
                    setFacilityData({ ...facilityData, Service_date: e.target.value })
                  }
                />
              </Form.Group>
              <Form.Group controlId="reminderBefore" className="mt-3">
                <Form.Label>Reminder Before (in days)</Form.Label>
                <Form.Control
                  type="number"
                  value={facilityData.Remind_before}
                  onChange={(e) =>
                    setFacilityData({ ...facilityData, Remind_before: e.target.value })
                  }
                  min="1"
                />
                {validationError && (
                  <div className="text-danger mt-2">{validationError}</div>
                )}
              </Form.Group>
            </Form>
          </Modal.Body>
     
            <div className="px-3 pb-3 d-flex justify-content-between">
              <button type="button" className="btn btn-sm cancle" onClick={handleCloseModal}>Cancel</button>
              <button type="submit" className="btn btn-sm save" onClick={handleSave}>Save</button>
            </div>
          
        </Modal>
      </div>
    </div>
  );
};

export default FacilityManagement;
