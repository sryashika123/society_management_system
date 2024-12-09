import { useState } from 'react';
import { Navbar, Nav, Button, InputGroup, FormControl, Container } from 'react-bootstrap';
import { FiSearch } from "react-icons/fi";
import avtar from '../../assets/Avatar.png';
import { FaBell } from "react-icons/fa";
import { Link } from 'react-router-dom';
import notification1 from '../../assets/Ellipse 1092.png';
import notification2 from '../../assets/Group 1000004305.png';
import notification3 from '../../assets/Group 1000004173.png';
import { IoCheckmarkDoneSharp } from "react-icons/io5";
import { IoClose } from "react-icons/io5";
import noNotification from '../../assets/Group 1000004472.png';
import notificationIcon from '../../assets/Bellicon.png';
import './Header.css';

function Header() {
    const [notifications, setNotifications] = useState([
        {
            img: notification3,
            title: 'Ganesh Chaturthi (A- 101)',
            dateTime: 'Monday 11:41 AM',
            amt: 'Per Person Amount : ₹ 1,500',
            content: 'The celebration of Ganesh Chaturthi involves the installation of clay idols of Lord Ganesa in OurResident.',
            timestamp: '2 days ago'
        },
        {
            img: notification2,
            title: 'Update Maintenance',
            dateTime: 'Monday 11:41 AM',
            mamt: '₹ 1,500',
            pamt: '₹ 350',
            timestamp: '32 Minutes ago'
        },
    ]);
    const [showNotifications, setShowNotifications] = useState(false);

    const clearNotifications = () => {
        setNotifications([]);
        setShowNotifications(false);
    };

    return (
        <div className="header">
            <Navbar expand="lg" className="navbar bg-white border-bottom">
                <Container fluid>
                    <Navbar.Brand className="d-none d-lg-block">
                        <InputGroup className="search-bar rounded-2 px-3 py-2" style={{ marginLeft:"300px"}}> 
                            <FiSearch className="search-icon mt-2 me-2" />
                            <FormControl
                                className="border-0"
                                placeholder="Search Here"
                                aria-label="Search"
                            />
                        </InputGroup>
                    </Navbar.Brand>

                    <Nav className="ms-auto d-flex align-items-center flex-row">
                        {/* Smaller Screen Search Icon */}
                        <div className="d-lg-none me-3">
                            <FiSearch className="fs-4 text-dark" />
                        </div>

                        {/* Notification Icon */}
                        <Button
                            variant="none"
                            className="notification-icon position-relative me-3 px-2 text-black"
                            onClick={() => setShowNotifications(!showNotifications)}
                        >
                            <img src={notificationIcon} alt="Notifications" />
                        </Button>

                        {/* Notification Dropdown */}
                        {showNotifications && (
                            <div className="notification-dropdown bg-white border shadow-sm px-3 py-2 rounded">
                                <div className="d-flex justify-content-between align-items-center mb-2">
                                    <h6 className="mb-0">Notifications</h6>
                                    {notifications.length > 0 ? (
                                        <Button
                                            variant="link"
                                            onClick={clearNotifications}
                                            className="text-primary text-decoration-none"
                                        >
                                            Clear All
                                        </Button>
                                    ) : (
                                        <IoClose
                                            className="cursor-pointer fs-4"
                                            onClick={() => setShowNotifications(false)}
                                        />
                                    )}
                                </div>
                                <ul className="list-unstyled">
                                    {notifications.length > 0 ? (
                                        notifications.map((notification, index) => (
                                            <li key={index} className="notification-item">
                                                <div className="d-flex my-3">
                                                    <div className="flex-shrink-0 pe-3">
                                                        <img src={notification.img} alt="Notification" />
                                                    </div>
                                                    <div className="flex-grow-1">
                                                        <strong>{notification.title}</strong>
                                                        <br />
                                                        <small className="text-muted">{notification.dateTime}</small>
                                                        {notification.amt && <p className="mb-0">{notification.amt}</p>}
                                                        <p className="mb-0">{notification.content}</p>
                                                    </div>
                                                </div>
                                                <div className="text-end">
                                                    <small className="text-muted">
                                                        {notification.timestamp}
                                                        <IoCheckmarkDoneSharp className="ms-1" />
                                                    </small>
                                                </div>
                                            </li>
                                        ))
                                    ) : (
                                        <li className="text-center">
                                            <img src={noNotification} alt="No Notifications" />
                                        </li>
                                    )}
                                </ul>
                            </div>
                        )}

                        {/* Profile Section */}
                        <div className="d-flex align-items-center">
                            <Link
                                to="/home/profile"
                                className="d-flex align-items-center text-decoration-none"
                            >
                                <img
                                    src={avtar}
                                    alt="User"
                                    className="rounded-circle me-2"
                                    width="35"
                                    height="35"
                                />
                                <div className="d-none d-lg-block">
                                    <span>Moni Roy</span>
                                    <br />
                                    <small className="text-muted">Admin</small>
                                </div>
                            </Link>
                        </div>
                    </Nav>
                </Container>
            </Navbar>
        </div>
    );
}

export default Header;
