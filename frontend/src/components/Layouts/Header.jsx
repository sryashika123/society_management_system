import React from 'react';
import { Row, Col, Form, InputGroup, Image } from 'react-bootstrap';
import { BsSearch, BsBell } from 'react-icons/bs';

const Header = () => {
    return (
        <div className="header bg-white p-3 shadow-sm" style={{ height: '110px', width: '100%' }}>
            <Row className="align-items-center" style={{ height: '100%' }}>
                {/* Search Input - Aligned to Left */}
                <Col xs={12} md={6} lg={3} className="d-flex justify-content-start">
                    <InputGroup className="w-100">
                        <InputGroup.Text>
                            <BsSearch />
                        </InputGroup.Text>
                        <Form.Control type="text" placeholder="Search Here" />
                    </InputGroup>
                </Col>

                <Col></Col>
                {/* Notification and User Info - Aligned to Right */}
                <Col xs={12} md={6} lg={4} className="d-flex justify-content-end align-items-center">
                    <div className="d-flex align-items-center">
                        <BsBell className="me-3 fs-4" />
                        <Image
                            src="https://via.placeholder.com/40"
                            roundedCircle
                            className="me-2"
                        />
                        <div>
                            <strong>Moni Roy</strong>
                            <div className="text-muted">Admin</div>
                        </div>
                    </div>
                </Col>
            </Row>
        </div>
    );
};

export default Header;
