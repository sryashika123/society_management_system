import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { BsThreeDotsVertical } from 'react-icons/bs';
import Sidebar from '../../../Layouts/Sidebar';
import AddNoteModal from './AddNoteModal';
import EditNoteModal from './EditNoteModal';


const Note = () => {
    const [showModal, setShowModal] = useState(false);
    const [showMenuIndex, setShowMenuIndex] = useState(null); // State for dropdown menu
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedNote, setSelectedNote] = useState(null);

    const [notes, setNotes] = useState([
        {
            title: "Rent Or Mortgage",
            description: "A visual representation of your spending categories visual representation."
        },
        {
            title: "Housing Costs",
            description: "A visual representation of your spending categories visual representation."

        },
        {
            title: "Property Taxes",
            description: "A visual representation of your spending categories visual representation."

        },
        {
            title: "Maintenance Fees",
            description: "A visual representation of your spending categories visual representation."
        },
        {
            title: "Rent or Transportation",
            description: "A visual representation of your spending categories visual representation."
        },
        {
            title: "BreakDown",
            description: "A visual representation of your spending categories visual representation."
        },
        {
            title: "Expense Tracker",
            description: "A visual representation of your spending categories visual representation."
        },
        {
            title: "Personal Expenses",
            description: "A visual representation of your spending categories visual representation."
        }
    ]);

    // Function to handle adding a new note
    const handleAddNote = (newNote) => {
        setNotes([...notes, newNote]);
    };

    // Function to toggle dropdown menu
    const handleMenuToggle = (index) => {
        setShowMenuIndex(showMenuIndex === index ? null : index);
    };


    // Function to handle edit button click
    const handleEditClick = (note) => {
        setSelectedNote(note);
        setShowEditModal(true);
    };

    // Function to handle modal close
    const handleCloseModal = () => {
        setShowEditModal(false);
        setSelectedNote(null);
    };
    // Function to save the edited note data
    const handleSaveNote = (updatedNote) => {
        // Update the notes list with the edited note
        const updatedNotes = notes.map((note) =>
            note.id === selectedNote.id ? { ...note, ...updatedNote } : note
        );
        setNotes(updatedNotes);
        handleCloseModal();
    };
    return (
        <>
            <div className="d-flex flex-column flex-md-row vh-100">
                <div className="col-12 col-md-3 flex-shrink-0" style={{ maxWidth: "300px" }}>
                    <Sidebar />
                </div>

                <div className="col p-4 flex-grow-1 d-flex flex-column align-items-center" style={{ borderRadius: "20px", backgroundColor: "#F6F8FB" }}>

                    <div className="shadow p-4 rounded" style={{ width: "95%", backgroundColor: "#FFFFFF", borderRadius: "15px", boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)", marginTop: "20px" }}>

                        <div className="d-flex justify-content-between align-items-center w-100 m-4">
                            <h3>Note</h3>
                            <Button
                                className="text-white mainColor2"
                                style={{ marginRight: "40px", border: 'none' }}
                                onClick={() => setShowModal(true)}
                            >
                                Create Note
                            </Button>
                        </div>

                        {/* Main container with shadow/border effect */}
                        <div >
                            <div className="row m-2">
                                {notes.map((note, index) => (
                                    <div className="col-12 col-md-6 col-lg-3 mb-4" key={index}>
                                        <div className="card">
                                            <div className="card-header" style={{ background: "#5678E9", color: "#FFFFFF" }}>
                                                {note.title}
                                                <span
                                                    style={{ float: "right", marginTop: "5px", cursor: "pointer" }}
                                                    onClick={() => handleMenuToggle(index)}

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
                                                                onClick={() => handleEditClick(note)}

                                                            >
                                                                Edit
                                                            </li>
                                                        </ul>
                                                    </div>
                                                )}
                                            </div>
                                            <div className="card-body">
                                                <h5 className="card-title" style={{ fontSize: "15px", color: "gray" }}>Description</h5>
                                                <p className="card-text" style={{ fontSize: "13px", color: '#202224', fontWeight: '500' }}>{note.description}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Add Note Modal */}
            <AddNoteModal show={showModal} handleClose={() => setShowModal(false)} handleSave={handleAddNote} />

            {/* Edit Note Modal */}
            {selectedNote && (
                <EditNoteModal
                    show={showEditModal}
                    handleClose={handleCloseModal}
                    note={selectedNote}
                    onSave={handleSaveNote}
                />
            )}


        </>
    );
};

export default Note;
