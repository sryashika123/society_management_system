import React, { useEffect, useState, useRef } from 'react';
import { Col, Row, Card, ListGroup, Button, Badge, Table, Form } from 'react-bootstrap';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { FaTrash, FaEdit, FaEye, FaRegFileAlt, FaDollarSign, FaCreditCard, FaBuilding } from 'react-icons/fa';
import { MdOutlineAdd } from 'react-icons/md';
import 'bootstrap/dist/css/bootstrap.min.css';
import './RightSection.css';
import SideBar from '../Layouts/Sidebar';

// Register the necessary components from Chart.js
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const RightSection = () => {
  const chartRef = useRef(null); // To hold the reference of the chart for cleanup

  const [cards] = useState([
    { title: 'Total Balance', amount: '₹ 2,22,520', color: 'danger', icon: <FaRegFileAlt color='#ee6a42' /> },
    { title: 'Total Income', amount: '₹ 55,000', color: 'success', icon: <FaDollarSign color='green'/> },
    { title: 'Total Expense', amount: '₹ 20,550', color: 'info', icon: <FaCreditCard color='skyblue'/> },
    { title: 'Total Unit', amount: '₹ 20,550', color: 'primary', icon: <FaBuilding color='purple'/> },
  ]);

  // State hooks to manage dynamic data
  const [importantNumbers, setImportantNumbers] = useState([
    { name: 'Hanna Donin', phone: '+91 99857 33657', work: 'Plumber' },
    { name: 'John Doe', phone: '+91 98765 43210', work: 'Electrician' },
    { name: 'Jane Smith', phone: '+91 91234 56789', work: 'Carpenter' },
  ]);

  const [pendingMaintenances, setPendingMaintenances] = useState([
    { name: 'Roger Lubin', monthsPending: 2, amount: 5000 },
    { name: 'Sophia Brown', monthsPending: 1, amount: 3000 },
    { name: 'Liam Jones', monthsPending: 3, amount: 4500 },
  ]);

  const [complaints, setComplaints] = useState([
    { name: 'Evelyn Harper', complaint: 'Unethical Behavior', date: '01/02/2024', priority: 'Medium', status: 'Open' },
    { name: 'Evelyn Harper', complaint: 'Unethical Behavior', date: '01/02/2024', priority: 'Low', status: 'Pending' },
    { name: 'Evelyn Harper', complaint: 'Unethical Behavior', date: '01/02/2024', priority: 'High', status: 'Solved' },
  ]);

  // Upcoming activities state
  const [upcomingActivities, setUpcomingActivities] = useState([
    { title: 'Society Meeting', time: '8:00 PM to 10:00 PM', date: '24-09-2024' },
    { title: 'Holi Festival', time: '8:00 PM to 10:00 PM', date: '24-09-2024' },
    { title: 'Ganesh Chaturthi', time: '8:00 PM to 10:00 PM', date: '24-09-2024' },
  ]);

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

  // Function to handle deletion of items (just for illustration)
  const handleDelete = (id, type) => {
    if (type === 'number') {
      setImportantNumbers(importantNumbers.filter((_, index) => index !== id));
    } else if (type === 'maintenance') {
      setPendingMaintenances(pendingMaintenances.filter((_, index) => index !== id));
    } else if (type === 'complaint') {
      setComplaints(complaints.filter((_, index) => index !== id));
    } else if (type === 'activity') {
      setUpcomingActivities(upcomingActivities.filter((_, index) => index !== id));
    }
  };

  // Function to handle adding a new activity
  const handleAddActivity = (newActivity) => {
    setUpcomingActivities([...upcomingActivities, newActivity]);
  };

  // Form handling for new activity
  const [newActivity, setNewActivity] = useState({
    title: '',
    time: '',
    date: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewActivity({ ...newActivity, [name]: value });
  };

  const handleSubmitActivity = (e) => {
    e.preventDefault();
    if (newActivity.title && newActivity.time && newActivity.date) {
      handleAddActivity(newActivity);
      setNewActivity({ title: '', time: '', date: '' }); // Reset form
    }
  };

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
          <Col md={6}>
            <Card className="p-3">
              <Card.Title>Total Balance</Card.Title>
              <Line ref={chartRef} data={balanceData} />
            </Card>
          </Col>

          {/* Important Numbers and Pending Maintenance */}
          <Col md={3}>
            <Card>
              <Card.Header>
                Important Numbers
                <Button variant="primary" size="sm" className="float-end">
                  <MdOutlineAdd /> Add
                </Button>
              </Card.Header>
              <ListGroup variant="flush">
                {importantNumbers.map((contact, index) => (
                  <ListGroup.Item key={index} className="d-flex justify-content-between align-items-center">
                    <div>
                      <strong>Name:</strong> {contact.name}<br />
                      <strong>Phone:</strong> {contact.phone}<br />
                      <strong>Work:</strong> {contact.work}
                    </div>
                    <div>
                      <Button variant="danger" size="sm" className="me-2" onClick={() => handleDelete(index, 'number')}><FaTrash /></Button>
                      <Button variant="success" size="sm"><FaEdit /></Button>
                    </div>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Card>
          </Col>

          <Col md={3}>
            <Card>
              <Card.Header>Pending Maintenances</Card.Header>
              <ListGroup variant="flush">
                {pendingMaintenances.map((maintenance, index) => (
                  <ListGroup.Item key={index} className="d-flex justify-content-between">
                    <div>{maintenance.name} - {maintenance.monthsPending} Month(s) Pending</div>
                    <div>₹ {maintenance.amount.toLocaleString()}</div>
                    <Button variant="danger" size="sm" onClick={() => handleDelete(index, 'maintenance')}><FaTrash /></Button>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Card>
          </Col>
        </Row>

        {/* Complaint List */}
        <Row className="mb-3">
          <Col>
            <Card>
              <Card.Header>Complaint List</Card.Header>
              <Table responsive>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Complaint</th>
                    <th>Date</th>
                    <th>Priority</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {complaints.map((complaint, index) => (
                    <tr key={index}>
                      <td>{complaint.name}</td>
                      <td>{complaint.complaint}</td>
                      <td>{complaint.date}</td>
                      <td>
                        <Badge bg={complaint.priority === 'High' ? 'danger' : complaint.priority === 'Medium' ? 'warning' : 'success'}>
                          {complaint.priority}
                        </Badge>
                      </td>
                      <td>{complaint.status}</td>
                      <td>
                        <Button variant="info" size="sm" className="me-2"><FaEye /> View</Button>
                        <Button variant="danger" size="sm" onClick={() => handleDelete(index, 'complaint')}><FaTrash /></Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card>
          </Col>
        </Row>

        {/* Upcoming Activity Form */}
        <Row className="mb-3">
          <Col>
            <Card>
              <Card.Header>Upcoming Activity</Card.Header>
              <ListGroup variant="flush">
                {upcomingActivities.map((activity, index) => (
                  <ListGroup.Item key={index}>
                    <div><strong>{activity.title}</strong></div>
                    <div>Time: {activity.time}</div>
                    <div>Date: {activity.date}</div>
                    <Button variant="danger" size="sm" onClick={() => handleDelete(index, 'activity')}><FaTrash /></Button>
                  </ListGroup.Item>
                ))}
              </ListGroup>

              {/* Add New Activity */}
              <Form onSubmit={handleSubmitActivity}>
                <Form.Group controlId="title">
                  <Form.Label>Activity Title</Form.Label>
                  <Form.Control
                    type="text"
                    name="title"
                    value={newActivity.title}
                    onChange={handleInputChange}
                    placeholder="Enter title"
                  />
                </Form.Group>
                <Form.Group controlId="time">
                  <Form.Label>Time</Form.Label>
                  <Form.Control
                    type="text"
                    name="time"
                    value={newActivity.time}
                    onChange={handleInputChange}
                    placeholder="Enter time"
                  />
                </Form.Group>
                <Form.Group controlId="date">
                  <Form.Label>Date</Form.Label>
                  <Form.Control
                    type="date"
                    name="date"
                    value={newActivity.date}
                    onChange={handleInputChange}
                  />
                </Form.Group>
                <Button variant="primary" type="submit">Add Activity</Button>
              </Form>
            </Card>
          </Col>
        </Row>
      </Col>
    </div>
  );
};

export default RightSection;
