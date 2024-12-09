import React, { useState } from 'react';
import Sidebar from '../../../component/Layout/Sidebar';
import Navbar from '../../../component/Layout/Navbar';
import { Link } from 'react-router-dom';
import ActivityTable from './ActivityTable'; // New table component
import ActionButtons from './ActionButtons'; // New button component

const ActivityParticipation = () => {
  const [complaints, setComplaints] = useState([ // Sample complaint data
    { img: require('../../../assets/Avatar.png'), complainer: 'Evelyn Harper', des: 'Event and recreational activities.', time: '2:45 PM', date: '01/02/2024', eventName: 'Holi Festival' },
    // Repeat for more data
  ]);

  return (
    <div className='dashboard-bg' style={{ width: "1900px" }}>
      {/* <Sidebar /> */}
      <div>
        <Navbar />
      </div>

      <div style={{  marginTop: "70px", width: "1600px" }} className='marginLeft'>
        <div className='container-fluid'>
          <div className='row p-4'>
            <div className="table-responsive rounded pb-3">
              <ActionButtons /> {/* Action buttons for navigation */}
              <ActivityTable complaints={complaints} /> {/* Pass the data to ActivityTable */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivityParticipation;
