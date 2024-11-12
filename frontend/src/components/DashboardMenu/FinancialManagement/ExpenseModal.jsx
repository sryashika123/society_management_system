import React, { useState } from 'react';
import { Modal, Form, InputGroup, Row, Col } from 'react-bootstrap';
import { TbPhotoUp } from "react-icons/tb";

const ExpenseModal = ({ showModal, handleClose, handleSubmit }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [amount, setAmount] = useState('');
    const [file, setFile] = useState(null);
    const [fileName, setFileName] = useState('');

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            // Validate file type (only allow images)
            if (['image/png', 'image/jpeg', 'image/gif'].includes(selectedFile.type)) {
                // Validate file size (max 10MB)
                if (selectedFile.size <= 10 * 1024 * 1024) {
                    setFile(selectedFile);
                    setFileName(selectedFile.name);
                } else {
                    alert('File size exceeds 10MB');
                }
            } else {
                alert('Only image files (PNG, JPEG, GIF) are allowed');
            }
        }

    };

    // Handle form submission
    const handleFormSubmit = (e) => {
        e.preventDefault();
        const formData = { title, description, date, amount, file };
        handleSubmit(formData);  // Send form data to the parent component
        handleClose();  // Close modal after submission
    };


    return (
        <Modal show={showModal} onHide={handleClose} centered className="square-modal" >
            <Modal.Header closeButton style={{ borderBottom: 'none' }}>
                <Modal.Title>Add New Expense</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleFormSubmit} style={{ color: '#202224', fontWeight: '500' }}>
                    <Form.Group controlId="formTitle">
                        <Form.Label>Title
                            <span className="text-danger">*</span>
                        </Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId="formDescription">
                        <Form.Label className='mt-3'>Description
                            <span className="text-danger">*</span>

                        </Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            placeholder="Enter description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Row>
                        <Col md={6}>
                            <Form.Group controlId="formDate">
                                <Form.Label className="mt-3">
                                    Date <span className="text-danger">*</span>
                                </Form.Label>
                                <Form.Control
                                    type="date"
                                    value={date}
                                    onChange={(e) => setDate(e.target.value)}
                                    required
                                />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group controlId="formAmount">
                                <Form.Label className="mt-3">
                                    Amount <span className="text-danger">*</span>
                                </Form.Label>
                                <InputGroup>
                                    <InputGroup.Text>₹</InputGroup.Text>
                                    <Form.Control
                                        type="number"
                                        placeholder="Enter amount"
                                        value={amount}
                                        onChange={(e) => setAmount(e.target.value)}
                                        required
                                    />
                                </InputGroup>
                            </Form.Group>
                        </Col>
                    </Row>

                    <Form.Group controlId="formFile">
                        <Form.Label className='mt-3'>Upload Bill<span className="text-danger">*</span></Form.Label>
                        <div className="upload-bill-area text-center">
                            <input
                                type="file"
                                onChange={handleFileChange}
                                accept="image/png, image/jpeg, image/gif"
                                required
                                className="file-input"
                            />
                            <div className="upload-icon"><TbPhotoUp style={{ fontSize: '40px' }} /></div>
                            <p className="upload-text">Upload a file <strong className='text-dark'>or drag and drop</strong></p>
                            <small className="text-muted">PNG, JPG, GIF up to 10MB</small>
                            {fileName && <p><strong>Selected file:</strong> {fileName}</p>}
                        </div>
                    </Form.Group>

                    <div className="d-flex justify-content-between mt-3">
                        <button type="button" className="btn btn-outline-secondary"
                            style={{ width: '45%', borderRadius: '10px', paddingTop: '10px', paddingBottom: '10px', marginBottom: '15px', marginLeft: '5px' }}
                            onClick={handleClose}
                        >
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
                                marginRight: '5px',
                                paddingTop: '10px',
                                paddingBottom: '10px',
                            }}
                            data-bs-dismiss="modal"
                        >
                            Save
                        </button>
                    </div>
                </Form>
            </Modal.Body>
        </Modal >
    );
};

export default ExpenseModal;
