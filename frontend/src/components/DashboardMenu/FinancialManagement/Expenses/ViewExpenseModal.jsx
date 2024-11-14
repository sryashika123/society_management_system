import React from 'react';

const ViewExpenseModal = ({ expense, onClose }) => {
    if (!expense) return null; // Do not render if there is no expense data

    return (
        <div className="modal" style={{ display: 'block', position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
            <div style={{ margin: '50px auto', background: '#fff', padding: '20px', maxWidth: '500px', borderRadius: '8px' }}>
                
                {/* Modal Title */}
                <h4>View Expense Details</h4>

                <div className='mt-4'>
                    <p ><span className='text-muted fw-bold'>Title:</span><br /> {expense.title}</p>
                    <p><span className='text-muted fw-bold'>Description:</span><br /> {expense.description}</p>
                    <div className="d-flex ">
                        <p><span className='text-muted fw-bold'>Date:</span><br /> {expense.date}</p>
                        <p className='ms-5'>
                            <span className='text-muted fw-bold'>Amount:</span><br />
                            <span className="badge bg-light text-dark py-2 px-3 rounded-pill">{`${expense.amount}`}</span>
                        </p>
                    </div>
                </div>

                <div>
                    <span className='text-muted fw-bold'>Bill:</span><br />
                    <div className="d-flex align-items-center">
                        <i className="bi bi-file-earmark-image" style={{ fontSize: '1.5rem', marginRight: '10px' }}></i>
                        <a href={expense.billUrl} target="_blank" rel="noopener noreferrer">
                            {expense.billFileName}
                        </a>
                    </div>
                </div>

                <button onClick={onClose} style={{ padding: '10px 20px', background: '#5678E9', color: '#fff', borderRadius: '5px', border: 'none', marginTop: '20px' }}>
                    Close
                </button>
            </div>
        </div>

    );
};

export default ViewExpenseModal;
