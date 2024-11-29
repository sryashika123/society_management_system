import React, { useEffect, useState } from 'react'
import Navbar from '../Layout/Navbar'
import { CiImageOn } from "react-icons/ci";
import { BiSolidFilePdf } from "react-icons/bi";
import { useForm } from 'react-hook-form';
import { Button, Modal, Form } from 'react-bootstrap';
import { FaPlusSquare } from "react-icons/fa";
import Edit from '../../assets/edit.png';
import View from '../../assets/view.png';
import Delete from '../../assets/delete.png';
import { LuImagePlus } from 'react-icons/lu';
import axios from 'axios';

export default function FinancialManagementExp() {

  const [showViewModal, setShowViewModal] = useState(false);
  const [viewComplaint, setViewComplaint] = useState(null);
  const [exp, setExp] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null);
  const [show, setShow] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  useEffect(() => {
    fetchExpenses(); // Fetch expenses on component load
  }, []);

  // Fetch expenses from the backend
  const fetchExpenses = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/users/v12/ViewExpenses`);
      console.log(response.data); // Log the response to confirm its structure
      setExp(response.data.expenses || []); // Replace 'expenses' with the correct key, if applicable
    } catch (error) {
      console.error("Error fetching expenses", error);
    }
  };


  // Show view modal
  const handleShowViewModal = (index) => {
    setViewComplaint(exp[index]);
    setShowViewModal(true);
  };

  const handleCloseViewModal = () => setShowViewModal(false);

  // Show delete modal
  const handleShowDeleteModal = (index) => {
    setDeleteIndex(index);
    setShowDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
    setDeleteIndex(null);
  };

  // Confirm delete expense
  const confirmDelete = async () => {
    if (deleteIndex !== null) {
      try {
        await axios.delete(`http://localhost:8000/api/users/v12/deleteExpenses/${exp[deleteIndex]._id}`);
        setExp(exp.filter((_, i) => i !== deleteIndex)); // Remove from state
        handleCloseDeleteModal();
      } catch (error) {
        console.error("Error deleting expense", error);
      }
    }
  };

  // Show add/edit modal
  const handleShow = () => setShow(true);
  const handleClose = () => {
    setShow(false);
    reset();
    setEditIndex(null);
  };

  // Submit form for adding or updating expense
  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("Title", data.Title);
    formData.append("description", data.description);
    formData.append("date", data.date);
    formData.append("amount", data.amount);

    // Safely check if Bill_image is defined and contains a file
    if (data.Bill_image && data.Bill_image.length > 0) {
      formData.append("Bill_image", data.Bill_image[0]); // Add only if a file is present
    }
    try {
      if (editIndex !== null) {
        await axios.put(`http://localhost:8000/api/users/v12/updateExpenses/${exp[editIndex]._id}`, formData);
      } else {
        await axios.post(`http://localhost:8000/api/users/v12/createExpenses`, formData);
      }
      fetchExpenses(); // Refresh expenses
      handleClose();   // Close modal
    } catch (error) {
      console.error("Error saving expense", error);
    }
  };


  // Handle edit expense
  const handleEdit = (index) => {
    const expenseToEdit = exp[index];
    setEditIndex(index);
    setShow(true);
    reset({
      Title: expenseToEdit.Title,
      description: expenseToEdit.description,
      date: expenseToEdit.date,
      amount: expenseToEdit.amount,
      Bill_image: expenseToEdit.Bill_image ? [expenseToEdit.Bill_image] : [], // Ensure it's an array
    });
  };

  const handleFileChange = (e, field) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setExp((prevState) => ({
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
      setExp((prevState) => ({
        ...prevState,
        [field]: { file, preview: null },
      }));
    }
  };

  const formatDate = (date) => {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, '0'); // Ensures two digits for day
    const month = String(d.getMonth() + 1).padStart(2, '0'); // getMonth() is 0-based
    const year = d.getFullYear();

    return `${day}-${month}-${year}`;
  };

  return (
    <div className='dashboard-bg' style={{ width: "1920px", }}>
      <Navbar />
      <div style={{ marginLeft: "300px", }}>
        <div className='container-fluid income'>

          <div className='row p-5' style={{ marginTop: "109px" }}>
            <div className='p-0'>
              <div className="table-responsive rounded pb-3">

                <div className='bg-light'>
                  <div className='d-flex justify-content-between align-items-center  py-3 px-2'>
                    <h3 className=' mb-0  financial-income-title'>Add Expenses Details</h3>

                    <div>
                      <button className='set-maintainance-btn d-flex align-items-center' onClick={handleShow}> <FaPlusSquare className='me-2' /> Add New Expenses details</button>
                    </div>
                  </div>

                  <div className='px-3 financial-maintainance-table '>
                    <table className="table">

                      <thead className='table-primary '>
                        <tr style={{ height: '55px' }}>
                          <th scope="col">Title</th>
                          <th scope="col">Description</th>
                          <th scope="col" className='text-start'>Date</th>
                          <th scope="col">Amount</th>
                          <th scope="col">Bill Format</th>
                          <th scope="col" className='text-start'>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {Array.isArray(exp) && exp.length > 0 ? (
                          exp.map((val, index) => (
                            <tr key={index} className="bg-light">
                              <td>{val.Title}</td>
                              <td>{val.description}</td>
                              <td>{formatDate(val.date)}</td>
                              <td>{val.amount}</td>
                              <td>
                                {val.Bill_image === "JPG" ? (
                                  <CiImageOn className="me-1 jpg-btn" style={{ fontSize: "20px" }} />
                                ) : (
                                  <BiSolidFilePdf className="me-1 pdf-btn" style={{ fontSize: "20px" }} />
                                )}
                                {val.Bill_image}
                              </td>
                              <td className="d-flex">
                                <button className="border-0 bg-light" onClick={() => handleEdit(index)}>
                                  <img src={Edit} className="edit-btn" />
                                </button>
                                <button className="border-0 bg-light" onClick={() => handleShowViewModal(index)}>
                                  <img src={View} className="view-btn" />
                                </button>
                                <button className="border-0 bg-light" onClick={() => handleShowDeleteModal(index)}>
                                  <img src={Delete} className="delete-btn" />
                                </button>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="6" className="text-center">No Expenses Found</td>
                          </tr>
                        )}
                      </tbody>

                    </table>
                  </div>
                </div>

                {/* Add/Edit Modal */}
                <Modal show={show} onHide={handleClose} centered className="custom-modal">
                  <Modal.Header>
                    <Modal.Title className='Modal-Title'>
                      {editIndex !== null ? 'Edit Expense Details' : 'Add Expense Details'}
                    </Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <Form onSubmit={handleSubmit(onSubmit)}>
                      <Form.Group className="mb-3" controlId="formTitle">
                        <Form.Label className='Form-Label'>Title<span className="text-danger"> *</span></Form.Label>
                        <Form.Control
                          className='Form-Control'
                          type="text"
                          placeholder="Enter Title"
                          {...register('Title', { required: "Title is required" })}
                          isInvalid={errors.Title}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.title?.message}
                        </Form.Control.Feedback>
                      </Form.Group>

                      <Form.Group className="mb-3" controlId="formDescription">
                        <Form.Label className='Form-Label'>Description<span className="text-danger"> *</span></Form.Label>
                        <Form.Control
                          className='Form-Control'
                          type="text"
                          placeholder="Enter Description"
                          {...register('description', { required: "Description is required" })}
                          isInvalid={errors.description}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.description?.message}
                        </Form.Control.Feedback>
                      </Form.Group>

                      <Form.Group className="mb-3" controlId="formDate">
                        <Form.Label className='Form-Label'>Date<span className="text-danger"> *</span></Form.Label>
                        <Form.Control
                          className='Form-Control'
                          type="date"
                          {...register('date', { required: "Date is required" })}
                          isInvalid={errors.date}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.date?.message}
                        </Form.Control.Feedback>
                      </Form.Group>

                      <Form.Group className="mb-3" controlId="formAmount">
                        <Form.Label className='Form-Label'>Amount<span className="text-danger"> *</span></Form.Label>
                        <Form.Control
                          className='Form-Control'
                          type="number"
                          placeholder="Enter Amount"
                          {...register('amount', { required: "Amount is required" })}
                          isInvalid={errors.amount}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.amount?.message}
                        </Form.Control.Feedback>
                      </Form.Group>


                      {/* Aadhaar Card Upload Section */}
                      <Form.Group controlId="formAadhaar" className=" mt-4">
                        <Form.Label>Upload Bill<span className="text-danger">*</span></Form.Label>
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
                          {exp.aadhaar && (
                            <div style={{ marginTop: '15px', textAlign: 'center' }}>
                              {exp.aadhaar.preview && exp.aadhaar.file.type.startsWith('image/') ? (
                                <img
                                  src={exp.aadhaar.preview}
                                  alt="Aadhaar Preview"
                                  style={{ width: '80px', height: '80px', borderRadius: '8px', objectFit: 'cover' }}
                                />
                              ) : (
                                <div>{exp.aadhaar.file.name}</div>
                              )}
                            </div>
                          )}
                        </div>
                      </Form.Group>

                      {/* <Form.Group className="mb-3" controlId="formBillImage">
                        <Form.Label className='Form-Label'>Bill Image<span className="text-danger"> *</span></Form.Label>
                        <Form.Control
                          className='Form-Control'
                          type="file"
                          accept="image/*,.pdf"
                          {...register('Bill_image', { required: "Bill image is required" })}
                          isInvalid={errors.Bill_image}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.Bill_image?.message}
                        </Form.Control.Feedback>
                      </Form.Group> */}

                      <div className="d-flex justify-content-end mt-3">
                        <Button variant="secondary" onClick={handleClose} className="me-3">Close</Button>
                        <Button variant="primary" type="submit">{editIndex !== null ? 'Update Expense' : 'Add Expense'}</Button>
                      </div>
                    </Form>
                  </Modal.Body>
                </Modal>

                {/* Delete Modal */}
                <Modal show={showDeleteModal} onHide={handleCloseDeleteModal} centered>
                  <Modal.Header>
                    <Modal.Title>Confirm Deletion</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>Are you sure you want to delete this expense?</Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseDeleteModal}>Cancel</Button>
                    <Button variant="danger" onClick={confirmDelete}>Delete</Button>
                  </Modal.Footer>
                </Modal>

                {/* View Modal */}
                <Modal show={showViewModal} onHide={handleCloseViewModal} centered>
                  <Modal.Header>
                    <Modal.Title>View Expense Details</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    {viewComplaint && (
                      <div>
                        <p><strong>Title:</strong> {viewComplaint.Title}</p>
                        <p><strong>Description:</strong> {viewComplaint.description}</p>
                        <p><strong>Date:</strong>{formatDate(viewComplaint.date)}</p>
                        <p><strong>Amount:</strong> {viewComplaint.amount}</p>
                        <p><strong>Bill Image:</strong> {viewComplaint.Bill_image}</p>
                      </div>
                    )}
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseViewModal}>Close</Button>
                  </Modal.Footer>
                </Modal>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
