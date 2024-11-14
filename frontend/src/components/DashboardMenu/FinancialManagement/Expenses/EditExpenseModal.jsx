import React, { useState, useEffect } from 'react';
import { Modal, Form, Col, Row } from 'react-bootstrap';
import { LuImagePlus } from 'react-icons/lu';

const EditExpenseModal = ({ isOpen, onClose, expense , handleSubmit }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [amount, setAmount] = useState('');
    const [file, setFile] = useState(null);
    const [fileName, setFileName] = useState(''); // For displaying selected file name
    const [fileUploadMessage, setFileUploadMessage] = useState('');

    // When modal opens, set the data of the expense being edited
    useEffect(() => {
        if (expense) {
            setTitle(expense.title);
            setDescription(expense.description);
            setDate(expense.date);
            setAmount(expense.amount);
            setFile(expense.file); // Set file if any
            setFileName(expense.file ? expense.file.name : ''); // Display file name if file exists
            setFileUploadMessage(''); // Reset upload message
        }
    }, [expense]);

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
    
        if (file) {
            // Check file type
            if (file.size > 10 * 1024 * 1024) { // 10MB max size
                setFileUploadMessage('File is too large! Max size is 10MB.');
            } else {
                setFileName(file.name);
                setFileUploadMessage('File uploaded successfully!');
            }
        } else {
            setFileName('');
            setFileUploadMessage('');
        }
    };

    const handleSave = () => {
        const updatedExpenseData = { title, description, date, amount, file };
        
        // Pass the updated data to the parent to update the expense
        handleSubmit(updatedExpenseData);

        // Close the modal after saving
        onClose();
    };


    return (
        <Modal show={isOpen} onHide={onClose} centered className="square-modal">
            <Modal.Header closeButton style={{ borderBottom: 'none' }}>
                <Modal.Title>Edit Expenses</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form style={{ color: '#202224', fontWeight: '500' }}>
                    <Form.Group className="mb-3" controlId="formTitle" >
                        <Form.Label>Title
                            <span className="text-danger">*</span>
                        </Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Rent or Mortgage"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formDescription">
                        <Form.Label>Description
                            <span className="text-danger">*</span>
                        </Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            placeholder="Description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Row>
                        <Col md={6} className="mb-3">
                            <Form.Group className="mb-3" controlId="formDate">
                                <Form.Label>Date
                                    <span className="text-danger">*</span>
                                </Form.Label>
                                <Form.Control
                                    type="date"
                                    value={date}
                                    onChange={(e) => setDate(e.target.value)}
                                    required
                                />
                            </Form.Group>

                        </Col>
                        <Col md={6} className="mb-3">
                            <Form.Group className="mb-3" controlId="formAmount">
                                <Form.Label>Amount <span className="text-danger">*</span></Form.Label>
                                <div className="input-group">
                                    <span className="input-group-text">₹</span>
                                    <Form.Control
                                        type="number"
                                        placeholder="Enter amount"
                                        value={amount}
                                        onChange={(e) => setAmount(e.target.value)}
                                        required
                                    />
                                </div>
                            </Form.Group>


                        </Col>

                    </Row>
                    {/* File upload field */}
                    <Form.Group controlId="formFile">
                        <Form.Label className="mt-3">
                            Upload Bill <span className="text-danger">*</span>
                        </Form.Label>
                        <div className="upload-bill-area text-center">
                            <input
                                type="file"
                                onChange={handleFileUpload}
                                accept="image/png, image/jpeg, image/gif"
                                required
                                className="file-input"
                            />
                            <div className="upload-icon">
                                <LuImagePlus style={{ fontSize: '40px' }} />
                            </div>
                            <p className="upload-text">Upload a file <strong className="text-dark">or drag and drop</strong></p>
                            <small className="text-muted">PNG, JPG, GIF up to 10MB</small>
                            {fileName && <p><strong>Selected file:</strong> {fileName}</p>}
                            {fileUploadMessage && <div className="text-success">{fileUploadMessage}</div>}
                        </div>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <div className="d-flex justify-content-between ">
                <button type="button" className="btn btn-outline-secondary"
                    style={{ width: '45%', borderRadius: '10px', paddingTop: '10px', paddingBottom: '10px', marginBottom: '15px', marginLeft: '15px' }}
                    onClick={onclose}
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
                        marginRight: '15px',
                        paddingTop: '10px',
                        paddingBottom: '10px',
                    }}
                    onClick={handleSave}
                    data-bs-dismiss="modal"
                >
                    Save
                </button>
            </div>
        </Modal>
    );
};

export default EditExpenseModal;
