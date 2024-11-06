import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaTh, FaUser, FaDollarSign, FaBuilding, FaExclamationCircle, FaShieldAlt, FaBullhorn, FaSignOutAlt } from "react-icons/fa";

const SideBar = () => {
  const [showOffcanvas] = useState(true);
  const [activeItem, setActiveItem] = useState("dashboard")

  const handleClick = (item) => {
    setActiveItem(item); // Update active item on click
  };

  return (
    <div>
      <div
        className={`offcanvas offcanvas-start ${showOffcanvas ? "show" : ""}`}
        tabIndex="-1"
        style={{ visibility: "visible", width: "100%", maxWidth: "300px" }}
        aria-labelledby="offcanvasExampleLabel"
        data-bs-backdrop="false"
      >
        <div className="offcanvas-header justify-content-center">
          <h1 className="offcanvas-title mainColor mx-5" id="offcanvasExampleLabel">
            Dash<span className="text-dark">Stack</span>
          </h1>
        </div>
        <hr />

        <div className="offcanvas-body p-0">
          <ul className="list-unstyled">
            <li className={`p-3 rounded ${activeItem === "dashboard" ? "mainColor2" : ""}`}>
            <li className={`p-3 rounded ${activeItem === "dashboard" ? "mainColor2" : ""}`}>

              <Link to="/home/dashboard" className="d-flex align-items-center" style={{ textDecoration: "none", color: "black" }} onClick={() => handleClick("dashboard")}>
                <FaTh className="me-3" />
                <span className="text-dark">Dashboard</span>
              </Link>
            </li>
            <li className={`p-3 rounded ${activeItem === "residentmanagement" ? "mainColor2" : ""}`}>
              <Link to="/home/residentmanagement" className="d-flex align-items-center text-dark" style={{ textDecoration: "none" }} onClick={() => handleClick("residentmanagement")}>
                <FaUser className="me-3" />
                <span>Resident Management</span>
              </Link>
            </li>
            <li className={`p-3 rounded ${activeItem === "financialmanagement" ? "mainColor2" : ""}`}>
              <Link to="/financialmanagement" className="d-flex align-items-center text-dark" style={{ textDecoration: "none" }} onClick={() => handleClick("financialmanagement")}>
                <FaDollarSign className="me-3" />
                <span>Financial Management</span>
              </Link>
            </li>
            <li className={`p-3 rounded ${activeItem === "facility-management" ? "mainColor2" : ""}`}>
              <Link to="/facility-management" className="d-flex align-items-center text-dark" style={{ textDecoration: "none" }} onClick={() => handleClick("facility-management")}>
                <FaBuilding className="me-3" />
                <span>Facility Management</span>
              </Link>
            </li>
            <li className={`p-3 rounded ${activeItem === "complaint-tracking" ? "mainColor2" : ""}`}>
              <Link to="/complaint-tracking" className="d-flex align-items-center text-dark" style={{ textDecoration: "none" }} onClick={() => handleClick("complaint-tracking")}>
                <FaExclamationCircle className="me-3" />
                <span>Complaint Tracking</span>
              </Link>
            </li>
            <li className={`p-3 rounded ${activeItem === "security-management" ? "mainColor2" : ""}`}>
              <Link to="/security-management" className="d-flex align-items-center text-dark" style={{ textDecoration: "none" }} onClick={() => handleClick("dashboard")}>
                <FaShieldAlt className="me-3" />
                <span>Security Management</span>
              </Link>
            </li>
            <li className={`p-3 rounded ${activeItem === "announcement" ? "mainColor2" : ""}`}>
              <Link to="/announcement" className="d-flex align-items-center text-dark" style={{ textDecoration: "none" }} onClick={() => handleClick("dashboard")}>
                <FaBullhorn className="me-3" />
                <span>Announcement</span>
              </Link>
            </li>
          </ul>
        </div>
        <hr />
        <div className="p-3">
          <Link to="/" className="d-flex align-items-center text-danger" style={{ textDecoration: "none" }}>
            <FaSignOutAlt className="me-3" />
            <span>Logout</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
