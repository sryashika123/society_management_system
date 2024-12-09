import React, { useEffect, useState } from 'react'
import Navbar from '../../../component/Layout/Navbar'
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { BsThreeDotsVertical } from "react-icons/bs";
import { Button, Modal, Form } from 'react-bootstrap';
import axios from 'axios';


export default function FinancialManagementOtherIncome() {

    const [note, setNote] = useState([]);
    const [show, setShow] = useState(false);
    const [editIndex, setEditIndex] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleteId, setDeleteId] = useState(null);
    const [dropdownIndex, setDropdownIndex] = useState(null); // Add state for dropdown menu
    const [showEditModal, setShowEditModal] = useState(false);
    const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm();

    // Fetch all data (GET)
    const fetchData = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/users/v13/getOtherIncome`);
            setNote(response.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleClose = () => {
        setShow(false);
        reset();
        setEditIndex(null);
    };

    const handleShow = () => setShow(true);

    // Create or Update (POST/PUT)
    const onSubmit = async (data) => {
        try {
            if (editIndex !== null) {
                const id = note[editIndex]._id; // Assuming '_id' is the identifier
                await axios.put(`${process.env.REACT_APP_API_URL}/users/v13/updateOtherIncome/${id}`, data);
                fetchData(); // Refresh the list
            } else {
                await axios.post(`${process.env.REACT_APP_API_URL}/users/v13/createOtherIncome`, data);
                fetchData();
            }
            handleClose();
            setShowEditModal(false);  // Close the modal after submitting
        } catch (error) {
            console.error("Error saving data:", error);
        }
    };

    const handleEdit = (index) => {
        setEditIndex(index);
        const selectedNote = note[index];
        setValue('Title', selectedNote.Title);
        setValue('Date', selectedNote.Date);
        setValue('Due_Date', selectedNote.Due_Date);
        setValue('Description', selectedNote.Description);
        setValue('Amount', selectedNote.Amount);
        setShowEditModal(true);
    };

    // Handle Dropdown Toggle
    const handleDropdownToggle = (index) => {
        setDropdownIndex(dropdownIndex === index ? null : index);
    };

    // Handle Edit Modal Close
    const handleCloseEditModal = () => {
        setDropdownIndex(null); // Close the dropdown when edit modal closes
    };

    // Delete (DELETE)
    const handleDelete = async () => {
        try {
            await axios.delete(`${process.env.REACT_APP_API_URL}/users/v13/deleteOtherIncome/${deleteId}`);
            fetchData(); // Refresh the list
            setShowDeleteModal(false);
        } catch (error) {
            console.error("Error deleting data:", error);
        }
    };

    const handleShowDeleteModal = (index) => {
        setDeleteId(note[index]._id);
        setShowDeleteModal(true);
    };

    const handleCloseDeleteModal = () => {
        setShowDeleteModal(false);
    };



    return (
        <div className='dashboard-bg' style={{ width: "1920px" }} >
            <Navbar />
            <div>
                <div className='income' style={{ marginLeft: "300px", width: "1600px" }}>

                    <div className='row p-5' style={{ marginTop: "70px" }}>
                        <div className='p-0'>
                            <div className="table-responsive rounded pb-3">

                                <Link to="/home/Financial-Maintenanace" className='btn btn-sm  maintainance-income-btn  maintainance-income-btn-withoutbg' style={{ border: "none" }}>Maintenance</Link>
                                <Link to="/home/Other-Income" className='btn btn-sm  maintainance-income-btn maintainance-income-btn-bg ' style={{ border: "none" }}>Other Income</Link>

                                <div className='bg-light'>
                                    <div className='d-flex justify-content-between align-items-center  py-3 px-2'>
                                        <h3 className=' mb-0  financial-income-title'>Other Income</h3>

                                        <div>
                                            <button className='set-maintainance-btn d-flex align-items-center other-income-btn' onClick={handleShow}> Create Other Income </button>
                                        </div>
                                    </div>

                                    {/* Modal */}
                                    {show && (
                                        <div className="modal fade show d-block  custom-modal" style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
                                            <div className="modal-dialog modal-dialog-centered">
                                                <div className="modal-content">

                                                    <h5 className="modal-title Modal-Title p-3">Create Other Income</h5>

                                                    <form onSubmit={handleSubmit(onSubmit)}>
                                                        <div className="modal-body">
                                                            <div className="mb-3">
                                                                <label className='Form-Label'>Title <span className='text-danger'>*</span></label>
                                                                <input type="text" className="form-control Form-Control"
                                                                    placeholder='Enter Title' {...register('Title', { required: true })} />
                                                                {errors.Title && <small className="text-danger">Title is required</small>}
                                                            </div>
                                                            <div className="row mb-3">
                                                                <div className="col-md-6">
                                                                    <label className='Form-Label'>Date <span className='text-danger'>*</span></label>
                                                                    <input type="date" className="form-control Form-Control" {...register('Date', { required: true })} />
                                                                </div>
                                                                <div className="col-md-6">
                                                                    <label className='Form-Label'>Due Date <span className='text-danger'>*</span></label>
                                                                    <input type="date" className="form-control Form-Control" {...register('Due_Date', { required: true })} />
                                                                </div>
                                                            </div>

                                                            <div className="mb-3">
                                                                <label className='Form-Label'>Description <span className='text-danger'>*</span></label>
                                                                <input type="text" className="form-control Form-Control" placeholder='Enter Description' {...register('Description', { required: true })} />
                                                                {errors.Description && <small className="text-danger">Description is required</small>}
                                                            </div>
                                                            <div className="mb-3">
                                                                <label className='Form-Label'>Amount <span className='text-danger'>*</span></label>
                                                                <input type="text" className="form-control Form-Control" placeholder="₹ 0000" {...register('Amount', { required: true })} />
                                                                {errors.Amount && <small className="text-danger">Amount is required</small>}
                                                            </div>
                                                        </div>
                                                        <div className="px-3 pb-3 d-flex justify-content-between">
                                                            <button type="button" className="btn btn-sm cancle" onClick={handleClose}>Cancel</button>
                                                            <button type="submit" className="btn btn-sm save">Save</button>
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                    )}


                                    <div className="row card-row g-3 ps-3">
                                        {note.map((val, index) => (
                                            <div className="col-lg-3 mb-3" key={val.id}>
                                                <div className="card">
                                                    <div className="card-header card-title text-light d-flex align-items-center justify-content-between" style={{ background: "rgba(86, 120, 233, 1)" }}>
                                                        {val.Title}"
                                                        <div className='position-relative'>
                                                            {/* Three dots button */}
                                                            <button
                                                                className="btn btn-light p-0"
                                                                onClick={() => setDropdownIndex(dropdownIndex === index ? null : index)}
                                                                style={{ width: '30px', height: '30px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                                                            >
                                                                <BsThreeDotsVertical />
                                                            </button>

                                                            {/* Dropdown Menu */}
                                                            {dropdownIndex === index && (
                                                                <div className="dropdown-menu show position-absolute" style={{ right: 0, top: '100%', zIndex: 10 }}>
                                                                    <button
                                                                        className="dropdown-item"
                                                                        onClick={() => handleEdit(index)}
                                                                    >
                                                                        Edit
                                                                    </button>



                                                                    {/* Edit Modal */}
                                                                    {showEditModal && (
                                                                        <div className="modal fade show d-block custom-modal" style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
                                                                            <div className="modal-dialog modal-dialog-centered">
                                                                                <div className="modal-content">
                                                                                    <h5 className="modal-title p-3 pb-0">Edit {val.Title}</h5>
                                                                                    <form onSubmit={handleSubmit(onSubmit)}>
                                                                                        <div className="modal-body">
                                                                                            <div className="mb-3">
                                                                                                <label className='Form-Label'>Amount<span className='text-danger'>*</span></label>
                                                                                                <input type="text" className="form-control Form-Control" {...register('Amount', { required: true })} placeholder="₹ 0.00" />
                                                                                                {errors.Amount && <small className="text-danger">Amount is required</small>}
                                                                                            </div>
                                                                                            <div className='d-flex justify-content-between'>
                                                                                                <div className="mb-3">
                                                                                                    <label className='Form-Label'>Date<span className='text-danger'>*</span></label>
                                                                                                    <input type="date" className="form-control Form-Control" {...register('Date', { required: true })} />
                                                                                                </div>
                                                                                                <div className="mb-3">
                                                                                                    <label className='Form-Label'>Due Date<span className='text-danger'>*</span></label>
                                                                                                    <input type="date" className="form-control Form-Control" {...register('Due_Date', { required: true })} />
                                                                                                </div>
                                                                                            </div>
                                                                                            <div className="mb-3">
                                                                                                <label className='Form-Label'>Description <span className='text-danger'>*</span></label>
                                                                                                <input type="text" className="form-control Form-Control" placeholder='Enter Description' {...register('Description', { required: true })} />
                                                                                                {errors.Description && <small className="text-danger">Description is required</small>}
                                                                                            </div>
                                                                                        </div>
                                                                                        <div className="px-3 pb-3 d-flex justify-content-between">
                                                                                            <button type="button" className="btn btn-sm cancle" onClick={() => setShowEditModal(false)}>Cancel</button>
                                                                                            <button type="submit" className="btn btn-sm save">Save</button>
                                                                                        </div>
                                                                                    </form>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    )}


                                                                    <button
                                                                        className="dropdown-item"
                                                                    >
                                                                        View
                                                                    </button>

                                                                    <button
                                                                        className="dropdown-item"
                                                                        onClick={() => handleShowDeleteModal(index)}
                                                                    >
                                                                        Delete
                                                                    </button>

                                                                    {/* delete modal */}
                                                                    <Modal className='custom-modal' show={showDeleteModal} onHide={handleCloseDeleteModal} centered>

                                                                        <Modal.Title className='Modal-Title px-3 pt-3'>Delete Number?</Modal.Title>

                                                                        <Modal.Body>
                                                                            <p className='Form-p mb-0'>Are you sure you want to delete this number?</p>
                                                                        </Modal.Body>

                                                                        <Modal.Footer className='d-flex justify-content-between'>
                                                                            <Button variant="secondary" className='btn cancle  mt-2' onClick={handleCloseDeleteModal}>Cancel</Button>
                                                                            <Button variant="danger" className='btn delete' onClick={handleDelete}>Delete</Button>
                                                                        </Modal.Footer>
                                                                    </Modal>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                    <div className="card-body">
                                                        <div className="d-flex justify-content-between align-items-center mb-2">
                                                            <h6 className="card-body-title mb-0">Amount Per Member</h6>
                                                            <span className="card-body-title card-body-button mb-0 fw-medium">₹ {val.Amount}</span>
                                                        </div>
                                                        <div className="d-flex justify-content-between align-items-center mb-2">
                                                            <h6 className="card-body-title mb-0">Total Member</h6>
                                                            <span className="card-body-title text-dark mb-0 fw-medium">{val.totalMember}</span>
                                                        </div>
                                                        <div className="d-flex justify-content-between align-items-center mb-2">
                                                            <h6 className="card-body-title mb-0">Date</h6>
                                                            <span className="card-body-title text-dark mb-0 fw-medium"> {new Date(val.Date).toLocaleDateString('en-GB')}
                                                            </span>
                                                        </div>
                                                        <div className='d-flex justify-content-between align-items-center mb-2'>
                                                            <h6 className="card-body-title mb-0">Due Date</h6>
                                                            <span className="card-body-title text-dark fw-medium"> {new Date(val.Due_Date).toLocaleDateString('en-GB')}
                                                            </span>
                                                        </div>
                                                        <h6 className="card-body-title">Description</h6>
                                                        <p className="card-text card-des fw-medium">{val.Description}</p>
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
            </div>
        </div>
    )
} 