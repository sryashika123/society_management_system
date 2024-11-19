import React, { useState } from 'react';
import { Form, InputGroup, Button, Dropdown, Nav } from 'react-bootstrap';
import { BsSearch } from 'react-icons/bs';
import avtar from '../images/Avatar.png';
import { FaBell } from 'react-icons/fa';
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
                height: '108px', // Height set to 109px
                width: 'calc(100% - 320px)', // Make the header width responsive based on sidebar width
                position: 'fixed',
                zIndex: '1000', // Ensure the header stays above sidebar
                top: '0',
                left: '320px', // Offset the header by the width of the sidebar
            }}
        >
            {/* Left Section - Search Bar */}
            <div className="d-flex justify-content-between align-items-center" style={{ height: '100%' }}>
                <div className="flex">
                    <InputGroup >
                        <InputGroup.Text>
                            <BsSearch />
                        </InputGroup.Text>
                        <Form.Control type="text" placeholder="Search Here" />
                    </InputGroup>
                </div>

                {/* Right Section - Notifications and User Profile */}
                <div className="d-flex align-items-center">
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
                </div>
            </div>
        </div>
    );
};

export default Header;
