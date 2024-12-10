import React, { useEffect, useState } from 'react';
import Navbar from '../../../component/Layout/Navbar';
import { BsThreeDotsVertical } from "react-icons/bs";
import { Modal, Button, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import axios from 'axios';

export default function FinancialManagementNote() {
  const [note, setNote] = useState([
    { id: 1, title: 'Rent or Mortgage', description: 'A visual representation of your spending categories.', date: '2024-11-09', amt: '1200' },
    { id: 2, title: 'Housing Costs', description: 'A visual representation of your spending categories.', date: '2024-11-10', amt: '800' },
  ]);

  const [show, setShow] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [dropdownIndex, setDropdownIndex] = useState(null);
  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm();

  // Fetch notes from the backend
  // Fetch notes from backend
  const fetchNotes = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/users/v11/ViewNote`);
      setNote(response.data);
    } catch (error) {
      console.error("Error fetching notes:", error.message);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);


  // Open and close modal
  const handleClose = () => {
    setShow(false);
    reset();
    setEditIndex(null);
  };
  const handleShow = () => setShow(true);

  // Handle form submission

  const onSubmit = async (data) => {
    console.log("Submitted data:", data); // Log the data to verify all fields are passed correctly
    
    try {
      if (editIndex !== null) {
        const noteId = note[editIndex]._id;
        const updatedData = { title: data.title, description: data.description, date: data.date, amt: data.amt };
  
        const response = await axios.put(
          `${process.env.REACT_APP_API_URL}/users/v11/updateNote/${noteId}`,
          updatedData
        );
        console.log("Update response:", response);  // Log the response from the backend
      } else {
        // Create new note request
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/users/v11/createNote`, data);
        console.log("Create response:", response);  // Log the response for creation
      }
      fetchNotes(); // Fetch updated list after saving
      handleClose(); // Close modal
    } catch (error) {
      console.error("Error saving note:", error.response?.data || error.message);
      alert(error.response?.data?.msg || "An error occurred while saving the note.");
    }
  };
  


  // Handle editing a specific note
  const handleEdit = (index) => {
    setEditIndex(index);
    const noteToEdit = note[index];
    console.log("Editing note:", noteToEdit);  // Log the note you're trying to edit
    setValue('title', noteToEdit.title);
    setValue('description', noteToEdit.description);
    setValue('date', noteToEdit.date);
    setValue('amt', noteToEdit.amt);
    handleShow(); // Open modal for editing
  };
  
  

  // Toggle dropdown menu for each card
  const handleDropdownToggle = (index) => {
    setDropdownIndex(dropdownIndex === index ? null : index);
  };

  return (
    <div className='dashboard-bg' style={{  width: "1920px" }}>
      <Navbar />
      <div className='container-fluid' style={{marginLeft:"300px", width:"1620px", }}>
        <div className='row p-5' style={{marginTop:"70px"}}>
          <div className='p-0 bg-light'>
            <div className='d-flex justify-content-between align-items-center py-3 px-2'>
              <h3 className='mb-0 financial-income-title ms-2 '>Note</h3>
              <button className='set-maintainance-btn d-flex align-items-center' onClick={handleShow}>
                Create Note
              </button>
            </div>

            <div className="row px-3">
              {note.map((val, index) => (
                <div className="col-lg-3 mb-3" key={val.id}>
                  <div className="card">
                    <div className="card-header  text-light d-flex align-items-center justify-content-between" style={{ height: "54px", fontSize: "16px", fontWeight: "500", background: " rgba(86, 120, 233, 1)" }}>
                      {val.title}
                      <div className='position-relative'>
                        <button
                          className="btn btn-light p-0"
                          onClick={() => handleDropdownToggle(index)}
                          style={{ width: '30px', height: '30px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                        >
                          <BsThreeDotsVertical />
                        </button>
                        {dropdownIndex === index && (
                          <div className="dropdown-menu show position-absolute" style={{ right: 0, top: '100%', zIndex: 10 }}>
                            <button
                              className="dropdown-item"
                              onClick={() => handleEdit(index)}
                            >
                              Edit
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="card-body">
                      <h6 className="card-des-title">Description</h6>
                      <p className="card-text card-des">{val.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
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
                type="text"
                placeholder="Enter Title"
                {...register('title', { required: "Title is required" })}
                isInvalid={errors.title}
              />
              <Form.Control.Feedback type="invalid">{errors.title?.message}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formDescription">
              <Form.Label className='Form-Label'>Description<span className="text-danger"> *</span></Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Description"
                {...register('description', { required: "Description is required" })}
                isInvalid={errors.description}
              />
              <Form.Control.Feedback type="invalid">{errors.description?.message}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formDate">
              <Form.Label className='Form-Label'>Date<span className="text-danger"> *</span></Form.Label>
              <Form.Control
                type="date"
                {...register('date', { required: "Date is required" })}
                isInvalid={errors.date}
              />
              <Form.Control.Feedback type="invalid">{errors.date?.message}</Form.Control.Feedback>
            </Form.Group>

            <div className="d-flex justify-content-between">
              <Button variant="secondary" onClick={handleClose} className="btn mt-2 btn-sm cancle">Cancel</Button>
              <Button variant="primary" type="submit" className='btn btn-sm save mt-2'>Save</Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}
