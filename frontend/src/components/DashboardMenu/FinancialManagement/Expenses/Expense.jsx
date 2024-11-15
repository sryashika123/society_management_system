import React, { useState } from 'react';
import { Button, Modal, Table } from 'react-bootstrap';
import Sidebar from '../../../Layouts/Sidebar';
import { FaEdit, FaEye, FaPlusSquare, FaTrash, FaFilePdf, FaFileImage } from 'react-icons/fa';
import ExpenseModal from './ExpenseModal';
import EditExpenseModal from './EditExpenseModal';
import ViewExpenseModal from './ViewExpenseModal';

const Expense = () => {
    const [expenses, setExpenses] = useState([
        {
            title: 'Rent or Mortgage',
            description: 'A visual representation of your spending categories...',
            date: '10/02/2024',
            amount: '₹ 1000',
            billFormat: 'JPG',
        },
        {
            title: 'Housing Costs',
            description: 'Track the fluctuations in your spending over time...',
            date: '11/02/2024',
            amount: '₹ 1000',
            billFormat: 'PDF',
        },
        {
            title: 'Property Taxes',
            description: 'Easily compare your planned budget against...',
            date: '12/02/2024',
            amount: '₹ 1000',
            billFormat: 'JPG',
        },
        // Add more entries as needed
    ]);
    const [showModal, setShowModal] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [currentExpense, setCurrentExpense] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const handleOpen = () => setShowModal(true);
    const handleClose = () => setShowModal(false);

    const handleAddModalShow = () => {
        setShowAddModal(true); // Open modal for adding new expense
    };

    const handleAddModalClose = () => {
        setShowAddModal(false); // Close modal for adding new expense
    };

    const handleEditModalShow = (expense) => {
        setCurrentExpense(expense); // Set the expense to edit
        setShowEditModal(true); // Open modal for editing expense
    };

    const handleEditModalClose = () => {
        setShowEditModal(false); // Close modal for editing expense
    };

    const handleSubmitNewExpense = (newExpense) => {
        setExpenses((prevExpenses) => [...prevExpenses, newExpense]); // Add new expense to the list
        setShowAddModal(false); // Close modal after adding new expense
    };

    const handleSubmitEditedExpense = (updatedExpense) => {
        setExpenses((prevExpenses) =>
            prevExpenses.map((expense) =>
                expense === currentExpense ? updatedExpense : expense
            )
        );
        setShowEditModal(false);
    };

    const handleDeleteExpense = () => {
        setExpenses((prevExpenses) => prevExpenses.filter(expense => expense !== currentExpense)); // Remove the expense
        setShowDeleteModal(false); // Close the delete modal
    };

    return (
        <div className="d-flex flex-column flex-md-row" style={{ backgroundColor: "#f8f9fa" }}>
            {/* Sidebar Column */}
            <div className="col-2 p-0">
                <Sidebar />
            </div>

            {/* Main Content Column */}
            <div className="col-10 p-4 " style={{ overflowX: 'auto', minHeight: '100vh'  }}>
                <div className="container-fluid">
                    <div className='bg-white' style={{ border: "1px solid #ddd", borderRadius: "8px", boxShadow: "0px 0px 15px rgba(0, 0, 0, 0.1)", overflow: "hidden", padding: "20px" }}>
                        <div className="d-flex align-items-center justify-content-between ">
                            <h4 className=" ps-2 mb-0">Add Expense Details</h4>
                            <Button
                                className="mainColor2 ms-3 flex-end d-flex align-items-center"
                                style={{
                                    color: 'white',
                                    padding: '10px 20px',
                                    borderRadius: '8px',
                                    border: 'none',
                                }}
                                onClick={handleAddModalShow}
                            ><FaPlusSquare className="me-2" />
                                Add New Expenses Details
                            </Button>
                        </div>
                        <Table responsive hover className="mt-3" style={{ backgroundColor: '#f5f8ff', borderRadius: '8px', border: "1px solid #ddd", boxShadow: "0px 0px 15px rgba(0, 0, 0, 0.1)", overflow: "hidden", padding: "20px" }}>
                            <thead style={{ color: "#ffffff" }}>
                                <tr>
                                    <th style={{ backgroundColor: 'rgb(185, 198, 242)' }} className="text-start">Title</th>
                                    <th style={{ backgroundColor: 'rgb(185, 198, 242)' }} className='text-start'>Description</th>
                                    <th style={{ backgroundColor: 'rgb(185, 198, 242)' }} className="text-center">Date</th>
                                    <th style={{ backgroundColor: 'rgb(185, 198, 242)' }} className="text-center">Amount</th>
                                    <th style={{ backgroundColor: 'rgb(185, 198, 242)' }} className="text-center">Bill Format</th>
                                    <th style={{ backgroundColor: 'rgb(185, 198, 242)' }} className="text-center">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {expenses.map((expense, index) => (
                                    <tr key={index}>
                                        <td>{expense.title}</td>
                                        <td style={{ width: '300px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                            {expense.description.split(' ').slice(0, 25).join(' ')}{expense.description.split(' ').length > 25 ? '...' : ''}
                                        </td>
                                        <td className="text-center">
                                            {expense.date ? new Date(expense.date).toLocaleDateString('en-GB') : 'No Date'}
                                        </td>
                                        <td className="text-center" style={{ color: 'green' }}>{expense.amount}</td>
                                        <td className="text-center">
                                            <span className="badge text-dark d-flex align-items-center justify-content-center">
                                                {expense?.billFormat?.toUpperCase() === 'PDF' ? (
                                                    <div
                                                        className="text-danger me-2 d-flex align-items-center justify-content-center"
                                                        style={{
                                                            backgroundColor: 'rgb(226, 234, 246)',
                                                            borderRadius: '30%',
                                                            padding: '5px',
                                                        }}
                                                    >
                                                        <FaFilePdf style={{ fontSize: '18px' }} />
                                                    </div>
                                                ) : (
                                                    <div
                                                        className="text-primary me-2 d-flex align-items-center justify-content-center"
                                                        style={{
                                                            backgroundColor: 'rgb(226, 234, 246)',
                                                            borderRadius: '30%',
                                                            padding: '5px',
                                                        }}
                                                    >
                                                        <FaFileImage style={{ fontSize: '18px' }} />
                                                    </div>
                                                )}
                                                <span>{expense?.billFormat ? expense.billFormat.toUpperCase() : 'UNKNOWN'}</span>
                                            </span>
                                        </td>
                                        <td>
                                            <div className='d-flex align-items-center justify-content-center' style={{ padding: '10px' }}>
                                                <FaEdit
                                                    className="text-success me-2"
                                                    style={{ cursor: "pointer", marginRight: "8px" }}
                                                    onClick={() => handleEditModalShow(expense)}
                                                />
                                                <FaEye
                                                    className="text-primary me-2"
                                                    style={{ cursor: "pointer", backgroundColor: "rgba(246, 248, 251, 1)", borderRadius: "50%", marginRight: "8px" }}
                                                    onClick={() => {
                                                        setCurrentExpense(expense);
                                                        handleOpen();
                                                    }}
                                                />
                                                <FaTrash
                                                    className="text-danger"
                                                    style={{ cursor: "pointer" }}
                                                    onClick={() => {
                                                        setCurrentExpense(expense);
                                                        setShowDeleteModal(true);
                                                    }}
                                                />
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </div>
                </div>
            </div>

            {/* Modal for adding new expense */}
            <ExpenseModal
                showModal={showAddModal}
                handleClose={handleAddModalClose}
                handleSubmit={handleSubmitNewExpense}
            />

            {/* Modal for editing an expense */}
            {currentExpense && (
                <EditExpenseModal
                    isOpen={showEditModal}
                    onClose={handleEditModalClose}
                    expense={currentExpense}
                    handleSubmit={handleSubmitEditedExpense}
                />
            )}

            {/* View Expense Modal */}
            {showModal && <ViewExpenseModal expense={currentExpense} onClose={handleClose} />}

            {/* Delete Expense Confirmation Modal */}
            <Modal show={showDeleteModal} centered onHide={() => setShowDeleteModal(false)}>
                <Modal.Header closeButton style={{borderBottom: 'none'}}>
                    <Modal.Title>Delete Expense</Modal.Title>
                </Modal.Header>
                <Modal.Body className='text-muted'>Are you sure you want to delete this expense?</Modal.Body>
                <div className="d-flex justify-content-between">
                    <button type="button" className="btn btn-outline-secondary"
                        style={{ width: '45%', borderRadius: '10px', paddingTop: '10px', paddingBottom: '10px', marginBottom: '15px', marginLeft: '15px' }}
        onClick={() => setShowDeleteModal(false)}>
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="btn"
                        style={{
                            background: 'rgba(231, 76, 60, 1)',
                            color: 'White',
                            width: '45%',
                            borderRadius: '10px',
                            marginBottom: '15px',
                            marginRight: '15px',
                            paddingTop: '10px',
                            paddingBottom: '10px',
                        }}
                        data-bs-dismiss="modal"
                        onClick={handleDeleteExpense}
                    >
                        Delete
                    </button>
                </div>
            </Modal>
        </div>
    );
};

export default Expense;