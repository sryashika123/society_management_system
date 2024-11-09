import React, { useState } from 'react';
import { Button, Card, Row, Col, Modal, Form, InputGroup } from 'react-bootstrap';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const MaintenanceComponent = () => {
	// State Hooks
	const [maintenanceAmount, setMaintenanceAmount] = useState(0);
	const [penaltyAmount, setPenaltyAmount] = useState(0);
	const [penaltyDays, setPenaltyDays] = useState('4 Days');
	const [dueDate, setDueDate] = useState('');
	const [password, setPassword] = useState('');
	const [showPassword, setShowPassword] = useState(false);
	const [error, setError] = useState('');

	// Modal States
	const [showPasswordModal, setShowPasswordModal] = useState(false);
	const [showMaintenanceModal, setShowMaintenanceModal] = useState(false);

	const correctPassword = 'password123'; // Replace with actual password

	// Handlers
	const handlePasswordModalClose = () => {
		setShowPasswordModal(false);
		setPassword('');
		setError('');
	};

	const handleMaintenanceModalClose = () => {
		setShowMaintenanceModal(false);
	};

	const handlePasswordChange = (e) => {
		setPassword(e.target.value);
		setError('');
	};

	const handleSubmitPassword = (e) => {
		e.preventDefault();
		if (password === correctPassword) {
			setShowPasswordModal(false);
			setShowMaintenanceModal(true);
		} else {
			setError('Incorrect Password.');
		}
	};

	const handleApply = () => {
		alert('Maintenance details applied successfully!');
		handleMaintenanceModalClose();
	};

	return (
		<>
			<div
				className="d-flex align-items-center justify-content-between p-4"
				style={{ backgroundColor: '#ffffff', borderRadius: '8px' }}
			>
				<Row>
					<Col>
						<Card className="shadow-sm" style={{ borderLeft: '4px solid green', width: '250px' }}>
							<Card.Body>
								<Card.Title>Maintenance Amount</Card.Title>
								<h4 style={{ color: 'green' }}>₹ {maintenanceAmount}</h4>
							</Card.Body>
						</Card>
					</Col>
					<Col>
						<Card className="shadow-sm" style={{ borderLeft: '4px solid red', width: '250px' }}>
							<Card.Body>
								<Card.Title>Penalty Amount</Card.Title>
								<h4 style={{ color: 'red' }}>₹ {penaltyAmount}</h4>
							</Card.Body>
						</Card>
					</Col>
				</Row>
				<Button
					className="mainColor2"
					style={{
						color: 'white',
						padding: '10px 20px',
						borderRadius: '8px',
						border: 'none',
					}}
					onClick={() => setShowPasswordModal(true)}
				>
					Set Maintenance
				</Button>

				{/* Password Modal */}
				<Modal show={showPasswordModal} onHide={handlePasswordModalClose} centered>
					<Modal.Header closeButton>
						<Modal.Title>Enter Password</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<Form onSubmit={handleSubmitPassword}>
							<Form.Group controlId="formPassword">
								<Form.Label>Password <span className="text-danger">*</span></Form.Label>
								<InputGroup className="mb-3">
									<Form.Control
										type={showPassword ? 'text' : 'password'}
										value={password}
										onChange={handlePasswordChange}
										isInvalid={!!error}
										required
									/>
									<span
										className="input-group-text"
										onClick={() => setShowPassword(!showPassword)}
										style={{ cursor: 'pointer' }}
									>
										{showPassword ? <FaEyeSlash /> : <FaEye />}
									</span>
								</InputGroup>
								<Form.Control.Feedback type="invalid">
									{error}
								</Form.Control.Feedback>
							</Form.Group>
							<div className="d-flex justify-content-between">
								<button type="button" className="btn btn-outline-secondary"
									style={{ width: '45%', borderRadius: '10px', marginBottom: '10px', marginLeft: '5px' }}
									onClick={handlePasswordModalClose}>
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
										marginBottom: '10px',
										marginRight: '5px'
									}}
									data-bs-dismiss="modal"
								>
									Continue
								</button>
							</div>
						</Form>
					</Modal.Body>
				</Modal>

				{/* Maintenance Modal */}
				<Modal show={showMaintenanceModal} onHide={handleMaintenanceModalClose} centered >
					<Modal.Header closeButton style={{ borderBottom: 'none' }}>
						<Modal.Title >Add Maintenance Detail</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<Form>
							<Form.Group className="mb-3">
								<Row>
									{/* Maintenance Amount */}
									<Col md={6}>
										<Form.Label style={{ color: '#202224', fontWeight: '500' }}>Maintenance Amount</Form.Label>
										<InputGroup>
											<InputGroup.Text className='fw-bold'>₹</InputGroup.Text>
											<Form.Control
												type="number"
												value={maintenanceAmount}
												onChange={(e) => setMaintenanceAmount(e.target.value)}

											/>
										</InputGroup>
									</Col>

									{/* Penalty Amount */}
									<Col md={6}>
										<Form.Label style={{ color: '#202224', fontWeight: '500' }}>Penalty Amount</Form.Label>
										<InputGroup>
											<InputGroup.Text className='fw-bold'>₹</InputGroup.Text>
											<Form.Control
												type="number"
												value={penaltyAmount}
												onChange={(e) => setPenaltyAmount(e.target.value)}
											/>
										</InputGroup>
									</Col>
								</Row>
							</Form.Group>


							{/* Maintenance Due Date */}
							<Form.Group className="mb-3">
								<Form.Label style={{ color: '#202224', fontWeight: '500' }}>Maintenance Due Date</Form.Label>
								<Form.Control
									type="date"
									value={dueDate}
									onChange={(e) => setDueDate(e.target.value)}
								/>
							</Form.Group>

							{/* Penalty Days Selection */}
							<Form.Group >
								<Form.Label style={{ color: '#202224', fontWeight: '500' }}>Penalty Applied After Day Selection</Form.Label>
								<Form.Select
									value={penaltyDays}
									onChange={(e) => setPenaltyDays(e.target.value)}
								>
									<option value="4 Days">4 Days</option>
									<option value="7 Days">7 Days</option>
									<option value="10 Days">10 Days</option>
								</Form.Select>
							</Form.Group>
						</Form>
					</Modal.Body>
					<div className="d-flex justify-content-between">
						<button type="button" className="btn btn-outline-secondary"
							style={{ width: '45%', borderRadius: '10px', paddingTop: '10px', paddingBottom: '10px', marginBottom: '15px', marginLeft: '15px' }}
							onClick={handleMaintenanceModalClose}>
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
							onClick={handleApply}
						>
							Apply
						</button>
					</div>
				</Modal>
			</div>
		</>
	);
};

export default MaintenanceComponent;
