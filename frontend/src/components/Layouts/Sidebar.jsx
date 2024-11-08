import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaTh, FaUser, FaDollarSign, FaBuilding, FaExclamationCircle, FaShieldAlt, FaBullhorn, FaSignOutAlt, FaChevronDown } from "react-icons/fa";

const SideBar = () => {
  const [showOffcanvas] = useState(true);
  const [activeItem, setActiveItem] = useState(""); // No default active item
  const [showDropdownComplaint, setShowDropdownComplaint] = useState(false);
  const [showDropdownFinancial, setShowDropdownFinancial] = useState(false);

  const handleClick = (item) => {
    setActiveItem(item); // Set active item only for the clicked item
  };

  const toggleDropdownComplaint = () => {
    setShowDropdownComplaint(!showDropdownComplaint);
  };

  const toggleDropdownFinancial = () => {
    setShowDropdownFinancial(!showDropdownFinancial);
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

            {/* Financial Management with Dropdown */}

            <li className="p-3 rounded">

            <li className={`p-3 rounded ${activeItem === "financialmanagement" ? "mainColor2" : ""}`}>

              <div className="d-flex align-items-center justify-content-between text-dark" style={{ cursor: "pointer" }} onClick={toggleDropdownFinancial}>
                <div className="d-flex align-items-center">
                  <FaDollarSign className="me-3" />
                  <span>Financial Management</span>
                </div>
                <FaChevronDown
                  className="ms-2"
                  style={{
                    transition: "transform 0.3s ease",
                    transform: showDropdownFinancial ? "rotate(180deg)" : "rotate(0deg)"
                  }}
                />
              </div>
              {showDropdownFinancial && (
                <ul className="list-unstyled ps-4 mt-2">

                  <li className={`p-2 ${activeItem === "income" ? "mainColor2" : ""}`}>
                    <Link to="/home/financialmanagement/income" style={{ textDecoration: "none", color: "black" }} onClick={() => handleClick("income")}>
                      Income
                    </Link>
                  </li>
                  <li className={`p-2 ${activeItem === "expense" ? "mainColor2" : ""}`}>
                  <li className={`p-2 rounded ${activeItem === "income" ? "active" : ""}`}>
                    <Link
                      to="/home/financialmanagement"
                      style={{ textDecoration: "none", color: "black" }}
                      onClick={() => handleClick("income")}
                    >
                      Income
                    </Link>
                  </li>

                  <li className={`p-2 rounded ${activeItem === "expense" ? "mainColor2" : ""}`}>
                    <Link to="/home/financialmanagement/expense" style={{ textDecoration: "none", color: "black" }} onClick={() => handleClick("expense")}>
                      Expense
                    </Link>
                  </li>

                  <li className={`p-2 ${activeItem === "note" ? "mainColor2" : ""}`}>
                  <li className={`p-2 rounded ${activeItem === "note" ? "mainColor2" : ""}`}>
                    <Link to="/home/financialmanagement/note" style={{ textDecoration: "none", color: "black" }} onClick={() => handleClick("note")}>
                      Note
                    </Link>
                  </li>
                </ul>
              )}
            </li>

            {/* Facility Management */}
            <li className={`p-3 rounded ${activeItem === "facility-management" ? "mainColor2" : ""}`}>
              <Link to="/home/facility-management" className="d-flex align-items-center text-dark" style={{ textDecoration: "none" }} onClick={() => handleClick("facility-management")}>
                <FaBuilding className="me-3" />
                <span>Facility Management</span>
              </Link>
            </li>

            {/* Complaint Tracking with Dropdown */}
            <li className="p-3 rounded">
              <div className="d-flex align-items-center justify-content-between text-dark" style={{ cursor: "pointer" }} onClick={toggleDropdownComplaint}>
                <div className="d-flex align-items-center">
                  <FaExclamationCircle className="me-3" />
                  <span>Complaint Tracking</span>
                </div>
                <FaChevronDown
                  className="ms-2"
                  style={{
                    transition: "transform 0.3s ease",
                    transform: showDropdownComplaint ? "rotate(180deg)" : "rotate(0deg)"
                  }}
                />
              </div>
              {showDropdownComplaint && (
                <ul className="list-unstyled ps-4 mt-2">
                  <li className={`p-2 ${activeItem === "create-complaint" ? "mainColor2" : ""}`}>
                    <Link to="/home/create-complaint" style={{ textDecoration: "none", color: "black" }} onClick={() => handleClick("create-complaint")}>
                    <Link to="/complaint-tracking/create-complaint" style={{ textDecoration: "none", color: "black" }} onClick={() => handleClick("create-complaint")}>
                      Create Complaint
                    </Link>
                  </li>
                  <li className={`p-2 ${activeItem === "request-tracking" ? "mainColor2" : ""}`}>
                    <Link to="/home/request-tracking" style={{ textDecoration: "none", color: "black" }} onClick={() => handleClick("request-tracking")}>
                    <Link to="/complaint-tracking/request-tracking" style={{ textDecoration: "none", color: "black" }} onClick={() => handleClick("request-tracking")}>
                      Request Tracking
                    </Link>
                  </li>
                </ul>
              )}
            </li>

            <li className={`p-3 rounded ${activeItem === "security-management" ? "mainColor2" : ""}`}>
              <Link to="/security-management" className="d-flex align-items-center text-dark" style={{ textDecoration: "none" }} onClick={() => handleClick("security-management")}>
                <FaShieldAlt className="me-3" />
                <span>Security Management</span>
              </Link>
            </li>
            <li className={`p-3 rounded ${activeItem === "announcement" ? "mainColor2" : ""}`}>
              <Link to="/announcement" className="d-flex align-items-center text-dark" style={{ textDecoration: "none" }} onClick={() => handleClick("announcement")}>
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
