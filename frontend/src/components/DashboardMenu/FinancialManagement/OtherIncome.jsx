import React, { useEffect, useState } from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import CreateOtherIncome from './CreateOtherIncome';
import EditModal from './EditModal';
import ViewIncomeModal from './ViewIncomeModal';
import { Modal } from 'react-bootstrap';
import axios from 'axios';

const OtherIncome = ({ income }) => {
    // State to control visibility of Create modal and Edit modal
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showViewModal, setShowViewModal] = useState(false); // New state for ViewModal

    // State to store selected income data for editing
    const [selectedIncome, setSelectedIncome] = useState(null);

     // State for storing the list of incomes
     const [incomes, setIncomes] = useState([]);

    //  const [showMenuIndex, setShowMenuIndex] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(null);


    // Fetch income data on component mount
    useEffect(() => {
        fetchIncomes();
    }, []);

    const fetchIncomes = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/users/v13/getOtherIncome`);
            setIncomes(response.data);
        } catch (error) {
            console.error("Error fetching incomes:", error);
        }
    };


    // Function to handle saving new income
    const handleSaveIncome = async (newIncome) => {
        try {
            const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/users/v13/createOtherIncome`, newIncome);
            setIncomes([...incomes, response.data]);
            setShowCreateModal(false);
        } catch (error) {
            console.error("Error saving income:", error);
        }
    };


    // Open Delete Modal
    const openDeleteModal = (index) => {
        setSelectedIncome(incomes[index]); // Set the selected income
        setSelectedIndex(index);
        setShowModal(true);
    };

    // Confirm Delete
    const handleConfirmDelete = () => {
        handleDeleteIncome(selectedIndex);
        setShowModal(false);
        setSelectedIndex(null);
    };

    // Cancel Delete
    const handleCancelDelete = () => {
        setShowModal(false);
        setSelectedIndex(null);
        setSelectedIncome(null); // Reset selected income
    };


   

    // State to track which income item's dropdown is open
    const [showMenuIndex, setShowMenuIndex] = useState(null);

    // Handle opening the Create modal
    const handleCreateIncome = () => {
        setShowCreateModal(true);
    };

    // Close Create modal
    const closeCreateModal = () => {
        setShowCreateModal(false);
    };

    // Handle updating income in the list
    const handleUpdateIncome = (updatedIncome) => {
        setIncomes((prevIncomes) =>
            prevIncomes.map((income) =>
                income.title === updatedIncome.title ? updatedIncome : income
            )
        );
    };

    // Handle opening the Edit modal
    const handleEditIncome = (index) => {
        setSelectedIncome(incomes[index]); // Set the income to be edited
        setShowEditModal(true); // Open the Edit modal
        setShowViewModal(false); // Close the View modal if it was open
    };


    // Handle viewing income details
    const handleViewIncome = (index) => {
        setSelectedIncome(incomes[index]); // Set selected income to be viewed
        setShowViewModal(true); // Open the View modal
        setShowEditModal(false); // Close the Edit modal if it was open
    };

    // Close the modals
    const closeModals = () => {
        setShowEditModal(false);
        setShowViewModal(false);
        setSelectedIncome(null);
    };


    // Handle deleting an income
    const handleDeleteIncome = (index) => {
        setIncomes(incomes.filter((_, i) => i !== index));
        setShowMenuIndex(null); // Close the menu after deletion
    };

    // Toggle the dropdown menu
    const handleMenuClick = (index) => {
        setShowMenuIndex(showMenuIndex === index ? null : index);
    };

    return (
        <>
            <div
                className="bg-white mt-0"
                style={{
                    backgroundColor: '#f5f8ff',
                    borderRadius: '8px',
                    border: '1px solid #ddd',
                    boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.1)',
                    overflow: 'hidden',
                    padding: '20px',
                }}
            >
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h4>Other Income</h4>
                    <button
                        className="mainColor2"
                        style={{
                            color: 'white',
                            padding: '10px 20px',
                            borderRadius: '8px',
                            border: 'none',
                        }}
                        onClick={handleCreateIncome}
                    >
                        Create Other Income
                    </button>

                    {/* Show CreateOtherIncome modal */}
                    {showCreateModal && (
                        <CreateOtherIncome
                            showModal={showCreateModal}
                            onClose={closeCreateModal}
                            onSave={handleSaveIncome} // Pass the save handler
                        />
                    )}
                </div>

                <div className="row">
                    {incomes.length > 0 ? (
                        incomes.map((income, index) => (
                            <div className="col-md-3" key={index}>
                                <div className="card">
                                    <div
                                        className="card-header"
                                        style={{ background: '#5678E9', color: '#FFFFFF' }}
                                    >
                                        {income.title}
                                        <span
                                            style={{ float: 'right', marginTop: '5px', cursor: 'pointer' }}
                                            onClick={() => handleMenuClick(index)} // Toggle menu visibility
                                        >
                                            <BsThreeDotsVertical />
                                        </span>

                                        {showMenuIndex === index && (
                                            <div
                                                style={{
                                                    position: 'absolute',
                                                    background: '#fff',
                                                    color: '#000',
                                                    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
                                                    borderRadius: '5px',
                                                    right: '10px',
                                                    top: '30px',
                                                    padding: '10px',
                                                    zIndex: 1000,
                                                }}
                                            >
                                                <ul style={{ listStyleType: 'none', padding: 0, margin: 0 }}>
                                                    <li
                                                        style={{ padding: '8px 0', cursor: 'pointer' }}
                                                        onClick={() => handleEditIncome(index)} // Edit action
                                                    >
                                                        Edit
                                                    </li>
                                                    <li
                                                        style={{ padding: '8px 0', cursor: 'pointer' }}
                                                        onClick={() => handleViewIncome(index)} // View action
                                                    >
                                                        View
                                                    </li>
                                                    {/* Example list items */}

                                                    <li

                                                        style={{ padding: '8px 0', cursor: 'pointer' }}
                                                        onClick={() => openDeleteModal(index)}
                                                    >
                                                        Delete
                                                    </li>

                                                </ul>
                                            </div>
                                        )}
                                    </div>
                                    <div className="card-body">
                                        <p style={{ display: 'flex', justifyContent: 'space-between' }}>
                                            <span style={{ color: 'rgba(79, 79, 79, 1)', fontWeight: '400' }}>
                                                Amount Per Member:
                                            </span>
                                            <span
                                                style={{
                                                    color: 'rgba(86, 120, 233, 1)',
                                                    backgroundColor: 'rgba(86, 120, 233, 0.1)',
                                                    fontWeight: '500',
                                                    padding: '5px 10px',
                                                    borderRadius: '20px',
                                                }}
                                            >
                                                ₹{income.amountPerMember}
                                            </span>
                                        </p>
                                        <p style={{ display: 'flex', justifyContent: 'space-between' }}>
                                            <span style={{ color: 'rgba(79, 79, 79, 1)', fontWeight: '400' }}>
                                                Total Members:
                                            </span>
                                            <span style={{ color: 'black', fontWeight: '500' }}>
                                                {income.totalMembers}
                                            </span>
                                        </p>
                                        <p style={{ display: 'flex', justifyContent: 'space-between' }}>
                                            <span style={{ color: 'rgba(79, 79, 79, 1)', fontWeight: '400' }}>Date:</span>
                                            <span style={{ color: 'black', fontWeight: '500' }}>{income.date}</span>
                                        </p>
                                        <p style={{ display: 'flex', justifyContent: 'space-between' }}>
                                            <span style={{ color: 'rgba(79, 79, 79, 1)', fontWeight: '400' }}>
                                                Due Date:
                                            </span>
                                            <span style={{ color: 'black', fontWeight: '500' }}>{income.dueDate}</span>
                                        </p>
                                        <p>
                                            <span style={{ color: 'rgba(79, 79, 79, 1)', fontWeight: '400' }}>Description:</span>
                                            <span
                                                style={{
                                                    color: 'black',
                                                    fontWeight: '500',
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis',
                                                    display: '-webkit-box',
                                                    WebkitBoxOrient: 'vertical',
                                                    WebkitLineClamp: '2',
                                                    lineHeight: '1.5',
                                                }}
                                            >
                                                {income.description}
                                            </span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No other income records available at this time.</p>
                    )}
                </div>
            </div>

            {/* EditModal component */}
            {showEditModal && (
                <EditModal
                    show={showEditModal}
                    handleClose={() => setShowEditModal(false)}
                    income={selectedIncome}
                    onSave={handleUpdateIncome}
                />
            )}

            {/* ViewIncomeModal component */}
            {showViewModal && (
                <ViewIncomeModal income={selectedIncome} onClose={closeModals} />
            )}

            {/* Bootstrap Modal */}
            <Modal show={showModal} onHide={handleCancelDelete} centered>
                <Modal.Header closeButton style={{ borderBottom: 'none' }}>
                    <Modal.Title><strong>Delete {selectedIncome?.title || 'This Item'}</strong></Modal.Title>
                </Modal.Header>
                <Modal.Body >
                    <p>Are you sure you want to delete this?</p>
                </Modal.Body>
                <div className="d-flex justify-content-between">
                    <button type="button" className="btn btn-outline-secondary"
                        style={{ width: '45%', borderRadius: '10px', paddingTop: '10px', paddingBottom: '10px', marginBottom: '15px', marginLeft: '15px' }}
                        onClick={handleCancelDelete}>
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
                        onClick={handleConfirmDelete}
                    >
                        Delete
                    </button>
                </div>
            </Modal>
        </>
    );
};

export default OtherIncome;
