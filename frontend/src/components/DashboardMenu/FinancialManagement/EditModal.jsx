import React, { useState, useEffect } from 'react';
import { Modal, Form, Col, Row } from 'react-bootstrap';

function EditModal({ show, handleClose, income, onSave }) {
    const [amount, setAmount] = useState('');
    const [date, setDate] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        if (income) {
            setAmount(income.amountPerMember); // Assuming amountPerMember is the field you're editing
            setDate(income.date);
            setDueDate(income.dueDate);
            setDescription(income.description);
        }
    }, [income]); // Update fields if the income changes

    const handleSave = () => {
        console.log('Updated Income:', { amount, date, dueDate, description });
        handleClose(); // Close the modal after saving
    };

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton style={{ borderBottom: 'none' }}>
                    <Modal.Title>Edit Income</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={(e) => e.preventDefault()}>
                        <Form.Group className="mb-3" style={{ color: '#202224', fontWeight: '500' }}>
                            <Form.Label>Amount
                                <span className='text-danger'>*</span>
                            </Form.Label>
                            <Form.Control
                                type="text"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                            />
                        </Form.Group>
                        <Row>
                        <Col md={6}>
                        <Form.Group className="mb-3" style={{ color: '#202224', fontWeight: '500' }}>
                            <Form.Label>Date
                                <span className='text-danger'>*</span>
                            </Form.Label>
                            <Form.Control
                                type="date"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                            />
                        </Form.Group>
                        </Col>
                        <Col md={6}>
                        <Form.Group className="mb-3" style={{ color: '#202224', fontWeight: '500' }}>
                            <Form.Label>Due Date
                                <span className='text-danger'>*</span>
                            </Form.Label>
                            <Form.Control
                                type="date"
                                value={dueDate}
                                onChange={(e) => setDueDate(e.target.value)}
                            />
                        </Form.Group>
                        </Col>
                        </Row>
                        <Form.Group  style={{ color: '#202224', fontWeight: '500' }}>
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

        </>
    );
}

export default EditModal;
