import React, { useState } from 'react'
import './EventParticipation.css'
import { Link } from 'react-router-dom'
import Header from '../Navbar'
import Sidebar from '../Layout/Sidebar';
import  Avatar  from '../../assets/Avatar.png'



const EventParticipation = () => {
    const [events, setEvents] = useState([
        {
            id: 1,
            paricipatorname: "Evelyn Harper",
            description: "Event and recreational activities.",
            time: "10:00 AM",
            date: "2022/01/01",
            eventname: "Holi Festival ",

        },
        {
            id: 2,
            paricipatorname: "Esther Howard",
            description: "Securing critica government systems.",
            time: "1:45 AM",
            date: "2022/01/01",
            eventname: "Holi Festival ",

        },
        {
            id: 3,
            paricipatorname: "Esther Howard",
            description: "Securing critica government systems.",
            time: "1:45 AM",
            date: "2022/01/01",
            eventname: "Holi Festival ",

        },
        {
            id: 4,
            paricipatorname: "Esther Howard",
            description: "Securing critica government systems.",
            time: "1:45 AM",
            date: "2022/01/01",
            eventname: "Holi Festival ",

        },
        {
            id: 5,
            paricipatorname: "Esther Howard",
            description: "Securing critica government systems.",
            time: "1:45 AM",
            date: "2022/01/01",
            eventname: "Holi Festival ",

        },
        {
            id: 6,
            paricipatorname: "Esther Howard",
            description: "Securing critica government systems.",
            time: "1:45 AM",
            date: "2022/01/01",
            eventname: "Holi Festival ",

        },
    ]);


    return (
        <div className="dashboard-bg" style={{ marginLeft: "280px", width: "1640px" }}>
        <Header />
        <div className="d-flex">
          <Sidebar />
          <div className="container-fluid ms-4">
            <div className="row">
              <div  >
                <div className="d-flex mt-3">
                  <Link to={"/eventparticipation"} >
                    <button className="participatebtn hovermaincolor rounded-top bg-white text-dark btn border-bottom ">
                      <span className="participatebtnspan">Events Participate</span>
                    </button>
                  </Link>
                  <Link to="/activityparticipate" >
                    <button className="participatebtn hovermaincolor border-bottom text-dark bg-white rounded-top btn">
                      <span className="participatebtnspan">Activity Participate</span>
                    </button>
                  </Link>
                </div>
                <div className="container-fluid row ">
                  
                  <div className="eventtable" style={{ overflowX: "auto" }}>
                  <div>
                    <h4 className="mt-3">Event Participation</h4>
                  </div>
                    {/* Header Row */}
                    <div className="row p-3 head d-flex flex-row text-center text-dark " style={{background: "rgb(185, 198, 242)",}}>
                      <div className="col-2 fw-bold text-start">Participator Name</div>
                      <div className="col-2 fw-bold text-center">Description</div>
                      <div className="col-3 fw-bold text-center">Event Time</div>
                      <div className="col-1 fw-bold text-center">Event Date</div>
                      <div className="col-3 fw-bold text-center">Event Name</div>
                    </div>
  
                    {/* Rows */}
                    {events.map((event, index) => (
                      <div className="row data border-bottom p-2 d-flex align-items-center" key={index}  >
                        <div className="col-2 " >
                          <img
                            src={Avatar}
                            alt="avatar"
                            className="rounded-circle profileimg me-2"
                          />
                          <span>{event.paricipatorname}</span>
                        </div >
                        <div className="col-2 text-center " >
                          <p>{event.description}</p>
                        </div>
                        <div className="col-3 text-center ">
                          <p>{event.time}</p>
                        </div>
                        <div className="col-1 text-center">
                          <p>{event.date}</p>
                        </div>
                        <div className="col-3 text-center">{event.eventname}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
}

export default EventParticipation