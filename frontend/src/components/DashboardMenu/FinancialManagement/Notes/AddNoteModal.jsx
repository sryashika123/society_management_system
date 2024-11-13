import React, { useState } from 'react';
import { Modal, Form } from 'react-bootstrap';

function AddNoteModal({ show, handleClose, handleSave }) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');

    const onSave = () => {
        // Create a new note object
        const newNote = { title, description, date };
        // Pass the new note to the parent component
        handleSave(newNote);
        // Reset the form fields
        setTitle('');
        setDescription('');
        setDate('');
        // Close the modal
        handleClose();
      };

    return (
        <Modal show={show} onHide={handleClose} centered className='square-modal'>
            <Modal.Header closeButton style={{ borderBottom: 'none' }}>
                <Modal.Title>Add Note</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form style={{ color: '#202224', fontWeight: '500' }}>
                    <Form.Group controlId="formTitle">
                        <Form.Label>Title
                            <span className='text-danger'>*</span>
                        </Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter Title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId="formDescription" className="mt-3">
                        <Form.Label>Description
                            <span className='text-danger'>*</span>
                        </Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={2}
                            placeholder="Enter Description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId="formDate" className="mt-3">
                        <Form.Label>Date</Form.Label>
                        <span className='text-danger'>*</span>
                        <Form.Control
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            required
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
                    onClick={onSave}
                >
                    Save
                </button>
            </div>
        </Modal>
    );
}

export default AddNoteModal;