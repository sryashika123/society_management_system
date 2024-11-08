import React, { useState } from 'react'
import { FaBuilding, FaCreditCard, FaDollarSign, FaRegFileAlt } from 'react-icons/fa';

const BalanceInformation = () => {
    const [cards] = useState([
        { title: 'Total Balance', amount: '₹ 2,22,520', color: 'danger', icon: <FaRegFileAlt color='#ee6a42' /> },
        { title: 'Total Income', amount: '₹ 55,000', color: 'success', icon: <FaDollarSign color='green' /> },
        { title: 'Total Expense', amount: '₹ 20,550', color: 'info', icon: <FaCreditCard color='skyblue' /> },
        { title: 'Total Unit', amount: '₹ 20,550', color: 'primary', icon: <FaBuilding color='purple' /> },
    ]);
    return (
        <div className="row">
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
        </div>
    )
}

export default BalanceInformation
