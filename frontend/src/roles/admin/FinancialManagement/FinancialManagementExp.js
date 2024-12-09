import React, { useCallback, useEffect, useState } from 'react';
import Navbar from '../../../component/Layout/Navbar';
import { CiImageOn } from "react-icons/ci";
import { BiSolidFilePdf } from "react-icons/bi";
import { useForm } from 'react-hook-form';
import { Button, Modal, Form } from 'react-bootstrap';
import { FaPlusSquare } from "react-icons/fa";
import Edit from '../../../assets/edit.png';
import View from '../../../assets/view.png';
import Delete from '../../../assets/delete.png';
import axios from 'axios';
import { LuImagePlus } from 'react-icons/lu';

export default function FinancialManagementExp() {

  const [showViewModal, setShowViewModal] = useState(false);
  const [viewComplaint, setViewComplaint] = useState(null);
  const [filePreview, setFilePreview] = useState(null);

  const handleShowViewModal = (index) => {
    setViewComplaint(exp[index]);
    setShowViewModal(true);
  };

  const handleCloseViewModal = () => setShowViewModal(false);

  const [exp, setExp] = useState([

  ]);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null);

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/users/v12/ViewExpenses`);
        setExp(response.data);
      } catch (error) {
        console.error('Error fetching expenses:', error);
      }
    };
    fetchExpenses();
  }, []);

  const handleShowDeleteModal = (index) => {
    setDeleteIndex(index);
    setShowDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
    setDeleteIndex(null);
  };

  const confirmDelete = async () => {
    if (deleteIndex !== null) {
      const expenseToDelete = exp[deleteIndex];
      try {
        await axios.delete(`${process.env.REACT_APP_API_URL}/users/v12/deleteExpenses/${expenseToDelete._id}`);
        const updatedExpenses = exp.filter((_, index) => index !== deleteIndex);
        setExp(updatedExpenses);
        handleCloseDeleteModal();
      } catch (error) {
        console.error('Error deleting expense:', error);
      }
    }
  };

  const [show, setShow] = useState(false);
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [editIndex, setEditIndex] = useState(null);

  const handleShow = () => setShow(true);
  const handleClose = () => {
    setShow(false);
    reset();
    setFile(null);
    setFilePreview(null);
    setEditIndex(null);
  };

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append('Title', data.Title);
    formData.append('description', data.description);
    formData.append('date', data.date);
    formData.append('amount', data.amount);
    formData.append('Bill_image', file);

    try {
      if (editIndex !== null) {

        axios.put(`${process.env.REACT_APP_API_URL}/users/v12/updateExpenses/${exp[editIndex]._id}`, formData)
          .then(() => {
            return axios.get(`${process.env.REACT_APP_API_URL}/users/v12/ViewExpenses`); // Fetch latest data
          })
          .then((response) => {
            setExp(response.data); // Update state with fresh data
            handleClose();
          })
          .catch((error) => {
            console.error("Error updating expense:", error);
          })

      } else {
        axios.post(`${process.env.REACT_APP_API_URL}/users/v12/createExpenses`, formData)
          .then((response) => {
            return axios.get(`${process.env.REACT_APP_API_URL}/users/v12/ViewExpenses`); // Fetch latest data
          })
          .then((response) => {
            setExp(response.data); // Update state with fresh data
            handleClose();
          })
          .catch((error) => {
            console.error("Error adding expense:", error);
          });
      }
    } catch (error) {
      console.error("Error details:", error);
    }

  };

  const handleEdit = (index) => {
    const expenseToEdit = exp[index];
    setEditIndex(index);
    setShow(true);
    setFilePreview(null);
    setFile(null);

    reset({
      Title: expenseToEdit.Title,
      description: expenseToEdit.description,
      date: expenseToEdit.date,
      amount: expenseToEdit.amount,
      // Bill_image: expenseToEdit.Bill_image,
    });
  };

  const [file, setFile] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");


  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setFilePreview(URL.createObjectURL(selectedFile)); // Generate preview URL
    }
  };

  return (
    <div className="dashboard-bg" style={{ width: "1920px" }}>
      <Navbar />
      <div style={{ marginLeft: "300px" }}>
        <div className="container-fluid income">
          <div className="row p-5" style={{ marginTop: "70px" }}>
            <div className="p-0">
              <div className="table-responsive rounded pb-3">
                <div className="bg-light">
                  <div className="d-flex justify-content-between align-items-center py-3 px-2">
                    <h3 className="mb-0 financial-income-title ms-2">Add Expenses Details</h3>
                    <div>
                      <button
                        className="set-maintainance-btn d-flex align-items-center"
                        onClick={handleShow}
                      >
                        <FaPlusSquare className="me-2 " /> Add New Expenses details
                      </button>
                    </div>
                  </div>

                  <div className="px-3 financial-maintainance-table">
                    <table className="table">
                      <thead className="table-primary">
                        <tr style={{ height: '55px' }}>
                          <th scope="col">Title</th>
                          <th scope="col">Description</th>
                          <th scope="col" className="text-start">Date</th>
                          <th scope="col">Amount</th>
                          <th scope="col">Bill Format</th>
                          <th scope="col" className="text-center">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {exp.map((val, index) => (
                          <tr key={index} className="bg-light">
                            <td style={{ height: '55px' }} className="financial-Pnumber">
                              {val.Title}
                            </td>
                            <td style={{ height: '55px' }} className="financial-Pnumber">
                              {val.description}
                            </td>
                            <td style={{ height: '55px' }} className="financial-Pnumber">
                              {new Date(val.date).toLocaleDateString('en-GB')}
                            </td>
                            <td style={{ height: '55px' }} className="financial-Pnumber exp-amt-color">
                              ₹ {new Intl.NumberFormat('en-IN').format(val.amount)}
                            </td>
                            <td style={{ height: '55px' }} className="financial-Pnumber">
                              {/* Check if Bill_image exists and if it's a string, then check the file extension */}
                              {val.Bill_image && typeof val.Bill_image === 'string' && (
                                val.Bill_image.toLowerCase().endsWith('.jpg') || val.Bill_image.toLowerCase().endsWith('.jpeg')
                              ) ? (
                                <CiImageOn className="me-1 jpg-btn" style={{ fontSize: '20px' }} />
                              ) : val.Bill_image && typeof val.Bill_image === 'string' && val.Bill_image.toLowerCase().endsWith('.pdf') ? (
                                <BiSolidFilePdf className="me-1 pdf-btn" style={{ fontSize: '20px' }} />
                              ) : null}  {/* No Invalid Format message shown */}

                              {/* Only display the file format (JPG or PDF) */}
                              {val.Bill_image && typeof val.Bill_image === 'string' && (
                                val.Bill_image.toLowerCase().endsWith('.jpg') || val.Bill_image.toLowerCase().endsWith('.jpeg') || val.Bill_image.toLowerCase().endsWith('.pdf')
                              ) ? (
                                val.Bill_image.toLowerCase().endsWith('.pdf') ? 'PDF' : 'JPG'
                              ) : ''}
                            </td>

                            <td className="text-center" style={{ verticalAlign: "middle" }}>
                              <div className="d-flex align-items-center justify-content-center">
                                <img
                                  src={Edit}
                                  className="text-success me-2"
                                  style={{ cursor: "pointer" }}
                                  onClick={() => handleEdit(index)}
                                />
                                <img
                                  src={View}
                                  className="text-primary me-2"
                                  style={{ cursor: "pointer" }}
                                  onClick={() => handleShowViewModal(index)}
                                />
                                <img
                                  src={Delete}
                                  className="text-danger"
                                  style={{ cursor: "pointer" }}
                                  onClick={() => handleShowDeleteModal(index)}
                                />
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Add/Edit Modal */}
                <Modal show={show} onHide={handleClose} centered className="custom-modal">
                  <Modal.Header>
                    <Modal.Title className="Modal-Title">
                      {editIndex !== null ? 'Edit Expense Details' : 'Add Expense Details'}
                    </Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <Form onSubmit={handleSubmit(onSubmit)}>
                      <Form.Group className="mb-3" controlId="formTitle">
                        <Form.Label className="Form-Label">
                          Title<span className="text-danger"> *</span>
                        </Form.Label>
                        <Form.Control
                          className="Form-Control"
                          type="text"
                          placeholder="Enter Title"
                          {...register('Title', { required: "Title is required" })}
                          isInvalid={errors.Title}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.Title?.message}
                        </Form.Control.Feedback>
                      </Form.Group>

                      <Form.Group className="mb-3" controlId="formDescription">
                        <Form.Label className="Form-Label">
                          Description<span className="text-danger"> *</span>
                        </Form.Label>
                        <Form.Control
                          className="Form-Control"
                          type="text"
                          placeholder="Enter Description"
                          {...register('description', { required: "Description is required" })}
                          isInvalid={errors.description}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.description?.message}
                        </Form.Control.Feedback>
                      </Form.Group>

                      <Form.Group className="mb-3 row" controlId="formDate">
                        <div className="col-sm-6 d-flex flex-column">
                          <Form.Label className="Form-Label">Date</Form.Label>
                          <Form.Control
                            className="Form-Control"
                            type="date"
                            {...register('date')}
                          />
                        </div>
                        <div className="col-sm-6 d-flex flex-column">
                          <Form.Label className="Form-Label">
                            Amount<span className="text-danger"> *</span>
                          </Form.Label>
                          <Form.Control
                            className="Form-Control"
                            type="number"
                            placeholder="Enter Amount"
                            {...register('amount', { required: "Amount is required" })}
                            isInvalid={errors.amount}
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.amount?.message}
                          </Form.Control.Feedback>
                        </div>
                      </Form.Group>


                      <Form.Group className="mb-3">
                        <Form.Label>Bill Image</Form.Label>
                        <div
                          style={{
                            border: '2px dashed #d3d3d3',
                            borderRadius: '8px',
                            padding: '20px',
                            textAlign: 'center',
                            position: 'relative',
                            backgroundColor: filePreview ? '#f8f9fa' : 'transparent',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            flexDirection: 'column',
                            height: '150px', // Adjust height as needed
                          }}
                        >
                          {filePreview ? (
                            <div style={{ textAlign: 'center' }}>
                              {file?.type === 'application/pdf' ? (
                                <embed
                                  src={filePreview}
                                  type="application/pdf"
                                  width="100%"
                                  height="100px"
                                  style={{ borderRadius: '8px' }}
                                />
                              ) : (
                                <img
                                  src={filePreview}
                                  alt="Preview"
                                  style={{
                                    maxWidth: '100%',
                                    height: '100px',
                                    objectFit: 'contain',
                                    borderRadius: '8px',
                                  }}
                                />
                              )}
                              <div className="mt-2">
                                <Button variant="danger" size="sm" onClick={() => {
                                  setFile(null);
                                  setFilePreview(null);
                                }}>
                                  Remove
                                </Button>
                              </div>
                            </div>
                          ) : (
                            <label htmlFor="file-upload" style={{ cursor: 'pointer', textAlign: 'center' }}>
                              <LuImagePlus style={{ fontSize: '40px', color: '#007bff', marginBottom: '8px' }} />
                              <div>Upload or drag and drop</div>
                            </label>
                          )}
                          <input
                            id="file-upload"
                            type="file"
                            accept=".png, .jpg, .jpeg, .pdf"
                            style={{ display: 'none' }}
                            onChange={handleFileChange}
                          />
                          {!filePreview && <small className="text-muted">Allowed formats: PNG, JPG, PDF</small>}
                        </div>
                      </Form.Group>
                      <div className="d-flex justify-content-between">
                        <Button variant="secondary" onClick={handleClose} className="btn mt-2 cancle">
                          Cancel
                        </Button>
                        <Button variant="primary" type="submit" className='btn mt-2 save'>
                          {editIndex !== null ? 'Update' : 'Add'}
                        </Button>
                      </div>

                    </Form>
                  </Modal.Body>
                </Modal>

                {/* View Modal */}
                <Modal show={showViewModal} onHide={handleCloseViewModal} centered>
                  <Modal.Header closeButton>
                    <Modal.Title>View Complaint</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    {viewComplaint ? (
                      <div>
                        {/* Title */}
                        <p className='view-strong text-dark'>
                          <strong>Title:</strong> <br />
                          {viewComplaint.Title}
                        </p>

                        {/* Description */}
                        <p className='view-strong text-dark'>
                          <strong>Description:</strong> <br />
                          {viewComplaint.description}
                        </p>

                        {/* Date and Amount */}
                        <div className='d-flex'>
                          <p className='view-strong text-dark'>
                            <strong>Date:</strong> <br />
                            {new Date(viewComplaint.date).toLocaleDateString('en-GB')}
                          </p>
                          <p className='view-strong text-dark ms-5'>
                            <strong>Amount:</strong> <br />
                            ₹ {new Intl.NumberFormat('en-IN').format(viewComplaint.amount)}
                          </p>
                        </div>

                        {/* Bill */}
                        <p className='view-strong text-dark'>
                          <strong>Bill:</strong> <br />
                        </p>

                        {viewComplaint.file ? (
                          <div>
                            {/* File Details */}
                            <p><strong>File Format:</strong> {viewComplaint.Bill_image}</p>
                            <p><strong>File Size:</strong> {(viewComplaint.file.size / 1024 / 1024).toFixed(2)} MB</p>

                            {/* Render Image */}
                            {['JPG', 'PNG', 'JPEG'].includes(viewComplaint.Bill_image?.toUpperCase()) && (
                              <div>
                                <img
                                  src={URL.createObjectURL(viewComplaint.file)} // Create URL from file Blob
                                  alt="Uploaded Bill"
                                  style={{ maxWidth: '100%', height: 'auto' }}
                                />
                                <p><strong>File Name:</strong> {viewComplaint.file.name}</p>
                              </div>
                            )}

                            {/* Render PDF */}
                            {viewComplaint.Bill_image?.toUpperCase() === 'PDF' && (
                              <div>
                                <embed
                                  src={URL.createObjectURL(viewComplaint.file)}
                                  type="application/pdf"
                                  width="100%"
                                  height="400px"
                                />
                                <p><strong>File Name:</strong> {viewComplaint.file.name}</p>
                              </div>
                            )}
                          </div>
                        ) : (
                          <p>No bill image available</p>
                        )}
                      </div>
                    ) : (
                      <p>Loading complaint details...</p>
                    )}
                  </Modal.Body>
                </Modal>

                {/* Delete Modal */}
                <Modal show={showDeleteModal} onHide={handleCloseDeleteModal} centered className="custom-modal">
                  <Modal.Header style={{ borderBottom: 'none' }}>
                    <Modal.Title className="Modal-Title">Confirm Deletion</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <p>Are you sure you want to delete this expense?</p>
                  </Modal.Body>

                  <Modal.Footer className='d-flex justify-content-between' style={{ borderTop: 'none' }}>
                    <Button variant="secondary" className='btn cancle  mt-2' onClick={handleCloseDeleteModal}>Cancel</Button>
                    <Button variant="danger" className='btn delete' onClick={confirmDelete}>Delete</Button>
                  </Modal.Footer>
                </Modal>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}