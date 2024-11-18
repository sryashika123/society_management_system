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
    const path = location.pathname.split("/")[2] || "dashboard";
    setActiveItem(path);

    // Open relevant dropdown based on the path
    if (path === "create-complaint" || path === "request-tracking") {
      setComplaintDropdownOpen(true);
      setSecurityDropdownOpen(false);
      setFinancialDropdownOpen(false);
    } else if (path === "visitors-log" || path === "security-protocols") {
      setSecurityDropdownOpen(true);
      setComplaintDropdownOpen(false);
      setFinancialDropdownOpen(false);
    } else if (path === "income" || path === "expenses" || path === "note") {
      setFinancialDropdownOpen(true);
      setComplaintDropdownOpen(false);
      setSecurityDropdownOpen(false);
    } else {
      setComplaintDropdownOpen(false);
      setSecurityDropdownOpen(false);
      setFinancialDropdownOpen(false);
    }
  }, [location]);

  const handleComplaintClick = () => {
    setComplaintDropdownOpen(!isComplaintDropdownOpen);
    setSecurityDropdownOpen(false);
    setFinancialDropdownOpen(false);
    setActiveItem("complaint-tracking");
  };

  const handleSecurityClick = () => {
    setSecurityDropdownOpen(!isSecurityDropdownOpen);
    setComplaintDropdownOpen(false);
    setFinancialDropdownOpen(false);
    setActiveItem("security-management");
  };

  const handleFinancialClick = () => {
    setFinancialDropdownOpen(!isFinancialDropdownOpen);
    setComplaintDropdownOpen(false);
    setSecurityDropdownOpen(false);
    setActiveItem("financialmanagement");
  };

  const menuItems = [
    { key: "dashboard", label: "Dashboard", icon: <FaTh />, path: "/home/dashboard" },
    { key: "residentmanagement", label: "Resident Management", icon: <FaUser />, path: "/home/residentmanagement" },
    {
      key: "financialmanagement",
      label: "Financial Management",
      icon: <FaDollarSign />,
      subItems: [
        { key: "income", label: "Income", path: "/home/income" },
        { key: "expenses", label: "Expenses", path: "/home/expenses" },
        { key: "note", label: "Note", path: "/home/note" },
      ],
    },
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
    <div
      className="offcanvas offcanvas-start show"
      tabIndex="-1"
      style={{ visibility: "visible", width: "320px" }} // Removed all border or shadow
      aria-labelledby="offcanvasExampleLabel"
      data-bs-backdrop="false"
    >
      <div className="offcanvas-header justify-content-center" style={{ border: "none" }}>
        <h1 className="offcanvas-title mainColor mx-5" id="offcanvasExampleLabel">
          Dash<span className="text-dark">Stack</span>
        </h1>
      </div>
      <hr/>

      <div className="offcanvas-body p-0" style={{ border: "none" }}>
        <ul className="list-unstyled">
          {menuItems.map((item) =>
            item.subItems ? (
              <li key={item.key} className="p-3 rounded" style={{ border: "none" }}>
                <div
                  className="d-flex align-items-center justify-content-between"
                  style={{
                    cursor: "pointer",
                    color: "black",
                    border: "none", // Removing any border
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
                  {item.key === "complaint-tracking" &&
                    (isComplaintDropdownOpen ? <FaChevronUp /> : <FaChevronDown />)}
                  {item.key === "security-management" &&
                    (isSecurityDropdownOpen ? <FaChevronUp /> : <FaChevronDown />)}
                  {item.key === "financialmanagement" &&
                    (isFinancialDropdownOpen ? <FaChevronUp /> : <FaChevronDown />)}
                </div>
                {(item.key === "complaint-tracking" && isComplaintDropdownOpen) ||
                  (item.key === "security-management" && isSecurityDropdownOpen) ||
                  (item.key === "financialmanagement" && isFinancialDropdownOpen) ? (
                  <ul className="list-unstyled ms-4">
                    {item.subItems.map((subItem) => (
                      <li
                        key={subItem.key}
                        className={`p-2 rounded ${activeItem === subItem.key ? "active" : ""
                          }`}
                        onClick={() => setActiveItem(subItem.key)}
                      >
                        <Link
                          to={subItem.path}
                          className="d-flex align-items-center"
                          style={{
                            textDecoration: "none",
                            color: activeItem === subItem.key ? "black" : "black",
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
              <li
                key={item.key}
                className={`p-3 rounded ${activeItem === item.key ? "mainColor2" : ""
                  }`}
                style={{ border: "none" }} // Remove any border here
              >
                <Link
                  to={item.path}
                  className="d-flex align-items-center"
                  style={{
                    textDecoration: "none",
                    color: activeItem === item.key ? "white" : "black",
                  }}
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

      <div className="p-3" style={{ border: "none" }}>
        <Link
          to="/"
          className="d-flex align-items-center text-danger"
          style={{ textDecoration: "none" }}
        >
          <FaSignOutAlt className="me-3" />
          <span>Logout</span>
        </Link>
      </div>
    </div>


  );
}