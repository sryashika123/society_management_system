import React from 'react';
import { Button } from 'react-bootstrap';

const ActivityTable = ({ complaints }) => {
  return (
    <div className="table-responsive rounded" style={{
      maxHeight: '730px', 
      overflowY: complaints.length > 10 ? 'scroll' : 'hidden',
    }}>
      <div className='bg-light'>
        <h3 className='mb-0 py-3 ps-3 financial-income-title'>Events Participation</h3>
        <div className='px-3' style={{ overflowX: 'auto' }}>
          <table className="table">
            <thead className='table-primary'>
              <tr style={{ height: '55px' }}>
                <th scope="col">Participator Name</th>
                <th scope="col">Description</th>
                <th scope="col">Activity Time</th>
                <th scope="col">Activity Date</th>
                <th scope="col">Activity Name</th>
              </tr>
            </thead>
            <tbody>
              {complaints.map((val, index) => (
                <tr key={index} className='bg-light'>
                  <td>
                    <img src={val.img} className='me-2' height={40} />
                    {val.complainer}
                  </td>
                  <td>{val.des}</td>
                  <td>
                    <Button className='event-time-btn border-0 text-dark mt-0'>{val.time}</Button>
                  </td>
                  <td>{val.date}</td>
                  <td>{val.eventName}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ActivityTable;
