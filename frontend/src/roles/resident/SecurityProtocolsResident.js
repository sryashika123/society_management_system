import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Sidebar from "../../component/Layout/Sidebar";
import Header from "../../component/Layout/Navbar";
import axios from "axios";


const SecurityProtocolsResident = () => {
  const [protocols, setProtocols] = useState([]);

  const fetchProtocols = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/users/v8/get_security_protocol`)
      .then((response) => setProtocols(response.data))
      .catch((error) => console.error("Error fetching protocols:", error));
  };

  useEffect(() => {
    fetchProtocols();
  }, []);

  return (
    <div className="container-fluid d-flex flex-column dashboard-bg">
      {/* Header Section */}
      <div className="bg-white border-bottom shadow-sm mb-4">
        <Header />
      </div>
      {/* Main Content */}
      <div className="d-flex flex-grow-1">
        {/* Sidebar */}
        <div className="text-white p-3" >
          {/* <Sidebar /> */}
        </div>

        {/* Main Content Area */}
        <div className="p-3 flex-grow-1 " style={{ marginRight: "15px", marginLeft: "280px", width: "1565px", marginTop: "70px" }}>
          <div className="row">
            <div className="col-12">
              <div className="table-responsive bg-white shadow-sm rounded p-3">
                <h5 className="mb-4">Security Protocols</h5>
                <table className="table" style={{ width: "100%" }}>
                  <thead className="thead-dark" style={{ background: "#5678E9", color: "#ffffff" }}>
                    <tr>
                      <th className="align-middle" style={{ background: "rgb(185, 198, 242)", width: "25%" }}>Title</th>
                      <th className="align-middle" style={{ background: "rgb(185, 198, 242)", width: "35%" }}>Description</th>
                      <th className="align-middle text-center" style={{ background: "rgb(185, 198, 242)", width: "20%" }}>Date</th>
                      <th className="align-middle text-center" style={{ background: "rgb(185, 198, 242)", width: "20%" }}>Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    {protocols.map((protocol, index) => (
                      <tr key={index}>
                        <td className="text-wrap">{protocol.title}</td>
                        <td className="text-wrap">{protocol.description}</td>
                        <td className=" text-center">  {new Date(protocol.date).toLocaleDateString('en-GB')}
                        </td>
                        <td className=" text-center">
                          <div style={{ width: "100px", padding: "5px ", borderRadius: "50px", background: "#F6F8FB", color: "#4F4F4F", display: "inline-block", }}> {protocol.time} </div></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        </div>

      </div>
    
  );
};

export default SecurityProtocolsResident;
