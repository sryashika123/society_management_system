import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Modal, Form, Table } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaUser, FaHome, FaTag, FaPlus } from 'react-icons/fa'; // Using react-icons as placeholders
import Sidebar from '../../../component/Layout/Sidebar';
import '../../../style.css';
import Avtar from '../../../assets/Avatar.png';
import Header from '../../../component/Layout/Navbar';
import Edit from '../../../assets/edit.png';
import View from '../../../assets/view.png';
import { IoEyeSharp } from 'react-icons/io5';
import Avtarclean from '../../../assets/Avatar plain.png';
import viewFile1 from '../../../assets/Component 54.png';
import viewFile2 from '../../../assets/Component 55.png';


export default function ResidentManagement() {
  const [residents, setResidents] = useState([
    { id: 1, name: "Evelyn Harper", unit: 'A', Number: "1001", unitStatus: "Occupied", residentStatus: "Tenant", phoneNumber: "97587 85828", members: 1, vehicles: 2 },
    { id: 2, name: "-", unit: "B", Number: "1002", unitStatus: "Vacate", residentStatus: "--", phoneNumber: "--", members: "-", vehicles: "-" },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [showVacateModal, setShowVacateModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false); // New modal state for create modal
  const [selectedStatus, setSelectedStatus] = useState("");
  const [agreeChecked, setAgreeChecked] = useState(false);
  const [idToDelete, setIdToDelete] = useState(null);
  const navigate = useNavigate();
  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);
  const handleCloseVacateModal = () => setShowVacateModal(false);
  const handleCloseCreateModal = () => setShowCreateModal(false); // Close create modal
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

  const handleSave = () => {
    if (selectedStatus === "Occupied" && agreeChecked) {
      navigate('/home/ownerform');
    } else if (selectedStatus === "Vacate") {
      setShowVacateModal(true);
    }
    handleCloseModal();
  };
  const handleShow = () => setShow(true);

  const [viewDetails, setViewDetails] = useState([
    {
      wing: 'A', unit: '101', age: '20', gender: 'Male', fName: 'Roger Lubin', pnumber: '9123455555', relation: 'Brother'
    }
  ])

  const handleCreateClick = () => {
    setShowVacateModal(false); // Close the vacate modal
    setShowCreateModal(true); // Open the create modal
  };

  const handleDelete = () => {
    if (idToDelete) {
      console.log("Deleting ID:", idToDelete); // Perform the delete action here (e.g., API call or state update)
      setIdToDelete(null);
    }
    handleCloseCreateModal();
  };
  const imageColumnStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: "10px",
  };

  return (
    <div className="d-flex flex-column flex-md-row">
      <div className="flex-shrink-0" >
        <Sidebar />
      </div>

      <div className="flex-grow-1  dashboard-bg container-fluid  " style={{ width: "1920px" }}>
        <Header />
        <div className="container-fluid stickyheader" style={{ marginLeft: "300px", width: "1590px", marginTop: "90px" }}>


          <div className="table-responsive" style={{ border: "1px solid #ddd", borderRadius: "8px", boxShadow: "0px 0px 15px rgba(0, 0, 0, 0.1)", overflow: "hidden", backgroundColor: "#fff", padding: "20px", marginTop: "20px", marginLeft: "10px" }}>
            <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mb-4">

              <h4>Resident Tenant and Owner Details</h4>

              <Button onClick={handleOpenModal} className="mainColor2 mt-3 mt-md-0 justify-content-center" style={{ border: 'none' }}>
                <FaPlus style={{ fontSize: "18px", borderRadius: "5px", background: "rgba(255, 255, 255, 1)", color: "#FE512E", marginRight: "8px" }} />
                Add New Resident Details
              </Button>

            </div>
            <table className="table striped hover responsive">

              <thead>
                <tr className="rmHead">
                  <th
                    className="text-start"
                    style={{
                      padding: "10px",
                      width: "200px",
                      background: "rgb(185, 198, 242)",
                      fontFamily: "Poppins, sans-serif",
                      fontSize: "14px",
                      fontWeight: 600,
                      lineHeight: "21px",
                      textAlign: "left",
                      textUnderlinePosition: "from-font",
                      textDecorationSkipInk: "none",
                    }}
                  >
                    Full Name
                  </th>

                  <th className="text-center" style={{
                    padding: "10px", width: "150px", background: "rgb(185, 198, 242)", fontFamily: "Poppins, sans-serif",
                    fontSize: "14px",
                    fontWeight: 600,
                    lineHeight: "21px",
                    textAlign: "left",
                    textUnderlinePosition: "from-font",
                    textDecorationSkipInk: "none",
                  }}>Unit Number</th>
                  <th className="text-center" style={{
                    padding: "10px", width: "150px", background: "rgb(185, 198, 242)", fontFamily: "Poppins, sans-serif",
                    fontSize: "14px",
                    fontWeight: 600,
                    lineHeight: "21px",
                    textAlign: "left",
                    textUnderlinePosition: "from-font",
                    textDecorationSkipInk: "none",
                  }}>Unit Status</th>
                  <th className="text-center" style={{
                    padding: "10px", width: "150px", background: "rgb(185, 198, 242)", fontFamily: "Poppins, sans-serif",
                    fontSize: "14px",
                    fontWeight: 600,
                    lineHeight: "21px",
                    textAlign: "left",
                    textUnderlinePosition: "from-font",
                    textDecorationSkipInk: "none",
                  }}>Resident Status</th>
                  <th className="text-center" style={{
                    padding: "10px", width: "150px", background: "rgb(185, 198, 242)", fontFamily: "Poppins, sans-serif",
                    fontSize: "14px",
                    fontWeight: 600,
                    lineHeight: "21px",
                    textAlign: "left",
                    textUnderlinePosition: "from-font",
                    textDecorationSkipInk: "none",
                  }}>Phone Number</th>
                  <th className="text-center" style={{
                    padding: "10px", width: "130px", background: "rgb(185, 198, 242)", fontFamily: "Poppins, sans-serif",
                    fontSize: "14px",
                    fontWeight: 600,
                    lineHeight: "21px",
                    textAlign: "left",
                    textUnderlinePosition: "from-font",
                    textDecorationSkipInk: "none",
                  }}>Members</th>
                  <th className="text-center" style={{
                    padding: "10px", width: "130px", background: "rgb(185, 198, 242)", fontFamily: "Poppins, sans-serif",
                    fontSize: "14px",
                    fontWeight: 600,
                    lineHeight: "21px",
                    textAlign: "left",
                    textUnderlinePosition: "from-font",
                    textDecorationSkipInk: "none",
                  }}>Vehicle</th>
                  <th className="text-center" style={{
                    padding: "10px", width: "150px", background: "rgb(185, 198, 242)", fontFamily: "Poppins, sans-serif",
                    fontSize: "14px",
                    fontWeight: 600,
                    lineHeight: "21px",
                    textAlign: "left",
                    textUnderlinePosition: "from-font",
                    textDecorationSkipInk: "none",
                  }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {residents.map((resident, index) => (
                  <tr key={index} className="align-middle">
                    <td className="px-3">
                      <div style={imageColumnStyle} className="text-center">
                        <img
                          src={resident.unitStatus === "occupied" ? Avtar : Avtarclean} 
                          alt="avatar"
                          className="rounded-circle"
                          style={{
                            width: "40px",
                            height: "40px",
                            borderRadius: "36px",
                            border: "2px solid #F4F4F4",
                          }}
                        />

                        <span
                          style={{
                            fontFamily: "Poppins",
                            fontSize: "16px",
                            fontWeight: "500",
                            lineHeight: "24px",
                            textAlign: "left",
                          }}
                        >
                          {resident.name}
                        </span>
                      </div>
                    </td>
                    <td style={{ padding: "15px", textAlign: "center", verticalAlign: "middle" }}>
                      <span style={{ border: "1px solid ", borderRadius: "50%", width: "28px", height: "28px", display: "inline-flex", justifyContent: "center", alignItems: "center", color: "skyblue" }}>
                        {resident.unit}
                      </span>
                      <span style={{ fontFamily: "Poppins, sans-serif", fontWeight: "500", fontSize: "16px", lineHeight: "24px", marginLeft: "8px" }}>
                        {resident.Number}
                      </span>
                    </td>
                    <td className="text-center">
                      <span
                        className="badge "
                        style={{
                          backgroundColor: resident.unitStatus === "Occupied" ? "#ECFFFF" :
                            resident.unitStatus === "Vacate" ? "#FFF6FF" : "#F6F8FB",
                          color: resident.unitStatus === "Occupied" ? "#14B8A6" :
                            resident.unitStatus === "Vacate" ? "#9333EA" : "#202224",
                        }}
                      >
                        {resident.unitStatus === 'Occupied' ? <span><FaHome />  Occupide</span> : (resident.unitStatus === 'Vacate' ? <span><FaTag />  Vacate</span> : <FaHome />)}
                      </span>
                    </td>
                    <td className="text-center">
                      <span
                        className="badge"
                        style={{
                          backgroundColor: resident.residentStatus === "Tenant" ? "#FFF1F8" :
                            resident.residentStatus === "Owner" ? "#F1F0FF" : "#F6F8FB",
                          color: resident.residentStatus === "Tenant" ? "#EC4899" :
                            resident.residentStatus === "Owner" ? "#4F46E5" : "#202224",
                        }}
                      >
                        {resident.residentStatus === "Tenant" ? <span><FaUser />  Tenant</span> : (resident.residentStatus === "Owner" ? <FaTag /> : "--")}
                      </span>
                    </td>
                    <td className="text-center px-3">{resident.phoneNumber}</td>
                    <td className="text-center">{resident.members}</td>
                    <td className="text-center">{resident.vehicles}</td>

                    <td className="text-center"
                      style={{ verticalAlign: "middle" }}>
                      <div className="d-flex align-items-center justify-content-center">
                        <img src={Edit} className="text-success me-2 " onClick={handleOpenModal} style={{ cursor: "pointer", width: "25px" }} />
                        <img src={View} className="text-success me-2" style={{ cursor: "pointer" }} onClick={handleShow} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>


          <Modal className="square-modal" show={showModal} onHide={handleCloseModal} centered>
            <Modal.Header >
              <Modal.Title>Residence Status</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="residence-status-modal">
                <Form>
                  <div className="d-flex mb-3" style={{ gap: "70px" }}>
                    <Form.Check
                      style={{ border: "1px solid rgba(211, 211, 211, 1)", paddingLeft: "30px", paddingTop: "8px", paddingBottom: "8px", paddingRight: "30px", borderRadius: "5px" }}
                      className='radio-group text-center '
                      type="radio"
                      label="Occupied"
                      name="residenceStatus"
                      value="Occupied"
                      checked={selectedStatus === "Occupied"}
                      onChange={(e) => setSelectedStatus(e.target.value)}
                    />
                    <Form.Check
                      style={{ border: "1px solid rgba(211, 211, 211, 1)", paddingLeft: "30px", paddingTop: "8px", paddingBottom: "8px", paddingRight: "30px", borderRadius: "5px" }}
                      type="radio"
                      className='radio-group text-center'
                      label="Vacate"
                      name="residenceStatus"
                      value="Vacate"
                      checked={selectedStatus === "Vacate"}
                      onChange={(e) => setSelectedStatus(e.target.value)}
                    />
                  </div>
                  <Form.Check
                    type="checkbox"
                    label={`By submitting, you agree to select ${selectedStatus}.`}
                    checked={agreeChecked}
                    onChange={(e) => setAgreeChecked(e.target.checked)}
                    className="mb-3 radio-group"
                  />
                </Form>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button style={{ width: "175px", height: "51px", border: "1px solid #202224", padding: "10px 55px 10px 55px", background: "#FFFFFF", color: "#202224", }} variant="secondary" onClick={handleCloseModal}>Cancel</Button>
              <Button style={{ width: "175px", height: "51px", border: "1px", padding: "10px 55px 10px 55px", color: "#202224", }} className="mainColor2" onClick={handleSave} disabled={!agreeChecked}>Save</Button>
            </Modal.Footer>
          </Modal>

          <Modal className="square-modal" show={showVacateModal} onHide={handleCloseVacateModal} centered>
            <Modal.Header >
              <Modal.Title>Residence Status</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form className="d-flex align-items-center gap-4">
                <Form.Group controlId="wingSelect" className="flex-grow-1">
                  <Form.Label>Wing<span className="text-danger">*</span></Form.Label>
                  <Form.Control as="select">
                    <option>A</option>
                    <option>B</option>
                    <option>C</option>
                    <option>D</option>
                    <option>E</option>
                    <option>F</option>
                    <option>G</option>
                    <option>H</option>
                    <option>I</option>
                  </Form.Control>
                </Form.Group>

                <Form.Group controlId="unitSelect" className="flex-grow-1">
                  <Form.Label>Unit<span className="text-danger">*</span></Form.Label>
                  <Form.Control as="select">
                    <option>1001</option>
                    <option>1002</option>
                    <option>1003</option>
                    <option>1004</option>
                    <option>2001</option>
                    <option>2002</option>
                    <option>2003</option>
                    <option>2004</option>
                    <option>3001</option>
                    <option>3002</option>
                    <option>3003</option>
                    <option>3004</option>
                  </Form.Control>
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button style={{ width: "175px", height: "51px", border: "1px solid #202224", padding: "10px 55px 10px 55px", background: "#FFFFFF", color: "#202224", }} variant="secondary" onClick={handleCloseVacateModal}>Cancel</Button>
              <Button style={{ width: "175px", height: "51px", border: "1px", padding: "10px 55px 10px 55px", color: "#202224", }} className="mainColor2" onClick={handleCreateClick}>Create</Button>
            </Modal.Footer>
          </Modal>

          {/* New Create Modal */}
          <Modal className="Round-modal" show={showCreateModal} onHide={handleCloseCreateModal} centered>
            <Modal.Header >
              <Modal.Title><strong>Do you want to vacate the finlay flat?</strong></Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p>Are you sure you want to delate all details?</p>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" style={{ width: "175px", height: "51px", border: "1px solid #202224", padding: "10px 55px 10px 55px", background: "#FFFFFF", color: "#202224", }} onClick={handleCloseCreateModal}>Cancle</Button>
              <Button style={{ width: "175px", height: "51px", border: "1px", padding: "10px 55px 10px 55px", color: "white", background: " rgba(231, 76, 60, 1)" }} variant="secondary" onClick={handleDelete}>Conform</Button>
            </Modal.Footer>
          </Modal>

          {/* View Modal */}

          <Modal show={show} onHide={handleClose} className="modal-right custom-scrollbar">
            <Modal.Header>
              <Modal.Title style={{ fontSize: '20px' }}>View Owner Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="text-center mb-0">
                <img
                  src={Avtar}
                  alt="Profile"
                  className="rounded-circle mb-1"
                  width={90}
                />
                <h3 style={{ fontSize: '24px' }} className='mb-1'>Roger Lubin</h3>
                <p>RogerLubin@gmail.com</p>
              </div>

              <div className="mb-0">
                {
                  viewDetails.map((val) => {
                    return (
                      <div className='p-2 mb-3'>
                        <div className='d-flex align-items-center justify-content-between p-2 my-2 rounded' style={{
                          boxShadow: '0px 0px 35px 0px rgba(0, 0, 0, 0.06)'
                        }}>
                          <p className='mb-1' style={{ fontWeight: '600' }}>Wing </p>
                          <p className='mb-1'>{val.wing}</p>
                        </div>
                        <div className='d-flex align-items-center justify-content-between p-2 my-2 rounded' style={{
                          boxShadow: '0px 0px 35px 0px rgba(0, 0, 0, 0.06)'
                        }}>
                          <p className='mb-1' style={{ fontWeight: '600' }}>Unit </p>
                          <p className='mb-1'>{val.unit}</p>
                        </div>
                        <div className='d-flex align-items-center justify-content-between p-2 my-2 rounded' style={{
                          boxShadow: '0px 0px 35px 0px rgba(0, 0, 0, 0.06)'
                        }}>
                          <p className='mb-1' style={{ fontWeight: '600' }}>Age </p>
                          <p className='mb-1'>{val.age}</p>
                        </div>
                        <div className='d-flex align-items-center justify-content-between p-2 my-2 rounded' style={{
                          boxShadow: '0px 0px 35px 0px rgba(0, 0, 0, 0.06)'
                        }}>
                          <p className='mb-1' style={{ fontWeight: '600' }}>Gender </p>
                          <p className='mb-1'>{val.gender}</p>
                        </div>
                      </div>
                    )
                  })
                }


                <div className="row card-row g-3 pe-0">
                  <div className="card-header card-title "  >
                    <h6 className='rounded-top p-3 ps-4 pt-0' style={{ fontWeight: '600' }}>Document</h6>

                    <div className="d-flex align-items-center justify-content-between mb-3 py-2 px-3 ms-3 border rounded">
                      <div className='d-flex align-items-center'>
                        <div className="pe-3">
                          <img src={viewFile1} alt="" />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-800 text-lg mb-0">
                            Essential Aadharcard Front Side.JPG
                          </p>
                          <p className="text-sm text-gray-600 mb-0">
                            3.5 MB
                          </p>
                        </div>
                      </div>
                      <div><IoEyeSharp style={{ color: 'rgba(167, 167, 167, 1)', fontSize: '20px' }} /></div>
                    </div>

                    <div className="d-flex align-items-center justify-content-between mb-3 py-2 px-3 ms-3 border rounded">
                      <div className='d-flex align-items-center'>
                        <div className="pe-3" >
                          <img src={viewFile2} alt="" />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-800 text-lg mb-0">
                            Essential Aadharcard Front Side.JPG
                          </p>
                          <p className="text-sm text-gray-600 mb-0">
                            3.5 MB
                          </p>
                        </div>
                      </div>
                      <div><IoEyeSharp style={{ color: 'rgba(167, 167, 167, 1)', fontSize: '20px' }} /></div>
                    </div>
                  </div>


                </div>

                <div className="row card-row g-3 pe-0 ps-3">
                  <div className="card-header card-title text-light border border-top-0" >
                    <h6 style={{ background: "rgba(86, 120, 233, 1)" }} className='rounded-top p-3'>Member Counting</h6>
                    {
                      viewDetails.map((val, index) => (
                        <div key={val.id}>
                          <div className="card border-0">

                            <div className="card-body">
                              <div className="d-flex justify-content-between align-items-center p-2" style={{
                                boxShadow: '0px 0px 35px 0px rgba(0, 0, 0, 0.06)'
                              }}>
                                <h6 className=" text-dark mb-0" style={{ fontWeight: '600', fontSize: '14px' }}>First Name</h6>
                                <span className="card-body-title">{val.fName}</span>
                              </div>
                              <div className="d-flex justify-content-between align-items-center  p-2" style={{
                                boxShadow: '0px 0px 35px 0px rgba(0, 0, 0, 0.06)'
                              }}>
                                <h6 className=" mb-0 text-dark" style={{ fontWeight: '600', fontSize: '14px' }}>Phone No</h6>
                                <span className="card-body-title">{val.pnumber}</span>
                              </div>
                              <div className="d-flex justify-content-between align-items-center p-2" style={{
                                boxShadow: '0px 0px 35px 0px rgba(0, 0, 0, 0.06)'
                              }}>
                                <h6 className=" mb-0 text-dark" style={{ fontWeight: '600', fontSize: '14px' }}>Age</h6>
                                <span className="card-body-title">{val.age}</span>
                              </div>
                              <div className='d-flex justify-content-between align-items-center p-2' style={{
                                boxShadow: '0px 0px 35px 0px rgba(0, 0, 0, 0.06)'
                              }}>
                                <h6 className=" mb-0 text-dark" style={{ fontWeight: '600', fontSize: '14px' }}>Gender</h6>
                                <span className="card-body-title ">{val.gender}</span>
                              </div>
                              <div className='d-flex justify-content-between align-items-center mb-0 p-2 pb-0' style={{
                                boxShadow: '0px 0px 35px 0px rgba(0, 0, 0, 0.06)'
                              }}>
                                <h6 className="e text-dark" style={{ fontWeight: '600', fontSize: '14px' }}>Relation</h6>
                                <p className="card-body-title">{val.relation}</p>
                              </div>

                            </div>
                          </div>
                        </div>
                      ))}
                  </div>

                </div>
              </div>


            </Modal.Body>

          </Modal>


        </div>
      </div>
    </div>
  );
}
