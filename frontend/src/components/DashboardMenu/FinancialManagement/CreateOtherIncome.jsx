import React, { useState } from 'react';
import { Modal, Form, Col, Row, InputGroup } from 'react-bootstrap';
import axios from 'axios';

function CreateOtherIncome({ showModal, onClose, onSave }) {
    const [income, setIncome] = useState({
        title: '',
        amountPerMember: '',
        totalMembers: '',
        date: '',
        dueDate: '',
        description: ''
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setIncome((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        // Ensure the date is formatted in 'YYYY-MM-DD' before sending to the backend
        const formattedDate = new Date(income.date).toISOString().split('T')[0];

        // Prepare data to be sent to the backend
        const dataToSend = {
            date: formattedDate,
            title: income.title,
            amountPerMember: income.amountPerMember,
            totalMembers: income.totalMembers,
            dueDate: income.dueDate,
            description: income.description
             
        };

        // Send POST request to the backend
        axios.post('http://localhost:8000/api/users/v13/createOtherIncome', dataToSend)
            .then(response => {
                console.log(response.data);  // Log the response from the backend
            })
            .catch(error => {
                console.error(error);  // Log any errors
            });
    };



    return (
        <Modal show={showModal} onHide={onClose} centered>
            <Modal.Header closeButton style={{ borderBottom: 'none' }}>
                <Modal.Title>Create Other Income</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formTitle" className="mb-3" style={{ color: '#202224', fontWeight: '500' }}>
                        <Form.Label>Title
                            <span className='text-danger'>*</span>
                        </Form.Label>
                        <Form.Control
                            type="text"
                            name='title'
                            value={income.title}
                            onChange={handleChange}
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
                                    name="date"
                                    value={income.date}
                                    onChange={handleChange}
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
                                    name='dueDate'
                                    value={income.dueDate}
                                    onChange={handleChange}
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
                            name='description'
                            value={income.description}
                            onChange={handleChange}
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
                                name='amountPerMember'
                                value={income.amountPerMember}
                                onChange={handleChange}
                                placeholder="0000"
                                required
                            />
                        </InputGroup>
                    </Form.Group>
                    <div className="d-flex justify-content-between">
                        <button type="button" className="btn btn-outline-secondary"
                            style={{ width: '45%', borderRadius: '10px', paddingTop: '10px', paddingBottom: '10px', marginBottom: '15px', marginLeft: '5px' }}
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
}
export default CreateOtherIncome;
