import React from 'react'
import SideBar from '../../Layouts/Sidebar'
import MaintenanceComponent from './MaintenanceComponent'
import MaintenanceTable from './MaintenanceTable'

const Income = () => {
    return (
        <>
            <div className="d-flex flex-column flex-md-row vh-100" style={{backgroundColor: "#f8f9fa"}}>
                {/* Sidebar Column */}
                <div className="col-12 col-md-3 d-flex flex-column" style={{ maxWidth: "300px" }}>
                    <SideBar />
                </div>

                {/* Main Content Column */}
                <div className="col d-flex flex-column overflow-auto"  >
                    <div className="container-fluid d-flex flex-column" style={{ border: "1px solid #ddd", borderRadius: "8px", boxShadow: "0px 0px 15px rgba(0, 0, 0, 0.1)", overflow: "hidden", padding: "20px" }}>
                        <MaintenanceComponent />
                        {/* <br/> */}
                        <MaintenanceTable />
                    </div>
                </div>
            </div>

        </>
    )
}

export default Income
