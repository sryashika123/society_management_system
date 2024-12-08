import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement } from 'chart.js';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Button, Modal, Form, Col, Card, ListGroup } from 'react-bootstrap';
import { FaSquarePlus } from 'react-icons/fa6';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

export default function TotalBalanceChart() {
    const data = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
            {
                label: 'Total Balance',
                data: [10000, 12000, 18000, 25000, 22000, 30000, 35000, 28000, 34000, 40000, 45000, 42000],
                borderColor: '#6366F1',
                backgroundColor: 'rgba(99, 102, 241, 0.2)',
                pointBackgroundColor: '#6366F1',
                fill: true,
                tension: 0.4,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            tooltip: {
                callbacks: {
                    label: (tooltipItem) => `${tooltipItem.raw.toLocaleString()}`
                }
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    callback: (value) => `${value / 1000}k`,
                },
            },
        },
    };

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
    const [maintenances, setMaintenances] = useState([
        { img: require('../assets/maintainance1.png'), name: 'Hanna Donin', pandingMonth: '2 Month Pending ' },
        { img: require('../assets/maintainance2.png'), name: 'Hanna Donin', pandingMonth: '2 Month Pending ' },
        { img: require('../assets/maintainance3.png'), name: 'Hanna Donin', pandingMonth: '2 Month Pending ' },
        { img: require('../assets/mainatainance4.png'), name: 'Hanna Donin', pandingMonth: '2 Month Pending ' },
        { img: require('../assets/maintainance5.png'), name: 'Hanna Donin', pandingMonth: '2 Month Pending ' },
        // Add more contacts if needed
    ]);

    return (
        <div className='container-fluid py-2'>
            <div className='row px-3 py-1'>
                <div className='col-lg-6 py-0 px-1'>
                    <div className="chart-container" style={{ borderRadius: '12px', background: '#f9fafb', maxWidth: '1000px' }}>
                        <div className='d-flex justify-content-between align-items-center mb-2 '>
                            <h2>Total Balance</h2>
                            <div>
                                <select className='month-btn rounded-2 d-flex align-items-center bg-light text-dark'>
                                    <option>Last week</option>
                                    <option>Last month</option>
                                    <option>Last year</option>
                                </select>
                            </div>
                        </div>
                        <Line data={data} options={options} />
                    </div>
                </div>

                <Col
                    xs={12}        // Full width on extra small screens (mobile)
                    sm={12}        // Full width on small screens (tablet portrait)
                    md={6}         // Half width on medium screens (tablet landscape)
                    lg={4}         // One-third width on large screens (desktop)
                    xl={3}         // Quarter width on extra-large screens
                    style={{
                        overflowY: 'scroll', // Enable scroll for overflow content
                        maxHeight: '47.5vh', 
                        borderRadius: '12px'  // Set max height for column
                    }}
                    className="custom-scrollbar py-4 px-2 bg-white rounded-lg shadow-md max-w-md mx-auto"
                >
                    <div>
                        <Card.Header
                            style={{
                                borderBottom: 'none',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                backgroundColor: 'white',
                                paddingLeft: '13px',
                                
                            }}
                        >
                            <span style={{ fontSize: '22px' , fontWeight: '600'}}>Important Numbers</span>
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
                                    marginRight: '20px',
                                }}
                                onClick={handleAdd}
                            >
                                <FaSquarePlus />
                                &nbsp; <span style={{ color: 'white',  fontSize: '16px', fontWeight: '500' }}>Add</span>
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
                                            <img src={require('../assets/delete.png')} style={{ color: 'red', fontSize: '20px', marginBottom: '20px' }} />
                                        </Button>
                                        <Button
                                            style={{ backgroundColor: 'white', border: 'none' }}
                                            size="sm"
                                            onClick={() => handleEdit(index)}
                                        >
                                            <img src={require('../assets/edit.png')} style={{ color: 'green', fontSize: '24px', marginBottom: '20px' }} />
                                        </Button>
                                    </div>
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    </div>

                    {/* Add/Edit Modal */}
                    <Modal show={showModal} onHide={handleCloseModal} centered className="square-modal">
                        <Modal.Header closeButton style={{ border: 'none' }}>
                            <Modal.Title>
                                {isAddMode ? 'Add Important Number' : 'Edit Important Number'}
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body style={{ color:'#202224' , fontWeight: '500'}}>
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
                        <Modal.Footer className='d-flex justify-content-between' style={{ borderTop: 'none' }}>
                            <button
                                type="button"
                                className="btn btn-outline-secondary"
                                onClick={handleCloseModal}
                                style={{ width: '45%', borderRadius: '10px'  }}
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
                    <Modal show={showDeleteModal} onHide={handleCloseDeleteModal} centered className='square-modal'>
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


                <div className='col-lg-3 px-1  '>
                    <div className="maintenances py-4 px-2 bg-white rounded-lg shadow-md max-w-md mx-auto custom-scrollbar" style={{ borderRadius: '12px', overflowY: 'auto' }}>
                        <div className="d-flex justify-content-between mb-2">
                            <h2>Pending Maintenances</h2>

                            <p><Link className='text-decoration-none'>View all</Link></p>

                        </div>

                        <div>
                            {maintenances.map((maintenances, index) => (
                                <div key={index} className="py-3 rounded-lg d-flex justify-content-between align-items-center shadow-sm ">
                                    <div className='d-flex'>
                                        <div className='me-2'>
                                            <img src={maintenances.img} />
                                        </div>
                                        <div>
                                            <p className='mb-1 maintenances-p'>{maintenances.name}</p>
                                            <p className='mb-1 maintenances-panding'>{maintenances.pandingMonth}</p>
                                        </div>
                                    </div>
                                    <div>
                                        <h6>₹ 5,000</h6>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>


            </div>
        </div>
    );
}
