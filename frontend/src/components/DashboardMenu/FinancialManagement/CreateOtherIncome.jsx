import React, { useState } from 'react';
import { Modal, Form, Col, Row, InputGroup } from 'react-bootstrap';

function CreateOtherIncome({ showModal, onClose }) {
    const [title, setTitle] = useState('');
    const [date, setDate] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');
    const handleSave = () => {
        console.log({ title, date, dueDate, description, amount });

        // const incomeData = { title, date, dueDate, description, amount };
        onClose(); // Close modal after saving
    };
    const handleCancel = () => {
        setTitle('');
        setDate('');
        setDueDate('');
        setDescription('');
        setAmount('');
        onClose(); // Close modal after canceling
    };
    return (
        <Modal show={showModal} onHide={onClose} centered>
            <Modal.Header closeButton style={{ borderBottom: 'none' }}>
                <Modal.Title>Create Other Income</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={(e) => e.preventDefault()}>
                    <Form.Group controlId="formTitle" className="mb-3" style={{ color: '#202224', fontWeight: '500' }}>
                        <Form.Label>Title
                            <span className='text-danger'>*</span>
                        </Form.Label>
                        <Form.Control
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Enter Title"
                            required
                        />
                    </Form.Group>

                    <Row className="mb-3">
                        <Col md={6}>
                            <Form.Group controlId="formDate" className="mb-3" style={{ color: '#202224', fontWeight: '500' }}>
                                <Form.Label>Date
                                    <span className='text-danger'>*</span>

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
                            <Form.Group controlId="formDueDate" className="mb-3" style={{ color: '#202224', fontWeight: '500' }}>
                                <Form.Label>Due Date
                                    <span className='text-danger'>*</span>

                                </Form.Label>
                                <Form.Control
                                    type="date"
                                    value={dueDate}
                                    onChange={(e) => setDueDate(e.target.value)}
                                    required
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Form.Group controlId="formDescription" className="mb-3" style={{ color: '#202224', fontWeight: '500' }}>
                        <Form.Label>Description
                            <span className='text-danger'>*</span>

                        </Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={2}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Enter Description"
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="formAmount" className="mb-3" style={{ color: '#202224', fontWeight: '500' }}>
                        <Form.Label>Amount
                            <span className='text-danger'>*</span>
                        </Form.Label>
                        <InputGroup>
                            <InputGroup.Text className='fw-bold'>₹</InputGroup.Text>
                            <Form.Control
                                type="number"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                placeholder="0000"
                                required
                            />
                        </InputGroup>
                    </Form.Group>
                    <div className="d-flex justify-content-between">
                        <button type="button" className="btn btn-outline-secondary"
                            style={{ width: '45%', borderRadius: '10px', paddingTop: '10px', paddingBottom: '10px', marginBottom: '15px', marginLeft: '5px' }}
                            onClick={handleCancel}>
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
                            onClick={handleSave}
                        >
                            Save
                        </button>
                    </div>
                </Form>
            </Modal.Body>
        </Modal >
    );
}
export default CreateOtherIncome;
