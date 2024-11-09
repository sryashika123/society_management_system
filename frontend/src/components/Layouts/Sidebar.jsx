import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useLocation } from "react-router-dom";
import {
  FaTh,
  FaUser,
  FaDollarSign,
  FaBuilding,
  FaExclamationCircle,
  FaShieldAlt,
  FaBullhorn,
  FaSignOutAlt,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";

export default function Sidebar() {
  const location = useLocation();
  const [activeItem, setActiveItem] = useState("");
  const [isComplaintDropdownOpen, setComplaintDropdownOpen] = useState(false);
  const [isSecurityDropdownOpen, setSecurityDropdownOpen] = useState(false);
  const [isFinancialDropdownOpen, setFinancialDropdownOpen] = useState(false);

  useEffect(() => {
    const path = location.pathname.split("/")[2] || "dashboard"; // Extract the part after "/home/"
    setActiveItem(path);

    // Open relevant dropdown based on the path
    if (path === "create-complaint" || path === "request-tracking") {
      setComplaintDropdownOpen(true);
      setSecurityDropdownOpen(false); // Close Security Management dropdown
      setFinancialDropdownOpen(false); // Close Financial Management dropdown
    } else if (path === "visitors-log" || path === "security-protocols") {
      setSecurityDropdownOpen(true);
      setComplaintDropdownOpen(false); // Close Complaint Tracking dropdown
      setFinancialDropdownOpen(false); // Close Financial Management dropdown
    } else if (path === "financialmanagement") {
      setFinancialDropdownOpen(true);
      setComplaintDropdownOpen(false); // Close Complaint Tracking dropdown
      setSecurityDropdownOpen(false); // Close Security Management dropdown
    } else {
      // Close all dropdowns for other paths
      setComplaintDropdownOpen(false);
      setSecurityDropdownOpen(false);
      setFinancialDropdownOpen(false);
    }
  }, [location]);

  const handleComplaintClick = () => {
    setComplaintDropdownOpen(!isComplaintDropdownOpen);
    setSecurityDropdownOpen(false); // Close Security Management dropdown
    setFinancialDropdownOpen(false); // Close Financial Management dropdown
    setActiveItem("complaint-tracking");
  };

  const handleSecurityClick = () => {
    setSecurityDropdownOpen(!isSecurityDropdownOpen);
    setComplaintDropdownOpen(false); // Close Complaint Tracking dropdown
    setFinancialDropdownOpen(false); // Close Financial Management dropdown
    setActiveItem("security-management");
  };

  const handleFinancialClick = () => {
    setFinancialDropdownOpen(!isFinancialDropdownOpen);
    setComplaintDropdownOpen(false); // Close Complaint Tracking dropdown
    setSecurityDropdownOpen(false); // Close Security Management dropdown
    setActiveItem("financialmanagement");
  };

  const menuItems = [
    { key: "dashboard", label: "Dashboard", icon: <FaTh />, path: "/home/dashboard" },
    { key: "residentmanagement", label: "Resident Management", icon: <FaUser />, path: "/home/residentmanagement" },
    { key: "financialmanagement", label: "Financial Management", icon: <FaDollarSign />, path: "/home/financialmanagement" },
    { key: "facility-management", label: "Facility Management", icon: <FaBuilding />, path: "/home/facility-management" },
    {
      key: "complaint-tracking",
      label: "Complaint Tracking",
      icon: <FaExclamationCircle />,
      subItems: [
        { key: "create-complaint", label: "Create Complaint", path: "/home/create-complaint" },
        { key: "request-tracking", label: "Request Tracking", path: "/home/request-tracking" },
      ],
    },
    {
      key: "security-management",
      label: "Security Management",
      icon: <FaShieldAlt />,
      subItems: [
        { key: "visitors-log", label: "Visitors Log", path: "/home/visitors-log" },
        { key: "security-protocols", label: "Security Protocols", path: "/home/security-protocols" },
      ],
    },
    { key: "security-guard", label: "Security Guard", icon: <FaShieldAlt />, path: "/home/security-guard" },
    { key: "announcement", label: "Announcement", icon: <FaBullhorn />, path: "/home/announcement" },
  ];

  return (
    <div className="sidebar">
      <div
        className="offcanvas offcanvas-start show"
        tabIndex="-1"
        style={{ visibility: "visible", width: "280px" }}
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
                  <li className={`p-2 ${activeItem === "income" ? "active" : ""}`}>
                    <Link to="/home/financialmanagement" style={{ textDecoration: "none", color: "black" }} onClick={() => handleClick("income")}>
                      Income
                    </Link>
                  </li>
                  <li className={`p-2 ${activeItem === "expense" ? "active" : ""}`}>
                    <Link to="/home/financialmanagement/expense" style={{ textDecoration: "none", color: "black" }} onClick={() => handleClick("expense")}>
                      Expense
                    </Link>
                  </li>
                  <li className={`p-2 ${activeItem === "note" ? "active" : ""}`}>
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
                      Create Complaint
                    </Link>
                  </li>
                  <li className={`p-2 ${activeItem === "request-tracking" ? "mainColor2" : ""}`}>
                    <Link to="/home/request-tracking" style={{ textDecoration: "none", color: "black" }} onClick={() => handleClick("request-tracking")}>
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
            {menuItems.map((item) =>
              item.subItems ? (
                <li key={item.key} className="p-3 rounded">
                  <div
                    className={`d-flex align-items-center justify-content-between ${
                      activeItem === item.key ? "mainColor2 text-white" : ""
                    }`}
                    style={{
                      cursor: "pointer",
                      color: activeItem === item.key ? "white" : "black",
                    }}
                    onClick={() => {
                      if (item.key === "complaint-tracking") {
                        handleComplaintClick();
                      } else if (item.key === "security-management") {
                        handleSecurityClick();
                      } else if (item.key === "financialmanagement") {
                        handleFinancialClick();
                      }
                    }}
                  >
                    <div className="d-flex align-items-center">
                      {item.icon}
                      <span className="ms-3">{item.label}</span>
                    </div>
                    {item.key === "complaint-tracking" && (isComplaintDropdownOpen ? <FaChevronUp /> : <FaChevronDown />)}
                    {item.key === "security-management" && (isSecurityDropdownOpen ? <FaChevronUp /> : <FaChevronDown />)}
                    {item.key === "financialmanagement" && (isFinancialDropdownOpen ? <FaChevronUp /> : <FaChevronDown />)}
                  </div>
                  {(item.key === "complaint-tracking" && isComplaintDropdownOpen) ||
                  (item.key === "security-management" && isSecurityDropdownOpen) ||
                  (item.key === "financialmanagement" && isFinancialDropdownOpen) ? (
                    <ul className="list-unstyled ms-4">
                      {item.subItems.map((subItem) => (
                        <li
                          key={subItem.key}
                          className={`p-2 rounded ${
                            activeItem === subItem.key ? "mainColor2 text-white" : ""
                          }`}
                          onClick={() => setActiveItem(subItem.key)}
                        >
                          <Link
                            to={subItem.path}
                            className="d-flex align-items-center"
                            style={{
                              textDecoration: "none",
                              color: activeItem === subItem.key ? "white" : "black",
                            }}
                          >
                            <span>{subItem.label}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </li>
              ) : (
                <li key={item.key} className={`p-3 rounded ${activeItem === item.key ? "mainColor2" : ""}`}>
                  <Link
                    to={item.path}
                    className="d-flex align-items-center"
                    style={{ textDecoration: "none", color: activeItem === item.key ? "white" : "black" }}
                    onClick={() => setActiveItem(item.key)}
                  >
                    {item.icon}
                    <span className="ms-3">{item.label}</span>
                  </Link>
                </li>
              )
            )}
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
}