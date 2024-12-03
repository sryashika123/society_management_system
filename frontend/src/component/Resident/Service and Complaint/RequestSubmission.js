import React, { useState } from "react";
import Sidebar from "../../Layout/Sidebar";
import Navbar from "../../Layout/Navbar";
import { Link } from "react-router-dom";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Modal, Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";

const RequestSubmission = () => {
  const [note, setNote] = useState([
    { id: 1, title: "Unethical Behavior", des: "Issues with staff behavior.", date: "01/07/2024", status: "Open" },
    { id: 2, title: "Preventive Measures", des: "Suggestions for security measures.", date: "02/07/2024", status: "In Progress" },
  ]);

  const [show, setShow] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [dropdownIndex, setDropdownIndex] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null);

  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm();

  // Modal handlers
  const handleClose = () => {
    setShow(false);
    reset();
    setEditIndex(null);
  };

  const handleShow = () => setShow(true);

  const handleDropdownToggle = (index) => {
    setDropdownIndex(dropdownIndex === index ? null : index);
  };

  const handleShowDeleteModal = (index) => {
    setDeleteIndex(index);
    setShowDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
    setDeleteIndex(null);
  };

  // Handle add/edit submission
  const onSubmit = (data) => {
    if (editIndex !== null) {
      const updatedNotes = [...note];
      updatedNotes[editIndex] = { ...updatedNotes[editIndex], ...data };
      setNote(updatedNotes);
    } else {
      setNote([...note, { id: note.length + 1, ...data, status: "Open" }]);
    }
    handleClose();
  };

  // Handle edit
  const handleEdit = (index) => {
    setEditIndex(index);
    const noteToEdit = note[index];
    setValue("title", noteToEdit.title);
    setValue("des", noteToEdit.des);
    setValue("date", noteToEdit.date);
    handleShow();
  };

  // Handle delete
  const confirmDelete = () => {
    if (deleteIndex !== null) {
      const updatedNotes = note.filter((_, i) => i !== deleteIndex);
      setNote(updatedNotes);
    }
    handleCloseDeleteModal();
  };

  return (
    <div className="dashboard-bg w-100">
      <Sidebar />
      <Navbar />
      <div style={{ marginLeft: "300px" }}>
        <div className="container-fluid" style={{ marginTop: "109px", width:"1620px" }}>
          <div className="row p-4">
            <div className="table-responsive rounded pb-3">
              <Link
                to="/home/service-and-complaint"
                className="btn btn-sm maintainance-income-btn complaint-btn maintainance-income-btn-withoutbg ms-3"
              >
                Complaint Submission
              </Link>
              <Link
                to="/home/request-and-submission"
                className="btn btn-sm maintainance-income-btn complaint-btn maintainance-income-btn-bg"
              >
                Request Submission
              </Link>
              <div className="container-fluid mx-0">
                <div className="row p-3 py-0 overflow-hidden">
                  <div className="p-0 bg-light">
                    <div className="d-flex justify-content-between align-items-center pb-3 px-3 pt-3">
                      <h3 className="mb-0 financial-income-title">Request</h3>
                      <button
                        className="set-maintainance-btn d-flex align-items-center p-2"
                        onClick={handleShow}
                      >
                        Create Request
                      </button>
                    </div>

                    <div className="row px-3">
                      {note.map((val, index) => (
                        <div
                          className="col-12 col-sm-6 col-md-4 col-lg-3 mb-3 d-flex align-items-stretch"
                          key={val.id}
                        >
                          <div className="card w-100 h-100 shadow-sm border-0 rounded">
                            <div
                              className="card-header text-light d-flex justify-content-between align-items-center py-3"
                              style={{ backgroundColor: "rgba(86, 120, 233, 1)" }}
                            >
                              {val.title}
                              <div className="position-relative">
                                <button
                                  className="btn btn-light p-0"
                                  onClick={() => handleDropdownToggle(index)}
                                  style={{
                                    width: "30px",
                                    height: "30px",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                  }}
                                >
                                  <BsThreeDotsVertical />
                                </button>
                                {dropdownIndex === index && (
                                  <div
                                    className="dropdown-menu show position-absolute"
                                    style={{
                                      right: 0,
                                      top: "100%",
                                      zIndex: 10,
                                    }}
                                  >
                                    <button
                                      className="dropdown-item pt-0"
                                      onClick={() => handleEdit(index)}
                                    >
                                      Edit
                                    </button>
                                    <button
                                      className="dropdown-item pt-0"
                                      onClick={() => handleShowDeleteModal(index)}
                                    >
                                      Delete
                                    </button>
                                  </div>
                                )}
                              </div>
                            </div>
                            <div className="card-body">
                              <div className="d-flex justify-content-between align-items-center mb-2">
                                <h6 className="card-body-title mb-0 fw-medium">Request Date</h6>
                                <span className="card-body-title mb-0 fw-medium text-dark">
                                  {val.date}
                                </span>
                              </div>
                              <div className="d-flex justify-content-between align-items-center mb-2">
                                <h6 className="card-body-title mb-0 fw-medium">Status</h6>
                                <span className="card-body-title card-body-button mb-0 fw-medium">
                                  {val.status}
                                </span>
                              </div>
                              <h6 className="card-des-title fw-medium">Description</h6>
                              <p className="card-body-title text-dark fw-medium mb-0">{val.des}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Add/Edit Modal */}
          <Modal show={show} onHide={handleClose} centered className="custom-modal">
            <Modal.Header closeButton>
              <Modal.Title>{editIndex !== null ? "Edit Request" : "Create Request"}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group controlId="title" className="mb-3">
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter title"
                    {...register("title", { required: true })}
                    isInvalid={errors.title}
                  />
                  <Form.Control.Feedback type="invalid">Title is required.</Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="des" className="mb-3">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Enter description"
                    {...register("des", { required: true })}
                    isInvalid={errors.des}
                  />
                  <Form.Control.Feedback type="invalid">Description is required.</Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="date" className="mb-3">
                  <Form.Label>Date</Form.Label>
                  <Form.Control
                    type="date"
                    {...register("date", { required: true })}
                    isInvalid={errors.date}
                  />
                  <Form.Control.Feedback type="invalid">Date is required.</Form.Control.Feedback>
                </Form.Group>
                <div className="d-flex justify-content-between">
                  <Button variant="secondary" onClick={handleClose} className="btn mt-2 btn-sm cancle">
                    Cancel
                  </Button>
                  <Button variant="primary" type="submit" className="btn btn-sm save mt-2">
                    {editIndex !== null ? "Save " : "Create"}
                  </Button>
                </div>
              </Form>
            </Modal.Body>
          </Modal>

          {/* Delete Confirmation Modal */}
          <Modal
            className="custom-modal"
            show={showDeleteModal}
            onHide={handleCloseDeleteModal}
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title>Confirm Delete</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Are you sure you want to delete this request?
            </Modal.Body>
            <Modal.Footer className='d-flex justify-content-between'>
                            <Button variant="secondary" className='btn cancle  mt-2' onClick={handleCloseDeleteModal}>Cancel</Button>
                            <Button variant="danger" className='btn delete' onClick={confirmDelete}>Delete</Button>
                        </Modal.Footer>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default RequestSubmission;
