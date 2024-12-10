import React, { useState } from 'react';
import Sidebar from '../../../component/Layout/Sidebar';
import Navbar from '../../../component/Layout/Navbar';
import { Link } from 'react-router-dom';
import EventTable from './EventTable'; // New component

const EventParticipation = () => {

  const [complaint, setComplaint] = useState([ // Sample data
    { img: require('../../../assets/Avatar.png'), complainer: 'Evelyn Harper', des: 'Event and recreational activities.', time: '2:45 PM', date: '01/02/2024', eventName: 'Holi Festival' },
    // Repeat this object as needed
  ]);

  return (
    <div className='dashboard-bg w-100'>
      {/* <Sidebar /> */}
      <div className='d-flex' style={{ width: "1900px" }}>
        <Navbar />
        <div className='marginLeft'>
          <div className='container-fluid' style={{ marginTop: "70px" }}>
            <div className='row p-4' style={{ width: '1600px' }}>
              <div className="table-responsive rounded pb-3">
                <Link to="/home/events-and-participation" className='btn btn-sm maintainance-income-btn maintainance-income-btn-bg complaint-btn'>
                  Events Participate
                </Link>
                <Link to="/home/activity-and-participation" className='btn btn-sm maintainance-income-btn maintainance-income-btn-withoutbg complaint-btn'>
                  Activity Participate
                </Link>
                <EventTable complaints={complaint} /> {/* Use the new EventTable component */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventParticipation;
