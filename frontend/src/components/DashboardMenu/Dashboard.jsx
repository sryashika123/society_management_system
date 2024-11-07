import React, { useEffect, useState, useRef } from 'react';
import { Col, Row, Card, ListGroup, Button, Form, Modal, Image, Dropdown } from 'react-bootstrap';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { FaRegFileAlt, FaDollarSign, FaCreditCard, FaBuilding, FaTrashAlt, FaRegEdit} from 'react-icons/fa';
// import 'bootstrap/dist/css/bootstrap.min.css';
import './RightSection.css';
import SideBar from '../Layouts/Sidebar';
import { FaSquarePlus } from "react-icons/fa6";
import './PendingMaintenances.css';
import ComplaintList from './ComplaintList';
import { Link } from 'react-router-dom';

// Register the necessary components from Chart.js
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const RightSection = () => {
	const chartRef = useRef(null); // To hold the reference of the chart for cleanup

	const [cards] = useState([
		{ title: 'Total Balance', amount: '₹ 2,22,520', color: 'danger', icon: <FaRegFileAlt color='#ee6a42' /> },
		{ title: 'Total Income', amount: '₹ 55,000', color: 'success', icon: <FaDollarSign color='green' /> },
		{ title: 'Total Expense', amount: '₹ 20,550', color: 'info', icon: <FaCreditCard color='skyblue' /> },
		{ title: 'Total Unit', amount: '₹ 20,550', color: 'primary', icon: <FaBuilding color='purple' /> },
	]);

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
	const [upcomingActivities ] = useState([
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
		<div className="d-flex flex-column flex-md-row vh-100">
			{/* Sidebar Section */}
			<div className="col-12 col-md-3 flex-shrink-0" style={{ maxWidth: "300px" }}>
				<SideBar />
			</div>
			<Col xs={12} md={10} className="right-section p-3">

				{/* Top Cards for Balance Information */}
				<Row className="mb-3">
					{cards.map((card, idx) => (
						<div key={idx} className="col-12 col-md-6 col-lg-3 mb-3">
							<div className={`card border-${card.color}`} style={{ backgroundColor: 'white', borderRadius: '10px', border: 'none' }}>
								<div className="card-body d-flex align-items-center">
									<div>
										<h5 className="card-title" style={{ color: "black", fontSize: '16px' }}>{card.title}</h5>
										<p className="card-text fw-bold" style={{ color: "black", fontSize: '22px' }}>{card.amount}</p>
									</div>
									<div className="ms-auto text-end" style={{ fontSize: '22px', border: 'none', padding: '5px', borderRadius: '5px', backgroundColor: '#F6F8FB' }}>
										{card.icon}
									</div>
								</div>
							</div>
						</div>
					))}
				</Row>

				{/* Line Chart for Balance */}
				<Row className="mb-3">
					<Col md={6} >
						<Card className='p-3' style={{ minHeight: '400px' }}>
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
					<Col md={3} style={{
						overflowY: 'scroll', // Prevent overflow on the column
						height: '42vh', // Set the height of the column
					}}
						className="custom-scrollbar">
						<Card style={{ borderRadius: '10px', border: 'none' }}>
							<Card.Header style={{ borderBottom: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'white' }}>
								<span style={{ fontSize: '18px' }}>Important Numbers</span>
								<Button variant="primary" size="sm" className="float-end" style={{ backgroundColor: '#ee6a42', border: 'none', display: 'flex', alignItems: 'center', padding: '8px', borderRadius: '5px' }}
									onClick={handleAdd}>
									<FaSquarePlus />&nbsp; <span style={{ color: 'white', fontSize: '16px', fontWeight: '500' }}> Add</span>
								</Button>
							</Card.Header>
							<ListGroup variant="flush" >
								{importantNumbers.map((contact, index) => (
									<ListGroup.Item key={index} className="d-flex justify-content-between align-items-center" style={{ border: 'none' }}>
										<div>
											<strong>Name:</strong> {contact.name}<br />
											<strong>Phone:</strong> {contact.phone}<br />
											<strong>Work:</strong> {contact.work}
										</div>
										<div>
											<Button variant="danger" size="sm" className="me-2" onClick={() => handleDelete(index)}>
												<FaTrashAlt />

											</Button>
											<Button variant="success" size="sm" onClick={() => handleEdit(index)}>
												<FaRegEdit />
											</Button>
										</div>
									</ListGroup.Item>
								))}
							</ListGroup>
						</Card>


						<Modal show={showModal} onHide={handleCloseModal}>
							<Modal.Header closeButton style={{ border: 'none' }}>
								<Modal.Title>Add Important Number</Modal.Title>
							</Modal.Header>
							<Modal.Body >
								<Form.Group controlId="editName">
									<Form.Label style={{ color: '#202224', fontWeight: '500' }}>Full Name
										<span className="text-danger">*</span>
									</Form.Label>
									<Form.Control
										type="text"
										name="name"
										placeholder='Enter Full  Name'
										value={editData.name}
										onChange={handleInputChange}
										required
									/>
									<br></br>
								</Form.Group>
								<Form.Group controlId="editPhone">
									<Form.Label style={{ color: '#202224', fontWeight: '500' }}>Phone
										<span className="text-danger">*</span>
									</Form.Label>
									<Form.Control
										type="text"
										name="phone"
										placeholder='+91 '
										value={editData.phone}
										onChange={handleInputChange}
										required
									/>
									<br></br>
								</Form.Group>
								<Form.Group controlId="editWork">
									<Form.Label style={{ color: '#202224', fontWeight: '500' }}>Work
										<span className="text-danger">*</span>
									</Form.Label>
									<Form.Control
										type="text"
										name="work"
										placeholder='Enter Work'
										value={editData.work}
										onChange={handleInputChange}
										required
									/>


								</Form.Group>
							</Modal.Body>
							<div className="d-flex justify-content-between">
								<button type="button" className="btn btn-outline-secondary" onClick={handleCloseModal}
									style={{ width: '45%', borderRadius: '10px', marginBottom: '10px', marginLeft: '10px' }}
									data-bs-dismiss="modal">Cancel</button>
								<button
									type="submit"
									className="btn"
									onClick={handleSaveEdit}
									style={{
										background: 'linear-gradient(90deg, #FE512E 0%, #F09619 100%)',
										color: 'White',
										width: '45%',
										borderRadius: '10px',
										marginBottom: '10px',
										marginRight: '10px'
									}}
									data-bs-dismiss="modal"
								>
									Save
								</button>
							</div>
						</Modal>

						{/* Delete Confirmation Modal */}
						<Modal show={showDeleteModal} onHide={handleCloseDeleteModal} centered>
							<Modal.Header closeButton style={{ border: 'none' }}>
								<Modal.Title>Delete Number ?</Modal.Title>
							</Modal.Header>
							<Modal.Body style={{ color: '#A7A7A7' }}>Are you sure you want to delete this contact?</Modal.Body>
							<Modal.Footer style={{ border: 'none' }}>
								<button type="button" className="btn btn-outline-secondary"
									style={{ width: '45%', borderRadius: '10px', marginBottom: '10px', color: '#202224', marginRight: '20px' }}
									onClick={handleCloseDeleteModal}>Cancel
								</button>
								<button
									type="submit"
									className="btn"
									style={{ color: 'white', background: '#E74C3C', width: '45%', borderRadius: '10px', marginBottom: '10px', marginRight: '10px' }}
									onClick={confirmDelete}>Delete</button>
							</Modal.Footer>
						</Modal>

					</Col>

					{/* Pending Maintenances Section */}
					<Col md={3} style={{
						overflowY: 'scroll', // Prevent overflow on the column
						height: '42vh', // Set the height of the column
					}}
						className="custom-scrollbar" >
						<Card style={{ borderRadius: '10px', border: 'none' }}>
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
								<Link to="#">View All</Link>
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
												<div><div style={{ color: '#202224', fontWeight: '500' }}>{maintenance.name}</div>
													<div style={{ color: '#A7A7A7', fontWeight: '500', fontSize: '12px' }}> {maintenance.monthsPending} Month Pending</div></div>
											</div>
										</div>
										<div className='mainColor fw-bold'>₹ {maintenance.amount.toLocaleString()}</div>
									</ListGroup.Item>
								))}
							</ListGroup>
						</Card>
					</Col>
				</Row>

				{/* Complaint List */}
				<Row className="mb-3">
					<Col md={9}>
						<ComplaintList />
					</Col>
					{/* <Col md={9}>
						<Card >
							<Card.Header style={{ backgroundColor: 'white', borderRadius: '10px', border: 'none' }} >Complaint List</Card.Header>
							<Table responsive>
								<thead >
									<tr >
										<th >Complainer Name</th>
										<th>Complaint Name</th>
										<th>Date</th>
										<th>Priority</th>
										<th>Complain Status</th>
										<th>Action</th>
									</tr>
								</thead>
								<tbody className='ms-2'>
									{complaints.map((complaint, index) => (
										<tr key={index} >
											<td className="d-flex align-items-center"  style={{border: 'none'}}>
												
												<Image src={complaint.imageUrl || "https://via.placeholder.com/40"} roundedCircle width={40} height={40} className="me-3" alt="User Avatar" />
												{complaint.name}
											</td>
											<td style={{border: 'none'}}>{complaint.complaint}</td>
											<td style={{border: 'none'}}>{complaint.date}</td>
											<td style={{border: 'none'}}>
												<Badge pill style={{ width: '70px', padding: '10px', fontSize: '12px' }} bg={complaint.priority === "High" ? "danger" : complaint.priority === "Medium" ? "primary" : "success"}>{complaint.priority}</Badge>
											</td>
											<td style={{border: 'none'}}>{complaint.status}</td>
											<td style={{border: 'none'}}>
												<Button variant="success" size="sm" className="me-2"><FaEdit /></Button>
												<Button variant="info" size="sm" className="me-2"><FaEye /></Button>
												<Button variant="danger" size="sm" onClick={() => handleDelete(index, "complaint")}><FaTrash /></Button>
											</td>
										</tr>
									))}
								</tbody>
							</Table>
						</Card>
					</Col> */}



					{/* Upcoming Activity Form */}

					<Col md={3}
						style={{
							overflowY: 'scroll', // Prevent overflow on the column
							height: '33vh', // Set the height of the column
						}}
						className="custom-scrollbar">
						<Card style={{ borderRadius: '10px', border: 'none' }}>
							<Card.Header style={{
								borderBottom: 'none',
								display: 'flex',
								justifyContent: 'space-between',
								alignItems: 'center',
								backgroundColor: 'white',
								fontSize: '18px'
							}}><div >Upcoming Activity</div>

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
