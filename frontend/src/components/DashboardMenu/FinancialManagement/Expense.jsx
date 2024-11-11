import React, { useState } from 'react'
import { Button, Table } from 'react-bootstrap';
import Sidebar from '../../Layouts/Sidebar';
import { FaEdit, FaEye, FaTrash } from 'react-icons/fa';

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

    return (
        <>
            <div className="d-flex flex-column flex-md-row vh-100" style={{ backgroundColor: "#f8f9fa" }}>
                {/* Sidebar Column */}
                <div className="col-12 col-md-3 d-flex flex-column" style={{ maxWidth: "300px" }}>
                    <Sidebar />
                </div>

                {/* Main Content Column */}
                <div className="col d-flex flex-column overflow-auto">
                    <div className="container-fluid d-flex flex-column">
                        <div className='bg-white'>
                            <h4 className='pt-3 ps-3'>Maintenance Details</h4>
                            <Table responsive hover className="mt-3 " style={{ backgroundColor: '#f5f8ff', borderRadius: '8px', border: "1px solid #ddd", boxShadow: "0px 0px 15px rgba(0, 0, 0, 0.1)", overflow: "hidden", padding: "20px" }}>
                                <thead style={{ color: "#ffffff" }}>
                                    <tr >
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
                                            <td style={{width:'300px'}}>{expense.description}</td>
                                            <td className="text-center">{expense.date}</td>
                                            <td className="text-center" style={{ color: 'green' }}>{expense.amount}</td>
                                            <td className="text-center">
                                                <span className="badge bg-light text-dark " >
                                                    <i
                                                        className={`fas ${expense.billFormat === 'PDF' ? 'fa-file-pdf text-danger' : 'fa-file-image text-primary'}`}
                                                        style={{ marginRight: '5px' }}
                                                    ></i>
                                                    {expense.billFormat}
                                                </span>
                                            </td>
                                            <td>
                                                <div className='d-flex   align-items-center justify-content-center' style={{padding:'10px'}}>
                                                    <FaEye className="text-primary me-2" style={{ cursor: "pointer" }}/>
                                                    <FaEdit
                                                        className="text-success me-2"
                                                        style={{ cursor: "pointer" }}
                                                    />
                                                    <FaTrash className="text-danger" style={{ cursor: "pointer" }}  />
                                                </div>
                                            </td>
                                        </tr>
                                    ))}

                                </tbody>
                            </Table>
                        </div>
                    </div>
                </div>
            </div >

        </>
    )
}

export default Expense

