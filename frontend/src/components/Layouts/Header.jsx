import React, { useState } from 'react';
import { Row, Col, Form, InputGroup, Nav, Button, Dropdown } from 'react-bootstrap';
import { BsSearch } from 'react-icons/bs';
import avtar from '../images/Avatar.png';
import { FaBell } from 'react-icons/fa6';
import { Link } from 'react-router-dom';

const Header = () => {
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
    const toggleNotifications = () => {
        setShowNotifications(!showNotifications);
    };


    return (
        <div
            className="header bg-white p-3 shadow-sm"
            style={{
                height: '109px', // Height set to 100px
                width: '100%',
                position: 'fixed',
                zIndex: '999',
                top: '0',
            }}
        >
            <Row className="align-items-center" style={{ height: '100%' }}>
                {/* Search Input */}
                <Col xs={12} md={6} lg={2} className="d-flex justify-content-start">
                    <InputGroup className="w-100">
                        <InputGroup.Text>
                            <BsSearch />
                        </InputGroup.Text>
                        <Form.Control type="text" placeholder="Search Here" />
                    </InputGroup>
                </Col>

                {/* Notification and User Info */}
                <Col xs={12} md={6} lg={8} className="d-flex justify-content-end align-items-center">
                    <Nav className="d-flex align-items-center">
                        {/* Notification Button */}
                        <Button
                            variant="light"
                            className="position-relative me-3 px-2 mt-2 text-black notification-icon"
                            onClick={toggleNotifications}
                        >
                            <FaBell />
                            {notifications.length > 0 && (
                                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                    {notifications.length}
                                </span>
                            )}
                        </Button>

                        {/* Notification Dropdown */}
                        {showNotifications && (
                            <div
                                className="notification-dropdown position-absolute bg-white border shadow-sm p-2"
                                style={{
                                    right: '60px',
                                    top: '50px',
                                    width: '280px',
                                    zIndex: 1000,
                                    marginTop: '25px',
                                    marginRight: '25px',
                                }}
                            >
                                <div className="d-flex justify-content-between align-items-center mb-2">
                                    <h6 className="mb-0">Notifications</h6>
                                    <Button
                                        variant="link"
                                        size="sm"
                                        onClick={clearNotifications}
                                        className="text-primary"
                                    >
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
                        <Dropdown align="center" className="d-flex align-items-center profile">
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
                                <div>
                                    <span className="navbar-span">Moni Roy</span>
                                    <br />
                                    <small className="text-muted">Admin</small>
                                </div>
                            </Link>
                        </Dropdown>
                    </Nav>
                </Col>
            </Row>
        </div>

    );
};

export default Header;
