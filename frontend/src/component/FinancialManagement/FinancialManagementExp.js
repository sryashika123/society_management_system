import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../Layout/Navbar';
import { CiImageOn } from "react-icons/ci";
import { BiSolidFilePdf } from "react-icons/bi";
import { useForm } from 'react-hook-form';
import { Button, Modal, Form } from 'react-bootstrap';
import { FaPlusSquare } from "react-icons/fa";
import Edit from '../../assets/edit.png';
import View from '../../assets/view.png';
import Delete from '../../assets/delete.png';

export default function FinancialManagementExp() {
  const [showViewModal, setShowViewModal] = useState(false);
  const [viewComplaint, setViewComplaint] = useState(null);
  const [exp, setExp] = useState([]);
  const [show, setShow] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [deleteIndex, setDeleteIndex] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  // Fetch expenses when component mounts
  useEffect(() => {
    axios.get('http://localhost:8000/api/users/v12/ViewExpenses')
      .then(response => {
        setExp(response.data);
      })
      .catch(error => {
        console.error("Error fetching expenses:", error);
      });
  }, []);

  // Handle show/hide of modals
  const handleShow = () => setShow(true);
  const handleClose = () => {
    setShow(false);
    reset();
    setEditIndex(null);
  };
  const handleShowViewModal = (index) => {
    setViewComplaint(exp[index]);
    setShowViewModal(true);
  };
  const handleCloseViewModal = () => setShowViewModal(false);

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
      const expenseToDelete = exp[deleteIndex];
      axios.delete(`http://localhost:8000/api/users/v12/deleteExpenses/${expenseToDelete._id}`)
        .then(() => {
          const updatedExpenses = exp.filter((_, index) => index !== deleteIndex);
          setExp(updatedExpenses);
        })
        .catch(error => {
          console.error("Error deleting expense:", error);
        });
    }
    handleCloseDeleteModal();
  };

  // Handle form submit for adding/editing expenses
  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("Title", data.Title);
    formData.append("description", data.description);
    formData.append("date", data.date);
    formData.append("amount", data.amount);
    formData.append("Bill_image", data.Bill_image[0]);

    if (editIndex !== null) {
      axios.put(`http://localhost:8000/api/users/v12/updateExpenses/${exp[editIndex]._id}`, formData)
        .then(response => {
          const updatedExpenses = exp.map((item, index) => index === editIndex ? response.data : item);
          setExp(updatedExpenses);
          handleClose();
        })
        .catch(error => {
          console.error("Error updating expense:", error);
        });
    } else {
      axios.post('http://localhost:8000/api/users/v12/createExpenses', formData)
        .then(response => {
          setExp([...exp, response.data]);
          handleClose();
        })
        .catch(error => {
          console.error("Error adding expense:", error);
        });
    }
  };

  // Handle edit modal
  const handleEdit = (index) => {
    const expenseToEdit = exp[index];
    setEditIndex(index);
    setShow(true);
    reset({
      Title: expenseToEdit.Title,
      description: expenseToEdit.description,
      date: expenseToEdit.date,
      amount: expenseToEdit.amount,
      Bill_image: expenseToEdit.Bill_image,
    });
  };

  return (
    <div className="dashboard-bg" style={{ width: "1920px" }}>
      <Navbar />
      <div style={{ marginLeft: "300px" }}>
        <div className="container-fluid income">
          <div className="row p-5" style={{ marginTop: "109px" }}>
            <div className="p-0">
              <div className="table-responsive rounded pb-3">
                <div className="bg-light">
                  <div className="d-flex justify-content-between align-items-center py-3 px-2">
                    <h3 className="mb-0 financial-income-title">Add Expenses Details</h3>
                    <div>
                      <button className="set-maintainance-btn d-flex align-items-center" onClick={handleShow}>
                        <FaPlusSquare className="me-2" /> Add New Expenses details
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
                            <td style={{ height: '55px' }} className="financial-Pnumber">{val.Title}</td>
                            <td style={{ height: '55px' }} className="financial-Pnumber">{val.description}</td>
                            <td style={{ height: '55px' }} className="financial-Pnumber">{val.date}</td>
                            <td style={{ height: '55px' }} className="financial-Pnumber exp-amt-color">{val.amount}</td>
                            <td style={{ height: '55px' }} className="financial-Pnumber">
                              {val.Bill_image === 'JPG' ? (
                                <CiImageOn className="me-1 jpg-btn" style={{ fontSize: '20px' }} />
                              ) : val.Bill_image === 'PDF' ? (
                                <BiSolidFilePdf className="me-1 pdf-btn" style={{ fontSize: '20px' }} />
                              ) : null} {/* No Invalid Format message shown */}

                              {val.Bill_image === 'JPG' || val.Bill_image === 'PDF' ? val.Bill_image : ''} {/* Only show the valid format */}
                            </td>


                            <td className="text-center" style={{ verticalAlign: "middle" }}>
                              <div className="d-flex align-items-center justify-content-center">
                                <img src={Edit} className="text-success me-2" style={{ cursor: "pointer" }} onClick={() => handleEdit(index)} />
                                <img src={View} className="text-primary me-2" style={{ cursor: "pointer" }} onClick={() => handleShowViewModal(index)} />
                                <img src={Delete} className="text-danger" style={{ cursor: "pointer" }} onClick={() => handleShowDeleteModal(index)} />
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
                        <Form.Label className="Form-Label">Title<span className="text-danger"> *</span></Form.Label>
                        <Form.Control
                          className="Form-Control"
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
                        <Form.Label className="Form-Label">Description<span className="text-danger"> *</span></Form.Label>
                        <Form.Control
                          className="Form-Control"
                          type="text"
                          placeholder="Enter Description"
                          {...register('description', { required: "Description is required" })}
                          isInvalid={errors.description}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.des?.message}
                        </Form.Control.Feedback>
                      </Form.Group>

                      <Form.Group className="mb-3" controlId="formDate">
                        <Form.Label className="Form-Label">Date<span className="text-danger"> *</span></Form.Label>
                        <Form.Control
                          className="Form-Control"
                          type="date"
                          {...register('date', { required: "Date is required" })}
                          isInvalid={errors.date}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.date?.message}
                        </Form.Control.Feedback>
                      </Form.Group>

                      <Form.Group className="mb-3" controlId="formAmount">
                        <Form.Label className="Form-Label">Amount<span className="text-danger"> *</span></Form.Label>
                        <Form.Control
                          className="Form-Control"
                          type="number"
                          placeholder="Enter Amount"
                          {...register('amount', { required: "Amount is required" })}
                          isInvalid={errors.amount}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.amt?.message}
                        </Form.Control.Feedback>
                      </Form.Group>

                      <Form.Group className="mb-3" controlId="formFile">
                        <Form.Label className="Form-Label">Upload Bill (JPG/PDF)</Form.Label>
                        <Form.Control
                          className="Form-Control"
                          type="file"
                          {...register('Bill_image', { required: "File is required" })}
                        />
                      </Form.Group>

                      <div className="text-center">
                        <Button type="submit" className="custom-btn">
                          {editIndex !== null ? 'Save Changes' : 'Add Expense'}
                        </Button>
                      </div>
                    </Form>
                  </Modal.Body>
                </Modal>

                {/* View Modal */}
                <Modal show={showViewModal} onHide={handleCloseViewModal} centered>
                  <Modal.Header closeButton>
                    <Modal.Title>Expense Details</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    {viewComplaint && (
                      <div>
                        <p><strong>Title:</strong> {viewComplaint.Title}</p>
                        <p><strong>Description:</strong> {viewComplaint.description}</p>
                        <p><strong>Date:</strong> {viewComplaint.date}</p>
                        <p><strong>Amount:</strong> {viewComplaint.amount}</p>
                        <p><strong>Bill Format:</strong> {viewComplaint.Bill_image}</p>
                      </div>
                    )}
                  </Modal.Body>
                </Modal>

                {/* Delete Modal */}
                <Modal show={showDeleteModal} onHide={handleCloseDeleteModal} centered>
                  <Modal.Header closeButton>
                    <Modal.Title>Confirm Delete</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    Are you sure you want to delete this expense?
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseDeleteModal}>Cancel</Button>
                    <Button variant="danger" onClick={confirmDelete}>Delete</Button>
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
