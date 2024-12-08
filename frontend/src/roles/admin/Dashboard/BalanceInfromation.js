import React, { useState } from 'react';
import { Row, Col, Card } from 'react-bootstrap';

const BalanceInformation = () => {
    const [cards] = useState([
        {
            image: require('../../../assets/rec1.png'),
            title: 'Total Balance',
            amount: '₹ 2,22,520',
            background: require('../../../assets/Dashboard-card.png'),
            icon: require('../../../assets/dash1.png'),
        },
        {
            image: require('../../../assets/rec2.png'),
            title: 'Total Income',
            amount: '₹ 55,000',
            background: require('../../../assets/Dashboard-card-2.png'),
            icon: require('../../../assets/dash2.png'),
        },
        {
            image: require('../../../assets/rec3.png'),
            title: 'Total Expense',
            amount: '₹ 20,550',
            background: require('../../../assets/Dashboard-card-3.png'),
            icon: require('../../../assets/dash3.png'),
        },
        {
            image: require('../../../assets/rec4.png'),
            title: 'Total Unit',
            amount: '₹ 20,550',
            background: require('../../../assets/Dashboard-card-4.png'),
            icon: require('../../../assets/dash4.png'),
        },
    ]);

    return (
        <div className="mt-2">
            <Row className="mb-3">
                {cards.map((card, idx) => (
                    <Col
                        key={idx}
                        xs={12} // Full width on extra small screens
                        sm={6} // Half width on small screens (>=576px)
                        md={4} // One-third width on medium screens (>=768px)
                        lg={3} // Quarter width on large screens (>=992px)
                        xl={3} // Quarter width on extra large screens (>=1200px)
                    >
                        <Card
                            className="shadow-sm"
                            style={{
                                borderRadius: '15px',
                                backgroundImage: `url(${card.background})`,
                                icon: `url(${card.icon})`,
                                backgroundSize: 'cover',
                                backgroundRepeat: 'no-repeat',
                                backgroundPosition: 'center',
                                overflow: 'hidden',
                                height: "105px",
                                width: "380px"


                            }}
                        >
                            <Card.Body className="d-flex align-items-center">
                                <div >
                                    
                                        <img
                                        className='position-absolute start-0 '
                                            src={card.image}

                                        />

                                        <Card.Title
                                            style={{
                                                color: 'black',
                                                fontSize: '16px',
                                                fontWeight: 'bold',
                                            }}
                                        >
                                            {card.title}
                                        </Card.Title>
                             
                                    <Card.Text
                                        className="fw-bold"
                                        style={{
                                            color: 'black',
                                            fontSize: '22px',
                                            fontWeight: 'bold',
                                        }}
                                    >
                                        {card.amount}
                                    </Card.Text>

                                </div>
                                <div className="ms-auto d-flex align-items-center">
                                    <img
                                        src={card.icon}
                                        alt={card.title}
                                        style={{
                                            width: '40px',
                                            height: '40px',
                                            borderRadius: '5px',
                                        }}
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
