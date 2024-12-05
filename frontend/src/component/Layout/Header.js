import React, { useState } from 'react';
import { Navbar, Nav, Button, InputGroup, FormControl, Container } from 'react-bootstrap';
import { FiSearch } from "react-icons/fi";
import avtar from '../../assets/Avatar.png';
import Bellicon from '../../assets/Bellicon.png';
import { Link } from 'react-router-dom';
import './Header.css';

export default function Header() {
    const [notifications, setNotifications] = useState([
        'New habit reminder',
        'Goal achieved!',
        'Don\'t forget to update your progress'
    ]);
    const [showNotifications, setShowNotifications] = useState(false);

    const clearNotifications = () => {
        setNotifications([]);
        setShowNotifications(false);
    };

    return (
        <div className="header" style={{ marginLeft: "285px",width:"1610px" , position:"fixed" , top:"0px" , zIndex:"999"}}>
            <Navbar expand="lg" className="navbar bg-white border-bottom" style={{height:"109px"}}>
                <Container fluid>
                    {/* Search Bar for Large Screens */}
                    <Navbar.Brand className="d-none d-lg-block w-20" style={{marginLeft:"20px"}}>
                        <InputGroup className="align-items-center search-bar rounded-2 px-3 py-2">
                            <FiSearch className="search-icon" />
                            <FormControl
                                className="border-0"
                                placeholder="Search Here"
                                aria-label="Search"
                            />
                        </InputGroup>
                    </Navbar.Brand>

                    {/* Right-aligned Icons (Always Visible) */}
                    <Nav className="ms-auto d-flex align-items-center justify-content-end flex-row py-sm-2 py-md-0">
                        {/* Search Icon for Small Screens */}
                        <div className="d-lg-none me-3">
                            <FiSearch className="fs-4 text-dark" />
                        </div>

                        {/* Notification Icon */}
                        <div
                            variant="light"
                            className="position-relative me-3 px-2 text-black "
                            onClick={() => setShowNotifications(!showNotifications)}
                        >
                            <img src={Bellicon}  />
                            
                        </div>

                        {/* Notification Dropdown */}
                        {showNotifications && (
                            <div
                                className="notification-dropdown position-absolute bg-white border shadow-sm p-2"
                                style={{ right: '60px', top: '75px', width: '280px', zIndex: 1000 }}
                            >
                                <div className="d-flex justify-content-between align-items-center mb-2">
                                    <h6 className="mb-0">Notifications</h6>
                                    <Button variant="link" size="sm" onClick={clearNotifications} className="text-primary">
                                        Clear All
                                    </Button>
                                </div>
                                <ul className="list-unstyled">
                                    {notifications.length > 0 ? (
                                        notifications.map((notification, index) => (
                                            <li key={index} className="border-bottom py-2 text-muted">
                                                {notification}
                                            </li>
                                        ))
                                    ) : (
                                        <li className="text-muted">No new notifications</li>
                                    )}
                                </ul>
                            </div>
                        )}

                        {/* User Profile */}
                        <div className="d-flex align-items-center">
                            <Link to="/home/profile" className="d-flex align-items-center text-decoration-none">
                                <img
                                    src={avtar}
                                    alt="User"
                                    className="rounded-circle me-2"
                                    width="35"
                                    height="35"
                                />
                                <div className="d-none d-lg-block">
                                    <span className="navbar-span">Moni Roy</span>
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
