import React, { useEffect, useState, useRef } from 'react';
import { Col, Row, Card, ListGroup, Button, Form, Modal, Image, Dropdown } from 'react-bootstrap';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { FaTrashAlt } from 'react-icons/fa';
import { MdEditSquare } from "react-icons/md";
import './RightSection.css';
import SideBar from '../Layouts/Sidebar';
import { FaSquarePlus } from "react-icons/fa6";
import './PendingMaintenances.css';
import ComplaintList from './ComplaintList';
import { Link } from 'react-router-dom';
import BalanceInformation from './BalanceInformation';


// Register the necessary components from Chart.js
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const RightSection = () => {
	const chartRef = useRef(null); // To hold the reference of the chart for cleanup

	// State hooks to manage dynamic data
	const [importantNumbers, setImportantNumbers] = useState([
		{ name: 'Hanna Donin', phone: '+91 99857 33657', work: 'Plumber' },
		{ name: 'John Doe', phone: '+91 98765 43210', work: 'Electrician' },
		{ name: 'Jane Smith', phone: '+91 91234 56789', work: 'Carpenter' },
		{ name: 'John Doe', phone: '+91 98765 43210', work: 'Electrician' },
		{ name: 'John Doe', phone: '+91 98765 43210', work: 'Electrician' },
		{ name: 'John Doe', phone: '+91 98765 43210', work: 'Electrician' },
	]);
	const [editIndex, setEditIndex] = useState(null);
	const [editData, setEditData] = useState({ name: '', phone: '', work: '' });
	const [showModal, setShowModal] = useState(false);
	const [showDeleteModal, setShowDeleteModal] = useState(false); // New state for delete confirmation modal
	const [isAddMode, setIsAddMode] = useState(false); // Add mode flag
	const [selectedIndex, setSelectedIndex] = useState(null); // Track index to delete
	// Handle add
	const handleAdd = () => {
		setEditData({ name: '', phone: '', work: '' });
		setIsAddMode(true);
		setShowModal(true);
	};

	// Handle edit initialization
	const handleEdit = (index) => {
		setEditIndex(index);
		setEditData(importantNumbers[index]);
		setShowModal(true); // Open modal for editing
	};

	// Handle delete
	const handleDelete = (index) => {
		setSelectedIndex(index);
		setShowDeleteModal(true); // Show delete confirmation modal
	};


	// Handle input change in edit form
	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setEditData({ ...editData, [name]: value });
	};

	// Handle save for both adding and editing
	const handleSaveEdit = () => {
		if (isAddMode) {
			setImportantNumbers([...importantNumbers, editData]); // Add new contact
		} else {
			const updatedNumbers = [...importantNumbers];
			updatedNumbers[editIndex] = editData;
			setImportantNumbers(updatedNumbers); // Save edits
		}
		setShowModal(false);
		setEditIndex(null);
	};

	// Confirm deletion
	const confirmDelete = () => {
		if (selectedIndex !== null) {
			// Remove the contact at selectedIndex
			setImportantNumbers(importantNumbers.filter((_, i) => i !== selectedIndex));

			// Close the delete confirmation modal
			setShowDeleteModal(false);

			// Reset selectedIndex to null
			setSelectedIndex(null);
		}
	};

	// Close modals
	const handleCloseModal = () => setShowModal(false);
	const handleCloseDeleteModal = () => setShowDeleteModal(false);

	/* --------------------------- pendingMaintenances -------------------------- */

	const [maintenances, setMaintenances] = useState([]);

	useEffect(() => {
		// Mock API data
		setMaintenances([
			{ id: 1, name: 'Roger Lubin', monthsPending: 2, amount: 5000 },
			{ id: 2, name: 'John Doe', monthsPending: 1, amount: 3000 },
			{ id: 3, name: 'Emma Stone', monthsPending: 3, amount: 7000 },
			{ id: 4, name: 'Sophia Turner', monthsPending: 4, amount: 8000 },
			{ id: 5, name: 'John Doe', monthsPending: 1, amount: 3000 },
			{ id: 6, name: 'John Doe', monthsPending: 1, amount: 3000 },
			{ id: 7, name: 'John Doe', monthsPending: 1, amount: 3000 },
			{ id: 8, name: 'John Doe', monthsPending: 1, amount: 3000 },

		]);
	}, []);


	// Upcoming activities state
	const [upcomingActivities] = useState([
		{ title: 'Society Meeting', time: '8:00 PM to 10:00 PM', date: '24-09-2024' },
		{ title: 'Holi Festival', time: '8:00 PM to 10:00 PM', date: '24-09-2024' },
		{ title: 'Ganesh Chaturthi', time: '8:00 PM to 10:00 PM', date: '24-09-2024' },
		{ title: 'Society Meeting', time: '8:00 PM to 10:00 PM', date: '24-09-2024' },
		{ title: 'Holi Festival', time: '8:00 PM to 10:00 PM', date: '24-09-2024' },
		{ title: 'Ganesh Chaturthi', time: '8:00 PM to 10:00 PM', date: '24-09-2024' },
	]);


	const [selectedPeriod, setSelectedPeriod] = useState('');


	// Data for the balance chart
	const balanceData = {
		labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
		datasets: [
			{
				label: 'Total Balance',
				data: [10000, 20000, 15000, 30000, 35000, 40000, 38000, 42000, 46000, 50000, 48000, 55000],
				fill: true,
				backgroundColor: 'rgba(54, 162, 235, 0.2)',
				borderColor: 'rgba(54, 162, 235, 1)',
				tension: 0.3,
			},
		],
	};

	// Cleanup chart instance on unmount
	useEffect(() => {
		const chartInstance = chartRef.current.chartInstance;
		return () => {
			if (chartInstance) {
				chartInstance.destroy(); // Ensure the previous chart is destroyed
			}
		};
	}, []);



	return (
		<div className="d-flex flex-column flex-md-row vh-100 ms-4">
			{/* Sidebar Section */}
			<div className="col-12 col-md-3 flex-shrink-0" style={{ maxWidth: "300px" }}>
				<SideBar />
			</div>

			{/* Right Section */}

			<Col xs={12} md={10} className="right-section p-3 ">
				

				{/* Top Cards for Balance Information */}
				<div>
					<Row className="">
						<BalanceInformation />
					</Row>

					{/* Line Chart for Balance */}
					<Row className="mb-3 ">
						<Col md={6} lg={6}>
							<Card className=" p-3 shadow-sm" style={{ minHeight: '400px', borderRadius: '10px' }}>
								<Card.Title>
									<span>Total Balance</span>
									{/* React Bootstrap Dropdown with Radio Buttons */}
									<Dropdown className="d-inline-flex" style={{ float: 'right' }}>
										<Dropdown.Toggle id="dropdownMenuButton" className="d-flex align-items-center" style={{ background: 'white', border: '1px solid #ced4da', color: 'black' }}>
											Month
										</Dropdown.Toggle>

										<Dropdown.Menu aria-labelledby="dropdownMenuButton">
											<Dropdown.Item as="button">
												<Form.Check
													type="radio"
													id="last-week"
													label="Last Week"
													checked={selectedPeriod === 'Last Week'}
													onChange={() => setSelectedPeriod('Last Week')}
												/>
											</Dropdown.Item>
											<Dropdown.Item as="button">
												<Form.Check
													type="radio"
													id="last-month"
													label="Last Month"
													checked={selectedPeriod === 'Last Month'}
													onChange={() => setSelectedPeriod('Last Month')}
												/>
											</Dropdown.Item>
											<Dropdown.Item as="button">
												<Form.Check
													type="radio"
													id="last-year"
													label="Last Year"
													checked={selectedPeriod === 'Last Year'}
													onChange={() => setSelectedPeriod('Last Year')}
												/>
											</Dropdown.Item>
										</Dropdown.Menu>
									</Dropdown>
								</Card.Title>
								<div style={{ height: '300px' }}>
									<Line ref={chartRef} data={balanceData} options={{ maintainAspectRatio: false }} />
								</div>
							</Card>
						</Col>

						{/* Important Numbers Section */}
						<Col
							xs={12}        // Full width on extra small screens (mobile)
							sm={12}        // Full width on small screens (tablet portrait)
							md={6}         // Half width on medium screens (tablet landscape)
							lg={4}         // One-third width on large screens (desktop)
							xl={3}         // Quarter width on extra-large screens
							style={{
								overflowY: 'scroll', // Enable scroll for overflow content
								maxHeight: '42vh',   // Set max height for column
							}}
							className="custom-scrollbar"
						>
							<Card className="shadow-sm" style={{ borderRadius: '10px' }}>
								<Card.Header
									style={{
										borderBottom: 'none',
										display: 'flex',
										justifyContent: 'space-between',
										alignItems: 'center',
										backgroundColor: 'white',
									}}
								>
									<span style={{ fontSize: '18px' }}>Important Numbers</span>
									<Button
										variant="primary"
										size="sm"
										className="float-end"
										style={{
											backgroundColor: '#ee6a42',
											border: 'none',
											display: 'flex',
											alignItems: 'center',
											padding: '8px',
											borderRadius: '5px',
										}}
										onClick={handleAdd}
									>
										<FaSquarePlus />
										&nbsp; <span style={{ color: 'white', fontSize: '16px', fontWeight: '500' }}>Add</span>
									</Button>
								</Card.Header>

								<ListGroup variant="flush">
									{importantNumbers.map((contact, index) => (
										<ListGroup.Item
											key={index}
											className="d-flex justify-content-between align-items-center"
											style={{ border: 'none' }}
										>
											<div>
												<strong>Name:</strong> {contact.name}<br />
												<strong>Phone:</strong> {contact.phone}<br />
												<strong>Work:</strong> {contact.work}
											</div>
											<div>
												<Button
													style={{ backgroundColor: 'white', border: 'none' }}
													size="sm"
													className="me-2"
													onClick={() => handleDelete(index)}
												>
													<FaTrashAlt style={{ color: 'red', fontSize: '20px' }} />
												</Button>
												<Button
													style={{ backgroundColor: 'white', border: 'none' }}
													size="sm"
													onClick={() => handleEdit(index)}
												>
													<MdEditSquare style={{ color: 'green', fontSize: '24px' }} />
												</Button>
											</div>
										</ListGroup.Item>
									))}
								</ListGroup>
							</Card>

							{/* Add/Edit Modal */}
							<Modal show={showModal} onHide={handleCloseModal} centered className="square-modal">
								<Modal.Header closeButton style={{ border: 'none' }}>
									<Modal.Title>Add Important Number</Modal.Title>
								</Modal.Header>
								<Modal.Body>
									<Form.Group controlId="editName">
										<Form.Label>Full Name <span className="text-danger">*</span></Form.Label>
										<Form.Control
											type="text"
											name="name"
											placeholder="Enter Full Name"
											value={editData.name}
											onChange={handleInputChange}
											required
										/>
									</Form.Group>
									<Form.Group controlId="editPhone" className="mt-3">
										<Form.Label>Phone <span className="text-danger">*</span></Form.Label>
										<Form.Control
											type="text"
											name="phone"
											placeholder="+91"
											value={editData.phone}
											onChange={handleInputChange}
											required
										/>
									</Form.Group>
									<Form.Group controlId="editWork" className="mt-3">
										<Form.Label>Work <span className="text-danger">*</span></Form.Label>
										<Form.Control
											type="text"
											name="work"
											placeholder="Enter Work"
											value={editData.work}
											onChange={handleInputChange}
											required
										/>
									</Form.Group>
								</Modal.Body>
								<Modal.Footer>
									<button
										type="button"
										className="btn btn-outline-secondary"
										onClick={handleCloseModal}
										style={{ width: '45%', borderRadius: '10px' }}
									>
										Cancel
									</button>
									<button
										type="submit"
										className="btn"
										onClick={handleSaveEdit}
										style={{
											background: 'linear-gradient(90deg, #FE512E 0%, #F09619 100%)',
											color: 'white',
											width: '45%',
											borderRadius: '10px',
										}}
									>
										Save
									</button>
								</Modal.Footer>
							</Modal>

							{/* Delete Confirmation Modal */}
							<Modal show={showDeleteModal} onHide={handleCloseDeleteModal} centered>
								<Modal.Header closeButton style={{ border: 'none' }}>
									<Modal.Title>Delete Number?</Modal.Title>
								</Modal.Header>
								<Modal.Body>Are you sure you want to delete this contact?</Modal.Body>
								<Modal.Footer className='d-flex justify-content-between' style={{ borderTop: 'none' }}>
									<button
										type="button"
										className="btn btn-outline-secondary"
										onClick={handleCloseDeleteModal}
										style={{ width: '45%', borderRadius: '10px' }}
									>
										Cancel
									</button>
									<button
										type="button"
										className="btn btn-danger"
										onClick={confirmDelete}
										style={{ width: '45%', borderRadius: '10px' }}
									>
										Delete
									</button>
								</Modal.Footer>
							</Modal>
						</Col>


						{/* Pending Maintenances Section */}
						<Col
							xs={12}        // Full width on extra small screens (mobile)
							sm={12}        // Full width on small screens (tablet portrait)
							md={6}         // Half width on medium screens (tablet landscape)
							lg={4}         // One-third width on large screens (desktop)
							xl={3}         // Quarter width on extra-large screens
							style={{
								overflowY: 'scroll', // Enable scroll for overflow content
								maxHeight: '42vh',   // Set max height for column
							}}
							className="custom-scrollbar"
						>
							<Card className="shadow-sm" style={{ borderRadius: '10px' }}>
								<Card.Header
									style={{
										borderBottom: 'none',
										display: 'flex',
										justifyContent: 'space-between',
										alignItems: 'center',
										backgroundColor: 'white',
										marginTop: '16px',
									}}
								>
									<span style={{ fontSize: '18px' }}>Pending Maintenances</span>
									<Link to="#" style={{ fontSize: '14px', color: '#007bff', textDecoration: 'none' }}>View All</Link>
								</Card.Header>

								<ListGroup variant="flush">
									{maintenances.map((maintenance, index) => (
										<ListGroup.Item
											key={index}
											className="d-flex justify-content-between align-items-center"
											style={{ border: 'none' }}
										>
											<div className="d-flex align-items-center">
												<Image
													src="https://via.placeholder.com/40"
													roundedCircle
													alt="User Avatar"
													className="me-2"
													style={{ width: '40px', height: '40px' }}
												/>
												<div>
													<div style={{ color: '#202224', fontWeight: '500' }}>{maintenance.name}</div>
													<div style={{ color: '#A7A7A7', fontWeight: '500', fontSize: '12px' }}>
														{maintenance.monthsPending} Month Pending
													</div>
												</div>
											</div>
											<div className="mainColor fw-bold">
												₹ {maintenance.amount.toLocaleString()}
											</div>
										</ListGroup.Item>
									))}
								</ListGroup>
							</Card>
						</Col>

					</Row>
				</div>

				{/* Complaint List */}
				<Row className="mb-3">
					<Col md={9}>
						<ComplaintList />
					</Col>

					{/* Upcoming Activity Form */}
					<Col xs={12}        // Full width on extra small screens (mobile)
						sm={12}        // Full width on small screens (tablet portrait)
						md={6}         // Half width on medium screens (tablet landscape)
						lg={4}         // One-third width on large screens (desktop)
						xl={3}         // Quarter width on extra-large screens
						style={{
							overflowY: 'scroll', // Prevent overflow on the column
							height: '33vh', // Set the height of the column for larger screens
						}}
						className="custom-scrollbar">
						<Card className="shadow-sm" style={{ borderRadius: '10px' }}>
							<Card.Header style={{
								borderBottom: 'none',
								display: 'flex',
								justifyContent: 'space-between',
								alignItems: 'center',
								backgroundColor: 'white',
								fontSize: '18px'
							}}>
								<div>Upcoming Activity</div>

								{/* React Bootstrap Dropdown with Radio Buttons */}
								<Dropdown className="d-inline-flex">
									<Dropdown.Toggle id="dropdownMenuButton" className="d-flex align-items-center" style={{ background: 'white', border: '1px solid #ced4da', color: 'black' }}>
										Month
									</Dropdown.Toggle>

									<Dropdown.Menu aria-labelledby="dropdownMenuButton">
										<Dropdown.Item as="button">
											<Form.Check
												type="radio"
												id="last-week"
												label="Last Week"
												checked={selectedPeriod === 'Last Week'}
												onChange={() => setSelectedPeriod('Last Week')}
											/>
										</Dropdown.Item>
										<Dropdown.Item as="button">
											<Form.Check
												type="radio"
												id="last-month"
												label="Last Month"
												checked={selectedPeriod === 'Last Month'}
												onChange={() => setSelectedPeriod('Last Month')}
											/>
										</Dropdown.Item>
										<Dropdown.Item as="button">
											<Form.Check
												type="radio"
												id="last-year"
												label="Last Year"
												checked={selectedPeriod === 'Last Year'}
												onChange={() => setSelectedPeriod('Last Year')}
											/>
										</Dropdown.Item>
									</Dropdown.Menu>
								</Dropdown>
							</Card.Header>
							<ListGroup variant="flush">
								{upcomingActivities.map((activity, index) => (
									<ListGroup.Item key={index} className="d-flex justify-content-between align-items-center"
										style={{ border: 'none' }}>
										<div className="d-flex align-items-center">
											<Image
												src="https://via.placeholder.com/40"
												roundedCircle
												alt="User Avatar"
												className="me-2"
												style={{ width: '40px', height: '40px' }}
											/>
											<div>
												<div>
													<div style={{ color: '#202224', fontWeight: '500' }}>{activity.title}</div>
												</div>
												<div style={{ color: '#A7A7A7', fontWeight: '500', fontSize: '12px' }}>{activity.time}</div>
											</div>
										</div>
										<div style={{ color: 'rgba(79, 79, 79, 1)' }}>{activity.date}</div>
									</ListGroup.Item>
								))}
							</ListGroup>
						</Card>
					</Col>

				</Row>
			</Col>
		</div>
	);
};

export default RightSection;
