import React from 'react';
import { Link } from 'react-router-dom';

const ActionButtons = () => {
  return (
    <div>
      <Link to="/home/events-and-participation" className='btn btn-sm maintainance-income-btn maintainance-income-btn-withoutbg complaint-btn'>
        Events Participate
      </Link>

      <Link to="/home/activity-and-participation" className='btn btn-sm maintainance-income-btn maintainance-income-btn-bg complaint-btn'>
        Activity Participate
      </Link>
    </div>
  );
};

export default ActionButtons;
