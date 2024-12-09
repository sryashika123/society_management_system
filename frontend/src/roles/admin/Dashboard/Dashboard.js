import React, { useEffect, useState, useRef } from 'react';
import { Col, Row, Card, ListGroup, Button, Form, Modal, Image, Dropdown, Navbar } from 'react-bootstrap';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import './RightSection.css';
import SideBar from '../../../component/Layout/Sidebar';
import { FaSquarePlus } from "react-icons/fa6";
import ComplaintList from './Complaintlist';
import { Link } from 'react-router-dom';
import BalanceInformation from './BalanceInfromation';
import axios from 'axios';
import Header from '../../../component/Layout/Header';


// Register the necessary components from Chart.js
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const RightSection = () => {
	const chartRef = useRef(null); // To hold the reference of the chart for cleanup

	// State hooks to manage dynamic data
	const [importantNumbers, setImportantNumbers] = useState([]);
	const [editIndex, setEditIndex] = useState(null);
	const [editData, setEditData] = useState({ Full_name: '', Phone_number: '', Work: '' });
	const [showModal, setShowModal] = useState(false);
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const [isAddMode, setIsAddMode] = useState(false);
	const [selectedIndex, setSelectedIndex] = useState(null);
	const [selectedId, setSelectedId] = useState(null);



	// Fetch important numbers on component mount
	useEffect(() => {
		// const storedAdminId = localStorage.getItem("adminId") || "";
		// const storedSocietyId = localStorage.getItem("societyId") || "";
		// setEditData((prevData) => ({
		//   ...prevData,
		//   adminId: storedAdminId,
		//   societyId: storedSocietyId,
		// }));
		fetchImportantNumbers();
	  }, []);

	// Fetch important numbers
	const fetchImportantNumbers = () => {
		axios.get(`${process.env.REACT_APP_API_URL}/users/v3/getImportantNum`)
			.then(response => setImportantNumbers(response.data))
			.catch(error => console.error('Error fetching important numbers:', error));
	};

	// Handle Add mode
	const handleAdd = () => {
		setEditData({ Full_name: '', Phone_number: '', Work: '' });
		setIsAddMode(true);
		setShowModal(true);
	};

	// Handle Edit mode
	const handleEdit = (index) => {
		const contact = importantNumbers[index];
		setEditIndex(index);
		setEditData(contact);
		setSelectedId(contact._id);
		setIsAddMode(false);
		setShowModal(true);
	};

	// Handle Delete
	const handleDelete = (index) => {
		const contact = importantNumbers[index];
		setSelectedIndex(index);
		setSelectedId(contact._id);
		setShowDeleteModal(true);
	};

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setEditData({ ...editData, [name]: value });
	};

	const handleSaveEdit = () => {
		const { Full_name, Phone_number, Work } = editData;
	
		const data = { Full_name, Phone_number, Work };
	
		if (isAddMode) {
		  // Add new contact
		  axios
			.post(`${process.env.REACT_APP_API_URL}/users/v3/createImportantNum`, data)
			.then((response) => {
			  setImportantNumbers([...importantNumbers, response.data]);
			  setShowModal(false);
			  console.log(response.data);
			  
			})
			.catch((error) => console.error("Error adding contact:", error));
		} else {
		  // Update existing contact
		  axios
			.put(`${process.env.REACT_APP_API_URL}/users/v3/updateImportantNum/${editData._id}`, data)
			.then((response) => {
			  const updatedNumbers = [...importantNumbers];
			  updatedNumbers[editIndex] = response.data.updateImportantNum;
			  setImportantNumbers(updatedNumbers);
			  setShowModal(false);
			})
			.catch((error) => console.error("Error updating contact:", error));
		}
	  };
	

	// Confirm deletion
	const confirmDelete = () => {
		axios.delete(`${process.env.REACT_APP_API_URL}/users/v3/deleteImportantNum/${selectedId}`)
			.then(() => {
				setImportantNumbers(importantNumbers.filter((_, i) => i !== selectedIndex));
				setShowDeleteModal(false);
			})
			.catch(error => {
				console.error('Error deleting contact:', error);
				alert('Failed to delete the contact.');
			});
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
		<div className=" flex-column flex-md-row vh-100" >
			{/* Sidebar Section */}
			<Col>
      <Header />
      </Col>

			{/* Right Section */}
      

			<Col xs={12} md={12} className="right-section p-3  dashboard-bg marginLeft" style={{width:"1600px" , marginTop:'70px'}}  >
      

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
												<strong>Name:</strong> {contact.Full_name}<br />
												<strong>Phone:</strong> {contact.Phone_number}<br />
												<strong>Work:</strong> {contact.Work}<br />
											</div>
											<div>
												<Button
													style={{ backgroundColor: 'white', border: 'none' }}
													size="sm"
													className="me-2"
													onClick={() => handleDelete(index)}
												>
													<img src={require('../../../assets/delete.png')} style={{ color: 'red', fontSize: '20px', marginBottom: '20px' }} />
												</Button>
												<Button
													style={{ backgroundColor: 'white', border: 'none' }}
													size="sm"
													onClick={() => handleEdit(index)}
												>
													<img src={require('../../../assets/edit.png')} style={{ color: 'green', fontSize: '24px', marginBottom: '20px' }} />
												</Button>
											</div>
										</ListGroup.Item>
									))}
								</ListGroup>
							</Card>

							{/* Add/Edit Modal */}
							<Modal show={showModal} onHide={handleCloseModal} centered className="square-modal ">
								<Modal.Header closeButton style={{ border: 'none' }}>
									<Modal.Title>
										{isAddMode ? 'Add Important Number' : 'Edit Important Number'}
									</Modal.Title>
								</Modal.Header>
								<Modal.Body>
									<Form.Group controlId="editName">
										<Form.Label>
											Full Name <span className="text-danger">*</span>
										</Form.Label>
										<Form.Control
											type="text"
											name="Full_name"
											placeholder="Enter Full Name"
											value={editData.Full_name}
											onChange={handleInputChange}
											required
										/>
									</Form.Group>
									<Form.Group controlId="editPhone" className="mt-3">
										<Form.Label>
											Phone <span className="text-danger">*</span>
										</Form.Label>
										<Form.Control
											type="text"
											name="Phone_number"
											placeholder="+91"
											value={editData.Phone_number}
											onChange={handleInputChange}
											required
										/>
									</Form.Group>
									<Form.Group controlId="editWork" className="mt-3">
										<Form.Label>
											Work <span className="text-danger">*</span>
										</Form.Label>
										<Form.Control
											type="text"
											name="Work"
											placeholder="Enter Work"
											value={editData.Work}
											onChange={handleInputChange}
											required
										/>
									</Form.Group>
								</Modal.Body>
								<Modal.Footer className='d-flex justify-content-between w-100'>
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
							<Modal show={showDeleteModal} onHide={handleCloseDeleteModal} centered className="square-modal ">
								<Modal.Header closeButton style={{ border: 'none' }}>
									<Modal.Title>Delete Number?</Modal.Title>
								</Modal.Header>
								<Modal.Body>Are you sure you want to delete this contact?</Modal.Body>
								<Modal.Footer className='d-flex justify-content-between px-3 pb-3 ' style={{ borderTop: 'none' }}>
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
							height: '35vh', // Set the height of the column for larger screens
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