import React, { useEffect, useState } from 'react';
import Navbar from '../../component/Layout/Navbar';
import { BsThreeDotsVertical } from "react-icons/bs";
import { Modal, Button, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { MdAccessTimeFilled } from "react-icons/md";
import axios from 'axios';

export default function Announcement() {

    const [note, setNote] = useState([]); // State for storing announcements
    const [show, setShow] = useState(false); // Modal visibility for creating announcement
    const [editIndex, setEditIndex] = useState(null); // To track the index of the note being edited
    const [showEditModal, setShowEditModal] = useState(false); // Show edit modal
    const [dropdownIndex, setDropdownIndex] = useState(null); // For dropdown menu
    const [showDeleteModal, setShowDeleteModal] = useState(false); // For delete confirmation modal
    const [deleteIndex, setDeleteIndex] = useState(null); // To track the index of the note being deleted
    const [viewComplaint, setViewComplaint] = useState(null); // For viewing an announcement

    const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm();

    // Fetch announcements when the component mounts
    useEffect(() => {
        const fetchAnnouncements = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/users/v20/getAnnouncement`);
                setNote(response.data);
            } catch (error) {
                console.error('Error fetching announcements:', error);
            }
        };
        fetchAnnouncements();
    }, []);

    // Handle create/edit announcement modal close
    const handleClose = () => {
        setShow(false);
        reset();
        setEditIndex(null);
        setShowEditModal(false); // Hide the Edit modal
    };

    // Handle submit of new/edit announcement form
    const onSubmit = async (data) => {
        try {
            if (editIndex !== null) {
                // Edit existing announcement
                const updatedNote = { ...note[editIndex], ...data };
                await axios.put(`${process.env.REACT_APP_API_URL}/users/v20/updateAnnouncement/${note[editIndex]._id}`, updatedNote);
                const updatedNotes = [...note];
                updatedNotes[editIndex] = updatedNote;
                setNote(updatedNotes);
            } else {
                // Create new announcement
                const response = await axios.post(`${process.env.REACT_APP_API_URL}/users/v20/createAnnouncement`, data);
                setNote([...note, response.data]); // Add new announcement to state
            }
            handleClose();
        } catch (error) {
            console.error('Error saving announcement:', error);
        }
    };

    // Handle delete confirmation
    const confirmDelete = async () => {
        try {
            if (deleteIndex !== null) {
                await axios.delete(`${process.env.REACT_APP_API_URL}/users/v20/deleteAnnouncement/${note[deleteIndex]._id}`);
                const updatedNotes = note.filter((_, i) => i !== deleteIndex);
                setNote(updatedNotes);
            }
            setShowDeleteModal(false);
            setDeleteIndex(null);
        } catch (error) {
            console.error('Error deleting announcement:', error);
        }
    };

    // Handle edit modal for a specific announcement
    const handleShowEditModal = (index) => {
        setEditIndex(index);
        const selectedNote = note[index];
        setValue('title', selectedNote.title);
        setValue('description', selectedNote.description);
        setValue('date', selectedNote.date);
        setValue('time', selectedNote.time);
        setShowEditModal(true);
    };

    // Handle view modal for a specific announcement
    const handleShowViewModal = (index) => {
        setViewComplaint(note[index]);
    };

    // Handle delete modal for a specific announcement
    const handleShowDeleteModal = (index) => {
        setDeleteIndex(index);
        setShowDeleteModal(true);
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);  // Convert the string to a Date object
        const day = String(date.getDate()).padStart(2, '0');  // Day of the month (01-31)
        const month = String(date.getMonth() + 1).padStart(2, '0');  // Month (01-12), adding 1 as months are 0-indexed
        const year = date.getFullYear();  // Year (YYYY)
    
        return `${day}/${month}/${year}`;  // Return the formatted date string
    };

    
    return (
        <div className='dashboard-bg' style={{ width: "1920px" }}>
            <Navbar />
            <div style={{ width: "1620px", marginLeft: "300px" }}>
                <div className='container-fluid' >
                    <div className='row p-5' style={{ marginTop: "70px" }}>
                        <div className='p-0'>
                            <div className='bg-light'>
                                <div className='d-flex justify-content-between align-items-center  py-3 px-2'>
                                    <h3 className=' mb-0  financial-income-title' style={{ marginLeft: "10px" }}>Announcement</h3>

                                    <div>
                                        <button className='set-maintainance-btn d-flex align-items-center other-income-btn' style={{ marginRight: "10px" }} onClick={() => setShow(true)}> Create Announcement</button>
                                    </div>
                                </div>

                                {/* Modal */}
                                {show && (
                                    <div className="modal fade show d-block  custom-modal" style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
                                        <div className="modal-dialog modal-dialog-centered">
                                            <div className="modal-content">

                                                <h5 className="modal-title Modal-Title p-3 pb-0">Add Announcement</h5>

                                                <form onSubmit={handleSubmit(onSubmit)}>
                                                    <div className="modal-body">
                                                        <div className="mb-3">
                                                            <label className='Form-Label'>Announcement Title <span className='text-danger'>*</span></label>
                                                            <input type="text" className="form-control Form-Control"
                                                                placeholder='Enter Name' {...register('title', { required: true })} />
                                                            {errors.title && <small className="text-danger">Title is required</small>}
                                                        </div>
                                                        <div className="mb-3">
                                                            <label className='Form-Label'>Description <span className='text-danger'>*</span></label>
                                                            <input type="text" className="form-control Form-Control" placeholder='Enter Description' {...register('description', { required: true })} />
                                                            {errors.description && <small className="text-danger">Description is required</small>}
                                                        </div>
                                                        <div className='d-flex justify-content-between'>
                                                            <div className="mb-3 w-50 me-2">
                                                                <label className='Form-Label'>Announcement Date <span className='text-danger'>*</span></label>
                                                                <input type="date" className="form-control Form-Control" {...register('date', { required: true })} />
                                                            </div>
                                                            <div className="mb-3 w-50 ms-2">
                                                                <label className='Form-Label'>Announcement Time <span className='text-danger position-relative'>*</span></label>
                                                                <input type="time" className="form-control Form-Control" {...register('time', { required: true })} />
                                                            </div>
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
                                                <div className="card-header card-title text-light d-flex align-items-center justify-content-between" style={{ height: "54px", fontSize: "16px", fontWeight: "500", background: " rgba(86, 120, 233, 1)" }}>
                                                    {val.title}
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
                                                                    onClick={() => handleShowEditModal(index)}
                                                                >
                                                                    Edit
                                                                </button>


                                                                {/* Edit Modal */}
                                                                {showEditModal && (
                                                                    <div className="modal fade show d-block custom-modal" style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
                                                                        <div className="modal-dialog modal-dialog-centered">
                                                                            <div className="modal-content">

                                                                                <h5 className="modal-title p-3 pb-0">Edit Announcement</h5>


                                                                                <form onSubmit={handleSubmit(onSubmit)}>
                                                                                    <div className="modal-body">
                                                                                        <div className="mb-3">
                                                                                            <label className='Form-Label'>Announcement Title<span className='text-danger'>*</span></label>
                                                                                            <input type="text" className="form-control Form-Control" {...register('title', { required: true })} />
                                                                                            {errors.title && <small className="text-danger">Amount is required</small>}
                                                                                        </div>

                                                                                        <div className="mb-3">
                                                                                            <label className='Form-Label'>Description <span className='text-danger'>*</span></label>
                                                                                            <input type="text" className="form-control Form-Control" placeholder='Enter Description' {...register('description', { required: true })} />
                                                                                            {errors.description && <small className="text-danger">Description is required</small>}
                                                                                        </div>

                                                                                        <div className='d-flex justify-content-between'>
                                                                                            <div className="mb-3">
                                                                                                <label className='Form-Label'>Announcement Date<span className='text-danger'>*</span></label>
                                                                                                <input type="date" className="form-control Form-Control w-100" {...register('date', { required: true })} />
                                                                                            </div>
                                                                                            <div className="mb-3">
                                                                                                <label className='Form-Label'>Announcement time<span className='text-danger'>*</span></label>
                                                                                                <input type="time" className="form-control Form-Control" {...register('time', { required: true })} />
                                                                                            </div>
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

                                                                <button
                                                                    className="dropdown-item"
                                                                    onClick={() => handleShowViewModal(index)}
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
                                                                {showDeleteModal && (
                                                                    <div className="modal fade show d-block custom-modal" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                                                                        <div className="modal-dialog modal-dialog-centered">
                                                                            <div className="modal-content">
                                                                                <h5 className="modal-title Modal-Title p-3 pb-0">Confirm Deletion</h5>
                                                                                <div className="modal-body">
                                                                                    <p>Are you sure you want to delete this announcement?</p>
                                                                                </div>
                                                                                <div className="px-3 pb-3 d-flex justify-content-between">
                                                                                    <button type="button" className="btn btn-sm cancle" onClick={() => setShowDeleteModal(false)}>Cancel</button>
                                                                                    <button type="button" className="btn btn-sm save" onClick={confirmDelete}>Delete</button>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                )}

                                                                {/* View Modal */}
                                                           
                                                                <Modal show={viewComplaint !== null} onHide={() => setViewComplaint(null)} centered>
                                                                    <Modal.Header closeButton>
                                                                        <Modal.Title>View Security Protocol</Modal.Title>
                                                                    </Modal.Header>
                                                                    <Modal.Body>
                                                                        {viewComplaint && (
                                                                            <div>
                                                                                <div className='mb-4'>
                                                                                    <label className='anouncement-view-title'>Title</label>
                                                                                    <p className='mb-0 anouncement-view-p'>{viewComplaint.title}</p>
                                                                                </div>

                                                                                <div className='mb-4'>
                                                                                    <label className='anouncement-view-title'>Description</label>
                                                                                    <p className='mb-0 anouncement-view-p'>{viewComplaint.description}</p>
                                                                                </div>

                                                                                <div className='d-flex'>
                                                                                    <div className='mb-4'>
                                                                                        <label className='anouncement-view-title'>Date</label>
                                                                                        <p className='mb-0 anouncement-view-p'>{viewComplaint.date}</p>
                                                                                    </div>
                                                                                    <div className='mb-4 ms-5'>
                                                                                        <label className='anouncement-view-title'>Time</label>
                                                                                        <p className='mb-0 anouncement-view-p'>{viewComplaint.time}</p>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        )}
                                                                    </Modal.Body>
                                                                </Modal>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="card-body">
                                                    <div className="d-flex justify-content-between align-items-center mb-2">
                                                        <h6 className="card-body-title mb-0">Announcement Date</h6>
                                                        <span className="card-body-title text-dark mb-0 fw-medium">{formatDate(val.date)}</span>
                                                    </div>
                                                    <div className="d-flex justify-content-between align-items-center mb-2">
                                                        <h6 className="card-body-title mb-0">Announcement Time</h6>
                                                        <span className="card-body-title text-dark mb-0 fw-medium">{val.time}</span>
                                                    </div>
                                                    <h6 className="card-body-title mb-2">Description</h6>
                                                    <p className="card-text card-des fw-medium">{val.description}</p>
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
    )
}

