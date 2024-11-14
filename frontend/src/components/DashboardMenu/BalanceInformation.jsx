import React, { useState } from 'react';
import { Row, Col, Card } from 'react-bootstrap';

const BalanceInformation = () => {
    const [cards] = useState([
        { title: 'Total Balance', amount: '₹ 2,22,520', img: require('../images/dash1.png') },
        { title: 'Total Income', amount: '₹ 55,000', img: require('../images/dash2.png') },
        { title: 'Total Expense', amount: '₹ 20,550', img: require('../images/dash3.png') },
        { title: 'Total Unit', amount: '₹ 20,550', img: require('../images/dash4.png') },
    ]);

    return (
        <div className="mt-2">
            <Row className="mb-3">
                {cards.map((card, idx) => (
                    <Col
                        key={idx}
                        xs={12}      // Full width on extra small screens
                        sm={6}       // Half width on small screens (>=576px)
                        md={4}       // One-third width on medium screens (>=768px)
                        lg={3}       // Quarter width on large screens (>=992px)
                        xl={3}       // Quarter width on extra large screens (>=1200px)
                    >
                        <Card className="shadow-sm" style={{ borderRadius: '10px' }}>
                            <Card.Body className="d-flex align-items-center">
                                <div>
                                    <Card.Title style={{ color: 'black', fontSize: '16px' }}>
                                        {card.title}
                                    </Card.Title>
                                    <Card.Text className="fw-bold" style={{ color: 'black', fontSize: '22px' }}>
                                        {card.amount}
                                    </Card.Text>
                                </div>
                                <div className="ms-auto d-flex align-items-center">
                                    <img
                                        src={card.img}
                                        alt={card.title}
                                        style={{ width: '40px', height: '40px', borderRadius: '5px' }}
                                    />
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </div>
    );
};

export default BalanceInformation;
