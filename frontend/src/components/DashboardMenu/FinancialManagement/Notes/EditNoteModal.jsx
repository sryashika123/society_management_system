// EditNoteModal.js
import React, { useState } from 'react';
import { Modal, Form } from 'react-bootstrap';

const EditNoteModal = ({ show, handleClose, note, onSave }) => {
    // Initialize state with values from the note prop
    const [title, setTitle] = useState(note.title);
    const [description, setDescription] = useState(note.description);
    const [date, setDate] = useState(note.date);

    // Function to handle save button click
    const handleSave = () => {
        // Call onSave with the updated note data
        onSave({ title, description, date });
        handleClose(); // Close the modal
    };

    return (
        <Modal show={show} onHide={handleClose} centered className='square-modal'>
            <Modal.Header closeButton style={{ borderBottom: 'none' }}>
                <Modal.Title>Edit Note</Modal.Title>
            </Modal.Header>
            <Modal.Body >
                <Form style={{ color: '#202224', fontWeight: '500' }}>
                    <Form.Group controlId="formTitle">
                        <Form.Label>Title
                            <span className='text-danger'>*</span>
                        </Form.Label>
                        <Form.Control 
                            type="text" 
                            value={title} 
                            onChange={(e) => setTitle(e.target.value)} 
                        />
                    </Form.Group>

                    <Form.Group controlId="formDescription" className="mt-3">
                        <Form.Label>Description
                            <span className='text-danger'>*</span>
                        </Form.Label>
                        <Form.Control 
                            as="textarea" 
                            rows={3} 
                            value={description} 
                            onChange={(e) => setDescription(e.target.value)} 
                        />
                    </Form.Group>

                    <Form.Group controlId="formDate" className="mt-3">
                        <Form.Label>Date
                            <span className='text-danger'>*</span>
                        </Form.Label>
                        <Form.Control 
                            type="date" 
                            value={date} 
                            onChange={(e) => setDate(e.target.value)} 
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <div className="d-flex justify-content-between">
                <button type="button" className="btn btn-outline-secondary"
                    style={{ width: '45%', borderRadius: '10px', paddingTop: '10px', paddingBottom: '10px', marginBottom: '15px', marginLeft: '15px' }}
                    onClick={handleClose}>
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
                    onClick={handleSave}
                >
                    Save
                </button>
            </div>
        </Modal>
    );
};

export default EditNoteModal;