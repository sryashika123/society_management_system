import React from 'react';

const ViewIncomeModal = ({ income, onClose }) => {
    if (!income) return null; // Do not render if there is no income data

    return (
        <div className="modal" style={{ display: 'block', position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
        <div style={{ margin: '50px auto', background: '#fff', padding: '20px', maxWidth: '500px', borderRadius: '8px' }}>
            <h4>{income.title}</h4>
            <p><strong>Amount Per Member:</strong> ₹{income.amountPerMember}</p>
            <p><strong>Total Members:</strong> {income.totalMembers}</p>
            <p><strong>Date:</strong> {income.date}</p>
            <p><strong>Due Date:</strong> {income.dueDate}</p>
            <p><strong>Description:</strong> {income.description}</p>
            <button onClick={onClose} style={{ padding: '10px 20px', background: '#5678E9', color: '#fff', borderRadius: '5px', border: 'none' }}>Close</button>
        </div>
    </div>
    );
};

export default ViewIncomeModal;
