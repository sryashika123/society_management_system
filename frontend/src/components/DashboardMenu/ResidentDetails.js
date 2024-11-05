import React, { useState } from "react";
import { Table, Button, Badge } from "react-bootstrap";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import SideBar from "../Layouts/Sidebar";
import "bootstrap/dist/css/bootstrap.min.css";

const ResidentTable = () => {
  const [residents] = useState([
    { id: 1, name: "Evelyn Harper", unitNumber: "1001", unitStatus: "Occupied", residentStatus: "Tenant", phone: "97587 85828", members: 1, vehicles: 2 },
    { id: 2, name: "", unitNumber: "1002", unitStatus: "Vacate", residentStatus: "", phone: "", members: "-", vehicles: "-" },
    { id: 3, name: "Evelyn Harper", unitNumber: "1003", unitStatus: "Occupied", residentStatus: "Owner", phone: "97587 85828", members: 1, vehicles: 4 },
  ]);

  const handleEdit = (id) => {
    alert(`Edit resident with ID: ${id}`);
  };

  const handleDelete = (id) => {
    alert(`Delete resident with ID: ${id}`);
  };

  return (
    <div className="d-flex flex-column flex-md-row vh-100">
      {/* Sidebar Section */}
      <div className="col-12 col-md-3 flex-shrink-0" style={{ maxWidth: "300px" }}>
        <SideBar />
      </div>

      {/* Main Content Section */}
      <div className="col-12 col-md-9 p-4 flex-grow-1">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2>Resident Tenant and Owner Details</h2>
          <Button className="mainColor2">Add New Resident Details</Button>
        </div>

        <Table responsive="sm" bordered hover className="text-center">
          <thead>
            <tr>
              <th>Full Name</th>
              <th>Unit Number</th>
              <th>Unit Status</th>
              <th>Resident Status</th>
              <th>Phone Number</th>
              <th>Member</th>
              <th>Vehicle</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {residents.map((resident) => (
              <tr key={resident.id}>
                <td>{resident.name || "-"}</td>
                <td>{resident.unitNumber}</td>
                <td>
                  <Badge bg={resident.unitStatus === "Occupied" ? "success" : "secondary"}>
                    {resident.unitStatus}
                  </Badge>
                </td>
                <td>
                  <Badge bg={resident.residentStatus === "Tenant" ? "danger" : "primary"}>
                    {resident.residentStatus || "--"}
                  </Badge>
                </td>
                <td>{resident.phone || "--"}</td>
                <td>{resident.members}</td>
                <td>{resident.vehicles}</td>
                <td>
                  <button className="btn btn-success me-2" onClick={() => handleEdit(resident.id)}>
                    <FaEdit />
                  </button>
                  <button className="btn btn-danger" onClick={() => handleDelete(resident.id)}>
                    <FaTrashAlt />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default ResidentTable;
