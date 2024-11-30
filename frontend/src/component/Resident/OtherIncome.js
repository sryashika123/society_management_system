import React, { useState } from 'react'
import Sidebar from '../Layout/Sidebar'
import Navbar from '../Layout/Navbar';
import balanceRactangle from '../../assets/Rectangle 1063.png'
import incomeRactangle from '../../assets/Rectangle 1063 (1).png'
import { Modal, Button, Form } from 'react-bootstrap';
import visa from '../../assets/visa-logo.png'
import mastercard from '../../assets/mastercard-logo.png'
import cash from '../../assets/cash-logo.png'


const OtherIncomeInvoices = () => {

    const [DueEventPayment, setDueEventPayment] = useState([
        { id: 1, title: 'Due Event Payment', name: "Navratri", billDate: '11/01/2024', amount: "1000.00" },
        { id: 2, title: 'Due Event Payment', name: "Navratri", billDate: '11/01/2024', amount: "1000.00" },
        { id: 3, title: 'Due Event Payment', name: "Navratri", billDate: '11/01/2024', amount: "1000.00" },
    ]);


    const [show, setShow] = useState(false);

    const handleShow = () => setShow(true);


    const [showPayNowModal, setShowPayNowModal] = useState(false);
    const [showCardDetailsModal, setShowCardDetailsModal] = useState(false);
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("mastercard");


    const handleClosePayNowModal = () => setShowPayNowModal(false);
    const handleShowPayNowModal = () => setShowPayNowModal(true);

    const handleCloseCardDetailsModal = () => setShowCardDetailsModal(false);

    const handleShowCardDetailsModal = () => {
        if (selectedPaymentMethod === "cash") {
            alert("Cash payment option selected. Please pay in cash.");
        } else {
            setShowPayNowModal(false); // Close the first modal
            setShowCardDetailsModal(true); // Open the second modal
        }
    };

    const handlePaymentChange = (event) => {
        setSelectedPaymentMethod(event.target.value);
    };

    return (
        <div className='dashboard-bg '  >
            <Sidebar />
            <div style={{ width: "1920px" }}>
                <Navbar />
            </div>


            <div style={{ marginLeft: '300px' }}>
                <div className='container-fluid '  >
                    <div className='row p-4  ' style={{ marginTop: "109px", width: "1620px" }} >

                        <div className="table-responsive pb-3 " >

                            <div className='container-fluid '>



                                <div className='row py-3 card-row ' >
                                    <div className='pe-0 bg-light'>
                                        <div className='d-flex justify-content-between align-items-center py-3 px-3'>
                                            <h3 className='mb-0 financial-income-title'>Due Event Payment</h3>
                                            <button className='set-maintainance-btn d-flex align-items-center p-2' onClick={handleShow}>
                                                View Invoice
                                            </button>
                                        </div>
                                        <div className="row  px-3" style={{ borderRadius: "10px" }}>
                                            {DueEventPayment.map((val, index) => (
                                                <div className="col-lg-3 mb-3 " key={val.id}>
                                                    <div className="card">
                                                        <div className="card-header card-title text-light d-flex align-items-center justify-content-between py-3" style={{ background: "rgba(86, 120, 233, 1)" }}>
                                                            <h5 className="mb-0" style={{ fontSize: "14px" }}>
                                                                {val.title}
                                                            </h5>
                                                            <span className="badge1 Owner1">Pending</span>
                                                        </div>
                                                        <div className="card-body">
                                                            <div className='d-flex justify-content-between align-items-center mb-1'>
                                                                <h6 className="card-body-title mb-0">Event Name</h6>
                                                                <span className="card-body-title fw-normal">{val.name}</span>
                                                            </div>
                                                            <div className='d-flex justify-content-between align-items-center mb-1'>
                                                                <h6 className="card-body-title mb-0">Event Due Date</h6>
                                                                <span className="card-body-title fw-normal">{val.billDate}</span>
                                                            </div>


                                                            <div className='d-flex justify-content-between align-items-center mb-1'>
                                                                <h6 className="card-body-title mb-0"> Amount</h6>
                                                                <span className="card-body-title fw-medium text-danger">{val.amount}</span>
                                                            </div>


                                                            <Button className='btn btn-sm w-100 mainColor2 mt-2' style={{ padding: '10px 53px', borderRadius: '10px', border: '0px', fontSize: '18px', fontWeight: '600' }} onClick={handleShowPayNowModal}>Pay Now</Button>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>




                                {/* Payment Modal */}
                                <Modal
                                    className="square-modal"
                                    show={showPayNowModal}
                                    onHide={handleClosePayNowModal}
                                    centered
                                >
                                    <Modal.Title className="Modal-Title text-start p-3 pb-1">Payment Method</Modal.Title>
                                    <Modal.Body>
                                        <Form>
                                            <Form.Group>
                                                <div className="payment-option d-flex align-items-center justify-content-between">
                                                    <span>
                                                        <img src={mastercard} alt="MasterCard" className="payment-icon" /> Master Card
                                                    </span>
                                                    <Form.Check
                                                        type="radio"
                                                        id="mastercard"
                                                        name="paymentMethod"
                                                        value="mastercard"
                                                        checked={selectedPaymentMethod === "mastercard"}
                                                        onChange={handlePaymentChange}
                                                    />
                                                </div>
                                                <div className="payment-option d-flex align-items-center justify-content-between">
                                                    <span>
                                                        <img src={visa} alt="Visa Card" className="payment-icon" /> Visa Card
                                                    </span>
                                                    <Form.Check
                                                        type="radio"
                                                        id="visa"
                                                        name="paymentMethod"
                                                        value="visa"
                                                        checked={selectedPaymentMethod === "visa"}
                                                        onChange={handlePaymentChange}
                                                    />
                                                </div>
                                                <div className="payment-option d-flex align-items-center justify-content-between">
                                                    <span>
                                                        <img src={cash} alt="Cash Payment" className="payment-icon" /> Cash Payment
                                                    </span>
                                                    <Form.Check
                                                        type="radio"
                                                        id="cash"
                                                        name="paymentMethod"
                                                        value="cash"
                                                        checked={selectedPaymentMethod === "cash"}
                                                        onChange={handlePaymentChange}
                                                    />
                                                </div>
                                            </Form.Group>
                                        </Form>
                                    </Modal.Body>
                                    <div className="d-flex justify-content-between align-items-center p-3 pt-0" >
                                        <Button
                                            variant="light"
                                            className="btn-cancel mt-0 cancle"
                                            onClick={handleClosePayNowModal}
                                        >
                                            Cancel
                                        </Button>
                                        <Button
                                            variant="warning"
                                            className="btn-confirm mt-0 save"
                                            onClick={handleShowCardDetailsModal}
                                        >
                                            Pay Now
                                        </Button>
                                    </div>

                                </Modal>

                                <Modal
                                    className="custom-modal"
                                    show={showCardDetailsModal}
                                    onHide={handleCloseCardDetailsModal}
                                    centered
                                >
                                    <Modal.Title className="Modal-Title text-start p-3 pb-1">Payment Method</Modal.Title>
                                    <Modal.Body>
                                        <Form>
                                            <Form.Group className="mb-3">
                                                <Form.Label className='Form-Label'>Card Name<span className="text-danger"> *</span></Form.Label>
                                                <Form.Control type="text" placeholder="Enter Card Name" />
                                            </Form.Group>
                                            <Form.Group className="mb-3">
                                                <Form.Label className='Form-Label'>Card Number<span className="text-danger"> *</span></Form.Label>
                                                <Form.Control type="text" placeholder="Enter Card Number" />
                                            </Form.Group>
                                            <div className="d-flex justify-content-between">
                                                <Form.Group className="mb-2 me-2">
                                                    <Form.Label className='Form-Label'>Expiry Date<span className="text-danger"> *</span></Form.Label>
                                                    <Form.Control type="date" placeholder="MM/YY" />
                                                </Form.Group>
                                                <Form.Group className="mb-2 ms-2">
                                                    <Form.Label className='Form-Label'>CVV<span className="text-danger"> *</span></Form.Label>
                                                    <Form.Control type="text" placeholder="CVV" />
                                                </Form.Group>
                                            </div>
                                        </Form>
                                    </Modal.Body>
                                    <div className="d-flex justify-content-between p-3 pt-0">
                                        <Button variant="light" className="btn-cancel mt-2 cancle" onClick={handleCloseCardDetailsModal}>
                                            Cancel
                                        </Button>
                                        <Button variant="warning" className="btn-confirm mt-2 save">
                                            Pay Now
                                        </Button>
                                    </div>
                                </Modal>
                            </div>

                        </div>


                    </div>
                </div>
            </div>

        </div>
    )
}

export default OtherIncomeInvoices
