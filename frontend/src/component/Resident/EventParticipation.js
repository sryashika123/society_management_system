import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom"; // Added `useLocation`
import "./EventParticipation.css";
import Header from "../Layout/Navbar";
import Sidebar from "../Layout/Sidebar";
import Avatar from "../../assets/Avatar.png";

const EventParticipation = () => {
  const location = useLocation(); // Get the current location

  // Event data
  const [events, setEvents] = useState([
    {
      id: 1,
      participatorName: "Evelyn Harper",
      description: "Event and recreational activities.",
      time: "10:00 AM",
      date: "2022/01/01",
      eventName: "Holi Festival",
    },
    {
      id: 2,
      participatorName: "Esther Howard",
      description: "Securing critical government systems.",
      time: "1:45 AM",
      date: "2022/01/01",
      eventName: "Holi Festival",
    },
    {
      id: 3,
      participatorName: "Evelyn Harper",
      description: "Event and recreational activities.",
      time: "10:00 AM",
      date: "2022/01/01",
      eventName: "Holi Festival",
    },
    {
      id: 4,
      participatorName: "Esther Howard",
      description: "Securing critical government systems.",
      time: "1:45 AM",
      date: "2022/01/01",
      eventName: "Holi Festival",
    },
    {
      id: 5,
      participatorName: "Evelyn Harper",
      description: "Event and recreational activities.",
      time: "10:00 AM",
      date: "2022/01/01",
      eventName: "Holi Festival",
    },
    {
      id: 6,
      participatorName: "Esther Howard",
      description: "Securing critical government systems.",
      time: "1:45 AM",
      date: "2022/01/01",
      eventName: "Holi Festival",
    },
  ]);

  // Helper function to check active path
  const isActive = (path) => location.pathname === path;

  return (
    <div className="dashboard-bg" style={{ width: "1920px" }}>
      <Header />
      <div className="d-flex">
        <Sidebar />
        <div className="container-fluid ms-4" style={{ width: "1920px" }}>
          <div className="row" style={{ marginTop: "109px", marginLeft: "300px" }}>
            <div>
              {/* Button Section */}
              <div className="d-flex mt-3">
                <Link to="/home/EventParticipation">
                  <button
                    className={`participatebtn hovermaincolor border-bottom btn ${
                      isActive("/home/EventParticipation")
                        ? 'maintainance-income-btn-active' : 'maintainance-income-btn-withoutbg'

                        
                    }`}
                  >
                    <span className="participatebtnspan">Events Participate</span>
                  </button>
                </Link>
                <Link to="/home/activityparticipate">
                  <button
                    className={`participatebtn hovermaincolor border-bottom btn ${
                      isActive("/home/activityparticipate")
                        ? "active-participate-btn"
                        : "bg-white text-dark"
                    }`}
                  >
                    <span className="participatebtnspan">Activity Participate</span>
                  </button>
                </Link>
              </div>

              {/* Table Section */}
              <div className="container-fluid row">
                <div className="eventtable" style={{ overflowX: "auto" }}>
                  <div>
                    <h4 className="mt-3">Event Participation</h4>
                  </div>
                  {/* Header Row */}
                  <div
                    className="row p-3 head d-flex flex-row text-center text-dark"
                    style={{ background: "rgb(185, 198, 242)" }}
                  >
                    <div className="col-2 fw-bold text-start">Participator Name</div>
                    <div className="col-2 fw-bold text-center">Description</div>
                    <div className="col-3 fw-bold text-center">Event Time</div>
                    <div className="col-1 fw-bold text-center">Event Date</div>
                    <div className="col-3 fw-bold text-center">Event Name</div>
                  </div>

                  {/* Rows */}
                  {events.map((event, index) => (
                    <div
                      className="row data border-bottom p-2 d-flex align-items-center"
                      key={index}
                    >
                      <div className="col-2">
                        <img
                          src={Avatar}
                          alt="avatar"
                          className="rounded-circle profileimg me-2"
                        />
                        <span>{event.participatorName}</span>
                      </div>
                      <div className="col-2 text-center">
                        <p>{event.description}</p>
                      </div>
                      <div className="col-3 text-center">
                        <p>{event.time}</p>
                      </div>
                      <div className="col-1 text-center">
                        <p>{event.date}</p>
                      </div>
                      <div className="col-3 text-center">{event.eventName}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventParticipation;
